# 快速修复依赖问题
echo "正在修复依赖..."

# 1. 清理缓存
npm cache clean --force

# 2. 删除node_modules重新安装
if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}

# 3. 删除lock文件
Remove-Item "package-lock.json", "yarn.lock" -ErrorAction SilentlyContinue

# 4. 重新安装
npm install

# 5. 单独安装sonner
npm install sonner

echo "修复完成！请运行: npm run dev"
