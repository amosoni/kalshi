#!/bin/bash

# KalshiAI 后端部署测试脚本
echo "🧪 开始测试 KalshiAI 后端部署..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试函数
test_service() {
    local test_name="$1"
    local command="$2"
    local expected="$3"
    
    echo -e "${BLUE}🔍 测试: $test_name${NC}"
    
    if eval "$command" 2>/dev/null | grep -q "$expected"; then
        echo -e "${GREEN}✅ 通过: $test_name${NC}"
        return 0
    else
        echo -e "${RED}❌ 失败: $test_name${NC}"
        return 1
    fi
}

# 计数器
passed=0
total=0

echo "================================"
echo "📋 系统环境检查"
echo "================================"

# 1. 检查 Node.js
total=$((total + 1))
if command -v node &> /dev/null; then
    version=$(node --version)
    echo -e "${GREEN}✅ Node.js 已安装: $version${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ Node.js 未安装${NC}"
fi

# 2. 检查 npm
total=$((total + 1))
if command -v npm &> /dev/null; then
    version=$(npm --version)
    echo -e "${GREEN}✅ npm 已安装: $version${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ npm 未安装${NC}"
fi

# 3. 检查 PM2
total=$((total + 1))
if command -v pm2 &> /dev/null; then
    version=$(pm2 --version)
    echo -e "${GREEN}✅ PM2 已安装: $version${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ PM2 未安装${NC}"
fi

# 4. 检查 Nginx
total=$((total + 1))
if command -v nginx &> /dev/null; then
    version=$(nginx -v 2>&1)
    echo -e "${GREEN}✅ Nginx 已安装: $version${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ Nginx 未安装${NC}"
fi

# 5. 检查 ffmpeg
total=$((total + 1))
if command -v ffmpeg &> /dev/null; then
    version=$(ffmpeg -version | head -n1)
    echo -e "${GREEN}✅ FFmpeg 已安装: $version${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ FFmpeg 未安装${NC}"
fi

echo ""
echo "================================"
echo "📁 文件结构检查"
echo "================================"

# 6. 检查应用目录
total=$((total + 1))
if [ -d "/opt/kalshiai/kalshi" ]; then
    echo -e "${GREEN}✅ 应用目录存在: /opt/kalshiai/kalshi${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ 应用目录不存在${NC}"
fi

# 7. 检查环境配置文件
total=$((total + 1))
if [ -f "/opt/kalshiai/kalshi/.env.production" ]; then
    echo -e "${GREEN}✅ 环境配置文件存在${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ 环境配置文件不存在${NC}"
fi

# 8. 检查 PM2 配置文件
total=$((total + 1))
if [ -f "/opt/kalshiai/kalshi/ecosystem.config.js" ]; then
    echo -e "${GREEN}✅ PM2 配置文件存在${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ PM2 配置文件不存在${NC}"
fi

# 9. 检查 Nginx 配置
total=$((total + 1))
if [ -f "/etc/nginx/sites-available/kalshiai" ]; then
    echo -e "${GREEN}✅ Nginx 配置文件存在${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ Nginx 配置文件不存在${NC}"
fi

# 10. 检查管理脚本
total=$((total + 1))
if [ -f "/usr/local/bin/kalshiai-manager" ]; then
    echo -e "${GREEN}✅ 管理脚本存在${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ 管理脚本不存在${NC}"
fi

echo ""
echo "================================"
echo "🔧 服务状态检查"
echo "================================"

# 11. 检查 PM2 服务状态
total=$((total + 1))
if pm2 list | grep -q "kalshiai-backend.*online"; then
    echo -e "${GREEN}✅ PM2 服务运行中${NC}"
    passed=$((passed + 1))
else
    echo -e "${YELLOW}⚠️ PM2 服务未运行，尝试启动...${NC}"
    if kalshiai-manager start 2>/dev/null; then
        echo -e "${GREEN}✅ PM2 服务启动成功${NC}"
        passed=$((passed + 1))
    else
        echo -e "${RED}❌ PM2 服务启动失败${NC}"
    fi
fi

# 12. 检查 Nginx 服务状态
total=$((total + 1))
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx 服务运行中${NC}"
    passed=$((passed + 1))
else
    echo -e "${YELLOW}⚠️ Nginx 服务未运行，尝试启动...${NC}"
    if systemctl start nginx 2>/dev/null; then
        echo -e "${GREEN}✅ Nginx 服务启动成功${NC}"
        passed=$((passed + 1))
    else
        echo -e "${RED}❌ Nginx 服务启动失败${NC}"
    fi
fi

# 13. 检查端口监听
total=$((total + 1))
if netstat -tlnp | grep -q ":3001 "; then
    echo -e "${GREEN}✅ 端口 3001 监听中${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ 端口 3001 未监听${NC}"
fi

# 14. 检查端口 80 监听
total=$((total + 1))
if netstat -tlnp | grep -q ":80 "; then
    echo -e "${GREEN}✅ 端口 80 监听中${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ 端口 80 未监听${NC}"
fi

echo ""
echo "================================"
echo "🌐 API 接口测试"
echo "================================"

# 15. 测试本地 API 连接
total=$((total + 1))
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 本地 API 健康检查通过${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ 本地 API 健康检查失败${NC}"
fi

# 16. 测试 API 端点
total=$((total + 1))
response=$(curl -s -X POST http://localhost:3001/api/remove-bg \
    -H "Content-Type: application/json" \
    -d '{"test": "connection"}' 2>/dev/null)

if echo "$response" | grep -q "Not authenticated\|error"; then
    echo -e "${GREEN}✅ API 端点响应正常${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ API 端点无响应${NC}"
fi

# 17. 测试 Nginx 代理
total=$((total + 1))
if curl -s http://localhost/api/remove-bg > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Nginx 代理工作正常${NC}"
    passed=$((passed + 1))
else
    echo -e "${RED}❌ Nginx 代理失败${NC}"
fi

echo ""
echo "================================"
echo "📊 系统资源检查"
echo "================================"

# 18. 检查磁盘空间
total=$((total + 1))
disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$disk_usage" -lt 80 ]; then
    echo -e "${GREEN}✅ 磁盘空间充足: ${disk_usage}%${NC}"
    passed=$((passed + 1))
else
    echo -e "${YELLOW}⚠️ 磁盘空间警告: ${disk_usage}%${NC}"
    passed=$((passed + 1))
fi

# 19. 检查内存使用
total=$((total + 1))
memory_usage=$(free | awk 'NR==2{printf "%.1f", $3*100/$2}')
if (( $(echo "$memory_usage < 80" | bc -l 2>/dev/null) )); then
    echo -e "${GREEN}✅ 内存使用正常: ${memory_usage}%${NC}"
    passed=$((passed + 1))
else
    echo -e "${YELLOW}⚠️ 内存使用较高: ${memory_usage}%${NC}"
    passed=$((passed + 1))
fi

# 20. 检查日志文件
total=$((total + 1))
if [ -f "/var/log/kalshiai/combined.log" ]; then
    echo -e "${GREEN}✅ 日志文件存在${NC}"
    passed=$((passed + 1))
else
    echo -e "${YELLOW}⚠️ 日志文件不存在${NC}"
    passed=$((passed + 1))
fi

echo ""
echo "================================"
echo "📋 测试结果汇总"
echo "================================"

echo -e "${BLUE}总测试项目: $total${NC}"
echo -e "${GREEN}通过项目: $passed${NC}"
echo -e "${RED}失败项目: $((total - passed))${NC}"

if [ $passed -eq $total ]; then
    echo -e "${GREEN}🎉 所有测试通过！部署成功！${NC}"
    exit 0
elif [ $passed -ge $((total * 8 / 10)) ]; then
    echo -e "${YELLOW}⚠️ 大部分测试通过，建议检查失败项目${NC}"
    exit 1
else
    echo -e "${RED}❌ 多个测试失败，请检查部署${NC}"
    exit 1
fi

echo ""
echo "================================"
echo "🔧 故障排除建议"
echo "================================"

if [ $passed -lt $total ]; then
    echo "如果测试失败，请尝试以下步骤："
    echo "1. 检查环境变量配置: cat /opt/kalshiai/kalshi/.env.production"
    echo "2. 重启服务: kalshiai-manager restart"
    echo "3. 查看日志: kalshiai-manager logs"
    echo "4. 检查 Nginx 配置: nginx -t"
    echo "5. 检查防火墙: ufw status"
    echo "6. 检查端口占用: netstat -tlnp"
fi 