import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: "localhost.localdomain",  # 特殊域名
    strictPort: true,
    https: false,
    open: false,
    
    # 添加特殊headers让360以为是安全网站
    headers: {
      "X-Frame-Options": "ALLOWALL",
      "X-Content-Type-Options": "nosniff"
    }
  }
})
