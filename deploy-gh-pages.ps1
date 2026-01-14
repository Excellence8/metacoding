# GitHub Pages 部署脚本

Write-Host "🚀 开始部署到 GitHub Pages..." -ForegroundColor Cyan

# 1. 构建项目
Write-Host "🔨 构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}

# 2. 进入构建目录
Set-Location dist

# 3. 初始化Git
Write-Host "📦 准备部署文件..." -ForegroundColor Yellow
git init
git add -A
git commit -m "部署到 GitHub Pages - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# 4. 推送到 gh-pages 分支
Write-Host "🚀 推送到 GitHub..." -ForegroundColor Green
git push -f https://github.com/Excellence8/metacoding.git master:gh-pages

# 5. 返回原目录
Set-Location ..

Write-Host "
🎉 部署成功！" -ForegroundColor Green
Write-Host "🌐 访问地址：https://Excellence8.github.io/metacoding/" -ForegroundColor Cyan
Write-Host "
💡 重要提示：" -ForegroundColor Yellow
Write-Host "1. 确保仓库设置中启用 Pages" -ForegroundColor White
Write-Host "2. 选择 gh-pages 分支作为源" -ForegroundColor White
Write-Host "3. 等待几分钟生效" -ForegroundColor White

# 6. 清理（可选）
Remove-Item -Path "dist/.git" -Recurse -Force -ErrorAction SilentlyContinue
