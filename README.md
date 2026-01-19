# MetaCoding - 智能代码生成平台
> **🎯 专业服务 | Professional Services**

**📖 深度解读**：我撰写了关于本项目商业化思考的完整文章  [从开源到收入：我为我的AI代码生成器项目添加了商业化服务页面](https://juejin.cn/post/7595960824485756962)

**📖 深度解读**：我撰写了关于本项目商业化思考的完整文章  [从开源到收入：我为我的AI代码生成器项目添加了商业化服务页面](等待你发布后填写文章链接)
> 我是本项目的独立开发者。我提供 **AI编程工具开发咨询**与**定制化代码生成方案开发**服务。如果你有将类似想法产品化的需求，欢迎联系我进行探讨。
> *   **💼 查看详细服务介绍**：[services.md](./services.md)
> *   **📧 联系邮箱**: [dgsjk3258@126.com]
> *   **项目案例即是我能力的证明** 👉 [在线演示](https://excellence8.github.io/metacoding/)
## 🚀 项目简介

MetaCoding 是一个基于 React + TypeScript + Vite 的智能代码生成平台，可以帮助开发者快速生成完整的项目结构。

## ✨ 功能特性

### ✅ 已完成功能
1. **项目生成器** - 一键生成完整项目结构
2. **模板库** - 多种技术栈模板选择
3. **项目管理** - 历史记录、重新生成、删除
4. **项目导出** - 支持 JSON 和 ZIP 格式导出
5. **设置系统** - 主题、编辑器、语言设置
6. **响应式设计** - 适配各种屏幕尺寸
7. **快捷键支持** - 提高操作效率

### 🔄 生成的项目包含
- 完整的 React + TypeScript 项目结构
- Vite 构建配置
- TypeScript 配置文件
- 路由系统
- 样式文件
- README 文档

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 4
- **路由**: React Router DOM 6
- **样式**: 内联样式 + CSS 变量
- **状态管理**: React Hooks
- **存储**: LocalStorage
- **打包**: JSZip（项目导出）

## 📁 项目结构
metacoding-new/
├── src/
│ ├── components/ # React 组件
│ ├── utils/ # 工具函数
│ │ ├── projectHistory.ts
│ │ ├── exportProject.ts
│ │ └── theme.ts
│ └── App.tsx # 主应用组件
├── public/ # 静态资源
├── index.html # 入口 HTML
├── vite.config.ts # Vite 配置
├── tsconfig.json # TypeScript 配置
├── package.json # 项目依赖
└── README.md # 项目说明

text

复制

下载

## 🚦 快速开始

### 开发环境
```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 启动开发服务器
npm run dev
构建生产版本
bash

复制

下载
# 构建项目
npm run build

# 预览构建版本
npm run preview
🌐 部署指南
Vercel 部署
将项目推送到 GitHub

在 Vercel 中导入项目

自动部署完成

Netlify 部署
将项目推送到 GitHub

在 Netlify 中导入项目

构建命令: npm run build

发布目录: dist

GitHub Pages 部署
运行 npm run build

将 dist 目录推送到 gh-pages 分支

在 GitHub 设置中启用 Pages

🔧 配置说明
环境变量
创建 .env 文件：

env

复制

下载
VITE_APP_TITLE=MetaCoding
VITE_APP_VERSION=1.0.0
主题配置
支持 4 种主题：

浅色主题（默认）

深色主题

蓝色主题

紫色主题

📊 项目统计
页面数量: 5 个（首页、生成器、模板库、项目管理、设置）

组件数量: 5 个主要组件

工具函数: 3 个核心工具

存储键值: 4 个 LocalStorage 键

🐛 故障排除
常见问题
项目无法启动: 检查 Node.js 版本（推荐 18+）

ZIP 导出失败: 确保已安装 JSZip 依赖

主题不生效: 清除浏览器缓存

路由问题: 检查浏览器控制台错误

调试命令
bash

复制

下载
# 检查 TypeScript 错误
npx tsc --noEmit

# 检查代码规范
npm run lint

# 清理缓存
npm run clean
🤝 贡献指南
Fork 项目

创建功能分支 (git checkout -b feature/AmazingFeature)

提交更改 (git commit -m 'Add some AmazingFeature')

推送到分支 (git push origin feature/AmazingFeature)

开启 Pull Request

📄 许可证
本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情

👥 贡献者
感谢所有为这个项目做出贡献的人！

📞 支持
如有问题或建议，请提交 Issue 或联系维护者。

最后更新: $(Get-Date -Format "2026-11-14")
版本: 1.0.0


