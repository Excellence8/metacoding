# 简化修复脚本
Write-Host "🔧 修复代码问题..." -ForegroundColor Cyan

# 修复所有 tsx 文件
$tsxFiles = Get-ChildItem "src" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue
$fixedCount = 0

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # 查找并修复所有转义的花括号
    if ($content -match '\\\}' -or $content -match '\\\{') {
        $newContent = $content -replace '\\\}', '}'
        $newContent = $newContent -replace '\\\{', '{'
        
        if ($content -ne $newContent) {
            $newContent | Out-File $file.FullName -Encoding UTF8
            Write-Host "✅ 修复: $($file.Name)" -ForegroundColor Green
            $fixedCount++
        }
    }
}

Write-Host "`n📊 修复结果: $fixedCount 个文件已修复" -ForegroundColor Cyan

# 检查特定文件
$checkFiles = @(
    "src\components\UserModal\index.tsx",
    "src\components\Modal\index.tsx",
    "src\components\basic\Button\index.tsx"
)

Write-Host "`n🔍 检查关键文件:" -ForegroundColor Yellow
foreach ($file in $checkFiles) {
    if (Test-Path $file) {
        $hasError = $false
        $content = Get-Content $file -First 30
        
        foreach ($line in $content) {
            if ($line -match '\\\}' -or $line -match '\\\{') {
                Write-Host "❌ 发现错误: $file" -ForegroundColor Red
                Write-Host "   行: $line" -ForegroundColor Gray
                $hasError = $true
                break
            }
        }
        
        if (-not $hasError) {
            Write-Host "✅ $file 正常" -ForegroundColor Green
        }
    }
}
