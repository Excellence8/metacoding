@echo off
echo ========================================
echo    MetaCoding????????
echo ========================================
echo.

echo 1. ??package.json??...
(
echo {
echo   "name": "metacoding-new",
echo   "version": "0.0.0",
echo   "private": true,
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "preview": "vite preview"
echo   },
echo   "dependencies": {
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "react-router-dom": "^6.20.0"
echo   },
echo   "devDependencies": {
echo     "@types/react": "^18.2.0",
echo     "@types/react-dom": "^18.2.0",
echo     "@vitejs/plugin-react": "^4.0.0",
echo     "typescript": "^5.0.0",
echo     "vite": "^5.0.0"
echo   }
echo }
) > package.json

echo 2. ????...
call npm install

echo 3. ???????...
echo.
echo ???????????????:
echo   npm run dev
echo.
echo ????: http://localhost:5173
echo.
pause
