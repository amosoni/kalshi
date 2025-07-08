# KalshiAI 后端部署文件说明

## 📁 部署文件清单

### 1. 主要部署脚本
- **`deploy-backend.sh`** - 一键部署脚本（Linux 服务器使用）
- **`deploy-backend.bat`** - Windows 查看脚本（Windows 环境使用）

### 2. 测试和验证
- **`test-deployment.sh`** - 部署测试脚本（验证部署是否成功）

### 3. 文档和指南
- **`deployment-guide.md`** - 完整部署指南（详细步骤和配置）
- **`DEPLOYMENT-README.md`** - 本文件（部署文件说明）

---

## 🚀 快速开始

### 在 Linux 服务器上部署

1. **上传文件到服务器**
   ```bash
   scp deploy-backend.sh test-deployment.sh deployment-guide.md user@your-server:/tmp/
   ```

2. **运行部署脚本**
   ```bash
   ssh user@your-server
   cd /tmp
   sudo bash deploy-backend.sh
   ```

3. **配置环境变量**
   ```bash
   sudo nano /opt/kalshiai/kalshi/.env.production
   # 填入你的环境变量
   ```

4. **启动服务**
   ```bash
   kalshiai-manager start
   ```

5. **测试部署**
   ```bash
   bash test-deployment.sh
   ```

---

## 📋 部署架构

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端 (Vercel)  │    │  后端 (GCE)     │    │   数据库        │
│  kalshiai.org   │◄──►│  API 服务       │◄──►│  Supabase       │
│                 │    │  Port: 3001     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Nginx 代理    │
                       │  Port: 80/443   │
                       └─────────────────┘
```

---

## 🔧 服务管理命令

部署完成后，可以使用以下命令管理服务：

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

---

## 🌐 域名和 SSL 配置

### 1. 域名设置
```
A    api.your-domain.com    YOUR-SERVER-IP
```

### 2. SSL 证书
```bash
# 安装 Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d api.your-domain.com
```

---

## 📊 监控和维护

### 系统监控
```bash
# 查看服务状态
pm2 status

# 查看系统资源
htop
df -h
free -h

# 查看日志
tail -f /var/log/kalshiai/combined.log
```

### 备份策略
```bash
# 创建备份脚本
sudo nano /usr/local/bin/kalshiai-backup

# 设置定时备份
sudo crontab -e
# 添加：0 2 * * * /usr/local/bin/kalshiai-backup
```

---

## 🔒 安全配置

### 防火墙设置
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 系统更新
```bash
sudo apt-get update && sudo apt-get upgrade -y
```

---

## 🚨 故障排除

### 常见问题

1. **服务启动失败**
   ```bash
   kalshiai-manager logs
   sudo systemctl status nginx
   ```

2. **API 无响应**
   ```bash
   curl http://localhost:3001/health
   curl http://localhost/api/remove-bg
   ```

3. **数据库连接失败**
   ```bash
   cat /opt/kalshiai/kalshi/.env.production
   ```

4. **端口被占用**
   ```bash
   sudo netstat -tlnp | grep :3001
   sudo lsof -i :3001
   ```

---

## 📞 技术支持

### 重要文件位置
- **应用目录**: `/opt/kalshiai/kalshi/`
- **环境配置**: `/opt/kalshiai/kalshi/.env.production`
- **PM2 配置**: `/opt/kalshiai/kalshi/ecosystem.config.js`
- **Nginx 配置**: `/etc/nginx/sites-available/kalshiai`
- **管理脚本**: `/usr/local/bin/kalshiai-manager`
- **日志文件**: `/var/log/kalshiai/`

### 联系信息
- **项目仓库**: https://github.com/amosoni/kalshi
- **问题反馈**: GitHub Issues

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

## 🎯 下一步

1. **配置环境变量** - 编辑 `.env.production` 文件
2. **启动服务** - 运行 `kalshiai-manager start`
3. **配置域名** - 设置 DNS 记录和 SSL 证书
4. **测试 API** - 验证接口正常工作
5. **更新前端** - 将前端 API 地址指向新服务器
6. **监控服务** - 设置监控和告警

---

**🎉 恭喜！你的 KalshiAI 后端服务已准备就绪！**
