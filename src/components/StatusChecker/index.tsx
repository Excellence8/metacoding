import React, { useState } from "react";
import "./StatusChecker.css";

const StatusChecker: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResults, setCheckResults] = useState<Array<{name: string, status: boolean, message: string}>>([]);

  const checkProjectStatus = async () => {
    setIsChecking(true);
    
    // 模拟检查过程
    const checks = [
      { name: "TypeScript 配置", status: true, message: "tsconfig.json 配置正常" },
      { name: "React 版本", status: true, message: "React 18.2.0 已安装" },
      { name: "路由系统", status: true, message: "React Router 已配置" },
      { name: "样式系统", status: true, message: "CSS 加载正常" },
      { name: "构建工具", status: true, message: "Vite 运行正常" },
      { name: "组件目录", status: true, message: "组件结构完整" },
      { name: "页面目录", status: true, message: "页面结构完整" },
      { name: "生成工具", status: true, message: "meta.ps1 可用" },
    ];

    // 模拟逐步检查
    const results = [];
    for (const check of checks) {
      await new Promise(resolve => setTimeout(resolve, 300)); // 模拟延迟
      results.push(check);
      setCheckResults([...results]);
    }
    
    setIsChecking(false);
  };

  const resetCheck = () => {
    setCheckResults([]);
  };

  return (
    <div className="status-checker">
      <h3>🔍 项目状态检查</h3>
      
      <div className="check-controls">
        <button 
          className="check-btn" 
          onClick={checkProjectStatus}
          disabled={isChecking}
        >
          {isChecking ? "检查中..." : "开始检查"}
        </button>
        <button 
          className="reset-btn"
          onClick={resetCheck}
        >
          重置
        </button>
      </div>

      {checkResults.length > 0 && (
        <div className="check-results">
          <div className="results-header">
            <span>检查项目</span>
            <span>状态</span>
            <span>详细信息</span>
          </div>
          {checkResults.map((result, index) => (
            <div key={index} className="result-item">
              <span className="result-name">{result.name}</span>
              <span className={`result-status ${result.status ? 'success' : 'error'}`}>
                {result.status ? '✅' : '❌'}
              </span>
              <span className="result-message">{result.message}</span>
            </div>
          ))}
          
          <div className="results-summary">
            <div className="summary-item">
              <span>总检查项目:</span>
              <span>{checkResults.length}</span>
            </div>
            <div className="summary-item">
              <span>通过项目:</span>
              <span className="success">{checkResults.filter(r => r.status).length}</span>
            </div>
            <div className="summary-item">
              <span>失败项目:</span>
              <span className="error">{checkResults.filter(r => !r.status).length}</span>
            </div>
            <div className="summary-item">
              <span>通过率:</span>
              <span className="rate">
                {checkResults.length > 0 
                  ? `${Math.round((checkResults.filter(r => r.status).length / checkResults.length) * 100)}%`
                  : "0%"
                }
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusChecker;
