# 🚀 Metacoding Studio v2.0 使用指南

## ✅ 修复完成状态
所有路由问题已解决，项目可以正常使用。

## 🔗 访问链接
- **主应用**: http://localhost:5174/
- **代码生成器**: http://localhost:5174/generator
- **测试页面**: http://localhost:5174/ultimate-test.html

## 📋 项目命令

### 开发命令
```powershell
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
项目脚本
powershell

复制

下载
# 检查项目状态
.\project-status.ps1

# 运行代码生成
.\meta.ps1

# 查看文档
.\view-doc.ps1

# 更新文档
.\update-docs.ps1
路由测试
powershell

复制

下载
# 测试所有路由
Start-Process "http://localhost:5174/ultimate-test.html"
🛠️ 如果遇到问题
1. 页面空白
powershell

复制

下载
# 解决方案：
# 1. 按 Ctrl+Shift+R 强制刷新
# 2. 使用隐身模式 (Ctrl+Shift+N)
# 3. 清除浏览器缓存 (Ctrl+Shift+Delete)
# 4. 重启服务器：停止后运行 npm run dev
2. 端口被占用
powershell

复制

下载
# 检查端口占用
Get-NetTCPConnection -LocalPort 5174

# 停止占用进程
Get-Process -Name node | Where CommandLine -like "*vite*" | Stop-Process -Force
3. 组件错误
powershell

复制

下载
# 修复组件模板语法
.\fix-templates.ps1

# 或运行终极修复
.\ultimate-fix.ps1
📁 项目结构
text

复制

下载
metacoding-new/
 src/
    components/     # 组件库
    pages/         # 页面组件
    layouts/       # 布局组件
    App.tsx        # 主应用（已修复路由）
    main.tsx       # 入口文件
 public/            # 静态资源
 package.json       # 依赖配置
 vite.config.ts     # 构建配置（端口5174）
🎯 开发建议
组件开发：在 src/components/ 中创建可复用组件

页面开发：在 src/pages/ 中创建页面组件

路由配置：使用 React Router v7 语法（createBrowserRouter + RouterProvider）

代码生成：使用 .\meta.ps1 脚本生成代码模板

📞 技术支持
如果还有问题：

检查控制台错误 (F12  Console)

运行诊断脚本：.\diagnose-blank.ps1

查看日志文件

🎉 现在开始使用您的 Metacoding Studio 进行开发吧！
