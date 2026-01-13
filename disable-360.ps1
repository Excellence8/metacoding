# 临时禁用360服务（需要管理员权限）
net stop "360安全卫士服务" 2>nul
net stop "360sd" 2>nul
net stop "ZhuDongFangYu" 2>nul

# 修改hosts文件绕过拦截
Add-Content -Path "$env:windir\System32\drivers\etc\hosts" -Value "`n127.0.0.1 browser.360.cn" -Force
Add-Content -Path "$env:windir\System32\drivers\etc\hosts" -Value "127.0.0.1 se.360.cn" -Force

echo "已尝试禁用360拦截"
