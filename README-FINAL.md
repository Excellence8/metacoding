# 🚀 Metacoding Studio v2.0

> AI驱动的智能代码生成与项目管理平台

## 🎯 项目概述

Metacoding Studio 是一个现代化的前端开发平台，集成了：
- 🤖 AI驱动的智能代码生成
- 🏗️ 企业级项目架构
- 📚 完整的文档系统
- ⚡ 自动化工具链

## 📁 项目结构

\\\
metacoding-new/
 📄 文档系统/                    # 5个核心文档
 ⚡ 工具脚本/                    # 7个功能脚本
 🏗️ 项目代码/                   # 源代码和模板
 📊 配置文件/                   # 项目配置
\\\

## 🚀 快速开始

### 最简单的方式（推荐）：
1. **双击 \start.ps1\** - 交互式启动菜单
2. 或运行：\.\start.ps1\

### 使用启动器：
\\\powershell
# 启动开发服务器
.\launch.ps1 start

# 查看项目文档
.\launch.ps1 docs

# 查看项目状态
.\launch.ps1 status

# 更新系统
.\launch.ps1 update
\\\

### 传统方式：
\\\powershell
# 直接启动
npm run dev

# 查看文档
.\view-doc.ps1 overview

# 项目管理
.\meta.ps1 status
\\\

## ⚡ 核心功能

### 1. 智能代码生成
\\\powershell
# 生成组件
.\meta.ps1 generate component basic Button

# 生成页面
.\meta.ps1 generate page dashboard Home

# 生成表单
.\meta.ps1 generate form LoginForm
\\\

### 2. 文档系统
\\\powershell
# 查看项目概览
.\view-doc.ps1 overview

# 查看完整文档
.\view-doc.ps1 all

# 更新文档
.\update-docs.ps1
\\\

### 3. 项目管理
\\\powershell
# 项目状态
.\meta.ps1 status

# 健康检查
.\meta.ps1 studio health

# 清理构建
.\meta.ps1 clean
\\\

## 📚 文档资源

### 核心文档
1. **PROJECT_COMPLETION.md** - 项目完整报告
2. **FINAL_GUIDE.md** - 最终使用指南
3. **QUICK_START.md** - 快速开始指南
4. **START_GUIDE.md** - 启动指南
5. **DOCS_SYSTEM_STATUS.md** - 系统状态

### 查看方式
\\\powershell
# 在 PowerShell 中查看
type FINAL_GUIDE.md
.\view-doc.ps1 overview

# 在编辑器中查看
code PROJECT_COMPLETION.md
notepad QUICK_START.md
\\\

## 🔧 工具脚本

| 脚本 | 用途 | 示例 |
|------|------|------|
| \start.ps1\ | 交互式启动菜单 | 双击运行 |
| \launch.ps1\ | 统一启动器 | \.\launch.ps1 start\ |
| \meta.ps1\ | 项目管理器 | \.\meta.ps1 status\ |
| \iew-doc.ps1\ | 文档查看器 | \.\view-doc.ps1 overview\ |
| \update-docs.ps1\ | 文档更新器 | \.\update-docs.ps1\ |
| \erify-docs.ps1\ | 系统验证器 | \.\verify-docs.ps1\ |
| \inal-test.ps1\ | 最终测试 | \.\final-test.ps1\ |

## 🎮 开发工作流

### 日常开发流程
\\\powershell
# 1. 启动项目
.\launch.ps1 start

# 2. 生成代码
.\meta.ps1 generate component basic Header

# 3. 查看状态
.\meta.ps1 status

# 4. 更新文档
.\update-docs.ps1 -UpdateStats

# 5. 验证系统
.\verify-docs.ps1
\\\

### 新成员入门
\\\powershell
# 1. 验证环境
.\start.ps1

# 2. 查看项目
.\launch.ps1 docs

# 3. 阅读指南
type FINAL_GUIDE.md

# 4. 开始开发
.\launch.ps1 start
\\\

## 📞 支持与排错

### 常见问题
1. **启动失败**  运行 \
pm install\
2. **命令不识别**  确保在项目根目录
3. **文件缺失**  运行 \.\verify-docs.ps1\

### 快速修复
\\\powershell
# 重置系统
.\update-docs.ps1
.\verify-docs.ps1
.\final-test.ps1

# 重新安装
npm install
.\launch.ps1 start
\\\

### 获取帮助
\\\powershell
# 查看所有命令
.\launch.ps1 help

# 查看文档
.\view-doc.ps1 all

# 运行测试
.\final-test.ps1
\\\

## 🏁 开始你的旅程

### 第一步：验证系统
\\\powershell
.\final-test.ps1
\\\

### 第二步：查看项目
\\\powershell
.\launch.ps1 docs
type FINAL_GUIDE.md
\\\

### 第三步：启动开发
\\\powershell
.\launch.ps1 start
\\\

访问: http://localhost:5173

### 第四步：生成代码
\\\powershell
.\meta.ps1 generate component basic MyComponent
\\\

## 📊 技术栈

- **框架**: React 18 + TypeScript
- **构建**: Vite 5
- **样式**: Tailwind CSS 3
- **代码质量**: ESLint + Prettier
- **开发工具**: PowerShell 脚本

## 🤝 贡献

1. 在项目中创建 \eedback.md\ 提供建议
2. 通过 \.\meta.ps1 feedback\ 提交反馈
3. 分享你的使用经验

## 📄 许可证

Metacoding Studio v2.0 - 开源项目

---
**项目**: metacoding-new
**版本**: v2.0.0
**状态**: 🟢 完全就绪
**最后更新**: 2026-01-05 19:03:15

💡 **提示**: 双击 \start.ps1\ 开始最简单的方式！
