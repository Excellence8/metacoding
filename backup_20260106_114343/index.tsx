import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 导入页面组件
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Products from "../pages/Products";
import Settings from "../pages/Settings";
import Components from "../pages/Components";
import Docs from "../pages/Docs";

const AppRoutes: React.FC = () => {
  const navItems = [
    { path: "/", name: "🏠 Home", component: Home },
    { path: "/dashboard", name: "📊 Dashboard", component: Dashboard },
    { path: "/analytics", name: "📈 Analytics", component: Analytics },
    { path: "/products", name: "🛒 Products", component: Products },
    { path: "/settings", name: "⚙️ Settings", component: Settings },
    { path: "/components", name: "📦 Components", component: Components },
    { path: "/docs", name: "📚 Docs", component: Docs },
  ];

  return (
    <Router>
      <nav style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1rem 2rem",
        display: "flex",
        gap: "2rem",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "white" }}>
          🚀 Metacoding Studio
        </div>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
                transition: "background 0.3s",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div style={{ marginLeft: "auto", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={() => window.location.href = "/components"}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            🎨 组件库
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            🔄 刷新
          </button>
        </div>
      </nav>

      <div style={{ padding: "2rem", minHeight: "70vh" }}>
        <Routes>
          {navItems.map((item) => (
            <Route key={item.path} path={item.path} element={<item.component />} />
          ))}
        </Routes>
      </div>

      <footer style={{
        background: "#333",
        color: "white",
        padding: "1.5rem",
        textAlign: "center",
        marginTop: "auto"
      }}>
        <p>Metacoding Studio v2.0 © {new Date().getFullYear()} - AI驱动的智能开发平台</p>
        <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.5rem" }}>
          运行 .\meta.ps1 generate 生成代码，或 .\view-doc.ps1 overview 查看文档
        </p>
      </footer>
    </Router>
  );
};

export default AppRoutes;
