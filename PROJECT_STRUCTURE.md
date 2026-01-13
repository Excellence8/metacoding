# Metacoding Studio v2.0 - 项目结构

## 🎯 项目状态
✅ 所有问题已修复，项目可正常使用
✅ React Router v7 路由工作正常
✅ 组件语法错误已修复
✅ 开发服务器运行在端口 5174

## 📁 目录结构
D:\metacoding-new
 📄 index.html # 主HTML文件（已修复）
 📄 package.json # 项目依赖配置
 📄 vite.config.ts # Vite配置（端口5174）
 📄 USAGE_GUIDE.md # 使用指南
 📄 project-status.ps1 # 项目状态检查
 📁 src/ # 源代码目录
  📄 main.tsx # React入口（已修复）
  📄 App.tsx # 主应用组件（已修复路由）
  📄 App.css # 主样式文件
  📄 index.css # 基础样式
  📄 App-router-template.tsx # 路由配置参考
  📁 components/ # 组件库（82个文件）
   📁 basic/ # 基础组件
   📁 Card/ # 卡片组件
   📁 DataTable/ # 数据表格
   📁 Modal/ # 模态框
   ... # 其他组件
  📁 pages/ # 页面组件（50个文件）
   📄 Home.tsx # 首页
   📄 Generator.tsx # 代码生成器（已修复）
   ... # 其他页面
  📁 layouts/ # 布局组件
  📁 services/ # 服务层
  📁 hooks/ # 自定义Hooks
  📁 styles/ # 样式文件
  📁 utils/ # 工具函数
 📁 public/ # 静态资源
  📄 vite.svg # Vite图标
 📁 node_modules/ # 依赖包（npm安装）

text

复制

下载

## 🚀 核心文件说明

### 1. 路由配置（已修复）
- **src/App.tsx** - 使用正确的 React Router v7 语法：
  ```typescript
  import { createBrowserRouter, RouterProvider } from 'react-router-dom'
  const router = createBrowserRouter([...])
  function App() { return <RouterProvider router={router} /> }
2. 入口文件（已修复）
src/main.tsx - 包含错误处理和加载状态

index.html - 包含备用内容和缓存控制

3. 构建配置
vite.config.ts - 配置端口5174，禁用缓存

🔗 访问地址
主应用：http://localhost:5174/

代码生成器：http://localhost:5174/generator

开发服务器运行在：端口 5174

📋 可用命令
powershell

复制

下载
# 开发命令
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产版本

# 项目脚本
.\meta.ps1           # 代码生成（主要功能）
.\view-doc.ps1       # 查看文档
.\update-docs.ps1    # 更新文档
.\project-status.ps1 # 检查项目状态
.\fix-templates.ps1  # 修复组件模板语法

# 诊断脚本（备用）
.\diagnose-blank.ps1 # 诊断空白页问题
🛠️ 开发指南
创建新组件
在 src/components/ 创建组件目录

使用正确的模板语法：className={`${componentName.toLowerCase()}`}

导出组件供其他文件使用

创建新页面
在 src/pages/ 创建页面文件

在 src/App.tsx 中添加路由配置

确保使用正确的路由语法

代码生成
使用 .\meta.ps1 脚本生成代码模板：

powershell

复制

下载
.\meta.ps1 generate component <组件名>
.\meta.ps1 generate page <页面名>
⚠️ 常见问题解决
页面空白
按 Ctrl+Shift+R 强制刷新

使用隐身模式访问

清除浏览器缓存

重启开发服务器

端口占用
powershell

复制

下载
# 停止占用端口的进程
Get-Process -Name node | Where CommandLine -like "*vite*" | Stop-Process -Force
组件错误
powershell

复制

下载
# 运行修复脚本
.\fix-templates.ps1
📞 技术支持
如果遇到问题：

检查浏览器控制台 (F12)

运行诊断脚本

查看项目状态：.\project-status.ps1

🎉 Metacoding Studio v2.0 已完全修复，可以开始使用了！
