Write-Host "==== 1. 检查 pages/api 下 bodyParser 配置 ====" -ForegroundColor Cyan
$apiFiles = Get-ChildItem -Path ./pages/api -Recurse -Include *.js,*.ts -ErrorAction SilentlyContinue
if ($apiFiles) {
    foreach ($file in $apiFiles) {
        $content = Get-Content $file.FullName -Raw
        if ($content -match 'bodyParser\s*:\s*false') {
            Write-Host "[OK] $($file.FullName) 已禁用 bodyParser" -ForegroundColor Green
        } else {
            Write-Host "[WARN] $($file.FullName) 未禁用 bodyParser,可能受1MB限制" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "[INFO] 未找到 ./pages/api 下的 API 文件" -ForegroundColor Yellow
}

Write-Host "`n==== 2. 检查 next.config.js 配置 ====" -ForegroundColor Cyan
if (Test-Path ./next.config.js) {
    $config = Get-Content ./next.config.js -Raw
    if ($config -match 'bodyParser|api|serverRuntimeConfig') {
        Write-Host "[WARN] next.config.js 可能有影响API的配置,请检查:" -ForegroundColor Yellow
        Write-Host $config
    } else {
        Write-Host "[OK] next.config.js 无特殊API相关配置" -ForegroundColor Green
    }
} else {
    Write-Host "[OK] 没有 next.config.js 文件" -ForegroundColor Green
}

Write-Host "`n==== 3. 检查 Node 版本和依赖完整性 ====" -ForegroundColor Cyan
$nodeVer = node -v
Write-Host "Node 版本: $nodeVer"
Write-Host "依赖完整性检查 (npm ci --dry-run):"
npm ci --dry-run

Write-Host "`n==== 4. 检查是否存在 app 目录或中间件 ====" -ForegroundColor Cyan
if (Test-Path ./app) {
    Write-Host "[WARN] 存在 app 目录，可能影响 API 路由行为" -ForegroundColor Yellow
} else {
    Write-Host "[OK] 没有 app 目录" -ForegroundColor Green
}
$middleware = Get-ChildItem -Path . -Recurse -Include middleware.js,middleware.ts -ErrorAction SilentlyContinue
if ($middleware) {
    foreach ($mw in $middleware) {
        Write-Host "[WARN] 存在中间件: $($mw.FullName)" -ForegroundColor Yellow
    }
} else {
    Write-Host "[OK] 没有中间件文件" -ForegroundColor Green
}

Write-Host "`n==== 5. 自动生成 2MB 测试文件并用 curl 测试上传 ====" -ForegroundColor Cyan
$testFile = "bigfile.jpg"
if (-Not (Test-Path $testFile)) {
    fsutil file createnew $testFile 2097152 | Out-Null
    Write-Host "已生成 2MB 测试文件 $testFile" -ForegroundColor Green
} else {
    Write-Host "$testFile 已存在，跳过生成" -ForegroundColor Green
}

$apiUrl = "http://localhost:3000/api/test-upload"
Write-Host "用 curl 测试上传... (请确保本地 dev 服务已启动)" -ForegroundColor Cyan
$curlPath = (Get-Command curl.exe).Source
$curlResult = & $curlPath -X POST $apiUrl -F "file=@$testFile" 2>&1
Write-Host "curl 返回：" -ForegroundColor Cyan
Write-Host $curlResult

Write-Host "`n==== 6. 检查完成，建议如下 ====" -ForegroundColor Cyan
Write-Host "- 若 bodyParser 均已禁用且依然受限，建议升级 Node.js、清理依赖、尝试 WSL 或其它环境。" -ForegroundColor Yellow
Write-Host "- 若 curl 返回 413/1MB 错误，说明依然有 body 限制，重点排查 API 路由配置和环境。" -ForegroundColor Yellow
Write-Host "- 若一切正常，说明已突破 1MB 限制。" -ForegroundColor Green