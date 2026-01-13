import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// 功能卡片组件
const FeatureCard = ({ icon, title, description, link }: any) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <Link to={link} className="feature-link">
      开始使用 
    </Link>
  </div>
);

// 项目统计组件
const StatsCard = () => (
  <div className="stats-card">
    <h3>📊 项目统计</h3>
    <div className="stats-grid">
      <div className="stat-item">
        <span className="stat-number">128</span>
        <span className="stat-label">总生成次数</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">42</span>
        <span className="stat-label">活跃项目</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">15</span>
        <span className="stat-label">模板数量</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">98%</span>
        <span className="stat-label">成功率</span>
      </div>
    </div>
  </div>
);

// 快速开始指南
const QuickStartGuide = () => (
  <div className="quick-start-guide">
    <h3>🚀 快速开始</h3>
    <div className="steps">
      <div className="step">
        <div className="step-number">1</div>
        <div className="step-content">
          <h4>选择模板</h4>
          <p>从丰富的模板库中选择适合的模板</p>
        </div>
      </div>
      <div className="step">
        <div className="step-number">2</div>
        <div className="step-content">
          <h4>配置项目</h4>
          <p>自定义项目名称、功能和配置选项</p>
        </div>
      </div>
      <div className="step">
        <div className="step-number">3</div>
        <div className="step-content">
          <h4>一键生成</h4>
          <p>点击按钮，自动生成完整项目结构</p>
        </div>
      </div>
      <div className="step">
        <div className="step-number">4</div>
        <div className="step-content">
          <h4>下载使用</h4>
          <p>下载生成的项目，开始你的开发之旅</p>
        </div>
      </div>
    </div>
  </div>
);

// 最近项目组件
const RecentProjects = () => {
  const projects = [
    { name: "电商后台管理系统", type: "React + TypeScript", date: "今天" },
    { name: "移动端UI组件库", type: "Vue 3 + Vite", date: "昨天" },
    { name: "企业级API服务", type: "NestJS + MongoDB", date: "3天前" },
    { name: "数据可视化平台", type: "React + ECharts", date: "1周前" },
  ];

  return (
    <div className="recent-projects">
      <div className="section-header">
        <h3>📁 最近项目</h3>
        <Link to="/projects" className="view-all">查看全部 </Link>
      </div>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-info">
              <h4>{project.name}</h4>
              <p>{project.type}</p>
            </div>
            <div className="project-meta">
              <span className="project-date">{project.date}</span>
              <button className="project-action">重新生成</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Home() {
  const features = [
    {
      icon: "⚡",
      title: "快速生成",
      description: "一键生成完整项目结构，节省配置时间",
      link: "/generator"
    },
    {
      icon: "📚",
      title: "丰富模板",
      description: "支持 React、Vue、NestJS 等多种框架模板",
      link: "/templates"
    },
    {
      icon: "🔧",
      title: "灵活配置",
      description: "自定义项目配置，满足不同开发需求",
      link: "/generator"
    },
    {
      icon: "📦",
      title: "项目管理",
      description: "管理生成的项目，随时重新生成或导出",
      link: "/projects"
    },
    {
      icon: "⚙️",
      title: "智能配置",
      description: "根据选择自动配置最佳开发环境",
      link: "/generator"
    },
    {
      icon: "🚀",
      title: "高效开发",
      description: "专注于业务逻辑，跳过繁琐的初始化",
      link: "/generator"
    }
  ];

  return (
    <div className="home-page">
      {/* 英雄区域 */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🚀 智能代码生成平台
          </h1>
          <p className="hero-subtitle">
            一键生成企业级项目，让开发更高效、更专注
          </p>
          <div className="hero-actions">
            <Link to="/generator" className="hero-button primary">
              <span>⚡ 立即开始</span>
            </Link>
            <Link to="/templates" className="hero-button secondary">
              <span>📚 浏览模板</span>
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">1,000+</span>
            <span className="hero-stat-label">项目生成</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">50+</span>
            <span className="hero-stat-label">模板类型</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">99%</span>
            <span className="hero-stat-label">用户满意</span>
          </div>
        </div>
      </div>

      {/* 核心功能 */}
      <section className="features-section">
        <h2 className="section-title">✨ 核心功能</h2>
        <p className="section-subtitle">我们提供全方位的项目生成解决方案</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* 统计与指南 */}
      <div className="dashboard-grid">
        <StatsCard />
        <QuickStartGuide />
      </div>

      {/* 最近项目 */}
      <RecentProjects />

      {/* 使用场景 */}
      <section className="use-cases">
        <h2 className="section-title">🎯 适用场景</h2>
        <div className="cases-grid">
          <div className="case-card">
            <div className="case-icon">🏢</div>
            <h3>企业项目</h3>
            <p>快速搭建企业级应用基础架构，统一技术栈和规范</p>
          </div>
          <div className="case-card">
            <div className="case-icon">🎓</div>
            <h3>学习实践</h3>
            <p>为学习新技术提供标准项目模板，专注核心知识</p>
          </div>
          <div className="case-card">
            <div className="case-icon">⚡</div>
            <h3>快速原型</h3>
            <p>快速验证产品想法，减少项目初始化时间</p>
          </div>
          <div className="case-card">
            <div className="case-icon">🔧</div>
            <h3>团队协作</h3>
            <p>统一团队开发环境配置，提高协作效率</p>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <div className="cta-section">
        <h2>准备好开始了吗？</h2>
        <p>现在就开始使用 MetaCoding，体验高效的代码生成</p>
        <div className="cta-actions">
          <Link to="/generator" className="cta-button primary">
            🚀 免费开始使用
          </Link>
          <Link to="/templates" className="cta-button outline">
            📚 查看模板示例
          </Link>
        </div>
      </div>
    </div>
  );
}
