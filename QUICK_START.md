# 🚀 Metacoding Studio - 快速开始

## 第1步：启动服务器
运行以下命令启动开发服务器：
```powershell
.\start-metacoding.ps1
或者手动启动：

powershell

复制

下载
npm run dev
第2步：访问应用
服务器启动后，访问：

主应用: http://localhost:5174/

代码生成器: http://localhost:5174/generator

第3步：使用代码生成
运行您的代码生成脚本：

powershell

复制

下载
.\meta.ps1
第4步：开发功能
在 src/components/ 创建组件

在 src/pages/ 创建页面

使用 React Router v7 配置路由

🔧 故障排除
如果页面空白：
按 Ctrl+Shift+R 强制刷新

使用隐身模式访问

清除浏览器缓存

如果端口被占用：
powershell

复制

下载
# 停止所有Vite进程
Get-Process -Name node | Where CommandLine -like "*vite*" | Stop-Process -Force
如果组件有错误：
powershell

复制

下载
.\fix-templates.ps1
📞 帮助
查看项目状态：.\project-status.ps1

查看详细文档：USAGE_GUIDE.md

查看项目结构：PROJECT_STRUCTURE.md

🎉 现在开始使用您的 AI 代码生成平台！
