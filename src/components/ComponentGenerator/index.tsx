import React, { useState } from "react";
import "./ComponentGenerator.css";

interface ComponentTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  css: string;
}

const ComponentGenerator: React.FC = () => {
  const [componentName, setComponentName] = useState("MyComponent");
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const [generatedCode, setGeneratedCode] = useState("");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [previewMode, setPreviewMode] = useState(true);

  const templates: ComponentTemplate[] = [
    {
      id: "basic",
      name: "基础组件",
      description: "简单的 React 函数组件",
      code: `import React from "react";
import "./{{COMPONENT_NAME}}.css";

const {{COMPONENT_NAME}}: React.FC = () => {
  return (
    <div className="{{component-name}}">
      <h1>{{COMPONENT_NAME}} 组件</h1>
      <p>这是一个 {{COMPONENT_NAME}} 组件</p>
    </div>
  );
};

export default {{COMPONENT_NAME}};`,
      css: `.{{component-name}} {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.{{component-name}} h1 {
  color: #333;
  margin-bottom: 1rem;
}

.{{component-name}} p {
  color: #666;
  line-height: 1.6;
}`
    },
    {
      id: "card",
      name: "卡片组件",
      description: "带有标题和内容的卡片组件",
      code: `import React from "react";
import "./{{COMPONENT_NAME}}.css";

interface {{COMPONENT_NAME}}Props {
  title?: string;
  content?: string;
  children?: React.ReactNode;
}

const {{COMPONENT_NAME}}: React.FC<{{COMPONENT_NAME}}Props> = ({ 
  title = "卡片标题", 
  content = "卡片内容",
  children 
}) => {
  return (
    <div className="{{component-name}}-card">
      {title && <h3 className="card-title">{title}</h3>}
      {content && <p className="card-content">{content}</p>}
      {children}
    </div>
  );
};

export default {{COMPONENT_NAME}};`,
      css: `.{{component-name}}-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.{{component-name}}-card:hover {
  transform: translateY(-5px);
}

.card-title {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.card-content {
  color: #666;
  line-height: 1.6;
}`
    },
    {
      id: "button",
      name: "按钮组件",
      description: "可定制的按钮组件",
      code: `import React from "react";
import "./{{COMPONENT_NAME}}.css";

interface {{COMPONENT_NAME}}Props {
  children: React.ReactNode;
  type?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
}

const {{COMPONENT_NAME}}: React.FC<{{COMPONENT_NAME}}Props> = ({
  children,
  type = "primary",
  size = "medium",
  onClick,
  disabled = false
}) => {
  const buttonClass = \`{{component-name}} \${type} \${size} \${disabled ? 'disabled' : ''}\`;
  
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default {{COMPONENT_NAME}};`,
      css: `.{{component-name}} {
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}

.{{component-name}}.primary {
  background: #667eea;
  color: white;
}

.{{component-name}}.secondary {
  background: #f3f4f6;
  color: #4b5563;
}

.{{component-name}}.danger {
  background: #ef4444;
  color: white;
}

.{{component-name}}.small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.{{component-name}}.medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.{{component-name}}.large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.{{component-name}}:hover:not(.disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
}

.{{component-name}}.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`
    }
  ];

  const generateComponent = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    const kebabName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    let code = template.code
      .replace(/{{COMPONENT_NAME}}/g, componentName)
      .replace(/{{component-name}}/g, kebabName);
    
    let css = template.css
      .replace(/{{component-name}}/g, kebabName);

    setGeneratedCode(code);
    setGeneratedCSS(css);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} 已复制到剪贴板`);
  };

  const downloadComponent = () => {
    const kebabName = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    // 创建文件内容
    const tsxContent = generatedCode;
    const cssContent = generatedCSS;
    
    // 创建下载链接
    const tsxBlob = new Blob([tsxContent], { type: 'text/plain' });
    const cssBlob = new Blob([cssContent], { type: 'text/css' });
    
    const tsxUrl = URL.createObjectURL(tsxBlob);
    const cssUrl = URL.createObjectURL(cssBlob);
    
    // 创建下载链接并触发点击
    const tsxLink = document.createElement('a');
    tsxLink.href = tsxUrl;
    tsxLink.download = `${componentName}.tsx`;
    tsxLink.click();
    
    const cssLink = document.createElement('a');
    cssLink.href = cssUrl;
    cssLink.download = `${componentName}.css`;
    cssLink.click();
    
    // 清理URL对象
    URL.revokeObjectURL(tsxUrl);
    URL.revokeObjectURL(cssUrl);
    
    alert(`组件文件已下载: ${componentName}.tsx 和 ${componentName}.css`);
  };

  const executeCommand = () => {
    const command = `.\\meta.ps1 generate component ${componentName} --template=${selectedTemplate}`;
    alert(`生成命令:\n${command}\n\n请在PowerShell中运行此命令`);
    navigator.clipboard.writeText(command);
  };

  // 初始生成
  React.useEffect(() => {
    generateComponent();
  }, []);

  return (
    <div className="component-generator">
      <div className="generator-header">
        <h2>⚡ 实时组件生成器</h2>
        <p>实时预览和生成 React 组件代码</p>
      </div>

      <div className="generator-controls">
        <div className="control-group">
          <label htmlFor="componentName">组件名称:</label>
          <input
            id="componentName"
            type="text"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            placeholder="输入组件名称（如: MyButton）"
          />
        </div>

        <div className="control-group">
          <label htmlFor="templateSelect">选择模板:</label>
          <select
            id="templateSelect"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name} - {template.description}
              </option>
            ))}
          </select>
        </div>

        <div className="control-buttons">
          <button className="generate-btn" onClick={generateComponent}>
            🔄 重新生成
          </button>
          <button className="command-btn" onClick={executeCommand}>
            ⚡ 生成命令
          </button>
          <button className="preview-btn" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? "📄 显示代码" : "👁️ 显示预览"}
          </button>
        </div>
      </div>

      <div className="preview-section">
        <div className="preview-header">
          <h3>{previewMode ? "👁️ 组件预览" : "📄 生成代码"}</h3>
          <div className="preview-actions">
            <button 
              className="copy-btn" 
              onClick={() => copyToClipboard(generatedCode, "组件代码")}
            >
              复制代码
            </button>
            <button 
              className="copy-btn" 
              onClick={() => copyToClipboard(generatedCSS, "样式代码")}
            >
              复制样式
            </button>
            <button 
              className="download-btn" 
              onClick={downloadComponent}
              disabled={!generatedCode}
            >
              下载文件
            </button>
          </div>
        </div>

        <div className="preview-content">
          {previewMode ? (
            <div className="live-preview">
              <div className="preview-container">
                <div dangerouslySetInnerHTML={{ 
                  __html: `
                    <style>${generatedCSS}</style>
                    <div class="${componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}">
                      ${generatedCode.includes('{{COMPONENT_NAME}} 组件') 
                        ? '<h1>' + componentName + ' 组件</h1><p>这是一个 ' + componentName + ' 组件</p>'
                        : generatedCode.includes('卡片标题')
                          ? '<h3 class="card-title">卡片标题</h3><p class="card-content">卡片内容</p>'
                          : '<button class="' + componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ' primary medium">示例按钮</button>'
                      }
                    </div>
                  `
                }} />
              </div>
            </div>
          ) : (
            <div className="code-preview">
              <div className="code-tabs">
                <div className="code-tab active">index.tsx</div>
                <div className="code-tab">{componentName}.css</div>
              </div>
              
              <div className="code-content">
                <pre><code>{generatedCode}</code></pre>
              </div>
              
              <div className="css-content">
                <pre><code>{generatedCSS}</code></pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="usage-tips">
        <h3>💡 使用提示</h3>
        <ul>
          <li>1. 修改组件名称和模板，实时查看代码变化</li>
          <li>2. 点击"生成命令"获取PowerShell生成命令</li>
          <li>3. 可以复制代码或直接下载文件</li>
          <li>4. 切换预览模式查看实际效果或代码</li>
        </ul>
      </div>
    </div>
  );
};

export default ComponentGenerator;
