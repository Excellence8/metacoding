Write-Host "开始修复项目问题..." -ForegroundColor Green

# 1. 修复 Analytics 导出功能
Write-Host "1. 修复 Analytics 导出功能..." -ForegroundColor Yellow

$analyticsFix = @"
import React from "react";
import "./Analytics.css";

const Analytics: React.FC = () => {
  const handleExportReport = () => {
    const reportData = {
      title: "数据分析报告",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      summary: "这是一个测试报告"
    };
    
    const jsonStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-report-` + new Date().toISOString().split("T")[0] + `.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    alert("数据分析报告已成功导出为JSON文件！");
  };

  return (
    <div className="analytics-page">
      <h1>📈 数据分析面板</h1>
      
      <div className="data-export">
        <h2>📥 数据导出</h2>
        <div className="export-options">
          <button className="export-btn json" onClick={handleExportReport}>
            <span className="export-icon">📄</span>
            <span className="export-text">导出JSON报告</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
"@

Set-Content -Path "src/pages/Analytics/index.tsx" -Value $analyticsFix -Encoding UTF8

# 2. 创建 Analytics.css 文件
$analyticsCSS = @"
/* Analytics.css 中的导出样式 */

.export-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.export-btn {
  padding: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: #f8f9fa;
  border: 2px solid transparent;
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.export-btn.json:hover {
  border-color: #10b981;
  background: #f0f9ff;
}
"@

# 确保目录存在
if (!(Test-Path "src/pages/Analytics")) {
    New-Item -ItemType Directory -Path "src/pages/Analytics" -Force
}

Set-Content -Path "src/pages/Analytics/Analytics.css" -Value $analyticsCSS -Encoding UTF8

# 3. 修复 Settings API 密钥显示
Write-Host "2. 修复 Settings API 密钥显示..." -ForegroundColor Yellow

$settingsFix = @"
import React, { useState } from "react";
import "./Settings.css";

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState("sk-1234567890abcdef1234567890abcdef");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleResetApiKey = () => {
    const chars = "abcdef0123456789";
    let newKey = "sk-";
    for (let i = 0; i < 32; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
"@

# 确保目录存在
if (!(Test-Path "src/pages/Settings")) {
    New-Item -ItemType Directory -Path "src/pages/Settings" -Force
}

Set-Content -Path "src/pages/Settings/index.tsx" -Value $settingsFix -Encoding UTF8

# 4. 创建 Settings.css 文件
$settingsCSS = @"
.settings-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.setting-section {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.setting-section h2 {
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f3f4f6;
}

.api-key-display label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #4b5563;
}

.api-key-input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.api-key-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  background: #f9fafb;
}

.toggle-visibility {
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}

.api-key-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
"@

Set-Content -Path "src/pages/Settings/Settings.css" -Value $settingsCSS -Encoding UTF8

Write-Host "✅ 所有问题已修复完成！" -ForegroundColor Green
Write-Host "请运行以下命令启动项目：" -ForegroundColor Cyan
Write-Host "npm run dev" -ForegroundColor White
