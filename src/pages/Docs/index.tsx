import React, { useState } from "react";
import "./Docs.css";

interface Documentation {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: string;
  sections: Array<{
    id: string;
    title: string;
    content: string;
    code?: string;
  }>;
}

const Docs: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState("getting-started");
  const [activeSection, setActiveSection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");

  const documentation: Documentation[] = [
    {
      id: "getting-started",
      title: "🚀 快速开始",
      icon: "🚀",
      description: "从零开始使用 Metacoding Studio",
      content: "学习如何开始使用 Metacoding Studio 进行智能代码生成和项目管理。",
      sections: [
        {
          id: "introduction",
          title: "介绍",
          content: "Metacoding Studio 是一个AI驱动的智能代码生成与项目管理平台，旨在帮助开发者快速构建高质量的React应用。"
        },
        {
          id: "installation",
          title: "安装与配置",
          content: "### 系统要求\n- Node.js 16+ \n- npm 或 yarn\n- PowerShell 5.1+ (Windows)\n\n### 安装步骤\n1. 克隆项目仓库\n2. 运行 `npm install` 安装依赖\n3. 运行 `npm run dev` 启动开发服务器",
          code: "# 克隆项目\ngit clone <repository-url>\ncd metacoding-new\n\n# 安装依赖\nnpm install\n\n# 启动开发服务器\nnpm run dev"
        },
        {
          id: "first-project",
          title: "创建第一个项目",
          content: "### 项目初始化\n使用以下命令初始化新项目：\n\n### 生成第一个组件\n使用组件生成器创建你的第一个React组件。",
          code: "# 生成基础组件\n./meta.ps1 generate component Button --template=basic\n\n# 生成页面\n./meta.ps1 generate page Dashboard --template=dashboard"
        }
      ]
    },
    {
      id: "components",
      title: "📦 组件系统",
      icon: "📦",
      description: "组件生成与管理系统",
      content: "了解如何使用和生成React组件。",
      sections: [
        {
          id: "component-types",
          title: "组件类型",
          content: "Metacoding Studio 支持多种组件模板：\n- **基础组件**: 简单的React函数组件\n- **模态框组件**: 带遮罩和动画的对话框\n- **表单组件**: 带状态管理的表单\n- **表格组件**: 数据表格组件\n- **卡片组件**: 内容展示卡片"
        },
        {
          id: "component-generation",
          title: "组件生成",
          content: "使用命令行工具生成组件：",
          code: "# 生成基础组件\n./meta.ps1 generate component Button --template=basic\n\n# 生成模态框组件\n./meta.ps1 generate component Modal --template=modal\n\n# 生成表单组件\n./meta.ps1 generate component ContactForm --template=form\n\n# 生成表格组件\n./meta.ps1 generate component DataTable --template=table"
        },
        {
          id: "component-customization",
          title: "组件自定义",
          content: "生成后可以自定义组件样式和功能。所有组件都使用TypeScript和模块化CSS。"
        }
      ]
    },
    {
      id: "pages",
      title: "📄 页面系统",
      icon: "📄",
      description: "页面创建与路由管理",
      content: "学习如何创建和管理页面。",
      sections: [
        {
          id: "page-templates",
          title: "页面模板",
          content: "支持两种页面模板：\n- **基础页面**: 简单的页面结构\n- **仪表板页面**: 包含统计卡片和布局的仪表板"
        },
        {
          id: "page-generation",
          title: "页面生成",
          content: "使用命令行生成页面：",
          code: "# 生成基础页面\n./meta.ps1 generate page About --template=basic\n\n# 生成仪表板页面\n./meta.ps1 generate page Analytics --template=dashboard"
        },
        {
          id: "routing-system",
          title: "路由系统",
          content: "页面自动注册到路由系统。路由配置在 `src/routes/index.tsx` 中管理。"
        }
      ]
    },
    {
      id: "cli-tools",
      title: "⌨️ 命令行工具",
      icon: "⌨️",
      description: "命令行工具使用指南",
      content: "掌握所有命令行工具的使用方法。",
      sections: [
        {
          id: "meta-ps1",
          title: "meta.ps1 主工具",
          content: "### 常用命令\n```powershell\n# 查看项目状态\n./meta.ps1 status\n\n# 生成组件\n./meta.ps1 generate component <名称> --template=<模板>\n\n# 生成页面\n./meta.ps1 generate page <名称> --template=<模板>\n\n# 项目健康检查\n./meta.ps1 studio health\n```"
        },
        {
          id: "view-doc-ps1",
          title: "view-doc.ps1 文档查看器",
          content: "### 文档查看命令\n```powershell\n# 查看项目概览\n./view-doc.ps1 overview\n\n# 查看完整文档\n./view-doc.ps1 all\n\n# 查看架构文档\n./view-doc.ps1 architecture\n\n# 查看模板文档\n./view-doc.ps1 templates\n```"
        },
        {
          id: "project-management",
          title: "项目管理",
          content: "### 项目维护命令\n```powershell\n# 启动开发服务器\nnpm run dev\n\n# 构建生产版本\nnpm run build\n\n# 预览生产构建\nnpm run preview\n\n# 检查依赖\nnpm audit\n```"
        }
      ]
    },
    {
      id: "architecture",
      title: "🏗️ 系统架构",
      icon: "🏗️",
      description: "技术架构与设计模式",
      content: "了解系统内部架构和设计原理。",
      sections: [
        {
          id: "tech-stack",
          title: "技术栈",
          content: "### 前端技术栈\n- **React 18**: 用户界面库\n- **TypeScript**: 类型安全的JavaScript\n- **Vite**: 构建工具和开发服务器\n- **React Router**: 路由管理\n- **CSS Modules**: 样式隔离\n\n### 开发工具\n- **PowerShell**: 命令行工具\n- **Git**: 版本控制\n- **ESLint**: 代码检查\n- **Prettier**: 代码格式化"
        },
        {
          id: "project-structure",
          title: "项目结构",
          content: "```\nmetacoding-new/\n src/\n    components/     # 可复用组件\n    pages/         # 页面组件\n    routes/        # 路由配置\n    styles/        # 全局样式\n    services/      # API服务\n docs/              # 项目文档\n public/            # 静态资源\n meta.ps1          # 主命令行工具\n view-doc.ps1      # 文档查看器\n package.json      # 项目配置\n```"
        },
        {
          id: "design-patterns",
          title: "设计模式",
          content: "### 使用的设计模式\n- **组件化**: 模块化React组件\n- **声明式路由**: React Router配置\n- **状态管理**: React Hooks\n- **模板方法**: 代码生成模板\n- **命令模式**: 命令行工具"
        }
      ]
    },
    {
      id: "api-reference",
      title: "🔌 API 参考",
      icon: "🔌",
      description: "API接口和使用方法",
      content: "所有可用API的详细文档。",
      sections: [
        {
          id: "rest-api",
          title: "REST API",
          content: "### 基础端点\n```http\nGET    /api/projects      # 获取项目列表\nPOST   /api/projects      # 创建新项目\nGET    /api/projects/:id  # 获取项目详情\nPUT    /api/projects/:id  # 更新项目\nDELETE /api/projects/:id  # 删除项目\n```"
        },
        {
          id: "component-api",
          title: "组件API",
          content: "### 组件生成API\n```typescript\ninterface GenerateComponentOptions {\n  name: string;\n  template: 'basic' | 'modal' | 'form' | 'table';\n  path?: string;\n}\n\nfunction generateComponent(options: GenerateComponentOptions): Promise<void>;\n```"
        },
        {
          id: "cli-api",
          title: "命令行API",
          content: "### PowerShell模块API\n```powershell\n# 导入模块\nImport-Module .\meta.ps1\n\n# 可用函数\nGet-MetaStatus          # 获取状态\nNew-MetaComponent       # 生成组件\nNew-MetaPage           # 生成页面\nTest-MetaHealth        # 健康检查\n```"
        }
      ]
    }
  ];

  const activeDocument = documentation.find(doc => doc.id === activeDoc) || documentation[0];
  const activeSectionData = activeDocument.sections.find(section => section.id === activeSection) || activeDocument.sections[0];

  const filteredDocs = documentation.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="docs-page">
      <div className="page-header">
        <h1>📚 Metacoding Studio 文档</h1>
        <p>完整的开发指南和API参考</p>
      </div>

      <div className="docs-search">
        <input
          type="text"
          placeholder="搜索文档..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="docs-container">
        <div className="docs-sidebar">
          <h3>📖 文档目录</h3>
          <div className="docs-categories">
            {filteredDocs.map((doc) => (
              <button
                key={doc.id}
                className={`docs-category ${activeDoc === doc.id ? "active" : ""}`}
                onClick={() => {
                  setActiveDoc(doc.id);
                  setActiveSection(doc.sections[0].id);
                }}
              >
                <span className="category-icon">{doc.icon}</span>
                <div className="category-info">
                  <span className="category-title">{doc.title}</span>
                  <span className="category-desc">{doc.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="docs-content">
          <div className="docs-main">
            <div className="docs-header">
              <h2>
                <span className="doc-icon">{activeDocument.icon}</span>
                {activeDocument.title}
              </h2>
              <p className="doc-description">{activeDocument.content}</p>
            </div>

            <div className="docs-sections">
              <div className="section-nav">
                {activeDocument.sections.map((section) => (
                  <button
                    key={section.id}
                    className={`section-tab ${activeSection === section.id ? "active" : ""}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </button>
                ))}
              </div>

              <div className="section-content">
                <h3>{activeSectionData.title}</h3>
                <div className="content-text">
                  {activeSectionData.content.split("\n").map((line, index) => {
                    if (line.startsWith("### ")) {
                      return <h4 key={index}>{line.replace("### ", "")}</h4>;
                    } else if (line.startsWith("- **")) {
                      const match = line.match(/\*\*(.*?)\*\*: (.*)/);
                      return match ? (
                        <p key={index}>
                          <strong>{match[1]}</strong>: {match[2]}
                        </p>
                      ) : <p key={index}>{line}</p>;
                    } else if (line.trim() === "") {
                      return <br key={index} />;
                    } else {
                      return <p key={index}>{line}</p>;
                    }
                  })}
                </div>

                {activeSectionData.code && (
                  <div className="code-block">
                    <div className="code-header">
                      <span>代码示例</span>
                      <button 
                        className="copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(activeSectionData.code || "");
                          alert("代码已复制到剪贴板！");
                        }}
                      >
                        📋 复制代码
                      </button>
                    </div>
                    <pre><code>{activeSectionData.code}</code></pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="docs-sidebar-right">
            <div className="quick-links">
              <h4>🔗 快速链接</h4>
              <a href="/dashboard" className="quick-link">📊 仪表板</a>
              <a href="/components" className="quick-link">📦 组件库</a>
              <a href="/settings" className="quick-link">⚙️ 设置</a>
            </div>

            <div className="doc-actions">
              <h4>⚡ 快速操作</h4>
              <button 
                className="action-btn"
                onClick={() => window.print()}
              >
                🖨️ 打印文档
              </button>
              <button 
                className="action-btn"
                onClick={() => {
                  const content = `# ${activeDocument.title}\n\n${activeSectionData.content}`;
                  navigator.clipboard.writeText(content);
                  alert("文档内容已复制到剪贴板！");
                }}
              >
                📋 复制章节
              </button>
              <button 
                className="action-btn"
                onClick={() => {
                  const markdown = `# Metacoding Studio 文档\n\n## ${activeDocument.title}\n\n### ${activeSectionData.title}\n\n${activeSectionData.content}`;
                  const blob = new Blob([markdown], { type: "text/markdown" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${activeDocument.id}-${activeSectionData.id}.md`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                💾 导出Markdown
              </button>
            </div>

            <div className="doc-info">
              <h4>ℹ️ 文档信息</h4>
              <p>最后更新: {new Date().toLocaleDateString()}</p>
              <p>版本: v2.0</p>
              <p>章节数: {activeDocument.sections.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="docs-footer">
        <p>需要帮助？访问 <a href="/settings">设置页面</a> 或查看 <a href="/">首页</a> 获取更多信息。</p>
        <p className="footer-note">© {new Date().getFullYear()} Metacoding Studio - 知识共享</p>
      </div>
    </div>
  );
};

export default Docs;
