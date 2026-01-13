Write-Host "🔍 简单系统验证" -ForegroundColor Cyan
Write-Host "================" -ForegroundColor Cyan

$files = @("PROJECT_COMPLETION.md", "QUICK_START.md", "FINAL_GUIDE.md", "view-doc.ps1", "update-docs.ps1")
$allExist = $true

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file" -ForegroundColor Red
        $allExist = $false
    }
}

if ($allExist) {
    Write-Host "`n🎉 所有核心文件存在！" -ForegroundColor Green
    Write-Host "运行 .\view-doc.ps1 overview 查看项目" -ForegroundColor Yellow
} else {
    Write-Host "`n⚠️  缺少文件，请检查" -ForegroundColor Yellow
}
