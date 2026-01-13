import React, { useState } from "react";
import "./Settings.css";

const SettingSection = ({ title, children }: any) => (
  <div className="setting-section">
    <h3 className="section-title">{title}</h3>
    <div className="section-content">
      {children}
    </div>
  </div>
);

const SettingItem = ({ label, description, children }: any) => (
  <div className="setting-item">
    <div className="setting-info">
      <label className="setting-label">{label}</label>
      {description && <p className="setting-description">{description}</p>}
    </div>
    <div className="setting-control">
      {children}
    </div>
  </div>
);

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState("zh-CN");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false
  });
  const [apiKey, setApiKey] = useState("");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [tabSize, setTabSize] = useState(2);

  const handleSaveSettings = () => {
    const settings = {
      darkMode,
      autoSave,
      language,
      notifications,
      editor: {
        theme: editorTheme,
        fontSize,
        tabSize
      }
    };
    
    localStorage.setItem("metacoding-settings", JSON.stringify(settings));
    alert("✅ 设置已保存！");
  };

  const handleResetSettings = () => {
    if (confirm("确定要重置所有设置吗？这将恢复为默认配置。")) {
      localStorage.removeItem("metacoding-settings");
      setDarkMode(false);
      setAutoSave(true);
      setLanguage("zh-CN");
      setNotifications({ email: true, push: true, updates: false });
      setApiKey("");
      setEditorTheme("vs-dark");
      setFontSize(14);
      setTabSize(2);
      alert("设置已重置为默认值");
    }
  };

  const handleExportSettings = () => {
    const settings = {
      darkMode,
      autoSave,
      language,
      notifications,
      editor: { theme: editorTheme, fontSize, tabSize }
    };
    
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "metacoding-settings.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert("设置已导出为 JSON 文件");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>⚙️ 设置</h1>
        <p className="page-subtitle">
          自定义您的 MetaCoding 体验
        </p>
      </div>

      <div className="settings-container">
        {/* 左侧导航 */}
        <div className="settings-sidebar">
          <nav className="settings-nav">
            <a href="#general" className="nav-item active">🛠️ 通用设置</a>
            <a href="#editor" className="nav-item">📝 编辑器</a>
            <a href="#notifications" className="nav-item">🔔 通知</a>
            <a href="#account" className="nav-item">👤 账户</a>
            <a href="#advanced" className="nav-item">⚡ 高级</a>
            <a href="#about" className="nav-item">ℹ️ 关于</a>
          </nav>
          
          <div className="sidebar-actions">
            <button 
              className="sidebar-btn primary"
              onClick={handleSaveSettings}
            >
              💾 保存设置
            </button>
            <button 
              className="sidebar-btn outline"
              onClick={handleResetSettings}
            >
              🔄 重置设置
            </button>
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="settings-content">
          {/* 通用设置 */}
          <SettingSection title="🛠️ 通用设置">
            <SettingItem 
              label="深色模式" 
              description="切换深色/浅色主题"
            >
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </SettingItem>

            <SettingItem 
              label="自动保存" 
              description="自动保存项目配置更改"
            >
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </SettingItem>

            <SettingItem 
              label="界面语言" 
              description="选择界面显示语言"
            >
              <select
                className="select-input"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
                <option value="ja-JP">日本語</option>
                <option value="ko-KR">한국어</option>
              </select>
            </SettingItem>

            <SettingItem 
              label="默认项目模板" 
              description="创建新项目时默认使用的模板"
            >
              <select className="select-input">
                <option value="react-ts">React + TypeScript</option>
                <option value="vue-ts">Vue 3 + TypeScript</option>
                <option value="nestjs">NestJS API</option>
                <option value="nextjs">Next.js</option>
              </select>
            </SettingItem>
          </SettingSection>

          {/* 编辑器设置 */}
          <SettingSection title="📝 编辑器设置">
            <SettingItem 
              label="编辑器主题" 
              description="代码编辑器的颜色主题"
            >
              <select
                className="select-input"
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
              >
                <option value="vs">Visual Studio</option>
                <option value="vs-dark">Visual Studio Dark</option>
                <option value="hc-black">High Contrast Dark</option>
                <option value="hc-light">High Contrast Light</option>
              </select>
            </SettingItem>

            <SettingItem 
              label="字体大小" 
              description="编辑器中代码的字体大小"
            >
              <div className="range-control">
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="range-input"
                />
                <span className="range-value">{fontSize}px</span>
              </div>
            </SettingItem>

            <SettingItem 
              label="缩进大小" 
              description="Tab 键的缩进空格数"
            >
              <div className="tab-size-options">
                {[2, 4, 8].map(size => (
                  <button
                    key={size}
                    className={`tab-size-btn ${tabSize === size ? "active" : ""}`}
                    onClick={() => setTabSize(size)}
                  >
                    {size} 空格
                  </button>
                ))}
              </div>
            </SettingItem>

            <SettingItem 
              label="代码格式化" 
              description="保存时自动格式化代码"
            >
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </SettingItem>
          </SettingSection>

          {/* 通知设置 */}
          <SettingSection title="🔔 通知设置">
            <SettingItem 
              label="邮件通知" 
              description="接收项目生成完成的邮件通知"
            >
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                />
                <span className="toggle-slider"></span>
              </label>
            </SettingItem>

            <SettingItem 
              label="推送通知" 
              description="在浏览器中显示实时通知"
            >
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                />
                <span className="toggle-slider"></span>
              </label>
            </SettingItem>

            <SettingItem 
              label="更新通知" 
              description="接收新功能和模板更新的通知"
            >
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.updates}
                  onChange={(e) => setNotifications({...notifications, updates: e.target.checked})}
                />
                <span className="toggle-slider"></span>
              </label>
            </SettingItem>
          </SettingSection>

          {/* 账户设置 */}
          <SettingSection title="👤 账户设置">
            <SettingItem 
              label="API 密钥" 
              description="用于访问高级功能的 API 密钥"
            >
              <div className="api-key-input">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="输入您的 API 密钥"
                  className="api-input"
                />
                <button className="api-btn">生成</button>
              </div>
            </SettingItem>

            <SettingItem 
              label="数据同步" 
              description="将设置和项目同步到云端"
            >
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </SettingItem>
          </SettingSection>

          {/* 高级设置 */}
          <SettingSection title="⚡ 高级设置">
            <SettingItem 
              label="导出设置" 
              description="将当前设置导出为 JSON 文件"
            >
              <button 
                className="export-btn"
                onClick={handleExportSettings}
              >
                📥 导出设置
              </button>
            </SettingItem>

            <SettingItem 
              label="清除缓存" 
              description="清除本地存储的临时数据"
            >
              <button className="clear-btn">
                🗑️ 清除缓存
              </button>
            </SettingItem>

            <SettingItem 
              label="重置所有数据" 
              description="清除所有本地数据，恢复到初始状态"
            >
              <button className="danger-btn">
                ⚠️ 重置所有数据
              </button>
            </SettingItem>
          </SettingSection>

          {/* 关于 */}
          <SettingSection title="ℹ️ 关于">
            <div className="about-content">
              <div className="about-info">
                <h4>MetaCoding v1.0.0</h4>
                <p>智能代码生成平台</p>
                <p>© 2024 MetaCoding Team. All rights reserved.</p>
              </div>
              
              <div className="about-links">
                <a href="#" className="about-link">📖 用户手册</a>
                <a href="#" className="about-link">🐛 报告问题</a>
                <a href="#" className="about-link">💡 功能建议</a>
                <a href="#" className="about-link">📄 隐私政策</a>
              </div>
              
              <div className="version-info">
                <p>当前版本: 1.0.0</p>
                <p>最后更新: 2024-01-15</p>
                <button className="update-btn">
                  🔄 检查更新
                </button>
              </div>
            </div>
          </SettingSection>
        </div>
      </div>
    </div>
  );
}
