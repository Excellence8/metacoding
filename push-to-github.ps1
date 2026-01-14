Write-Host "🚀 推送更新到 GitHub..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. 检查Git配置
Write-Host "`n1. 检查Git配置..." -ForegroundColor Yellow
git config --list | Select-String "user" | ForEach-Object { Write-Host "  $_" -ForegroundColor White }

# 2. 检查当前状态
Write-Host "`n2. 检查Git状态..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "  有以下更改需要提交：" -ForegroundColor White
    $status | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
} else {
    Write-Host "  ✅ 工作区干净" -ForegroundColor Green
}

# 3. 添加文件
Write-Host "`n3. 添加文件到暂存区..." -ForegroundColor Yellow
git add .
Write-Host "  ✅ 已添加所有文件" -ForegroundColor Green

# 4. 提交更改
Write-Host "`n4. 提交更改..." -ForegroundColor Yellow
git commit -m "📝 更新README.md和其他文档

- 添加完整的README.md文件
- 更新项目文档
- 优化部署脚本
- 完善项目描述" --allow-empty-message

Write-Host "  ✅ 已提交更改" -ForegroundColor Green

# 5. 推送到GitHub
Write-Host "`n5. 推送到GitHub..." -ForegroundColor Yellow
Write-Host "  仓库: https://github.com/Excellence8/metacoding" -ForegroundColor White
Write-Host "  分支: main" -ForegroundColor White

$pushResult = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ 推送成功！" -ForegroundColor Green
} else {
    Write-Host "  ❌ 推送失败：" -ForegroundColor Red
    Write-Host "  $pushResult" -ForegroundColor Red
}

# 6. 检查结果
Write-Host "`n6. 验证推送结果..." -ForegroundColor Yellow
git log --oneline -3

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "🌐 访问你的仓库：" -ForegroundColor Cyan
Write-Host "https://github.com/Excellence8/metacoding" -ForegroundColor Magenta
Write-Host "`n刷新页面查看更新的README！" -ForegroundColor Green

# 7. 打开仓库页面
$openRepo = Read-Host "`n是否在浏览器中打开仓库页面？(y/n)"
if ($openRepo -eq 'y') {
    Start-Process "https://github.com/Excellence8/metacoding"
}
