#!/bin/bash
# 部署到 GitHub Pages

# 构建项目
npm run build

# 创建部署目录
rm -rf deploy
mkdir deploy

# 复制构建文件
cp -r dist/* deploy/

# 创建 CNAME 文件（如果需要自定义域名）
# echo "yourdomain.com" > deploy/CNAME

# 创建 .nojekyll 文件（防止 GitHub Pages 忽略下划线文件）
touch deploy/.nojekyll

echo "✅ 构建完成，文件已复制到 deploy 目录"
echo "📦 将 deploy 目录推送到 gh-pages 分支即可部署"
