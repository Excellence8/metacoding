Write-Host "🚀 运行最小化测试..." -ForegroundColor Cyan

# 备份当前文件
if (Test-Path "src/main.tsx") {
    $backupName = "src/main-backup-$(Get-Date -Format 'HHmmss').tsx"
    Copy-Item "src/main.tsx" $backupName -Force
    Write-Host "✅ 已备份: $backupName" -ForegroundColor Green
}

# 切换到最小化版本
Copy-Item "src/main-minimal.tsx" "src/main.tsx" -Force
Write-Host "✅ 切换到最小化版本" -ForegroundColor Green

# 重启服务器
Write-Host "重启服务器..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | 
    Where-Object { $_.CommandLine -like "*vite*" } | 
    Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

Write-Host "启动服务器..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command cd \"D:\metacoding-new\"; npm run dev" -PassThru

Start-Sleep -Seconds 5

Write-Host "`n🎯 现在测试：" -ForegroundColor Cyan
Write-Host "访问: http://localhost:5173/generator" -ForegroundColor White
Write-Host "应该能看到绿色大标题的 Generator 页面" -ForegroundColor White
Write-Host "`n如果这个能显示，说明问题在您的组件中" -ForegroundColor Yellow
Write-Host "如果不能显示，请检查控制台错误" -ForegroundColor Red
