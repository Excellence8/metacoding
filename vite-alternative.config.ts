import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // 使用3001避免360强制HTTPS
    host: true,
    strictPort: true,
    https: false,  // 明确禁用HTTPS
    cors: true,
    open: false    // 不要自动打开
  }
})
