import React from "react";
import "./Components.css";
import ComponentGenerator from "../../components/ComponentGenerator";
import CommandSimulator from "../../components/CommandSimulator";

const Components: React.FC = () => {
  const components = [
    { name: "Button", type: "基础", desc: "按钮组件", template: "basic" },
    { name: "Card", type: "展示", desc: "卡片组件", template: "basic" },
    { name: "Modal", type: "交互", desc: "模态框组件", template: "modal" },
    { name: "DataTable", type: "数据", desc: "数据表格", template: "table" },
    { name: "ContactForm", type: "表单", desc: "联系表单", template: "form" },
    { name: "Notification", type: "反馈", desc: "通知组件", template: "basic" },
    { name: "SearchBar", type: "搜索", desc: "搜索栏", template: "basic" },
    { name: "Sidebar", type: "布局", desc: "侧边栏", template: "basic" },
  ];

  const generateCommand = (name: string, template: string) => {
    return `./meta.ps1 generate component ${name} --template=${template}`;
  };

  return (
    <div className="components-page">
      <div className="page-header">
        <h1>📦 组件库</h1>
        <p>Metacoding Studio 提供的所有可用组件</p>
      </div>

      <ComponentGenerator />

      <div className="components-grid">
        {components.map((component, index) => (
          <div key={index} className="component-card">
            <div className="component-header">
              <span className="component-badge">{component.type}</span>
              <h3>{component.name}</h3>
            </div>
            <p className="component-desc">{component.desc}</p>
            <div className="component-actions">
              <code className="component-command">
                {generateCommand(component.name, component.template)}
              </code>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(generateCommand(component.name, component.template))}
              >
                复制命令
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="quick-generate">
        <h2>🎨 快速生成新组件</h2>
        <div className="generate-form">
          <div className="form-group">
            <label>组件名称:</label>
            <input type="text" id="componentName" placeholder="例如: UserCard" />
          </div>
          <div className="form-group">
            <label>模板类型:</label>
            <select id="componentTemplate">
              <option value="basic">基础组件</option>
              <option value="modal">模态框</option>
              <option value="form">表单</option>
              <option value="table">表格</option>
            </select>
          </div>
          <button
            className="generate-btn"
            onClick={() => {
              const name = (document.getElementById('componentName') as HTMLInputElement).value;
              const template = (document.getElementById('componentTemplate') as HTMLSelectElement).value;
              if (name) {
                const cmd = `./meta.ps1 generate component ${name} --template=${template}`;
                alert(`生成命令:\n${cmd}\n\n请在PowerShell中运行此命令`);
                navigator.clipboard.writeText(cmd);
              } else {
                alert("请输入组件名称");
              }
            }}
          >
            🚀 生成组件命令
          </button>
        </div>
      </div>

      <div className="command-simulator-section">
        <CommandSimulator />
      </div>
    </div>
  );
};

export default Components;
