# Metacoding Studio 诊断脚本
Write-Host "🔍 Metacoding Studio 诊断" -ForegroundColor Magenta
Write-Host "========================" -ForegroundColor Magenta

# 1. 检查关键文件
Write-Host "1. 检查关键文件..." -ForegroundColor Cyan
$requiredFiles = @(
    "package.json",
    "src\App.tsx",
    "src\main.tsx",
    "public\index.html",
    "index.html"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (缺失)" -ForegroundColor Red
    }
}

# 2. 检查 React 挂载点
Write-Host "`n2. 检查 React 挂载点..." -ForegroundColor Cyan
$htmlFiles = @("public\index.html", "index.html")
$hasRoot = $false

foreach ($htmlFile in $htmlFiles) {
    if (Test-Path $htmlFile) {
        $content = Get-Content $htmlFile -Raw
        if ($content -match 'id=["'']?root["'']?') {
            Write-Host "  ✅ $htmlFile 有 root 元素" -ForegroundColor Green
            $hasRoot = $true
        } else {
            Write-Host "  ❌ $htmlFile 没有 root 元素" -ForegroundColor Red
        }
    }
}

# 3. 检查 App.tsx 导出
Write-Host "`n3. 检查 App.tsx..." -ForegroundColor Cyan
if (Test-Path "src\App.tsx") {
    $appContent = Get-Content "src\App.tsx" -Raw
    if ($appContent -match 'export default') {
        Write-Host "  ✅ App.tsx 有默认导出" -ForegroundColor Green
    } else {
        Write-Host "  ❌ App.tsx 没有默认导出" -ForegroundColor Red
    }
    
    # 检查是否是有效的 React 组件
    if ($appContent -match 'React\.FC' -or $appContent -match 'function.*App') {
        Write-Host "  ✅ App.tsx 是有效的 React 组件" -ForegroundColor Green
    } else {
        Write-Host "  ❌ App.tsx 可能不是有效的 React 组件" -ForegroundColor Red
    }
}

# 4. 检查 main.tsx
Write-Host "`n4. 检查入口文件..." -ForegroundColor Cyan
if (Test-Path "src\main.tsx") {
    $mainContent = Get-Content "src\main.tsx" -Raw
    if ($mainContent -match 'ReactDOM\.createRoot' -and $mainContent -match '\.render\(') {
        Write-Host "  ✅ main.tsx 正确配置" -ForegroundColor Green
    } else {
        Write-Host "  ❌ main.tsx 配置可能有问题" -ForegroundColor Red
        Write-Host "  当前内容:" -ForegroundColor Yellow
        $mainContent
    }
} elseif (Test-Path "src\index.tsx") {
    Write-Host "  ✅ 使用 index.tsx 作为入口" -ForegroundColor Green
} else {
    Write-Host "  ❌ 没有找到入口文件" -ForegroundColor Red
}

# 5. 检查控制台错误
Write-Host "`n5. 启动测试（5秒）..." -ForegroundColor Cyan
try {
    $job = Start-Job -ScriptBlock {
        Set-Location $using:PWD
        npm run dev 2>&1
    }
    
    Start-Sleep -Seconds 5
    
    $output = Receive-Job -Job $job
    $errors = $output | Where-Object { $_ -match "error|Error|ERROR|失败" }
    
    if ($errors) {
        Write-Host "  ❌ 发现错误:" -ForegroundColor Red
        $errors | Select-Object -First 5 | ForEach-Object {
            Write-Host "    $_" -ForegroundColor Red
        }
    } else {
        Write-Host "  ✅ 启动测试无错误" -ForegroundColor Green
    }
    
    Stop-Job -Job $job
    Remove-Job -Job $job
} catch {
    Write-Host "  ❌ 测试失败: $_" -ForegroundColor Red
}

Write-Host "`n🎯 诊断完成！" -ForegroundColor Green
if (-not $hasRoot) {
    Write-Host "建议: 确保 index.html 有 <div id='root'></div>" -ForegroundColor Yellow
}
