# deploy-verify.ps1 - 部署验证脚本
param(
    [string]$GitHubUser = "Excellence8",
    [string]$RepoName = "metacoding"
)

$siteUrl = "https://$GitHubUser.github.io/$RepoName"
$repoUrl = "https://github.com/$GitHubUser/$RepoName"

Write-Host "MetaCoding 部署验证" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "验证时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White

Write-Host "`n1. 🌐 网站可访问性检查..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $siteUrl -Method Head -TimeoutSec 10
    Write-Host "  状态码: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  内容类型: $($response.Headers['Content-Type'])" -ForegroundColor White
    
    if ($response.StatusCode -eq 200) {
        Write-Host "  ✅ 网站可正常访问" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ 网站访问失败: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n2. 📁 GitHub仓库检查..." -ForegroundColor Yellow
try {
    $repoResponse = Invoke-WebRequest -Uri $repoUrl -Method Head -TimeoutSec 10
    if ($repoResponse.StatusCode -eq 200) {
        Write-Host "  ✅ GitHub仓库可访问" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ GitHub仓库访问失败" -ForegroundColor Red
}

Write-Host "`n3. 🌿 GitHub Pages 分支检查..." -ForegroundColor Yellow
$pagesUrl = "$repoUrl/tree/gh-pages"
try {
    $pagesResponse = Invoke-WebRequest -Uri $pagesUrl -Method Head -TimeoutSec 10
    if ($pagesResponse.StatusCode -eq 200) {
        Write-Host "  ✅ gh-pages 分支存在" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ gh-pages 分支可能不存在" -ForegroundColor Red
}

Write-Host "`n4. ⚙️ GitHub Pages 设置检查..." -ForegroundColor Yellow
$settingsUrl = "$repoUrl/settings/pages"
Write-Host "  设置页面: $settingsUrl" -ForegroundColor White
Write-Host "  请手动检查：" -ForegroundColor Yellow
Write-Host "  • 分支是否为 gh-pages" -ForegroundColor White
Write-Host "  • 文件夹是否为 / (根目录)" -ForegroundColor White
Write-Host "  • 是否显示已发布" -ForegroundColor White

Write-Host "`n5. 🔍 内容验证..." -ForegroundColor Yellow
try {
    $content = Invoke-WebRequest -Uri $siteUrl -TimeoutSec 10
    if ($content.Content -match "MetaCoding") {
        Write-Host "  ✅ 页面包含 MetaCoding 内容" -ForegroundColor Green
    }
    if ($content.Content -match "React") {
        Write-Host "  ✅ 页面包含 React 相关代码" -ForegroundColor Green
    }
} catch {
    Write-Host "  ❌ 无法获取页面内容" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "验证结果总结：" -ForegroundColor Cyan

Write-Host "`n🔗 相关链接：" -ForegroundColor White
Write-Host "• 网站: $siteUrl" -ForegroundColor Green
Write-Host "• GitHub仓库: $repoUrl" -ForegroundColor Green
Write-Host "• Pages设置: $settingsUrl" -ForegroundColor Green

Write-Host "`n📝 建议操作：" -ForegroundColor Yellow
Write-Host "1. 如果网站不可访问，请等待5-10分钟" -ForegroundColor White
Write-Host "2. 检查GitHub Pages设置" -ForegroundColor White
Write-Host "3. 验证dist目录内容" -ForegroundColor White
Write-Host "4. 重新运行部署脚本" -ForegroundColor White

Write-Host "`n运行部署脚本: .\deploy-final.ps1" -ForegroundColor Cyan

Start-Process $siteUrl
Start-Process $settingsUrl

Read-Host "`n按回车键退出"
