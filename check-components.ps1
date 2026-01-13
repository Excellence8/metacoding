# 组件语法检查脚本
Write-Host "🔍 检查组件语法" -ForegroundColor Cyan
Write-Host "================" -ForegroundColor Cyan

$errors = @()
$tsxFiles = Get-ChildItem "src\components" -Recurse -Filter "*.tsx" -ErrorAction SilentlyContinue

foreach ($file in $tsxFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # 检查常见错误
    if ($content -match 'className=\{\$\{componentName') {
        $errors += "$($file.Name): 模板字符串语法错误"
    }
    if ($content -match 'className=\\\{\\\$\{componentName') {
        $errors += "$($file.Name): 转义模板字符串错误"
    }
    if ($content -match '\\\}' -and $content -notmatch '\\\\') {
        $errors += "$($file.Name): 转义花括号"
    }
}

if ($errors.Count -eq 0) {
    Write-Host "✅ 所有组件语法正确！" -ForegroundColor Green
} else {
    Write-Host "❌ 发现 $($errors.Count) 个错误:" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Red
    }
    
    Write-Host "`n🔧 自动修复..." -ForegroundColor Yellow
    foreach ($file in $tsxFiles) {
        $content = Get-Content $file.FullName -Raw
        $original = $content
        
        # 简单修复：将所有模板字符串改为普通字符串
        $componentName = [System.IO.Path]::GetFileNameWithoutExtension((Split-Path $file -Parent))
        if ($componentName -eq "basic") {
            $componentName = [System.IO.Path]::GetFileNameWithoutExtension($file)
        }
        
        $content = $content -replace 'className=\{\$\{componentName[^}]*\} \}', "className=`"$($componentName.ToLower())`""
        $content = $content -replace 'className=\\\{\\\$\{componentName[^}]*\} \\\}', "className=`"$($componentName.ToLower())`""
        $content = $content -replace '\\\}\\}', '}}'
        $content = $content -replace '\\\{\\\{', '{{'
        
        if ($content -ne $original) {
            $content | Out-File $file.FullName -Encoding UTF8
            Write-Host "✅ 修复: $($file.Name)" -ForegroundColor Green
        }
    }
}

Write-Host "`n🎯 检查完成！" -ForegroundColor Green
