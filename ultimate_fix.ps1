# 终极修复：移除所有多余的转义字符
$filePath = "src/utils/exportProject.ts"
$content = Get-Content $filePath -Raw

# 移除模板字符串的多余转义
$content = $content -replace '\\`', '`'
$content = $content -replace '\\\$\{', '${'

# 保存修复
$content | Out-File $filePath -Encoding UTF8
Write-Host "✅ 终极修复完成！" -ForegroundColor Green
npm run build
