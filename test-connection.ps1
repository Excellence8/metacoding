# 使用curl测试（最干净）
curl -v http://127.0.0.1:8888 --max-time 10

# 或者使用PowerShell测试
Invoke-WebRequest -Uri "http://127.0.0.1:8888" -TimeoutSec 5
