#!/bin/bash

# KalshiAI 后端一键部署脚本
set -e

echo "🚀 开始部署 KalshiAI 后端服务..."

# 1. 环境检查
echo "📋 检查系统环境..."
if [ "$EUID" -ne 0 ]; then
    echo "❌ 请使用 sudo 运行此脚本"
    exit 1
fi

# 2. 安装依赖
echo "📦 安装系统依赖..."
apt-get update
apt-get install -y curl wget git nginx ffmpeg nodejs npm

# 安装 PM2
npm install -g pm2

# 3. 创建应用目录
APP_DIR="/opt/kalshiai"
APP_USER="kalshiai"

useradd -r -s /bin/false -d "$APP_DIR" "$APP_USER" 2>/dev/null || true
mkdir -p "$APP_DIR"
chown "$APP_USER:$APP_USER" "$APP_DIR"

# 4. 克隆代码
echo "📥 克隆项目代码..."
cd "$APP_DIR"
git clone https://github.com/amosoni/kalshi.git
cd kalshi
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

# 5. 安装项目依赖
echo "📦 安装项目依赖..."
sudo -u "$APP_USER" npm install --production

# 6. 创建环境配置
echo "⚙️ 创建环境配置..."
ENV_FILE="$APP_DIR/kalshi/.env.production"

cat > "$ENV_FILE" << 'EOF'
NODE_ENV=production
PORT=3001
DATABASE_URL=your_database_url_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
SUPABASE_STORAGE_BUCKET=your_storage_bucket_name
REPLICATE_API_TOKEN=your_replicate_api_token_here
PROXY_URL=http://127.0.0.1:7899
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
LOGTAIL_SOURCE_TOKEN=your_logtail_token_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
ARCJET_KEY=your_arcjet_key_here
EOF

chown "$APP_USER:$APP_USER" "$ENV_FILE"
chmod 600 "$ENV_FILE"

# 7. 创建 PM2 配置
echo "⚙️ 创建 PM2 配置..."
PM2_FILE="$APP_DIR/kalshi/ecosystem.config.js"

cat > "$PM2_FILE" << 'EOF'
module.exports = {
  apps: [
    {
      name: 'kalshiai-backend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/opt/kalshiai/kalshi',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      env_file: '.env.production',
      error_file: '/var/log/kalshiai/error.log',
      out_file: '/var/log/kalshiai/out.log',
      log_file: '/var/log/kalshiai/combined.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.next'],
    }
  ]
};
EOF

mkdir -p /var/log/kalshiai
chown -R "$APP_USER:$APP_USER" /var/log/kalshiai

# 8. 配置 Nginx
echo "🌐 配置 Nginx..."
NGINX_CONF="/etc/nginx/sites-available/kalshiai"

cat > "$NGINX_CONF" << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    client_max_body_size 100M;
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_request_buffering off;
        proxy_buffering off;
    }

    location /health {
        proxy_pass http://127.0.0.1:3001;
        access_log off;
    }

    location / {
        return 301 https://kalshiai.org$request_uri;
    }
}
EOF

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t

# 9. 创建管理脚本
echo "📝 创建管理脚本..."
MANAGEMENT_SCRIPT="/usr/local/bin/kalshiai-manager"

cat > "$MANAGEMENT_SCRIPT" << 'EOF'
#!/bin/bash

APP_DIR="/opt/kalshiai/kalshi"
APP_USER="kalshiai"

case "$1" in
    start)
        echo "🚀 启动 KalshiAI 后端服务..."
        cd "$APP_DIR"
        pm2 start ecosystem.config.js
        systemctl reload nginx
        echo "✅ 服务已启动"
        ;;
    stop)
        echo "🛑 停止 KalshiAI 后端服务..."
        pm2 stop kalshiai-backend
        echo "✅ 服务已停止"
        ;;
    restart)
        echo "🔄 重启 KalshiAI 后端服务..."
        pm2 restart kalshiai-backend
        systemctl reload nginx
        echo "✅ 服务已重启"
        ;;
    status)
        echo "📊 服务状态:"
        pm2 status
        systemctl status nginx --no-pager -l
        ;;
    logs)
        echo "📋 查看日志..."
        pm2 logs kalshiai-backend --lines 50
        ;;
    update)
        echo "📦 更新代码..."
        cd "$APP_DIR"
        git pull origin main
        sudo -u "$APP_USER" npm install --production
        pm2 restart kalshiai-backend
        echo "✅ 代码已更新"
        ;;
    deploy)
        echo "🚀 完整部署..."
        cd "$APP_DIR"
        git pull origin main
        sudo -u "$APP_USER" npm install --production
        sudo -u "$APP_USER" npm run build
        pm2 restart kalshiai-backend
        systemctl reload nginx
        echo "✅ 部署完成"
        ;;
    *)
        echo "用法: $0 {start|stop|restart|status|logs|update|deploy}"
        exit 1
        ;;
esac
EOF

chmod +x "$MANAGEMENT_SCRIPT"

# 10. 完成部署
echo ""
echo "🎉 KalshiAI 后端部署完成！"
echo "================================"
echo ""
echo "📋 部署信息:"
echo "  应用目录: $APP_DIR"
echo "  应用用户: $APP_USER"
echo "  服务端口: 3001"
echo "  环境配置: $ENV_FILE"
echo ""
echo "🔧 管理命令:"
echo "  启动服务: kalshiai-manager start"
echo "  停止服务: kalshiai-manager stop"
echo "  重启服务: kalshiai-manager restart"
echo "  查看状态: kalshiai-manager status"
echo "  查看日志: kalshiai-manager logs"
echo "  更新代码: kalshiai-manager update"
echo "  完整部署: kalshiai-manager deploy"
echo ""
echo "⚠️  重要提醒:"
echo "  1. 请编辑 $ENV_FILE 文件，填入正确的环境变量"
echo "  2. 确保域名 DNS 已指向此服务器"
echo "  3. 配置 SSL 证书: certbot --nginx -d your-domain.com"
echo "  4. 测试 API: curl http://localhost:3001/api/remove-bg"
echo ""
echo "🚀 下一步操作:"
echo "  1. 编辑环境配置文件"
echo "  2. 启动服务: kalshiai-manager start"
echo "  3. 配置域名和 SSL"
echo "  4. 测试 API 接口"
echo ""
echo "📞 如需帮助，请查看日志文件或联系技术支持"
echo "================================" 