# KalshiAI 后端部署完整指南

## 📋 部署概述

本指南将帮助你在 Google Cloud Compute Engine 上部署 KalshiAI 后端服务。

### 🎯 部署架构
- **前端**: Vercel (kalshiai.org)
- **后端**: Google Cloud Compute Engine (API 服务)
- **数据库**: Supabase
- **存储**: Supabase Storage
- **AI 服务**: Replicate API

---

## 🚀 快速部署

### 1. 准备服务器
```bash
# 连接到你的 Google Cloud 实例
ssh your-username@your-server-ip

# 下载部署脚本
wget https://raw.githubusercontent.com/amosoni/kalshi/main/deploy-backend.sh

# 运行部署脚本
sudo bash deploy-backend.sh
```

### 2. 配置环境变量
编辑配置文件：
```bash
sudo nano /opt/kalshiai/kalshi/.env.production
```

填入以下配置：

```env
# ========================================
# 基础配置
# ========================================
NODE_ENV=production
PORT=3001

# ========================================
# 数据库配置 (Supabase)
# ========================================
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_STORAGE_BUCKET=kalshiai-videos

# ========================================
# AI 服务配置 (Replicate)
# ========================================
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ========================================
# 代理配置 (可选，用于中国大陆访问)
# ========================================
PROXY_URL=http://127.0.0.1:7899

# ========================================
# 安全配置
# ========================================
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://api.your-domain.com

# ========================================
# 监控配置 (可选)
# ========================================
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@xxxxx.ingest.sentry.io/xxxxx
LOGTAIL_SOURCE_TOKEN=src_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ========================================
# 用户认证 (Clerk)
# ========================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ========================================
# 安全防护 (Arcjet)
# ========================================
ARCJET_KEY=aj_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. 启动服务
```bash
# 启动后端服务
kalshiai-manager start

# 检查服务状态
kalshiai-manager status
```

---

## 🌐 域名和 SSL 配置

### 1. 域名设置
将你的域名 DNS 记录指向服务器 IP：
```
A    api.your-domain.com    YOUR-SERVER-IP
```

### 2. 更新 Nginx 配置
编辑 Nginx 配置：
```bash
sudo nano /etc/nginx/sites-available/kalshiai
```

将 `server_name` 改为你的域名：
```nginx
server_name api.your-domain.com;
```

### 3. 安装 SSL 证书
```bash
# 安装 Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# 获取 SSL 证书
sudo certbot --nginx -d api.your-domain.com

# 自动续期
sudo crontab -e
# 添加以下行：
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔧 服务管理

### 常用命令
```bash
# 启动服务
kalshiai-manager start

# 停止服务
kalshiai-manager stop

# 重启服务
kalshiai-manager restart

# 查看状态
kalshiai-manager status

# 查看日志
kalshiai-manager logs

# 更新代码
kalshiai-manager update

# 完整部署
kalshiai-manager deploy
```

### 监控和日志
```bash
# 查看实时日志
pm2 logs kalshiai-backend

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 查看应用日志
sudo tail -f /var/log/kalshiai/combined.log
```

---

## 🧪 测试部署

### 1. 健康检查
```bash
# 检查服务状态
curl http://localhost:3001/health

# 检查 API 端点
curl -X POST http://localhost:3001/api/remove-bg \
  -H "Content-Type: application/json" \
  -d '{"test": "connection"}'
```

### 2. 前端配置更新
更新前端环境变量，将 API 地址指向你的服务器：
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

---

## 🔒 安全配置

### 1. 防火墙设置
```bash
# 配置 UFW 防火墙
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. 系统更新
```bash
# 定期更新系统
sudo apt-get update && sudo apt-get upgrade -y

# 设置自动更新
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. 监控设置
```bash
# 创建监控脚本
sudo nano /usr/local/bin/kalshiai-monitor

# 设置定时监控
sudo crontab -e
# 添加：*/5 * * * * /usr/local/bin/kalshiai-monitor
```

---

## 📊 性能优化

### 1. Nginx 优化
```nginx
# 在 /etc/nginx/nginx.conf 中添加
worker_processes auto;
worker_connections 1024;

# 启用 gzip 压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 2. Node.js 优化
```json
{
  "instances": "max",
  "max_memory_restart": "1G",
  "node_args": "--max-old-space-size=1024"
}
```

### 3. 数据库优化
- 定期清理日志文件
- 监控数据库连接数
- 设置适当的连接池大小

---

## 🚨 故障排除

### 常见问题

#### 1. 服务启动失败
```bash
# 检查端口占用
sudo netstat -tlnp | grep :3001

# 检查日志
kalshiai-manager logs

# 重启服务
kalshiai-manager restart
```

#### 2. 数据库连接失败
```bash
# 检查数据库连接
curl -X GET "https://your-project.supabase.co/rest/v1/" \
  -H "apikey: YOUR_ANON_KEY"

# 检查环境变量
cat /opt/kalshiai/kalshi/.env.production
```

#### 3. AI 服务调用失败
```bash
# 测试 Replicate API
curl -X POST "https://api.replicate.com/v1/predictions" \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"version": "test"}'
```

#### 4. 文件上传失败
```bash
# 检查存储桶权限
# 检查 Supabase Storage 配置
# 检查文件大小限制
```

---

## 📈 监控和维护

### 1. 系统监控
```bash
# 安装监控工具
sudo apt-get install htop iotop

# 查看系统资源
htop
df -h
free -h
```

### 2. 日志轮转
```bash
# 配置 logrotate
sudo nano /etc/logrotate.d/kalshiai

# 内容：
/var/log/kalshiai/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 kalshiai kalshiai
}
```

### 3. 备份策略
```bash
# 创建备份脚本
sudo nano /usr/local/bin/kalshiai-backup

# 设置定时备份
sudo crontab -e
# 添加：0 2 * * * /usr/local/bin/kalshiai-backup
```

---

## 🔄 更新和升级

### 1. 代码更新
```bash
# 更新代码
kalshiai-manager update

# 或完整部署
kalshiai-manager deploy
```

### 2. 系统升级
```bash
# 更新系统包
sudo apt-get update && sudo apt-get upgrade -y

# 重启服务
kalshiai-manager restart
```

### 3. 依赖更新
```bash
# 更新 Node.js 依赖
cd /opt/kalshiai/kalshi
sudo -u kalshiai npm update
kalshiai-manager restart
```

---

## 📞 技术支持

### 联系信息
- **项目仓库**: https://github.com/amosoni/kalshi
- **部署文档**: 本文档
- **问题反馈**: GitHub Issues

### 日志位置
- **应用日志**: `/var/log/kalshiai/`
- **Nginx 日志**: `/var/log/nginx/`
- **系统日志**: `/var/log/syslog`

### 重要文件
- **环境配置**: `/opt/kalshiai/kalshi/.env.production`
- **PM2 配置**: `/opt/kalshiai/kalshi/ecosystem.config.js`
- **Nginx 配置**: `/etc/nginx/sites-available/kalshiai`
- **管理脚本**: `/usr/local/bin/kalshiai-manager`

---

## ✅ 部署检查清单

- [ ] 服务器环境准备完成
- [ ] 部署脚本执行成功
- [ ] 环境变量配置正确
- [ ] 数据库连接正常
- [ ] AI 服务 API 密钥有效
- [ ] 域名 DNS 解析正确
- [ ] SSL 证书安装完成
- [ ] 防火墙配置正确
- [ ] 服务启动成功
- [ ] API 接口测试通过
- [ ] 前端配置更新完成
- [ ] 监控和备份设置完成

---

**🎉 恭喜！你的 KalshiAI 后端服务已成功部署并运行。**
