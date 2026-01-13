Write-Host "🚀 测试绝对简单版本..." -ForegroundColor Cyan

# 停止所有服务器
Write-Host "停止所有服务器进程..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | 
    Where-Object { $_.CommandLine -like "*vite*" } | 
    Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

# 检查端口占用
Write-Host "检查端口..." -ForegroundColor White
$ports = @(5173, 5174, 5175, 3000, 3001)
foreach ($port in $ports) {
    $portInUse = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($portInUse) {
        Write-Host "  端口 $port 被占用" -ForegroundColor Yellow
    }
}

# 启动服务器
Write-Host "`n启动开发服务器..." -ForegroundColor Green
$serverProcess = Start-Process powershell -ArgumentList `
    "-NoExit -Command cd 'D:\metacoding-new'; npm run dev" -PassThru

Write-Host "等待服务器启动 (10秒)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "`n🎯 请立即测试：" -ForegroundColor Red
Write-Host "1. 访问: http://localhost:5174/generator" -ForegroundColor White
Write-Host "   (如果5174不行，试试5175或其他端口)" -ForegroundColor Gray
Write-Host "2. 按 F12 查看控制台" -ForegroundColor White
Write-Host "3. 应该能看到黄色背景、红色大字的页面" -ForegroundColor White

Write-Host "`n📋 如果还是空白，请告诉我：" -ForegroundColor Cyan
Write-Host "• 控制台的完整错误信息" -ForegroundColor White
Write-Host "• Network 选项卡的请求状态" -ForegroundColor White
Write-Host "• Elements 选项卡中 #root 的内容" -ForegroundColor White
