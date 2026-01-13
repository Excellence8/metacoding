# 深度修复组件模板语法
Write-Host "深度修复组件模板语法..." -ForegroundColor Red

$tsxFiles = Get-ChildItem "src\components" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # 显示当前文件的问题
    if ($content -match 'className=\{\$\{componentName') {
        Write-Host "修复: $($file.Name)" -ForegroundColor Yellow
        
        # 使用更强大的正则表达式
        # 修复所有可能的错误变体
        $content = $content -replace 'className\s*=\s*\{\s*\$\{componentName\.ToLower\(\)\}(\s*)\}', 'className={`${componentName.toLowerCase()}`}'
        $content = $content -replace 'className\s*=\s*{\s*\$\{componentName\.ToLower\(\)\}(\s*)}', 'className={`${componentName.toLowerCase()}`}'
        $content = $content -replace 'className\s*=\s*\\{\s*\\\$\{componentName\.ToLower\(\)\}(\s*)\\}', 'className={`${componentName.toLowerCase()}`}'
        
        # 修复 componentName.ToLower() 到 componentName.toLowerCase()
        $content = $content -replace 'componentName\.ToLower\(\)', 'componentName.toLowerCase()'
        
        # 修复 ${componentName.ToLower()} 到 ${componentName.toLowerCase()}
        $content = $content -replace '\$\{componentName\.ToLower\(\)\}', '${componentName.toLowerCase()}'
        
        if ($content -ne $original) {
            $content | Out-File $file.FullName -Encoding UTF8 -Force
            Write-Host "  ✅ 已修复" -ForegroundColor Green
        }
    }
}

# 最终验证
Write-Host "`n最终验证..." -ForegroundColor Cyan
$errorCount = 0
foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'className=\{\$\{componentName') {
        Write-Host "❌ 仍有问题: $($file.Name)" -ForegroundColor Red
        $errorCount++
    }
}

if ($errorCount -eq 0) {
    Write-Host "🎉 所有组件语法修复完成！" -ForegroundColor Green
} else {
    Write-Host "⚠️  还有 $errorCount 个文件有问题，需要手动修复" -ForegroundColor Yellow
    
    # 显示需要手动修复的文件
    Write-Host "`n需要手动修复的文件：" -ForegroundColor Red
    foreach ($file in $tsxFiles) {
        $content = Get-Content $file.FullName -Raw
        if ($content -match 'className=\{\$\{componentName') {
            Write-Host "  - $($file.FullName)" -ForegroundColor White
            
            # 显示问题内容
            $lines = $content -split "`n"
            for ($i = 0; $i -lt $lines.Length; $i++) {
                if ($lines[$i] -match 'className=\{\$\{componentName') {
                    Write-Host "    第$($i+1)行: " -NoNewline
                    Write-Host $lines[$i].Trim() -ForegroundColor Gray
                }
            }
        }
    }
}
