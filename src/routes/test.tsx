import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PureTest from "../pages/PureTest";

// 最简单的路由，只包含纯净测试
const TestRoutes: React.FC = () => {
  return (
    <Router>
      <div style={{ padding: "1rem", background: "#667eea", color: "white" }}>
        <h2 style={{ margin: 0 }}>🧪 测试模式</h2>
      </div>
      <Routes>
        <Route path="/" element={<PureTest />} />
        <Route path="/pure-test" element={<PureTest />} />
      </Routes>
    </Router>
  );
};

export default TestRoutes;
