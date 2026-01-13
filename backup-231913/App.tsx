// 最简单的测试版本
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => (
  <div style={{ padding: "20px" }}>
    <h1>🏠 MetaCoding 首页</h1>
    <p>项目已成功启动！</p>
    <Link to="/generator" style={{ color: "blue", textDecoration: "underline" }}>
      前往生成器页面
    </Link>
  </div>
);

const Generator = () => (
  <div style={{ padding: "20px" }}>
    <h1 style={{ color: "red" }}>⚡ 代码生成器</h1>
    <p>这里是代码生成器页面</p>
    <button 
      onClick={() => alert("🚀 一键生成项目功能正在开发中！")}
      style={{
        padding: "12px 24px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "20px"
      }}
    >
      🚀 一键生成项目
    </button>
    <br /><br />
    <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
      返回首页
    </Link>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
        <nav style={{ 
          background: "white", 
          padding: "15px 20px", 
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          gap: "20px"
        }}>
          <Link to="/" style={{ textDecoration: "none", color: "#333" }}>🏠 首页</Link>
          <Link to="/generator" style={{ textDecoration: "none", color: "#333" }}>⚡ 生成器</Link>
          <span style={{ marginLeft: "auto", color: "#666" }}>MetaCoding v1.0</span>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
