const express = require('express');

const app = express();
app.use(express.json());

// 示例：免费赠送接口
app.post('/api/bonus', (req, res) => {
  const { userId } = req.body;
  // 这里可以接入数据库或业务逻辑
  // 示例：新用户赠送3积分
  res.json({ success: true, bonus: 3, userId });
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
