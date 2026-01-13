import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  const features = [
    { icon: "🤖", title: "智能代码生成", desc: "基于AI的组件、页面、服务自动生成" },
    { icon: "🏗️", title: "企业级架构", desc: "TypeScript + React + 模块化设计" },
    { icon: "📚", title: "完整文档系统", desc: "自动生成的文档和项目管理工具" },
    { icon: "⚡", title: "快速开发", desc: "Vite构建，热重载，现代化工具链" },
  ];

  const quickCommands = [
    { cmd: "./meta.ps1 status", desc: "查看项目状态和统计信息" },
    { cmd: "./meta.ps1 generate component basic NewComponent", desc: "生成基础组件" },
    { cmd: "./meta.ps1 generate page dashboard NewPage", desc: "生成仪表板页面" },
    { cmd: "./view-doc.ps1 overview", desc: "查看项目概览文档" },
  ];

  const projectStats = [
    { label: "组件数量", value: "30+", icon: "📦" },
    { label: "页面数量", value: "17+", icon: "📄" },
    { label: "项目健康度", value: "100%", icon: "❤️" },
    { label: "开发服务器", value: "运行中", icon: "⚡" },
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>🚀 Metacoding Studio v2.0</h1>
          <p className="subtitle">AI驱动的智能代码生成与项目管理平台</p>
          <p className="description">
            欢迎使用 Metacoding Studio，你的企业级前端开发平台已准备就绪！
            通过智能代码生成和现代化工具链，快速构建高质量的React应用。
          </p>
          
          <div className="hero-actions">
            <a href="/dashboard" className="primary-btn">
              开始使用 
            </a>
            <a href="/components" className="secondary-btn">
              浏览组件库
            </a>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>✨ 核心功能</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-section">
        <h2>📊 项目统计</h2>
        <div className="stats-grid">
          {projectStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-start-section">
        <h2>⚡ 快速开始</h2>
        <div className="commands-list">
          {quickCommands.map((item, index) => (
            <div key={index} className="command-item">
              <code>{item.cmd}</code>
              <span className="command-desc">{item.desc}</span>
              <button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(item.cmd);
                  alert(`已复制命令: ${item.cmd}`);
                }}
              >
                复制
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="navigation-guide">
        <h2>🧭 快速导航</h2>
        <div className="navigation-grid">
          <a href="/dashboard" className="nav-card">
            <div className="nav-icon">📊</div>
            <h3>仪表板</h3>
            <p>查看项目状态和统计信息</p>
          </a>
          <a href="/components" className="nav-card">
            <div className="nav-icon">📦</div>
            <h3>组件库</h3>
            <p>浏览和生成组件</p>
          </a>
          <a href="/docs" className="nav-card">
            <div className="nav-icon">📚</div>
            <h3>项目文档</h3>
            <p>查看完整使用指南</p>
          </a>
          <a href="/settings" className="nav-card">
            <div className="nav-icon">⚙️</div>
            <h3>设置</h3>
            <p>配置项目参数</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
