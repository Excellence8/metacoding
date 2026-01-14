# deploy-final.ps1 - MetaCoding 最终部署脚本
Write-Host "MetaCoding 一键部署" -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta

# 配置
$user = "Excellence8"
$repo = "metacoding"
$url = "https://$user.github.io/$repo"

# 1. 确保dist目录存在
if (-not (Test-Path "dist")) {
    Write-Host "❌ 错误：dist目录不存在" -ForegroundColor Red
    Write-Host "请先运行构建命令: npm run build" -ForegroundColor Yellow
    exit 1
}

# 2. 确保有index.html
if (-not (Test-Path "dist\index.html")) {
    Write-Host "❌ 错误：dist/index.html不存在" -ForegroundColor Red
    exit 1
}

# 3. 部署到GitHub Pages
Write-Host "🚀 部署到: $url" -ForegroundColor Green

cd dist

# 初始化Git
git init
git checkout -b gh-pages
git add -A
git commit -m "部署MetaCoding - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# 推送到GitHub
git remote add origin "https://github.com/$user/$repo.git"
git push -f origin gh-pages

cd..

Write-Host "`n✅ 部署完成！" -ForegroundColor Green
Write-Host "🌐 访问: $url" -ForegroundColor Cyan
Write-Host "⏳ 等待1-5分钟生效" -ForegroundColor Yellow

Write-Host "`n📝 最后一步：" -ForegroundColor Yellow
Write-Host "1. 访问: https://github.com/$user/$repo/settings/pages" -ForegroundColor White
Write-Host "2. 确保选择了 gh-pages 分支" -ForegroundColor White
Write-Host "3. 点击保存" -ForegroundColor White
Write-Host "4. 等待几分钟后访问你的网站" -ForegroundColor White

# 打开链接
Start-Process "https://github.com/$user/$repo/settings/pages"
Start-Process $url

Read-Host "`n按回车键退出"
