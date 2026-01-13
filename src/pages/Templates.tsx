import React, { useState, useEffect } from "react";
import { ProjectGeneratorService } from "../services/ProjectGeneratorService";
import "./Templates.css";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  category: string;
  tags: string[];
  stars: number;
  downloads: number;
  config: any;
}

const TemplateCard = ({ template, onSelect }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="template-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="template-header">
        <div className="template-icon">{template.icon}</div>
        <div className="template-badge">{template.type}</div>
      </div>
      <div className="template-content">
        <h3>{template.name}</h3>
        <p className="template-description">{template.description}</p>
        <div className="template-tags">
          {template.tags.map((tag: string, index: number) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <div className="template-stats">
          <span className="stat">⭐ {template.stars.toLocaleString()}</span>
          <span className="stat">📥 {template.downloads.toLocaleString()} 使用</span>
        </div>
      </div>
      <div className="template-actions">
        <button 
          className="template-select-btn"
          onClick={() => onSelect(template)}
        >
          使用此模板
        </button>
        {isHovered && (
          <button 
            className="template-preview-btn"
            onClick={() => alert(`预览模板: ${template.name}`)}
          >
            预览
          </button>
        )}
      </div>
    </div>
  );
};

export function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTemplates: 0,
    totalDownloads: 0,
    averageRating: 0
  });

  useEffect(() => {
    // 模拟加载模板数据
    const loadTemplates = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockTemplates: Template[] = [
        {
          id: "react-ts-starter",
          name: "React + TypeScript 入门套件",
          description: "现代化的 React 应用模板，包含 TypeScript、Vite、ESLint、Prettier 等最佳实践配置，适合快速开始新项目",
          icon: "⚛️",
          type: "前端",
          category: "react",
          tags: ["React", "TypeScript", "Vite", "ESLint", "Prettier", "现代"],
          stars: 1245,
          downloads: 8921,
          config: {
            template: "react-ts",
            features: ["router", "state", "testing", "eslint", "prettier"],
            description: "React + TypeScript 入门项目"
          }
        },
        {
          id: "vue-ts-admin",
          name: "Vue 3 管理后台",
          description: "基于 Vue 3 和 Composition API 的企业级管理后台模板，包含 Vue Router、Pinia、Vite、Element Plus",
          icon: "🖖",
          type: "前端",
          category: "vue",
          tags: ["Vue 3", "TypeScript", "Admin", "Vite", "Pinia", "UI"],
          stars: 892,
          downloads: 6423,
          config: {
            template: "vue-ts",
            features: ["router", "state", "auth", "eslint", "prettier", "ui-framework"],
            description: "Vue 3 管理后台模板"
          }
        },
        {
          id: "nestjs-api",
          name: "NestJS REST API",
          description: "完整的 NestJS REST API 模板，包含 TypeORM、JWT 认证、Swagger 文档、权限系统、错误处理等企业级功能",
          icon: "🐈",
          type: "后端",
          category: "node",
          tags: ["NestJS", "TypeScript", "TypeORM", "JWT", "Swagger", "REST"],
          stars: 2312,
          downloads: 15345,
          config: {
            template: "nestjs",
            features: ["auth", "database", "api-docs", "validation", "testing"],
            description: "NestJS REST API 服务"
          }
        },
        {
          id: "nextjs-fullstack",
          name: "Next.js 全栈应用",
          description: "Next.js 14 全栈应用模板，支持 App Router、Prisma、NextAuth、Tailwind CSS、国际化等",
          icon: "⏭️",
          type: "全栈",
          category: "react",
          tags: ["Next.js", "React", "Prisma", "NextAuth", "Tailwind", "SSR"],
          stars: 3421,
          downloads: 21987,
          config: {
            template: "react-ts",
            features: ["router", "auth", "database", "i18n", "testing", "ssr"],
            description: "Next.js 全栈应用模板"
          }
        },
        {
          id: "express-mongo",
          name: "Express + MongoDB API",
          description: "简洁的 Express.js API 模板，包含基本的路由、中间件、错误处理、MongoDB 集成和 API 文档",
          icon: "🚂",
          type: "后端",
          category: "node",
          tags: ["Express", "Node.js", "MongoDB", "JWT", "REST", "简单"],
          stars: 1156,
          downloads: 9876,
          config: {
            template: "express-ts",
            features: ["database", "auth", "validation", "api-docs"],
            description: "Express + MongoDB API 服务"
          }
        },
        {
          id: "react-native-app",
          name: "React Native 移动应用",
          description: "React Native 移动应用模板，支持 TypeScript、React Navigation、Redux Toolkit、Firebase 等",
          icon: "📱",
          type: "移动端",
          category: "react",
          tags: ["React Native", "TypeScript", "Navigation", "Redux", "Expo", "移动"],
          stars: 2278,
          downloads: 11654,
          config: {
            template: "react-ts",
            features: ["router", "state", "auth", "notification", "mobile"],
            description: "React Native 移动应用"
          }
        },
        {
          id: "electron-desktop",
          name: "Electron 桌面应用",
          description: "Electron 桌面应用模板，集成 React、Vite、TypeScript、Electron Builder 和自动更新功能",
          icon: "💻",
          type: "桌面端",
          category: "electron",
          tags: ["Electron", "React", "TypeScript", "Vite", "打包", "桌面"],
          stars: 934,
          downloads: 5987,
          config: {
            template: "react-ts",
            features: ["desktop", "auto-update", "packaging", "native"],
            description: "Electron 桌面应用"
          }
        },
        {
          id: "nuxt3-ssr",
          name: "Nuxt.js 3 应用",
          description: "Nuxt.js 3 应用模板，支持 Vue 3、Composition API、Pinia、TypeScript、SSR/SSG、SEO 优化",
          icon: "🔄",
          type: "前端",
          category: "vue",
          tags: ["Nuxt.js", "Vue 3", "TypeScript", "Pinia", "SSR", "SEO"],
          stars: 1198,
          downloads: 8342,
          config: {
            template: "vue-ts",
            features: ["router", "state", "ssr", "seo", "i18n"],
            description: "Nuxt.js 3 SSR 应用"
          }
        }
      ];

      setTemplates(mockTemplates);
      
      // 计算统计信息
      setStats({
        totalTemplates: mockTemplates.length,
        totalDownloads: mockTemplates.reduce((sum, t) => sum + t.downloads, 0),
        averageRating: parseFloat((mockTemplates.reduce((sum, t) => sum + t.stars, 0) / mockTemplates.length / 1000).toFixed(1))
      });
      
      setLoading(false);
    };

    loadTemplates();
  }, []);

  const categories = [
    { id: "all", name: "全部模板", count: templates.length },
    { id: "react", name: "React 生态", count: templates.filter(t => t.category === "react").length },
    { id: "vue", name: "Vue 生态", count: templates.filter(t => t.category === "vue").length },
    { id: "node", name: "Node.js", count: templates.filter(t => t.category === "node").length },
    { id: "mobile", name: "移动端", count: templates.filter(t => t.type === "移动端").length },
    { id: "desktop", name: "桌面端", count: templates.filter(t => t.type === "桌面端").length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "react" && template.category === "react") ||
      (selectedCategory === "vue" && template.category === "vue") ||
      (selectedCategory === "node" && template.category === "node") ||
      (selectedCategory === "mobile" && template.type === "移动端") ||
      (selectedCategory === "desktop" && template.type === "桌面端");

    const matchesSearch = searchTerm === "" || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (template: Template) => {
    // 保存模板配置到本地存储
    localStorage.setItem("selected_template", JSON.stringify(template.config));
    
    // 跳转到生成器页面并传递模板信息
    const message = `已选择模板: ${template.name}\n\n将在生成器中预填此模板配置。`;
    alert(message);
    
    // 在实际应用中，可以使用路由状态或Context传递数据
    // 这里使用简单的URL参数
    window.location.href = `/generator?template=${template.id}`;
  };

  const handleCreateCustomTemplate = () => {
    alert("创建自定义模板功能正在开发中...");
  };

  const handleQuickGenerate = async (template: Template) => {
    const defaultName = template.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const config = {
      ...template.config,
      name: defaultName,
      author: "MetaCoding 用户",
      features: [...template.config.features]
    };

    try {
      const project = await ProjectGeneratorService.generateProject(config);
      alert(`✅ 快速生成成功！\n\n项目: ${config.name}\n已生成 ${project.files.length} 个文件`);
      console.log("快速生成的项目:", project);
    } catch (error: any) {
      alert(`生成失败: ${error.message}`);
    }
  };

  const handleExportTemplates = () => {
    const data = JSON.stringify(templates, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "metacoding-templates.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert("✅ 模板库已导出为 JSON 文件");
  };

  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1>📚 模板库</h1>
        <p className="page-subtitle">
          选择适合的模板快速开始，或创建自己的模板
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="templates-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索模板名称、描述或标签..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <span className="filter-count">{category.count}</span>
            </button>
          ))}
        </div>

        <div className="control-actions">
          <button 
            className="control-btn secondary"
            onClick={handleExportTemplates}
          >
            📤 导出模板
          </button>
          <button 
            className="control-btn primary"
            onClick={handleCreateCustomTemplate}
          >
            + 创建模板
          </button>
        </div>
      </div>

      {/* 模板统计 */}
      <div className="templates-stats">
        <div className="stat-card">
          <span className="stat-number">{stats.totalTemplates}</span>
          <span className="stat-label">可用模板</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalDownloads.toLocaleString()}</span>
          <span className="stat-label">总使用次数</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.averageRating}k</span>
          <span className="stat-label">平均评分</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">12</span>
          <span className="stat-label">每周更新</span>
        </div>
      </div>

      {/* 加载状态 */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>加载模板库...</p>
        </div>
      ) : (
        /* 模板网格 */
        filteredTemplates.length > 0 ? (
          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>😕 未找到匹配的模板</h3>
            <p>尝试不同的搜索关键词或选择其他分类</p>
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              清除筛选条件
            </button>
          </div>
        )
      )}

      {/* 模板特色 */}
      <div className="template-features">
        <h2>✨ 模板特色功能</h2>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h4>开箱即用</h4>
            <p>所有模板都经过精心配置，下载即可开始开发</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔧</div>
            <h4>持续更新</h4>
            <p>模板定期更新，保持与最新技术栈同步</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📚</div>
            <h4>完整文档</h4>
            <p>每个模板都附带详细的使用文档和最佳实践</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <h4>安全可靠</h4>
            <p>经过严格测试，确保代码质量和安全性</p>
          </div>
        </div>
      </div>

      {/* 使用统计 */}
      <div className="usage-stats">
        <h2>📊 模板使用统计</h2>
        <div className="stats-chart">
          <div className="chart-item">
            <div className="chart-bar" style={{ height: "80%" }}>
              <span className="chart-label">React</span>
            </div>
            <span className="chart-value">42%</span>
          </div>
          <div className="chart-item">
            <div className="chart-bar" style={{ height: "65%" }}>
              <span className="chart-label">Vue</span>
            </div>
            <span className="chart-value">28%</span>
          </div>
          <div className="chart-item">
            <div className="chart-bar" style={{ height: "45%" }}>
              <span className="chart-label">Node.js</span>
            </div>
            <span className="chart-value">18%</span>
          </div>
          <div className="chart-item">
            <div className="chart-bar" style={{ height: "30%" }}>
              <span className="chart-label">其他</span>
            </div>
            <span className="chart-value">12%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
