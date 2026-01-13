// src/pages/Generator.tsx
import { useState } from 'react';
import { ProjectService, ProjectConfig } from '../services/ProjectService';
import './Generator.css';

const DEFAULT_CONFIG: ProjectConfig = {
  name: 'my-awesome-project',
  template: 'react-ts',
  language: 'typescript',
  features: ['eslint', 'prettier', 'router'],
  author: 'MetaCoding User',
  description: '这是一个使用 MetaCoding 生成的项目'
};

export function Generator() {
  const [config, setConfig] = useState<ProjectConfig>(DEFAULT_CONFIG);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  
  const handleInputChange = (field: keyof ProjectConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleGenerate = async () => {
    if (!config.name.trim()) {
      setError('请输入项目名称');
      return;
    }
    
    setGenerating(true);
    setError('');
    setResult(null);
    
    try {
      console.log('🚀 开始生成项目...');
      const project = await ProjectService.generateProject(config);
      setResult(project);
      console.log('✅ 项目生成成功:', project);
    } catch (err: any) {
      setError('生成失败: ' + err.message);
      console.error('❌ 生成失败:', err);
    } finally {
      setGenerating(false);
    }
  };
  
  const handleDownload = async () => {
    if (!result) return;
    
    try {
      await ProjectService.downloadProject(result);
      alert('📥 项目文件已开始下载！\n\n请查看下载文件夹中的JSON文件。');
    } catch (err) {
      alert('下载失败，请重试');
      console.error('下载失败:', err);
    }
  };
  
  const handleCopyCommands = async () => {
    if (!result?.commands) return;
    
    const commands = result.commands.join('\n');
    await ProjectService.copyToClipboard(commands);
    alert('📋 命令已复制到剪贴板！');
  };

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
      
      <div className="config-panel">
        <h2>📋 项目配置</h2>
        
        <div className="config-grid">
          <div className="config-group">
            <label>项目名称 *</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="my-awesome-project"
              disabled={generating}
            />
          </div>
          
          <div className="config-group">
            <label>模板类型</label>
            <select
              value={config.template}
              onChange={(e) => handleInputChange('template', e.target.value as any)}
              disabled={generating}
            >
              <option value="react-ts">React + TypeScript</option>
              <option value="vue-ts">Vue 3 + TypeScript</option>
              <option value="nestjs">NestJS API</option>
              <option value="express-ts">Express + TypeScript</option>
            </select>
          </div>
          
          <div className="config-group">
            <label>编程语言</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={config.language === 'typescript'}
                  onChange={() => handleInputChange('language', 'typescript')}
                  disabled={generating}
                />
                TypeScript
              </label>
              <label>
                <input
                  type="radio"
                  checked={config.language === 'javascript'}
                  onChange={() => handleInputChange('language', 'javascript')}
                  disabled={generating}
                />
                JavaScript
              </label>
            </div>
          </div>
          
          <div className="config-group full-width">
            <label>功能特性</label>
            <div className="features-grid">
              {['router', 'state-management', 'testing', 'eslint', 'prettier', 'i18n'].map(feature => (
                <label key={feature} className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={config.features.includes(feature)}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...config.features, feature]
                        : config.features.filter(f => f !== feature);
                      handleInputChange('features', newFeatures);
                    }}
                    disabled={generating}
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="config-group full-width">
            <label>项目描述</label>
            <textarea
              value={config.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="描述你的项目..."
              disabled={generating}
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <div className="action-section">
        <button
          className={\`generate-button \${generating ? 'generating' : ''}\`}
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <span className="spinner"></span>
              生成中...
            </>
          ) : (
            '🚀 一键生成项目'
          )}
        </button>
        
        <p className="hint">
          点击按钮将生成完整的项目文件结构
        </p>
      </div>
      
      {result && (
        <div className="result-panel success">
          <div className="result-header">
            <h3>✅ 项目生成成功！</h3>
            <p>{result.message}</p>
            <p className="project-id">项目ID: {result.projectId}</p>
          </div>
          
          <div className="result-actions">
            <button className="action-btn primary" onClick={handleDownload}>
              📥 下载项目文件
            </button>
            <button className="action-btn secondary" onClick={handleCopyCommands}>
              📋 复制启动命令
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
        <h3>💡 使用说明</h3>
        <ul>
          <li>项目名称只能包含字母、数字和连字符</li>
          <li>生成的项目包含完整的开发环境配置</li>
          <li>下载的文件为JSON格式，包含所有文件内容</li>
          <li>实际使用时可以扩展为生成真正的ZIP文件</li>
        </ul>
      </div>
    </div>
  );
}
