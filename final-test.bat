@echo off
chcp 65001 >nul
echo =========================================
echo        MetaCoding??????
echo =========================================
echo.

echo 1. ??package.json...
type package.json
echo.

echo 2. ??Node.js??...
where node
node --version
echo.

echo 3. ??npm...
where npm
npm --version
echo.

echo 4. ???????...
if exist node_modules rmdir /s /q node_modules
del package-lock.json 2>nul
npm install
echo.

echo 5. ??Vite...
echo ?????????????Vite...
pause >nul
npx vite
echo.

pause
