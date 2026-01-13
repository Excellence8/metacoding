# Metacoding Studio 最终启动脚本
Write-Host "🚀 Metacoding Studio 最终启动" -ForegroundColor Magenta
Write-Host "=============================" -ForegroundColor Magenta

# 1. 修复模板
Write-Host "1. 修复组件模板..." -ForegroundColor Cyan
.\fix-templates.ps1

# 2. 检查依赖
Write-Host "`n2. 检查项目依赖..." -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    Write-Host "  安装依赖..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "  依赖已就绪" -ForegroundColor Green
}

# 3. 启动服务器
Write-Host "`n3. 启动开发服务器..." -ForegroundColor Green
Write-Host "  访问: http://localhost:5173" -ForegroundColor Cyan
Write-Host "  按 Ctrl+C 停止" -ForegroundColor Yellow
Write-Host ""

try {
    # 清除可能的缓存
    Write-Host "  清除缓存..." -ForegroundColor White
    Remove-Item -Path "node_modules\.vite" -Recurse -Force -ErrorAction SilentlyContinue
    
    # 启动
    npm run dev
} catch {
    Write-Host "❌ 启动失败" -ForegroundColor Red
    Write-Host "请检查:" -ForegroundColor Yellow
    Write-Host "1. 运行 .\fix-templates.ps1 修复代码" -ForegroundColor White
    Write-Host "2. 检查文件语法" -ForegroundColor White
    Write-Host "3. 确保端口 5173 未被占用" -ForegroundColor White
}
