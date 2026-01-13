import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 导入所有页面组件
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Products from "../pages/Products";
import Settings from "../pages/Settings";
import Components from "../pages/Components";
import Docs from "../pages/Docs";

const AppRoutes: React.FC = () => {
  const navItems = [
    { path: "/", name: "🏠 首页", component: Home },
    { path: "/dashboard", name: "📊 仪表板", component: Dashboard },
    { path: "/analytics", name: "📈 分析", component: Analytics },
    { path: "/products", name: "🛒 产品", component: Products },
    { path: "/settings", name: "⚙️ 设置", component: Settings },
    { path: "/components", name: "📦 组件库", component: Components },
    { path: "/docs", name: "📚 文档", component: Docs },
  ];

  return (
    <Router>
      <nav style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem 2rem",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <div style={{ 
          fontSize: "1.2rem", 
          fontWeight: "bold", 
          color: "white",
          marginRight: "1rem"
        }}>
          🚀 Metacoding Studio
        </div>
        
        <div style={{ 
          display: "flex", 
          gap: "0.5rem", 
          flexWrap: "wrap" 
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: "white",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                background: "rgba(255, 255, 255, 0.1)",
                transition: "background 0.3s"
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <main style={{ 
        padding: "2rem", 
        minHeight: "calc(100vh - 120px)"
      }}>
        <Routes>
          {navItems.map((item) => (
            <Route key={item.path} path={item.path} element={<item.component />} />
          ))}
        </Routes>
      </main>

      <footer style={{
        background: "#333",
        color: "white",
        padding: "1rem",
        textAlign: "center"
      }}>
        <p>Metacoding Studio v2.0 © {new Date().getFullYear()}</p>
      </footer>
    </Router>
  );
};

export default AppRoutes;

