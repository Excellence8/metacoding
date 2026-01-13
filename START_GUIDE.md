# 🎯 Metacoding Studio 最终启动指南

## 🚀 立即开始

### 最简单的方式：使用启动脚本
\\\powershell
# 启动开发服务器（推荐）
.\launch.ps1 start

# 查看项目状态
.\launch.ps1 status

# 查看项目文档
.\launch.ps1 docs

# 查看完整指南
.\launch.ps1 guide

# 更新系统状态
.\launch.ps1 update

# 验证系统
.\launch.ps1 verify
\\\

### 传统方式：使用独立工具
\\\powershell
# 启动项目
.\meta.ps1 start

# 查看文档
.\view-doc.ps1 overview

# 更新文档
.\update-docs.ps1

# 验证系统
.\verify-docs.ps1

# 最终测试
.\final-test.ps1
\\\

## 📁 项目结构速查

\\\
metacoding-new/
 📄 文档系统/
    PROJECT_COMPLETION.md    # 主项目文档
    QUICK_START.md           # 快速开始
    FINAL_GUIDE.md           # 最终指南
    DOCS_SYSTEM_STATUS.md    # 系统状态
    START_GUIDE.md           # 本启动指南
    final-validation.ps1     # 最终验证脚本
 ⚡ 工具脚本/
    launch.ps1              # 统一启动器（推荐！）
    meta.ps1                # 项目管理器
    view-doc.ps1            # 文档查看器
    update-docs.ps1         # 文档更新器
    verify-docs.ps1         # 系统验证器
    final-test.ps1          # 最终测试
 🏗️  项目代码/
    src/                    # 源代码
    templates/              # 代码模板
 📊 配置文件/
     package.json
     tsconfig.json
     vite.config.ts
\\\

## 🎮 快速工作流

### 第一天：熟悉项目
\\\powershell
# 1. 查看项目概览
.\launch.ps1 docs

# 2. 查看完整指南
.\launch.ps1 guide

# 3. 启动项目
.\launch.ps1 start

# 4. 访问 http://localhost:5173
\\\

### 第二天：开始开发
\\\powershell
# 1. 生成第一个组件
.\meta.ps1 generate component basic MyComponent

# 2. 查看项目状态
.\meta.ps1 status

# 3. 更新文档
.\update-docs.ps1 -UpdateStats

# 4. 验证系统
.\verify-docs.ps1
\\\

### 日常开发
\\\powershell
# 早上：启动项目
.\launch.ps1 start

# 开发中：生成代码
.\meta.ps1 generate [类型] [名称]

# 下午：更新状态
.\launch.ps1 update

# 下班前：验证系统
.\launch.ps1 verify
\\\

## 🔧 故障排除

### 常见问题
1. **启动失败**  运行 \
pm install\ 然后 \.\launch.ps1 start\
2. **文档查看失败**  运行 \.\verify-docs.ps1\ 检查文件
3. **命令不识别**  确保在项目根目录运行
4. **文件缺失**  运行 \.\final-test.ps1\ 诊断

### 快速修复
\\\powershell
# 重置文档系统
.\update-docs.ps1
.\verify-docs.ps1
.\final-test.ps1

# 重置项目
.\meta.ps1 clean
npm install
.\launch.ps1 start
\\\

## 📞 获取帮助

### 文档资源
- \.\view-doc.ps1 all\ - 完整项目文档
- \	ype FINAL_GUIDE.md\ - 最终使用指南
- \	ype QUICK_START.md\ - 快速开始指南

### 命令帮助
- \.\launch.ps1 help\ - 启动器帮助
- \.\view-doc.ps1 help\ - 文档查看器帮助
- \.\meta.ps1 --help\ - 项目管理器帮助

### 系统信息
- \.\final-test.ps1\ - 系统测试
- \	ype DOCS_SYSTEM_STATUS.md\ - 系统状态报告

## 🏁 开始你的旅程

### 第一步：验证系统
\\\powershell
.\final-test.ps1
\\\

### 第二步：查看项目
\\\powershell
.\launch.ps1 docs
.\launch.ps1 guide
\\\

### 第三步：启动开发
\\\powershell
.\launch.ps1 start
\\\

### 第四步：开始创造
现在，开始使用 Metacoding Studio 创造你的项目吧！

---
**最后提醒**: 使用 \.\launch.ps1\ 作为主要入口点
**最佳实践**: 定期运行 \.\launch.ps1 update\
**开发愉快**！ 🎉

生成时间: 2026-01-05 18:58:08
项目版本: Metacoding Studio v2.0
状态: 🟢 准备起飞
