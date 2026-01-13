# Metacoding Studio 一键启动脚本
Write-Host "🚀 启动 Metacoding Studio" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor White

# 函数：检查端口
function Test-Port($port) {
    try {
        $test = Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
        return $test
    } catch {
        return $false
    }
}

# 函数：停止现有服务器
function Stop-ViteServers {
    Write-Host "检查现有Vite进程..." -ForegroundColor Yellow
    $processes = Get-Process -Name "node" -ErrorAction SilentlyContinue | 
        Where-Object { $_.CommandLine -like "*vite*" }
    
    if ($processes.Count -gt 0) {
        Write-Host "停止 $($processes.Count) 个现有进程..." -ForegroundColor Yellow
        $processes | Stop-Process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}

# 主程序
try {
    # 1. 停止现有服务器
    Stop-ViteServers
    
    # 2. 检查依赖
    Write-Host "`n检查项目依赖..." -ForegroundColor Cyan
    if (-not (Test-Path "node_modules")) {
        Write-Host "❌ node_modules 不存在" -ForegroundColor Red
        Write-Host "  请运行: npm install" -ForegroundColor White
        exit 1
    }
    
    if (-not (Test-Path "package.json")) {
        Write-Host "❌ package.json 不存在" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ 项目依赖正常" -ForegroundColor Green
    
    # 3. 启动服务器
    Write-Host "`n启动开发服务器..." -ForegroundColor Green
    
    # 在新窗口中启动
    $startCommand = @"
cd "$(Get-Location)"
npm run dev
"@
    
    $tempScript = Join-Path $env:TEMP "start-vite.ps1"
    $startCommand | Out-File $tempScript -Encoding UTF8
    
    Start-Process powershell -ArgumentList "-NoExit -ExecutionPolicy Bypass -File `"$tempScript`"" -WindowStyle Normal
    
    Write-Host "等待服务器启动..." -ForegroundColor Yellow
    
    # 等待并检测端口
    $maxWait = 30
    $waitTime = 0
    $serverPort = $null
    
    while ($waitTime -lt $maxWait) {
        foreach ($port in @(5174, 5173, 5175, 3000, 3001)) {
            if (Test-Port $port) {
                $serverPort = $port
                break
            }
        }
        
        if ($serverPort) {
            break
        }
        
        Write-Host "." -NoNewline -ForegroundColor Gray
        Start-Sleep -Seconds 1
        $waitTime++
    }
    
    Write-Host ""
    
    if ($serverPort) {
        Write-Host "`n🎉 服务器启动成功！" -ForegroundColor Green
        Write-Host "访问地址: http://localhost:$serverPort/" -ForegroundColor White
        Write-Host "Generator: http://localhost:$serverPort/generator" -ForegroundColor White
        
        # 自动打开浏览器
        $openBrowser = Read-Host "是否自动打开浏览器？ (y/n)"
        if ($openBrowser -eq 'y') {
            Start-Process "http://localhost:$serverPort/"
        }
    } else {
        Write-Host "`n⚠️  未检测到服务器启动" -ForegroundColor Yellow
        Write-Host "请查看新打开的PowerShell窗口中的错误信息" -ForegroundColor White
        Write-Host "或手动运行: npm run dev" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "❌ 启动失败: $_" -ForegroundColor Red
    Write-Host "请手动运行: npm run dev" -ForegroundColor White
}
