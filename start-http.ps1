# 确保使用HTTP
$env:VITE_HTTPS = "false"
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"

# 启动vite
npx vite --port 5173 --host --force
