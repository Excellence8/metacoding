# 停止所有进程
Get-Process -Name "node" -ErrorAction SilentlyContinue | 
    Where-Object { $_.CommandLine -like "*vite*" } | 
    Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

# 清理缓存
if (Test-Path "node_modules/.vite") {
    Remove-Item "node_modules/.vite" -Recurse -Force
}

# 使用最简配置启动
@'
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
export default defineConfig({ plugins: [react()] })
