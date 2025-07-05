# Windows R2 SSL 问题诊断和修复脚本
Write-Host "🔧 Windows R2 SSL 问题诊断工具" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# 1. 检查 Node.js 和 OpenSSL 版本
Write-Host "`n📋 系统信息检查:" -ForegroundColor Yellow
$nodeVersion = node --version
$npmVersion = npm --version
Write-Host "Node.js 版本: $nodeVersion" -ForegroundColor Green
Write-Host "npm 版本: $npmVersion" -ForegroundColor Green

# 2. 检查 OpenSSL 版本
Write-Host "`n🔍 OpenSSL 信息:" -ForegroundColor Yellow
node -e "console.log('OpenSSL 版本:', process.versions.openssl)"
node -e "console.log('平台:', process.platform)"
node -e "console.log('架构:', process.arch)"

# 3. 检查环境变量
Write-Host "`n🔑 环境变量检查:" -ForegroundColor Yellow
$envVars = @('R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET')
foreach ($var in $envVars) {
    if (Test-Path "env:${var}") {
        Write-Host "${var}: ✅ 已设置" -ForegroundColor Green
    } else {
        Write-Host "${var}: ❌ 未设置" -ForegroundColor Red
    }
}

# 4. 检查 .env.local 文件
Write-Host "`n📁 .env.local 文件检查:" -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host ".env.local: ✅ 存在" -ForegroundColor Green
    $envContent = Get-Content ".env.local" -Raw
    if ($envContent -match "R2_") {
        Write-Host "包含 R2 配置: ✅" -ForegroundColor Green
    } else {
        Write-Host "包含 R2 配置: ❌" -ForegroundColor Red
    }
} else {
    Write-Host ".env.local: ❌ 不存在" -ForegroundColor Red
}

# 5. 网络连接测试
Write-Host "`n🌐 网络连接测试:" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://www.cloudflare.com" -TimeoutSec 10
    Write-Host "Cloudflare 连接: ✅ 正常" -ForegroundColor Green
} catch {
    Write-Host "Cloudflare 连接: ❌ 失败" -ForegroundColor Red
}

# 6. SSL/TLS 配置检查
Write-Host "`n🔒 SSL/TLS 配置检查:" -ForegroundColor Yellow
node -e "const tls = require('tls'); console.log('支持的 TLS 版本:'); console.log('- TLSv1.2:', tls.DEFAULT_MIN_VERSION); console.log('- TLSv1.3:', tls.DEFAULT_MAX_VERSION); console.log('默认加密套件:'); console.log(tls.getCiphers().slice(0, 10).join(', '));"

# 7. 运行修复后的测试
Write-Host "`n🧪 运行修复后的 R2 测试:" -ForegroundColor Yellow
if (Test-Path "test-r2-fixed.js") {
    Write-Host "运行 test-r2-fixed.js..." -ForegroundColor Cyan
    node test-r2-fixed.js
} else {
    Write-Host "test-r2-fixed.js 不存在，跳过测试" -ForegroundColor Yellow
}

# 8. 提供解决方案建议
Write-Host "`n💡 解决方案建议:" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

Write-Host "1. 如果 SSL 握手失败，尝试以下方法:" -ForegroundColor Yellow
Write-Host "   - 使用 test-r2-fixed.js (禁用 SSL 验证，仅测试用)" -ForegroundColor White
Write-Host "   - 使用 r2-client-safe.js (生产环境推荐)" -ForegroundColor White
Write-Host "   - 更新 Node.js 到最新 LTS 版本" -ForegroundColor White

Write-Host "`n2. Windows 特定解决方案:" -ForegroundColor Yellow
Write-Host "   - 检查 Windows 防火墙设置" -ForegroundColor White
Write-Host "   - 更新 Windows 系统" -ForegroundColor White
Write-Host "   - 尝试使用 WSL2 环境" -ForegroundColor White
Write-Host "   - 检查代理设置" -ForegroundColor White

Write-Host "`n3. 环境变量配置示例:" -ForegroundColor Yellow
Write-Host "   R2_ACCOUNT_ID=your_account_id" -ForegroundColor White
Write-Host "   R2_ACCESS_KEY_ID=your_access_key" -ForegroundColor White
Write-Host "   R2_SECRET_ACCESS_KEY=your_secret_key" -ForegroundColor White
Write-Host "   R2_BUCKET=your_bucket_name" -ForegroundColor White

Write-Host "`n4. 如果问题持续存在:" -ForegroundColor Yellow
Write-Host "   - 尝试使用其他存储服务 (如 Supabase Storage)" -ForegroundColor White
Write-Host "   - 使用 CDN 代理 R2 请求" -ForegroundColor White
Write-Host "   - 联系 Cloudflare 支持" -ForegroundColor White

Write-Host "`n✅ 诊断完成！" -ForegroundColor Green 