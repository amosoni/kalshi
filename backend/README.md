# KalshiAI 后端服务

## 功能特性

- ✅ 视频上传和处理
- ✅ AI背景移除 (Replicate API)
- ✅ Cloudflare R2 存储集成
- ✅ 视频流式播放
- ✅ 健康检查和监控

## 环境变量配置

创建 `.env` 文件并配置以下环境变量：

```env
# 基础配置
NODE_ENV=production
PORT=3001

# Cloudflare R2 存储配置
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET=your_bucket_name

# AI 服务配置 (Replicate)
REPLICATE_API_TOKEN=r8_your_replicate_api_token_here

# 安全配置
CORS_ORIGIN=https://kalshiai.org
```

## API 端点

### 健康检查
```
GET /health
```

### 视频背景移除
```
POST /api/remove-bg
Content-Type: multipart/form-data

参数:
- file: 视频文件
- user_id: 用户ID
- background_color: 背景颜色 (可选)
```

### R2连接测试
```
GET /api/test-r2
```

### 下载代理
```
GET /api/download?url=<video_url>
```

## 启动服务

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产模式
npm start
```

## 部署

使用提供的部署脚本：
```bash
sudo bash deploy-backend.sh
```

## 故障排除

1. **R2连接失败**: 检查环境变量配置
2. **AI处理失败**: 检查Replicate API令牌
3. **视频上传失败**: 检查文件大小限制和格式
