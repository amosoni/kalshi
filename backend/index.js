const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

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
  });
});

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  // 添加SSL配置
  forcePathStyle: true,
  // 添加更严格的SSL配置
  requestHandler: {
    httpsAgent: new (require('node:https').Agent)({
      keepAlive: true,
      maxSockets: 50,
      timeout: 30000,
      // 尝试解决SSL握手问题
      rejectUnauthorized: true,
      secureProtocol: 'TLSv1_2_method',
    }),
  },
});
const R2_BUCKET = process.env.R2_BUCKET;
// const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // 可选，若已开启（暂时注释）

// R2连接测试端点
app.get('/api/test-r2', async (req, res) => {
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

    // 临时：跳过R2上传，直接返回模拟结果
    // TODO: 恢复AI处理逻辑和R2上传
    console.warn(`临时模式：跳过R2上传，直接返回模拟结果`);

    // 生成模拟的公网 URL（临时使用）
    const mockResultUrl = `https://example.com/processed/${Date.now()}-${fileName}`;

    // 清理临时文件
    require('node:fs').unlinkSync(tempPath);
    res.json({
      success: true,
      resultUrl: mockResultUrl,
      duration: estimatedDuration,
      cost: estimatedDuration,
      message: '临时模式：视频处理完成（模拟结果）',
    });

    /* 原始R2上传逻辑（暂时注释）
    // 上传到 R2
    const r2Key = `${userId}/${Date.now()}-${fileName}`;
    await r2.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: r2Key,
      Body: buffer,
      ContentType: req.file.mimetype || 'video/mp4',
    }));
    // 生成公网 URL
    const resultUrl = R2_PUBLIC_URL
      ? `${R2_PUBLIC_URL}/${r2Key}`
      : `https://${R2_BUCKET}.${process.env.R2_ENDPOINT.replace(/^https?:\/\//, '')}/${r2Key}`;
    // 清理临时文件
    require('node:fs').unlinkSync(tempPath);
    res.json({
      success: true,
      resultUrl,
      duration: estimatedDuration,
      cost: estimatedDuration,
    });
    */
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

    // 根据错误类型返回不同的错误信息
    let errorMessage = '视频处理失败';
    if (error.code === 'EPROTO') {
      errorMessage = '存储服务连接失败，请稍后重试';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = '存储服务不可用，请稍后重试';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = '存储服务拒绝连接，请稍后重试';
    }

    res.status(500).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`Render backend API listening on port ${PORT}`);
});
