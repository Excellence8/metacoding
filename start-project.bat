@echo off
chcp 65001 >nul
echo =========================================
echo        MetaCoding??????
echo =========================================
echo.

echo ????: %CD%
echo.

echo 1. ??package.json...
if exist package.json (
    echo   ? package.json??
) else (
    echo   ? package.json????????...
    (
        echo {
        echo   "name": "metacoding-new",
        echo   "version": "0.0.0",
        echo   "type": "module",
        echo   "scripts": {
        echo     "dev": "vite"
        echo   },
        echo   "dependencies": {
        echo     "react": "^18.2.0",
        echo     "react-dom": "^18.2.0"
        echo   },
        echo   "devDependencies": {
        echo     "@vitejs/plugin-react": "^4.0.0",
        echo     "vite": "^5.0.0"
        echo   }
        echo }
    ) > package.json
)

echo.
echo 2. ????...
if not exist node_modules (
    call npm install
    echo   ? ??????
) else (
    echo   ? node_modules???
)

echo.
echo 3. ???????...
echo   ? Ctrl+C ?????
echo.
echo =========================================
npx vite
echo =========================================
pause
