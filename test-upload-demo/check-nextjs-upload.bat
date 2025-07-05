@echo off
echo ==== 1. 检查 pages\api 下 bodyParser 配置 ====
findstr /s /i "bodyParser: false" pages\api\*.js pages\api\*.ts
if %errorlevel%==0 (
    echo [OK] 存在 bodyParser: false 配置
) else (
    echo [WARN] 未检测到 bodyParser: false，可能受1MB限制
)

echo.
echo ==== 2. 检查 next.config.js 配置 ====
findstr /i "bodyParser api serverRuntimeConfig" next.config.js
if %errorlevel%==0 (
    echo [WARN] next.config.js 可能有影响API的配置,请检查
) else (
    echo [OK] next.config.js 无特殊API相关配置
)

echo.
echo ==== 3. 检查 Node 版本和依赖完整性 ====
node -v
npm ci --dry-run

echo.
echo ==== 4. 检查是否存在 app 目录或中间件 ====
if exist app (
    echo [WARN] 存在 app 目录，可能影响 API 路由行为
) else (
    echo [OK] 没有 app 目录
)
dir /s /b middleware.js middleware.ts

echo.
echo ==== 5. 自动生成 2MB 测试文件并用 curl 测试上传 ====
if not exist bigfile.jpg (
    fsutil file createnew bigfile.jpg 2097152
    echo 已生成 2MB 测试文件 bigfile.jpg
) else (
    echo bigfile.jpg 已存在，跳过生成
)
echo 用 curl 测试上传... (请确保本地 dev 服务已启动)
curl.exe -X POST http://localhost:3000/api/test-upload -F "file=@bigfile.jpg"

echo.
echo ==== 6. 检查完成，建议如下 ====
echo - 若 bodyParser 均已禁用且依然受限，建议升级 Node.js、清理依赖、尝试 WSL 或其它环境。
echo - 若 curl 返回 413/1MB 错误，说明依然有 body 限制，重点排查 API 路由配置和环境。
echo - 若一切正常，说明已突破 1MB 限制。
pause