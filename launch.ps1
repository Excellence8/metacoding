Write-Host "=== MetaCoding开发服务器 ===" -ForegroundColor Cyan
Write-Host "启动时间: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray
Write-Host ""

# 检查并修复BOM
$packageFile = "package.json"
if (Test-Path $packageFile) {
    $bytes = [System.IO.File]::ReadAllBytes($packageFile)[0..2]
    if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        Write-Host "修复package.json BOM..." -ForegroundColor Yellow
        $content = [System.IO.File]::ReadAllText($packageFile, [System.Text.Encoding]::UTF8)
        $cleanContent = $content.Substring(1)
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($packageFile, $cleanContent, $utf8NoBom)
        Write-Host "BOM已修复" -ForegroundColor Green
    }
}

# 清理缓存
$viteCache = "node_modules/.vite"
if (Test-Path $viteCache) {
    Remove-Item $viteCache -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "清理Vite缓存..." -ForegroundColor Green
}

Write-Host ""
Write-Host "启动开发服务器..." -ForegroundColor Green
Write-Host "按 Ctrl+C 停止" -ForegroundColor Gray
Write-Host "访问: http://localhost:5173" -ForegroundColor Cyan
Write-Host ("=" * 50) -ForegroundColor DarkGray
Write-Host ""

# 启动Vite
npx vite --host
