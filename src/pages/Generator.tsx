import React, { useState } from "react";
import { ProjectGeneratorService, ProjectConfig } from "../services/ProjectGeneratorService";
import "./Generator.css";

export function Generator() {
  const [config, setConfig] = useState<ProjectConfig>({
    name: "my-awesome-project",
    template: "react-ts",
    language: "typescript",
    features: ["router", "state", "testing"],
    description: "这是一个使用 MetaCoding 生成的现代化项目",
    author: "MetaCoding 用户"
  });
  
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleInputChange = (field: keyof ProjectConfig, value: any) => {
    const newConfig = {
      ...config,
      [field]: value
    };
    setConfig(newConfig);
    
    // 实时验证
    const errors = ProjectGeneratorService.validateConfig(newConfig);
    setValidationErrors(errors);
  };

  const handleGenerate = async () => {
    const errors = ProjectGeneratorService.validateConfig(config);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setGenerating(true);
    setError("");
    setResult(null);
    setValidationErrors([]);

    try {
      console.log("🚀 开始生成项目...");
      const project = await ProjectGeneratorService.generateProject(config);
      setResult(project);
      console.log("✅ 项目生成成功:", project);
      
      // 自动保存到本地存储
      const savedProjects = JSON.parse(localStorage.getItem("metacoding_projects") || "[]");
      savedProjects.push({
        ...project,
        name: config.name,
        template: config.template,
        generatedAt: new Date().toISOString()
      });
      localStorage.setItem("metacoding_projects", JSON.stringify(savedProjects));
      
    } catch (err: any) {
      setError("生成失败: " + err.message);
      console.error("❌ 生成失败:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    try {
      await ProjectGeneratorService.downloadProject(result);
      alert("📥 项目文件已开始下载！\n\n请查看下载文件夹中的JSON文件。");
    } catch (err) {
      alert("下载失败，请重试");
      console.error("下载失败:", err);
    }
  };

  const handleCopyCommands = async () => {
    if (!result?.commands) return;
    
    const commands = result.commands.join("\n");
    const success = await ProjectGeneratorService.copyToClipboard(commands);
    if (success) {
      alert("📋 命令已复制到剪贴板！");
    } else {
      alert("复制失败，请手动复制");
    }
  };

  const handleReset = () => {
    setConfig({
      name: "",
      template: "react-ts",
      language: "typescript",
      features: ["router", "state", "testing"],
      description: "",
      author: ""
    });
    setResult(null);
    setError("");
    setValidationErrors([]);
  };

  const templates = [
    { value: "react-ts", label: "React + TypeScript", icon: "⚛️" },
    { value: "vue-ts", label: "Vue 3 + TypeScript", icon: "🖖" },
    { value: "nestjs", label: "NestJS API", icon: "🐈" },
    { value: "express-ts", label: "Express + TypeScript", icon: "🚂" }
  ];

  const features = [
    { id: "router", label: "路由系统", description: "包含页面路由配置" },
    { id: "state", label: "状态管理", description: "集成状态管理库" },
    { id: "testing", label: "测试框架", description: "包含单元测试配置" },
    { id: "eslint", label: "代码检查", description: "ESLint 代码规范" },
    { id: "prettier", label: "代码格式化", description: "Prettier 格式化" },
    { id: "i18n", label: "国际化", description: "多语言支持" },
    { id: "auth", label: "认证系统", description: "用户认证功能" },
    { id: "database", label: "数据库", description: "数据库集成" }
  ];

  return (
    <div className="generator-page">
      <div className="generator-header">
        <h1>⚡ 代码生成器</h1>
        <p>基于模板快速生成代码，支持自定义变量</p>
      </div>
      
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}
      
      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <h4>⚠️ 请修正以下错误：</h4>
          <ul>
            {validationErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="config-panel">
        <h2>📋 项目配置</h2>
        
        <div className="config-grid">
          <div className="config-group">
            <label>项目名称 *</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="my-awesome-project"
              disabled={generating}
              className={validationErrors.some(e => e.includes("项目名称")) ? "error" : ""}
            />
            <span className="hint">只能包含字母、数字、连字符和下划线</span>
          </div>
          
          <div className="config-group">
            <label>作者 *</label>
            <input
              type="text"
              value={config.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              placeholder="你的名字"
              disabled={generating}
            />
          </div>
          
          <div className="config-group">
            <label>选择模板</label>
            <div className="template-cards">
              {templates.map(template => (
                <div
                  key={template.value}
                  className={`template-card ${config.template === template.value ? "active" : ""}`}
                  onClick={() => !generating && handleInputChange("template", template.value)}
                >
                  <span className="template-icon">{template.icon}</span>
                  <span className="template-label">{template.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="config-group full-width">
            <label>功能特性</label>
            <div className="features-grid">
              {features.map(feature => (
                <label key={feature.id} className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={config.features.includes(feature.id)}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...config.features, feature.id]
                        : config.features.filter(f => f !== feature.id);
                      handleInputChange("features", newFeatures);
                    }}
                    disabled={generating}
                  />
                  <div className="feature-content">
                    <span className="feature-name">{feature.label}</span>
                    <span className="feature-description">{feature.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="config-group full-width">
            <label>项目描述 *</label>
            <textarea
              value={config.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="描述你的项目功能、用途等..."
              disabled={generating}
              rows={4}
              className={validationErrors.some(e => e.includes("项目描述")) ? "error" : ""}
            />
          </div>
        </div>
      </div>
      
      <div className="action-section">
        <div className="action-buttons">
          <button
            className={`generate-button ${generating ? "generating" : ""}`}
            onClick={handleGenerate}
            disabled={generating || validationErrors.length > 0}
          >
            {generating ? (
              <>
                <span className="spinner"></span>
                生成中...
              </>
            ) : (
              <>
                <span>🚀</span>
                一键生成项目
              </>
            )}
          </button>
          
          <button
            className="reset-button"
            onClick={handleReset}
            disabled={generating}
          >
            重置配置
          </button>
        </div>
        
        <p className="hint">
          点击按钮将生成完整的项目文件结构，包含所有配置文件和示例代码
        </p>
      </div>
      
      {result && (
        <div className="result-panel success">
          <div className="result-header">
            <h3>✅ 项目生成成功！</h3>
            <p>{result.message}</p>
            <p className="project-id">项目ID: {result.projectId}</p>
            <p className="timestamp">生成时间: {new Date(result.timestamp).toLocaleString()}</p>
          </div>
          
          <div className="result-actions">
            <button className="action-btn primary" onClick={handleDownload}>
              📥 下载项目文件
            </button>
            <button className="action-btn secondary" onClick={handleCopyCommands}>
              📋 复制启动命令
            </button>
            <button 
              className="action-btn outline"
              onClick={() => {
                localStorage.setItem("last_generated_project", JSON.stringify(result));
                alert("✅ 项目已保存到本地！");
              }}
            >
              💾 保存到本地
            </button>
          </div>
          
          <div className="result-details">
            <h4>生成的文件：</h4>
            <div className="file-list">
              {result.files.map((file: any, index: number) => (
                <div key={index} className="file-item">
                  <span className="file-icon">📄</span>
                  <span className="file-path">{file.path}</span>
                  <span className="file-lang">{file.language}</span>
                </div>
              ))}
            </div>
            
            <h4>项目启动命令：</h4>
            <div className="terminal">
              {result.commands.map((command: string, index: number) => (
                <div key={index} className="command">
                  <span className="prompt">$</span> {command}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="info-box">
        <h3>💡 使用提示</h3>
        <div className="info-content">
          <div className="tip">
            <span className="tip-icon">🔧</span>
            <div>
              <h4>项目配置</h4>
              <p>所有配置项都支持实时验证，确保项目配置正确</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">📁</span>
            <div>
              <h4>文件管理</h4>
              <p>生成的项目包含完整的文件结构和配置文件</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">🚀</span>
            <div>
              <h4>快速开始</h4>
              <p>复制启动命令即可立即运行生成的项目</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">💾</span>
            <div>
              <h4>数据保存</h4>
              <p>所有生成的项目都会自动保存到本地存储</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
