# Metacoding Studio 快捷启动脚本
# 使用: .\start.ps1 或双击此文件

Write-Host "🚀 启动 Metacoding Studio v2.0..." -ForegroundColor Magenta
Write-Host "==================================" -ForegroundColor Magenta

# 显示项目信息
$projectName = Split-Path $PWD -Leaf
Write-Host "项目: $projectName" -ForegroundColor Cyan
Write-Host "时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White

# 检查环境
Write-Host "`n🔍 检查环境..." -ForegroundColor Yellow

# 检查 Node.js
try {
    $nodeVersion = node --version
    Write-Host "  Node.js: $nodeVersion ✅" -ForegroundColor Green
} catch {
    Write-Host "  Node.js: 未安装 ❌" -ForegroundColor Red
    Write-Host "  请先安装 Node.js: https://nodejs.org/" -ForegroundColor Yellow
    pause
    exit 1
}

# 检查 npm
try {
    $npmVersion = npm --version
    Write-Host "  npm: $npmVersion ✅" -ForegroundColor Green
} catch {
    Write-Host "  npm: 未安装 ❌" -ForegroundColor Red
    pause
    exit 1
}

# 检查依赖
if (Test-Path "node_modules") {
    Write-Host "  依赖: 已安装 ✅" -ForegroundColor Green
} else {
    Write-Host "  依赖: 未安装 ⚠️" -ForegroundColor Yellow
    Write-Host "  正在安装依赖..." -ForegroundColor White
    npm install
}

# 启动选项
Write-Host "`n🎯 启动选项:" -ForegroundColor Cyan
Write-Host "  1. 启动开发服务器" -ForegroundColor White
Write-Host "  2. 查看项目文档" -ForegroundColor White
Write-Host "  3. 查看项目状态" -ForegroundColor White
Write-Host "  4. 运行系统测试" -ForegroundColor White
Write-Host "  5. 退出" -ForegroundColor White

$choice = Read-Host "`n请选择 (1-5)"

switch ($choice) {
    "1" {
        Write-Host "`n🚀 启动开发服务器..." -ForegroundColor Green
        .\launch.ps1 start
    }
    "2" {
        Write-Host "`n📚 打开项目文档..." -ForegroundColor Cyan
        .\launch.ps1 docs
        Write-Host "`n按任意键返回..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        .\start.ps1
    }
    "3" {
        Write-Host "`n📊 查看项目状态..." -ForegroundColor Cyan
        .\launch.ps1 status
        Write-Host "`n按任意键返回..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        .\start.ps1
    }
    "4" {
        Write-Host "`n🧪 运行系统测试..." -ForegroundColor Yellow
        .\final-test.ps1
        Write-Host "`n按任意键返回..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        .\start.ps1
    }
    "5" {
        Write-Host "`n👋 再见！" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "❌ 无效选择" -ForegroundColor Red
        Write-Host "`n按任意键重新选择..." -ForegroundColor Gray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        .\start.ps1
    }
}
