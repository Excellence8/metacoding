# 🚀 Metacoding Studio 最终使用指南

## 📁 项目概述

欢迎使用 Metacoding Studio v2.0！这是一个基于 AI 的智能代码生成和项目管理平台。

### 项目结构
\\\
metacoding-new/
 src/                    # 源代码目录
    components/        # 可重用组件
    pages/            # 页面组件
    services/         # 服务层
    styles/           # 样式文件
 templates/            # 代码生成模板
 meta.ps1             # 主管理脚本
 PROJECT_COMPLETION.md # 项目文档
 QUICK_START.md       # 快速开始指南
\\\

## 🎮 立即开始

### 1. 启动开发服务器
\\\powershell
# 方法1: 使用项目脚本
.\meta.ps1 start

# 方法2: 使用 npm
npm run dev
\\\

启动后访问: http://localhost:5173

### 2. 查看项目状态
\\\powershell
# 查看完整项目状态
.\meta.ps1 status

# 运行健康检查
.\meta.ps1 studio health
\\\

### 3. 生成代码
\\\powershell
# 生成基础组件
.\meta.ps1 generate component basic Button

# 生成模态框
.\meta.ps1 generate modal Dialog

# 生成表单
.\meta.ps1 generate form LoginForm

# 生成表格
.\meta.ps1 generate table DataTable

# 生成页面
.\meta.ps1 generate page dashboard Home
\\\

## 📖 文档系统

### 文档查看器
\\\powershell
# 查看项目概览
.\view-doc.ps1 overview

# 查看文档信息
.\view-doc.ps1 info

# 查看快速开始
.\view-doc.ps1 quickstart

# 查看完整文档
.\view-doc.ps1 all

# 显示帮助
.\view-doc.ps1 help
\\\

### 文档维护
\\\powershell
# 更新文档时间戳
.\update-docs.ps1

# 更新文档统计信息
.\update-docs.ps1 -UpdateStats

# 验证文档系统
.\verify-docs.ps1
\\\

## 🔧 核心功能

### 智能代码生成
- **基础模板**: 快速创建标准组件
- **模态框模板**: 带遮罩和动画的对话框
- **表单模板**: 完整的表单验证和状态管理
- **表格模板**: 支持排序、分页的数据表格
- **仪表板模板**: 数据可视化页面

### 项目管理
- 实时项目状态监控
- 健康度检查
- 彩色日志输出
- 文件统计和目录列表

### 企业级架构
- TypeScript 完整支持
- 模块化代码组织
- 可扩展模板系统
- 完整的样式体系

## 📊 项目文档

### 主要文档
1. **PROJECT_COMPLETION.md** - 完整的项目完成报告
2. **QUICK_START.md** - 快速开始指南
3. **DOCS_SYSTEM_STATUS.md** - 文档系统状态报告
4. **FINAL_GUIDE.md** - 本最终使用指南

### 工具脚本
1. **view-doc.ps1** - 智能文档查看器
2. **update-docs.ps1** - 文档更新器
3. **verify-docs.ps1** - 系统验证器
4. **meta.ps1** - 主项目管理器

## 🎯 开发工作流

### 典型开发流程
\\\powershell
# 1. 启动项目
.\meta.ps1 start

# 2. 生成所需组件
.\meta.ps1 generate component basic Header
.\meta.ps1 generate form ContactForm
.\meta.ps1 generate table UserList

# 3. 查看项目状态
.\meta.ps1 status

# 4. 更新文档
.\update-docs.ps1 -UpdateStats

# 5. 验证系统
.\verify-docs.ps1
\\\

### 代码组织建议
- 组件按功能放在 \src/components/\ 对应子目录
- 页面组件放在 \src/pages/\ 目录
- 业务逻辑放在 \src/services/\ 目录
- 共享工具函数放在 \src/utils/\ 目录

## 📞 支持与排错

### 常见问题

#### 1. 启动失败
\\\powershell
# 检查依赖
npm install

# 清理缓存
.\meta.ps1 clean

# 重新启动
.\meta.ps1 start
\\\

#### 2. 代码生成失败
- 检查模板文件是否存在
- 确认目标目录有写入权限
- 查看日志文件 \logs/\ 目录

#### 3. 文档查看失败
- 确保文档文件存在
- 检查文件编码（应为 UTF-8）
- 运行 \.\verify-docs.ps1\ 诊断

### 获取帮助
\\\powershell
# 查看所有可用命令
Get-ChildItem *.ps1 | ForEach-Object { Write-Host "  " }

# 查看特定脚本帮助
.\view-doc.ps1 help
.\meta.ps1 --help

# 查看文档
type QUICK_START.md
.\view-doc.ps1 all
\\\

## 🔮 高级功能

### 自定义模板
1. 在 \	emplates/\ 目录创建新模板
2. 模板文件使用 \.tpl\ 扩展名
3. 使用 \{{variable}}\ 语法定义变量

### 扩展脚本功能
1. 编辑 \meta.ps1\ 添加新命令
2. 创建新的 PowerShell 脚本
3. 集成到现有工作流

### 集成开发
- 与 VSCode 等编辑器集成
- 支持 CI/CD 流程
- 可与其他工具链集成

## 🏁 下一步

### 立即行动
1. ✅ 运行 \.\verify-docs.ps1\ 验证系统
2. ✅ 运行 \.\view-doc.ps1 overview\ 查看项目
3. 🚀 运行 \.\meta.ps1 start\ 开始开发

### 学习路径
1. 阅读 \QUICK_START.md\ 快速上手
2. 查看 \PROJECT_COMPLETION.md\ 了解项目
3. 尝试代码生成功能
4. 探索项目结构

### 贡献和反馈
- 在项目中创建 \eedback.md\ 提供建议
- 通过 \.\meta.ps1 feedback\ 提交反馈
- 分享你的使用经验

---
**最后更新**: 2026-01-05 18:35:46
**项目版本**: Metacoding Studio v2.0
**状态**: 🟢 准备就绪
**建议**: 立即开始你的第一个项目！
