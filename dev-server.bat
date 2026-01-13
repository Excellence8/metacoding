@echo off
chcp 65001 >nul
echo =========================================
echo        MetaCoding?????
echo =========================================
echo.

echo ??package.json??...
powershell -Command "
# ??package.json?BOM
`$file = 'package.json'
if (Test-Path `$file) {
    `$bytes = [System.IO.File]::ReadAllBytes(`$file)
    if (`$bytes[0] -eq 0xEF -and `$bytes[1] -eq 0xBB -and `$bytes[2] -eq 0xBF) {
        echo '??BOM?????...'
        `$content = [System.IO.File]::ReadAllText(`$file, [System.Text.Encoding]::UTF8)
        `$cleanContent = `$content.Substring(1)
        `$utf8NoBom = New-Object System.Text.UTF8Encoding `$false
        [System.IO.File]::WriteAllText(`$file, `$cleanContent, `$utf8NoBom)
        echo 'BOM???'
    }
}
"

echo.
echo ????...
if exist node_modules\.vite rmdir /s /q node_modules\.vite 2>nul

echo.
echo ???????...
echo ? Ctrl+C ??
echo.
echo =========================================
npx vite --host
echo =========================================
pause
