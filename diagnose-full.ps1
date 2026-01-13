Write-Host "运行完整诊断..." -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Cyan

# 1. 检查依赖
Write-Host "`n1. 检查依赖包..." -ForegroundColor Yellow
try {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    
    $requiredDeps = @{
        "react" = $packageJson.dependencies.react -or $packageJson.devDependencies.react
        "react-dom" = $packageJson.dependencies."react-dom" -or $packageJson.devDependencies."react-dom"
        "react-router-dom" = $packageJson.dependencies."react-router-dom" -or $packageJson.devDependencies."react-router-dom"
        "@types/react" = $packageJson.devDependencies."@types/react"
    }
    
    foreach ($dep in $requiredDeps.Keys) {
        if ($requiredDeps[$dep]) {
            Write-Host "  ✅ $dep" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $dep 未安装" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "  ⚠️  无法检查依赖" -ForegroundColor Yellow
}

# 2. 检查关键文件
Write-Host "`n2. 检查关键文件..." -ForegroundColor Yellow
$criticalFiles = @(
    "src/App.tsx",
    "src/pages/Dashboard/index.tsx",
    "src/pages/Generator/index.tsx",
    "src/pages/Generator/Generator.css",
    "package.json",
    "vite.config.ts"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file -ErrorAction SilentlyContinue).Length
        Write-Host "  ✅ $file ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file 缺失" -ForegroundColor Red
    }
}

# 3. 检查 TypeScript 配置
Write-Host "`n3. 检查 TypeScript..." -ForegroundColor Yellow
if (Test-Path "tsconfig.json") {
    Write-Host "  ✅ tsconfig.json 存在" -ForegroundColor Green
    try {
        npx tsc --noEmit --skipLibCheck 2>&1 | Out-Null
        Write-Host "  ✅ TypeScript 编译检查通过" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ TypeScript 有编译错误" -ForegroundColor Red
    }
} else {
    Write-Host "  ❌ tsconfig.json 缺失" -ForegroundColor Red
}

# 4. 检查 vite 配置
Write-Host "`n4. 检查 Vite 配置..." -ForegroundColor Yellow
if (Test-Path "vite.config.ts") {
    Write-Host "  ✅ vite.config.ts 存在" -ForegroundColor Green
    $viteConfig = Get-Content "vite.config.ts" -Raw
    if ($viteConfig -match "react") {
        Write-Host "  ✅ Vite 配置包含 React 插件" -ForegroundColor Green
    }
} else {
    Write-Host "  ⚠️  vite.config.ts 不存在，使用默认配置" -ForegroundColor Yellow
}

# 5. 检查 Generator 页面内容
Write-Host "`n5. 检查 Generator 页面..." -ForegroundColor Yellow
if (Test-Path "src/pages/Generator/index.tsx") {
    $genContent = Get-Content "src/pages/Generator/index.tsx" -Raw
    if ($genContent -match "export default") {
        Write-Host "  ✅ Generator 有默认导出" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Generator 缺少默认导出" -ForegroundColor Red
    }
    
    if ($genContent -match "React") {
        Write-Host "  ✅ Generator 导入了 React" -ForegroundColor Green
    }
    
    Write-Host "  📄 Generator 文件内容预览:" -ForegroundColor Cyan
    Get-Content "src/pages/Generator/index.tsx" -First 10
}

# 6. 建议
Write-Host "`n6. 建议操作:" -ForegroundColor Cyan
Write-Host "  a. 清除浏览器缓存: Ctrl+Shift+Delete" -ForegroundColor White
Write-Host "  b. 检查浏览器控制台: F12  Console" -ForegroundColor White
Write-Host "  c. 检查网络请求: F12  Network" -ForegroundColor White
Write-Host "  d. 查看是否加载了 Generator 组件" -ForegroundColor White
Write-Host "  e. 尝试直接访问: http://localhost:5173/generator" -ForegroundColor White

Write-Host "`n诊断完成！" -ForegroundColor Green
