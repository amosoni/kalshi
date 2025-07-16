const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

const upload = multer();

const app = express();

// CORS 配置
app.use(cors({
  origin: 'https://kalshiai.org',
  credentials: true,
}));

app.use(express.json({ limit: '50mb' })); // 增加请求体大小限制

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});
const R2_BUCKET = process.env.R2_BUCKET;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL; // 可选，若已开启

// 视频背景移除接口
app.post('/api/remove-bg', upload.single('file'), async (req, res) => {
  const userId = req.body.user_id;
  const fileName = req.file?.originalname;
  const fileSize = req.file?.size;

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
    const tempPath = `/tmp/${tempFileName}`;
    require('node:fs').writeFileSync(tempPath, buffer);
    // TODO: AI 处理逻辑...
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
  } catch (error) {
    console.error('视频背景移除失败:', error);
    res.status(500).json({ error: '视频处理失败' });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`Render backend API listening on port ${PORT}`);
});
