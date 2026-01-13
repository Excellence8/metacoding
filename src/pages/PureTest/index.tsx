import React from "react";

// 绝对纯净的组件，没有任何外部依赖
const PureTest: React.FC = () => {
  const handleClick = () => {
    console.log("PureTest: 按钮点击");
    const element = document.createElement("div");
    element.textContent = "测试DOM操作";
    element.style.color = "green";
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 1000);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ color: "#333", marginBottom: "1rem" }}>
        🧪 绝对纯净测试
      </h1>
      
      <p style={{ color: "#666", marginBottom: "2rem", textAlign: "center" }}>
        这个页面不使用任何路由、状态管理或复杂库<br/>
        只使用最基础的 React 和 DOM API
      </p>
      
      <div style={{ 
        background: "#f8f9fa", 
        padding: "2rem", 
        borderRadius: "10px",
        maxWidth: "500px",
        width: "100%"
      }}>
        <h3 style={{ marginBottom: "1rem" }}>测试项目:</h3>
        <ul style={{ textAlign: "left", marginBottom: "1.5rem" }}>
          <li>✅ React.createElement</li>
          <li>✅ DOM 操作</li>
          <li>✅ 事件处理</li>
          <li>✅ 内联样式</li>
          <li>✅ 控制台日志</li>
        </ul>
        
        <button
          onClick={handleClick}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500"
          }}
        >
          测试按钮
        </button>
      </div>
      
      <div style={{ 
        marginTop: "2rem", 
        fontSize: "0.9rem", 
        color: "#999",
        textAlign: "center" 
      }}>
        <p>请检查浏览器控制台是否有错误</p>
        <p>如果这个页面没有错误，问题在其他地方</p>
      </div>
    </div>
  );
};

export default PureTest;
