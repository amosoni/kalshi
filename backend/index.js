const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

// Node.js 18+ 内置 fetch，无需额外导入

const upload = multer();

const app = express();

// CORS 配置
app.use(cors({
  origin: ['https://kalshiai.org', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json({ limit: '50mb' })); // 增加请求体大小限制

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'kalshiai-backend',
    version: '1.0.0',
    features: {
      r2_storage: !!process.env.R2_ENDPOINT,
      ai_processing: !!process.env.REPLICATE_API_TOKEN,
      ffmpeg: true,
    },
    config: {
      r2_endpoint: process.env.R2_ENDPOINT ? 'configured' : 'missing',
      r2_bucket: process.env.R2_BUCKET ? 'configured' : 'missing',
      replicate_token: process.env.REPLICATE_API_TOKEN ? 'configured' : 'missing',
    },
  });
});

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});
const R2_BUCKET = process.env.R2_BUCKET;
// const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // 可选，若已开启（暂时注释）

// 检查必要的环境变量
if (!process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !R2_BUCKET) {
  console.warn('⚠️  缺少R2存储配置，将使用模拟模式');
  console.warn('   请设置以下环境变量以启用完整功能:');
  console.warn('   R2_ENDPOINT');
  console.warn('   R2_ACCESS_KEY_ID');
  console.warn('   R2_SECRET_ACCESS_KEY');
  console.warn('   R2_BUCKET');
}

// R2连接测试端点
app.get('/api/test-r2', async (req, res) => {
  // 检查R2配置
  if (!process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY || !R2_BUCKET) {
    return res.json({
      success: false,
      message: 'R2未配置，使用模拟模式',
      error: 'R2 configuration missing',
      bucket: 'simulated',
      endpoint: 'simulated',
    });
  }

  try {
    // 测试R2连接
    await r2.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: 'test-connection.txt',
      Body: 'test',
      ContentType: 'text/plain',
    }));
    res.json({
      success: true,
      message: 'R2连接正常',
      bucket: R2_BUCKET,
      endpoint: process.env.R2_ENDPOINT,
    });
  } catch (error) {
    console.error('R2连接测试失败:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      bucket: R2_BUCKET,
      endpoint: process.env.R2_ENDPOINT,
    });
  }
});

// 视频背景移除接口
app.post('/api/remove-bg', upload.single('file'), async (req, res) => {
  const userId = req.body.user_id;
  const fileName = req.file?.originalname;
  const fileSize = req.file?.size;
  let tempPath = null;

  try {
    const estimatedDuration = Math.ceil(fileSize / (1024 * 1024 * 2));
    console.warn(`用户 ${userId} 上传视频 ${fileName}, 估算时长: ${estimatedDuration}秒`);

    if (estimatedDuration <= 0) {
      return res.status(400).json({ error: 'Failed to get video duration' });
    }
    if (estimatedDuration > 30) {
      return res.status(429).json({ error: '免费用户每次最多处理30秒视频' });
    }

    // 处理视频文件
    const buffer = req.file.buffer;
    const tempFileName = `${Date.now()}-${fileName}`;
    tempPath = `/tmp/${tempFileName}`;
    require('node:fs').writeFileSync(tempPath, buffer);

    // 1. 先上传原始视频到 R2，获取公网 URL
    const r2InputKey = `${userId}/input-${Date.now()}-${fileName}`;
    let inputUrl = null;
    let uploadInputSuccess = false;
    let lastInputError = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.warn(`尝试上传原始视频到R2，第${attempt}次尝试...`);
        await r2.send(new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: r2InputKey,
          Body: buffer,
          ContentType: req.file.mimetype || 'video/mp4',
        }));
        uploadInputSuccess = true;
        console.warn(`R2原始视频上传成功，第${attempt}次尝试`);
        break;
      } catch (uploadError) {
        lastInputError = uploadError;
        console.error(`R2原始视频上传失败，第${attempt}次尝试:`, uploadError.message);
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    if (!uploadInputSuccess) {
      throw lastInputError;
    }
    inputUrl = `https://${R2_BUCKET}.${process.env.R2_ENDPOINT.replace(/^https?:\/\//, '')}/${r2InputKey}`;

    // 2. 调用 Replicate 视频去背景模型
    let processedVideoBuffer = buffer; // 默认用原视频
    if (process.env.REPLICATE_API_TOKEN) {
      try {
        console.warn(`使用Replicate API进行视频背景移除...`);
        const replicateResponse = await fetch('https://api.replicate.com/v1/predictions', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            version: 'c18392381d1b5410b5a76b9b0c58db132526d3f79fe602e04e0d80cb668df509',
            input: {
              video: inputUrl,
            },
          }),
        });
        const replicateData = await replicateResponse.json();
        if (!replicateResponse.ok) {
          throw new Error(replicateData.detail || 'Replicate API 请求失败');
        }
        const predictionId = replicateData.id;
        // 轮询获取处理结果
        let outputUrl = null;
        for (let i = 0; i < 300; i++) { // 最多等5分钟
          await new Promise(r => setTimeout(r, 1000));
          const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            },
          });
          const pollData = await pollRes.json();
          if (pollData.status === 'succeeded' && pollData.output) {
            outputUrl = Array.isArray(pollData.output) ? pollData.output[0] : pollData.output;
            break;
          } else if (pollData.status === 'failed') {
            throw new Error(`Replicate 处理失败: ${pollData.error || '未知错误'}`);
          }
        }
        if (!outputUrl) {
          throw new Error('Replicate 处理超时');
        }
        // 3. 下载处理后的视频
        const outputRes = await fetch(outputUrl);
        if (!outputRes.ok) {
          throw new Error('下载处理后视频失败');
        }
        processedVideoBuffer = require('node:buffer').Buffer.from(await outputRes.arrayBuffer());

        // 检查是否需要加纯色背景
        const bgColor = req.body.background_color || '#FFFFFF';
        if (bgColor && bgColor !== 'transparent' && bgColor !== '#00000000') {
          // 用 ffmpeg 给透明背景视频加纯色底色
          const ffmpeg = require('fluent-ffmpeg');
          const tmpInput = `/tmp/bg_input_${Date.now()}.mp4`;
          const tmpOutput = `/tmp/bg_output_${Date.now()}.mp4`;
          require('node:fs').writeFileSync(tmpInput, processedVideoBuffer);
          await new Promise((resolve, reject) => {
            ffmpeg()
              .input(tmpInput)
              .complexFilter([
                `[0:v]format=rgba[video];color=${bgColor}:s=iw:ih[bg];[bg][video]overlay=format=auto:shortest=1[out]`,
              ])
              .outputOptions('-map', '[out]')
              .outputOptions('-c:v', 'libx264')
              .outputOptions('-pix_fmt', 'yuv420p')
              .save(tmpOutput)
              .on('end', () => {
                processedVideoBuffer = require('node:fs').readFileSync(tmpOutput);
                require('node:fs').unlinkSync(tmpInput);
                require('node:fs').unlinkSync(tmpOutput);
                resolve();
              })
              .on('error', (err) => {
                console.error('ffmpeg 添加纯色背景失败:', err);
                require('node:fs').unlinkSync(tmpInput);
                reject(err);
              });
          });
        }
      } catch (aiError) {
        console.error('AI处理错误，使用原始视频:', aiError);
      }
    } else {
      console.warn(`未配置REPLICATE_API_TOKEN，跳过AI处理`);
    }

    // 4. 上传处理后视频到 R2
    const r2Key = `${userId}/${Date.now()}-processed-${fileName}`;
    let uploadSuccess = false;
    let lastError = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.warn(`尝试上传处理后视频到R2，第${attempt}次尝试...`);
        await r2.send(new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: r2Key,
          Body: processedVideoBuffer,
          ContentType: req.file.mimetype || 'video/mp4',
        }));
        uploadSuccess = true;
        console.warn(`R2处理后视频上传成功，第${attempt}次尝试`);
        break;
      } catch (uploadError) {
        lastError = uploadError;
        console.error(`R2处理后视频上传失败，第${attempt}次尝试:`, uploadError.message);
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    if (!uploadSuccess) {
      throw lastError;
    }
    const resultUrl = `https://${R2_BUCKET}.${process.env.R2_ENDPOINT.replace(/^https?:\/\//, '')}/${r2Key}`;

    // 清理临时文件
    require('node:fs').unlinkSync(tempPath);

    console.warn('即将返回响应', { resultUrl, duration: estimatedDuration, cost: estimatedDuration });
    res.json({
      success: true,
      resultUrl,
      duration: estimatedDuration,
      cost: estimatedDuration,
      message: '视频背景移除处理完成',
    });
  } catch (error) {
    console.error('视频背景移除失败:', error);
    // 清理临时文件（如果存在）
    if (tempPath) {
      try {
        if (require('node:fs').existsSync(tempPath)) {
          require('node:fs').unlinkSync(tempPath);
        }
      } catch (cleanupError) {
        console.error('清理临时文件失败:', cleanupError);
      }
    }
    // 返回标准 JSON 错误响应
    console.warn('即将返回错误响应', error);
    res.status(500).set({
      'Access-Control-Allow-Origin': 'https://kalshiai.org',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    }).json({
      error: '视频处理失败',
      details: process.env.NODE_ENV === 'development' ? (error && error.message ? error.message : String(error)) : undefined,
    });
  }
});

// 示例：免费赠送接口
app.post('/api/bonus', (req, res) => {
  const { userId } = req.body;
  // 这里可以接入数据库或业务逻辑
  // 示例：新用户赠送3积分
  res.json({ success: true, bonus: 3, userId });
});

// 视频时长检查接口
app.post('/api/check-video-duration', (req, res) => {
  const { userId, fileName, fileSize } = req.body;

  try {
    // 这里应该接收视频文件并检查时长
    // 由于前端已经上传了文件，我们需要一个临时方案
    // 基于文件大小估算时长（粗略估算）
    const estimatedDuration = Math.ceil(fileSize / (1024 * 1024 * 2)); // 假设2MB/秒

    console.warn(`用户 ${userId} 上传视频 ${fileName}，估算时长: ${estimatedDuration}秒`);

    res.json({
      duration: estimatedDuration,
      userId,
      fileName,
    });
  } catch (error) {
    console.error('视频时长检查失败:', error);
    res.status(500).json({ error: '视频时长检查失败' });
  }
});

// 示例：时长验证接口
app.post('/api/validate-duration', (req, res) => {
  const { videoDuration } = req.body;
  // 这里可以接入数据库或业务逻辑
  // 示例：免费用户每次最多30秒
  if (videoDuration > 30) {
    return res.json({ valid: false, reason: '免费用户每次最多处理30秒视频' });
  }
  res.json({ valid: true });
});

// 临时视频服务端点（用于模拟模式）
app.get('/api/temp-video/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `/tmp/${filename}`;

  try {
    if (!require('node:fs').existsSync(filePath)) {
      return res.status(404).json({ error: 'Video file not found' });
    }

    const stat = require('node:fs').statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = Number.parseInt(parts[0], 10);
      const end = parts[1] ? Number.parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = require('node:fs').createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
      };
      res.writeHead(200, head);
      require('node:fs').createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    console.error('临时视频服务错误:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 下载代理接口
app.get('/api/download', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    // 验证URL是否来自我们的R2存储
    const allowedDomains = [
      'kalshiai.org',
      'api.kalshiai.org',
      'pub-*.r2.dev', // Cloudflare R2 公共域名模式
    ];

    const urlObj = new URL(url);
    const isAllowed = allowedDomains.some((domain) => {
      if (domain.includes('*')) {
        const pattern = domain.replace('*', '.*');
        return new RegExp(pattern).test(urlObj.hostname);
      }
      return urlObj.hostname === domain;
    });

    if (!isAllowed) {
      return res.status(403).json({ error: 'Unauthorized domain' });
    }

    // 代理下载
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'KalshiAI/1.0',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch: ${response.statusText}`,
      });
    }

    const buffer = await response.arrayBuffer();
    res.set({
      'Content-Type': response.headers.get('content-type') || 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="processed_video.mp4"',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    res.send(require('node:buffer').Buffer.from(buffer));
  } catch (error) {
    console.error('Download proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.warn(`Render backend API listening on port ${PORT}`);
});
