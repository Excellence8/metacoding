# Metacoding Studio 快速验证
Write-Host "🔍 快速验证 Metacoding Studio 状态" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor White

# 1. 检查服务器
Write-Host "`n1. 服务器状态:" -ForegroundColor Yellow
$serverPort = $null
$ports = @(5174, 5173, 5175, 3000, 3001)

foreach ($port in $ports) {
    try {
        $test = Test-NetConnection localhost -Port $port -InformationLevel Quiet -WarningAction SilentlyContinue
        if ($test) {
            $serverPort = $port
            Write-Host "  ✅ 运行在端口: $port" -ForegroundColor Green
            break
        }
    } catch {}
}

if (-not $serverPort) {
    Write-Host "  ❌ 服务器未运行" -ForegroundColor Red
    Write-Host "    请运行: npm run dev 或 .\start-metacoding.ps1" -ForegroundColor White
    exit 1
}

# 2. 测试关键页面
Write-Host "`n2. 页面访问测试:" -ForegroundColor Yellow

function Test-Page($name, $path) {
    Write-Host "  测试 $name... " -NoNewline -ForegroundColor White
    try {
        $url = "http://localhost:$serverPort$path"
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 3 -ErrorAction Stop
        Write-Host "✅ HTTP $($response.StatusCode)" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ 无法访问" -ForegroundColor Red
        return $false
    }
}

$pages = @(
    @{Name="首页"; Path="/"},
    @{Name="Generator"; Path="/generator"}
)

$allPassed = $true
foreach ($page in $pages) {
    if (-not (Test-Page $page.Name $page.Path)) {
        $allPassed = $false
    }
}

# 3. 项目文件检查
Write-Host "`n3. 项目文件检查:" -ForegroundColor Yellow
$essentialFiles = @(
    "src/App.tsx",
    "src/main.tsx", 
    "index.html",
    "vite.config.ts",
    "package.json"
)

foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "  ✅ $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file 缺失" -ForegroundColor Red
        $allPassed = $false
    }
}

# 4. 最终结果
Write-Host "`n" + "="*50 -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "🎉 所有检查通过！" -ForegroundColor Green
    Write-Host "Metacoding Studio 完全正常！" -ForegroundColor White
    
    Write-Host "`n🔗 访问链接：" -ForegroundColor Yellow
    Write-Host "• 主应用: http://localhost:$serverPort/" -ForegroundColor White
    Write-Host "• Generator: http://localhost:$serverPort/generator" -ForegroundColor White
    
    Write-Host "`n🚀 下一步：" -ForegroundColor Magenta
    Write-Host "1. 测试您的代码生成功能: .\meta.ps1" -ForegroundColor White
    Write-Host "2. 开始开发新功能" -ForegroundColor White
} else {
    Write-Host "⚠️  部分检查未通过" -ForegroundColor Yellow
    Write-Host "请检查以上问题并修复" -ForegroundColor White
}
Write-Host "="*50 -ForegroundColor Cyan
