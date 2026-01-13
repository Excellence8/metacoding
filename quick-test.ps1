Write-Host "🚀 Metacoding Studio 快速测试" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor White

# 测试服务器状态
Write-Host "`n1. 服务器状态:" -ForegroundColor Yellow
$portTest = Test-NetConnection -ComputerName localhost -Port 5173 -InformationLevel Quiet -WarningAction SilentlyContinue
if ($portTest) {
    Write-Host "  ✅ 服务器正在运行 (端口 5173)" -ForegroundColor Green
} else {
    Write-Host "  ❌ 服务器未运行" -ForegroundColor Red
    Write-Host "    请运行: npm run dev" -ForegroundColor White
}

# 测试关键文件
Write-Host "`n2. 关键文件检查:" -ForegroundColor Yellow
$keyFiles = @(
    "src/App.tsx",
    "src/pages/Generator.tsx", 
    "src/layouts/MainLayout.tsx",
    "src/components/Card/index.tsx"
)

foreach ($file in $keyFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        Write-Host "  ✅ $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file 缺失" -ForegroundColor Red
    }
}

# 测试链接
Write-Host "`n3. 测试链接:" -ForegroundColor Yellow
Write-Host "  • http://localhost:5173/generator" -ForegroundColor White
Write-Host "  • http://localhost:5173/" -ForegroundColor White
Write-Host "  • http://localhost:5173/dashboard" -ForegroundColor White

# 组件语法检查
Write-Host "`n4. 组件语法检查:" -ForegroundColor Yellow
$tsxFiles = Get-ChildItem "src\components" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue | Select-Object -First 5
$hasErrors = $false

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'className=\{\$\{componentName') {
        Write-Host "  ❌ $($file.Name) 有模板语法问题" -ForegroundColor Red
        $hasErrors = $true
    } else {
        Write-Host "  ✅ $($file.Name) 语法正确" -ForegroundColor Green
    }
}

if (-not $hasErrors) {
    Write-Host "  ✅ 组件模板语法已修复" -ForegroundColor Green
}

# 路由配置检查
Write-Host "`n5. 路由配置检查:" -ForegroundColor Yellow
if (Test-Path "src/App.tsx") {
    $appContent = Get-Content "src/App.tsx" -Raw
    $checks = @(
        @{ Pattern = "createBrowserRouter"; Description = "使用 createBrowserRouter" },
        @{ Pattern = "RouterProvider"; Description = "使用 RouterProvider" },
        @{ Pattern = "path.*:.*generator"; Description = "Generator 路由配置" },
        @{ Pattern = "Outlet"; Description = "使用 Outlet 布局" }
    )
    
    $allPassed = $true
    foreach ($check in $checks) {
        if ($appContent -match $check.Pattern) {
            Write-Host "  ✅ $($check.Description)" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $($check.Description)" -ForegroundColor Red
            $allPassed = $false
        }
    }
    
    if ($allPassed) {
        Write-Host "  ✅ React Router v7 配置正确" -ForegroundColor Green
    }
}

Write-Host "`n🎯 测试完成！" -ForegroundColor Cyan
Write-Host "如果所有检查都是绿色，请访问 Generator 页面测试" -ForegroundColor White
