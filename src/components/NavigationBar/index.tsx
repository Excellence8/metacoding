import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar: React.FC = () => {
  const navItems = [
    { path: "/", name: "🏠 首页" },
    { path: "/home", name: "📋 项目首页" },
    { path: "/dashboard", name: "📊 仪表板" },
    { path: "/analytics-board", name: "📈 数据分析" },
    { path: "/products", name: "🛒 产品管理" },
    { path: "/customers", name: "👥 客户管理" },
    { path: "/admin", name: "⚙️ 管理面板" },
    { path: "/settings", name: "🔧 设置" },
  ];

  return (
    <nav className="navigation-bar">
      <div className="nav-logo">
        <span>🚀 Metacoding Studio</span>
      </div>
      
      <div className="nav-links">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className="nav-link">
            {item.name}
          </Link>
        ))}
      </div>
      
      <div className="nav-actions">
        <button className="nav-button" onClick={() => alert("打开生成器")}>
          🎨 生成组件
        </button>
        <button className="nav-button" onClick={() => window.open("http://localhost:5173/", "_blank")}>
          🔄 刷新
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
