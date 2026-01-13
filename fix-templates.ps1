# 组件模板修复脚本
Write-Host "🔧 修复组件模板语法" -ForegroundColor Magenta
Write-Host "====================" -ForegroundColor Magenta

# 查找所有有问题的组件
$tsxFiles = Get-ChildItem "src\components" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue
$fixedCount = 0

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # 修复常见的模板字符串错误
    # 1. 修复 className={${componentName.ToLower()} } -> className={`${componentName.toLowerCase()}`}
    $content = $content -replace 'className=\{\$\{componentName\.ToLower\(\)\} \}', 'className={`${componentName.toLowerCase()}`}'
    
    # 2. 修复转义字符
    $content = $content -replace '\\\}\\}', '}}'
    $content = $content -replace '\\\{\\\{', '{{'
    
    # 3. 修复其他可能的错误
    $content = $content -replace '\$\{componentName\.ToLower\(\)\}', '${componentName.toLowerCase()}'
    
    if ($content -ne $original) {
        $content | Out-File $file.FullName -Encoding UTF8
        Write-Host "✅ 修复: $($file.Name)" -ForegroundColor Green
        $fixedCount++
    }
}

Write-Host "`n📊 修复结果: $fixedCount 个文件已修复" -ForegroundColor Cyan

# 验证修复
Write-Host "`n🔍 验证修复..." -ForegroundColor Yellow
$problemPatterns = @(
    'className=\{\$\{componentName',
    '\\\}',
    '\\\{'
)

$hasErrors = $false
foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    foreach ($pattern in $problemPatterns) {
        if ($content -match $pattern) {
            Write-Host "❌ 仍有问题: $($file.Name) - $pattern" -ForegroundColor Red
            $hasErrors = $true
            break
        }
    }
}

if (-not $hasErrors) {
    Write-Host "✅ 所有组件语法正确！" -ForegroundColor Green
    Write-Host "现在可以启动项目了！" -ForegroundColor Cyan
}
