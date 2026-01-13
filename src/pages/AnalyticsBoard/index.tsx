import React from "react";
import "./AnalyticsBoard.css";

const AnalyticsBoard: React.FC = () => {
  return (
    <div className="analytics-board">
      <h1>📊 数据分析面板</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>用户数量</h3>
          <p className="stat-value">1,234</p>
          <p className="stat-change">+12% 本月</p>
        </div>
        
        <div className="stat-card">
          <h3>销售额</h3>
          <p className="stat-value"> 89,456</p>
          <p className="stat-change">+8% 本月</p>
        </div>
        
        <div className="stat-card">
          <h3>访问量</h3>
          <p className="stat-value">45,678</p>
          <p className="stat-change">+15% 本月</p>
        </div>
      </div>
      
      <div className="chart-section">
        <h2>📈 趋势分析</h2>
        <p>这里是图表区域，可以集成图表库</p>
      </div>
    </div>
  );
};

export default AnalyticsBoard;
