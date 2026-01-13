@echo off
chcp 65001 >nul
echo =========================================
echo        UTF-8 BOM????
echo =========================================
echo.

echo 1. ??package.json...
powershell -Command "$utf8NoBom = New-Object System.Text.UTF8Encoding $false; $content = [System.IO.File]::ReadAllText('package.json', [System.Text.Encoding]::UTF8); if ($content[0] -eq [char]0xFEFF) { $content = $content.Substring(1) }; [System.IO.File]::WriteAllText('package.json', $content, $utf8NoBom)"
echo   ? package.json???
echo.

echo 2. ????...
if exist node_modules\.vite rmdir /s /q node_modules\.vite
echo   ? ?????
echo.

echo 3. ??Vite...
echo   ? Ctrl+C ??
echo.
echo =========================================
npx vite
echo =========================================
pause
