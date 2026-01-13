# 简单启动脚本
Write-Host "🚀 Metacoding Studio 简单启动" -ForegroundColor Magenta
Write-Host "=============================" -ForegroundColor Magenta

# 检查环境
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 错误：不在项目根目录" -ForegroundColor Red
    exit 1
}

# 检查依赖
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 安装依赖..." -ForegroundColor Yellow
    npm install
}

# 修复代码问题
Write-Host "🔧 检查代码问题..." -ForegroundColor Cyan
try {
    # 简单修复
    Get-ChildItem "src" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        if ($content -match '\\\}') {
            ($content -replace '\\\}', '}') | Out-File $_.FullName -Encoding UTF8 -Force
            Write-Host "修复: $($_.Name)" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "⚠️  代码修复时出错: $_" -ForegroundColor Yellow
}

# 启动项目
Write-Host "`n🚀 启动开发服务器..." -ForegroundColor Green
Write-Host "访问: http://localhost:5173" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 停止" -ForegroundColor Yellow
Write-Host ""

try {
    npm run dev
} catch {
    Write-Host "❌ 启动失败: $_" -ForegroundColor Red
    Write-Host "尝试:" -ForegroundColor Yellow
    Write-Host "1. 运行: npm install" -ForegroundColor White
    Write-Host "2. 运行: .\fix-code.ps1" -ForegroundColor White
    Write-Host "3. 再次运行此脚本" -ForegroundColor White
}
