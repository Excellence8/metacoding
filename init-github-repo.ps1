# GitHub仓库初始化脚本

Write-Host "🚀 初始化GitHub仓库..." -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

# 1. 初始化Git
Write-Host "`n🔧 初始化Git仓库..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Git仓库已初始化" -ForegroundColor Green
} else {
    Write-Host "✅ Git仓库已存在" -ForegroundColor Green
}

# 2. 检查并配置用户信息
Write-Host "`n👤 配置Git用户信息..." -ForegroundColor Yellow
$currentName = git config user.name
$currentEmail = git config user.email

if (-not $currentName) {
    $gitName = Read-Host "请输入您的Git用户名"
    git config user.name $gitName
    Write-Host "✅ 已设置用户名: $gitName" -ForegroundColor Green
}

if (-not $currentEmail) {
    $gitEmail = Read-Host "请输入您的Git邮箱"
    git config user.email $gitEmail
    Write-Host "✅ 已设置邮箱: $gitEmail" -ForegroundColor Green
}

# 3. 添加文件到Git
Write-Host "`n📦 添加文件到Git..." -ForegroundColor Yellow
git add .
git commit -m "初始提交: MetaCoding v1.0.0 - $(Get-Date -Format 'yyyy-MM-dd')"

# 4. 连接到GitHub
Write-Host "`n🌐 连接到GitHub..." -ForegroundColor Yellow
$githubUsername = Read-Host "请输入GitHub用户名"
$repoName = Read-Host "请输入仓库名称 (默认: metacoding)" 

if (-not $repoName) { $repoName = "metacoding" }

Write-Host "`n📋 仓库信息：" -ForegroundColor Cyan
Write-Host "用户名: $githubUsername" -ForegroundColor White
Write-Host "仓库名: $repoName" -ForegroundColor White
Write-Host "地址: https://github.com/$githubUsername/$repoName" -ForegroundColor White

$confirm = Read-Host "`n是否创建此仓库？(y/n)"
if ($confirm -eq 'y') {
    # 添加远程仓库
    git remote add origin https://github.com/$githubUsername/$repoName.git
    git branch -M main
    
    # 推送到GitHub
    Write-Host "`n📤 推送到GitHub..." -ForegroundColor Green
    git push -u origin main
    
    Write-Host "
🎉 GitHub仓库创建完成！" -ForegroundColor Green
    Write-Host "访问: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
    
    # 保存仓库信息
    @"
# MetaCoding GitHub仓库信息
用户名: $githubUsername
仓库名: $repoName
URL: https://github.com/$githubUsername/$repoName
Pages URL: https://$githubUsername.github.io/$repoName/
创建时间: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
"@ | Out-File "GITHUB_REPO_INFO.md" -Encoding UTF8
    
    Write-Host "✅ 已保存仓库信息: GITHUB_REPO_INFO.md" -ForegroundColor Green
} else {
    Write-Host "❌ 已取消创建" -ForegroundColor Red
}

Write-Host "`n📝 手动创建步骤：" -ForegroundColor Yellow
Write-Host "1. 访问: https://github.com/new" -ForegroundColor White
Write-Host "2. 仓库名称: $repoName" -ForegroundColor White
Write-Host "3. 描述: MetaCoding - 智能代码生成平台" -ForegroundColor White
Write-Host "4. 公开仓库" -ForegroundColor White
Write-Host "5. 不添加 README" -ForegroundColor White
Write-Host "6. 创建后运行以下命令：" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/$githubUsername/$repoName.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
