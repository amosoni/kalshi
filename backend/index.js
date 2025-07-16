const { Buffer } = require('node:buffer');
const cors = require('cors');
const express = require('express');

const app = express();

// CORS 配置
app.use(cors({
  origin: 'https://kalshiai.org',
  credentials: true,
}));

app.use(express.json({ limit: '50mb' })); // 增加请求体大小限制

// 视频背景移除接口
app.post('/api/remove-bg', (req, res) => {
  const { userId, fileName, fileSize, backgroundColor, fileData } = req.body;

  try {
    // 1. 检查视频时长
    const estimatedDuration = Math.ceil(fileSize / (1024 * 1024 * 2)); // 假设2MB/秒
    console.warn(`用户 ${userId} 上传视频 ${fileName}，估算时长: ${estimatedDuration}秒`);

    if (estimatedDuration <= 0) {
      return res.status(400).json({ error: 'Failed to get video duration' });
    }
    if (estimatedDuration > 30) {
      return res.status(429).json({ error: '免费用户每次最多处理30秒视频' });
    }

    // 2. 时长验证
    if (estimatedDuration > 30) {
      return res.status(429).json({ error: '免费用户每次最多处理30秒视频' });
    }

    // 3. 积分校验和扣除（这里需要连接数据库）
    // TODO: 实现积分扣除逻辑

    // 4. 处理视频文件
    const buffer = Buffer.from(fileData, 'base64');
    const tempFileName = `${Date.now()}-${fileName}`;
    const tempPath = `/tmp/${tempFileName}`;

    // 写入临时文件
    require('node:fs').writeFileSync(tempPath, buffer);

    // 5. 调用Replicate AI处理视频
    // TODO: 实现实际的Replicate API调用
    console.warn('调用Replicate AI处理视频:', tempPath, '背景色:', backgroundColor);

    // 6. 清理临时文件
    require('node:fs').unlinkSync(tempPath);

    // 7. 返回结果
    res.json({
      success: true,
      resultUrl: 'processed_video_url', // 这里应该是实际的处理结果URL
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
