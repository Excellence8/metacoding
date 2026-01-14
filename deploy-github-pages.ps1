# MetaCoding GitHub Pages 部署脚本

Write-Host "🚀 开始部署到 GitHub Pages..." -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# 1. 检查Git配置
Write-Host "`n🔍 检查Git配置..." -ForegroundColor Yellow

$gitUser = git config user.name
$gitEmail = git config user.email

if (-not $gitUser -or -not $gitEmail) {
    Write-Host "⚠️  Git用户信息未设置" -ForegroundColor Yellow
    $gitUser = Read-Host "请输入Git用户名"
    $gitEmail = Read-Host "请输入Git邮箱"
    
    git config --global user.name $gitUser
    git config --global user.email $gitEmail
    Write-Host "✅ 已设置Git用户信息" -ForegroundColor Green
}

# 2. 检查GitHub仓库
Write-Host "`n📦 检查GitHub仓库..." -ForegroundColor Yellow
$remoteUrl = git remote get-url origin 2>$null

if (-not $remoteUrl) {
    Write-Host "❌ 未找到GitHub远程仓库" -ForegroundColor Red
    Write-Host "请先执行以下命令：" -ForegroundColor Yellow
    Write-Host "1. 在GitHub创建仓库：https://github.com/new" -ForegroundColor White
    Write-Host "2. 运行：git remote add origin https://github.com/你的用    Write-Host "3. 运行：git push -u origin main" -ForegroundColor White
    exit 1
}

Write-Host "✅ 远程仓库: $remoteUrl" -ForegroundColor Green

# 3. 构建项目
Write-Host "`n🔨 构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}

Write-Host "✅ 构建成功" -ForegroundColor Green

# 4. 创建404页面（解决SPA路由问题）
Write-Host "`n📄 创建404页面..." -ForegroundColor Yellow
@"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MetaCoding</title>
    <script>
        // 单页应用路由重定向
        const segmentCount = 0;
        const location = window.location;
        
        /        sessionStorage.redirect = location.pathname + location.search;
        
        // 重定向到首页
        location.href = location.protocol + '//' + location.host + '/?' + (new Date()).getTime();
    </script>
</head>
<body>
    <noscript>
        <h1>MetaCoding - 智能代码生成平台</h1>
        <p>正在重定向到首页...</p>
        <p>如果页面没有自动跳转，请 <a href="/">点击这里</a></p>
    </noscript>
</body>
</html>
"@ | Out-File "dist/404.html" -Encoding UTF8

Write-Host "✅ 已创建404.html" -ForegroundColor Green

# 5. 部署到gh-pages分支
Write-Host "`n🚀 部署到GitHub Pages..." -ForegroundColor Green
Set-Location dist

# 初始化Git仓库
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# 推送到GitHub
Write-Host "📤 推送到GitHub..." -ForegroundColor Yellow
git push -f $remoteUrl gh-pages

# 6. 返回原目录并清理
Set-Location ..
Remove-Item -Path "dist/.git" -Recurse -Force -ErrorAction SilentlyContinue

# 7. 显示部署结果
Write-Host "
🎉 部署Write-Host "=================================" -ForegroundColor Cyan

$repoName = $remoteUrl -replace '.*github\.com[:/](.+?)(\.git)?$', '$1'
$username = $repoName.Split('/')[0]
$project = $repoName.Split('/')[1]

Write-Host "🌐 访问地址：" -ForegroundColor Yellow
Write-Host "https://$username.github.io/$project/" -ForegroundColor Cyan

Write-Host "`n🔧 需要在GitHub中启用Pages：" -ForegroundColor Yellow
Write-Host "1. 访问: https://github.com/$repoName/settings/pages" -ForegroundColor White
Write-Host "2. 分支选择: gh-pages" -ForegroundColor White
Write-Host "3. 文件夹选择: / (根目录)" -ForegroundColor White
Write-Host "4. 点击 Save" -ForegroundColor White

Write-Host "`n⏳ 部署生效时间：" -ForegroundColor Yellow
Write-Host "首次部署: 5-10分钟" -ForegroundColor White
Write-Host "后续更新: 1-3分钟" -ForegroundColor White

Write-Host "`n📋 验证部署：" -ForegroundColor Cyan
Write-Host "curl -I https://$username.github.io/$project/" -ForegroundColor Gray

Write-Host "`n✅ 所有步骤完成！" -ForegroundColor Green
