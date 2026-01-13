# Metacoding Studio 代码修复脚本
Write-Host "🛠️  修复代码问题..." -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

# 1. 修复所有组件文件中的转义字符问题
$fixedFiles = 0
$tsxFiles = Get-ChildItem "src" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # 修复常见的模板字符串问题
    $content = $content -replace '\\\}', '}'
    $content = $content -replace '\\\{', '{'
    $content = $content -replace '\\\`', '`'
    
    if ($content -ne $originalContent) {
        $content | Out-File $file.FullName -Encoding UTF8 -Force
        $fixedFiles++
        Write-Host "✅ 修复: $($file.Name)" -ForegroundColor Green
    }
}

# 2. 修复特定文件 UserModal
$userModalPath = "src\components\UserModal\index.tsx"
if (Test-Path $userModalPath) {
    $content = Get-Content $userModalPath -Raw
    # 修复第14行的特定错误
    $lines = $content -split "`n"
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match "className=\`\${${componentName\.ToLower\(\)} \\\}") {
            $lines[$i] = $lines[$i] -replace "className=\`\${${componentName\.ToLower\(\)} \\\}", "className={`${componentName.toLowerCase()}`}"
            Write-Host "✅ 修复 UserModal 第$($i+1)行" -ForegroundColor Green
        }
    }
    $lines -join "`n" | Out-File $userModalPath -Encoding UTF8
    $fixedFiles++
}

# 3. 检查 package.json 和依赖
Write-Host "`n📦 检查项目依赖..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    Write-Host "✅ package.json 存在" -ForegroundColor Green
    
    # 检查 node_modules
    if (Test-Path "node_modules") {
        Write-Host "✅ node_modules 存在" -ForegroundColor Green
    } else {
        Write-Host "⚠️  node_modules 不存在，运行: npm install" -ForegroundColor Yellow
    }
}

# 结果总结
Write-Host "`n📊 修复结果:" -ForegroundColor Cyan
if ($fixedFiles -gt 0) {
    Write-Host "✅ 修复了 $fixedFiles 个文件" -ForegroundColor Green
    Write-Host "现在尝试启动项目..." -ForegroundColor Yellow
    
    # 尝试启动项目
    try {
        Write-Host "🚀 尝试启动开发服务器..." -ForegroundColor Green
        npm run dev
    } catch {
        Write-Host "❌ 启动失败，错误: $_" -ForegroundColor Red
        Write-Host "尝试手动运行: npm install 然后 npm run dev" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ 未发现需要修复的问题" -ForegroundColor Green
    Write-Host "可以直接运行: npm run dev" -ForegroundColor Yellow
}
