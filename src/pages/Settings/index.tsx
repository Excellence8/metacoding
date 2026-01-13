import React, { useState } from "react";
import "./Settings.css";

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState("sk-1234567890abcdef1234567890abcdef");
  const [showApiKey, setShowApiKey] = useState(false);

  const generateNewApiKey = () => {
    const chars = "abcdef0123456789";
    let newKey = "sk-";
    for (let i = 0; i < 32; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newKey;
  };

  const handleResetApiKey = () => {
    const newKey = generateNewApiKey();
    setApiKey(newKey);
    alert("✅ API密钥已成功重置！\n新密钥：" + newKey);
  };

  return (
    <div className="settings-page">
      <h1>⚙️ 系统设置</h1>
      
      <div className="setting-section">
        <h2>🔑 API 设置</h2>
        
        <div className="api-key-display">
          <label>API 密钥</label>
          <div className="api-key-input-group">
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              readOnly
              className="api-key-input"
              style={{
                fontFamily: "monospace",
                letterSpacing: showApiKey ? "normal" : "0.1em"
              }}
            />
            <button 
              className="toggle-visibility"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? "👁️ 隐藏" : "👁️ 显示"}
            </button>
          </div>
          
          <div className="api-key-actions">
            <button className="btn-primary" onClick={handleResetApiKey}>
              🔄 重新生成密钥
            </button>
            <button 
              className="btn-secondary"
              onClick={() => {
                navigator.clipboard.writeText(apiKey);
                alert("✅ API密钥已复制到剪贴板！");
              }}
            >
              📋 复制密钥
            </button>
            <button 
              className="btn-secondary"
              onClick={() => {
                const usage = {
                  requests: 1245,
                  limit: 10000,
                  resetDate: "2026-01-31"
                };
                alert(`API使用情况：
请求数: ${usage.requests}/${usage.limit}
重置日期: ${usage.resetDate}
剩余: ${usage.limit - usage.requests} 次请求`);
              }}
            >
              📊 使用情况
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
