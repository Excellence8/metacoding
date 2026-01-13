# 部署配置

## Vercel 配置 (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
Netlify 配置 (netlify.toml)
toml

复制

下载
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
GitHub Pages 配置
修改 vite.config.ts:

typescript

复制

下载
export default defineConfig({
  base: '/metacoding-new/', // 改为您的仓库名
  // ...其他配置
})
创建部署脚本 (deploy.sh):

bash

复制

下载
#!/bin/bash
npm run build
cd dist
git init
git add -A
git commit -m "Deploy"
git push -f git@github.com:YOUR_USERNAME/metacoding-new.git master:gh-pages
cd -
