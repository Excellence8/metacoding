import React from "react";
import "./Analytics.css";

const Analytics: React.FC = () => {
  const stats = [
    { label: "日活跃用户", value: "1,234", change: "+12%", color: "#10b981" },
    { label: "月访问量", value: "45,678", change: "+8%", color: "#3b82f6" },
    { label: "转化率", value: "4.5%", change: "+0.3%", color: "#8b5cf6" },
    { label: "平均停留时间", value: "3:45", change: "+0:30", color: "#f59e0b" },
  ];

  const chartData = [
    { month: "1月", users: 1000, revenue: 50000 },
    { month: "2月", users: 1200, revenue: 60000 },
    { month: "3月", users: 1500, revenue: 75000 },
    { month: "4月", users: 1800, revenue: 90000 },
    { month: "5月", users: 2000, revenue: 100000 },
    { month: "6月", users: 2200, revenue: 110000 },
  ];

  const handleExportReport = () => {
    const reportData = {
      title: "数据分析报告",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      stats: stats,
      chartData: chartData,
      summary: {
        totalUsers: chartData.reduce((sum, item) => sum + item.users, 0),
        totalRevenue: chartData.reduce((sum, item) => sum + item.revenue, 0),
        averageGrowth: "15%"
      }
    };
    
    const jsonStr = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split("T")[0]}.json`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    alert("数据分析报告已成功导出为JSON文件！");
  };

  const handleExportCSV = () => {
    const csvHeaders = "月份,用户数,收入(元)\n";
    const csvRows = chartData.map(item => 
      `${item.month},${item.users},${item.revenue}`
    ).join("\n");
    const csvContent = csvHeaders + csvRows;
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-data-${new Date().toISOString().split("T")[0]}.csv`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    alert("数据已导出为CSV文件！");
  };

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>📈 数据分析面板</h1>
        <p>实时监控业务数据和用户行为</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-change" style={{ color: stat.color }}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <h2>📊 数据趋势</h2>
        <div className="chart-container">
          <div className="chart-placeholder">
            <div className="chart-title">用户增长趋势 (1-6月)</div>
            <div className="chart-bars">
              {chartData.map((data, index) => (
                <div key={index} className="bar-container">
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${(data.users / 2500) * 100}px`,
                      background: "#667eea"
                    }}
                    title={`${data.month}: ${data.users} 用户`}
                  ></div>
                  <div className="bar-label">{data.month}</div>
                  <div className="bar-value">{data.users.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="data-export">
        <h2>📥 数据导出</h2>
        <div className="export-options">
          <button className="export-btn json" onClick={handleExportReport}>
            <span className="export-icon">📄</span>
            <span className="export-text">导出JSON报告</span>
            <span className="export-desc">完整分析报告</span>
          </button>
          
          <button className="export-btn csv" onClick={handleExportCSV}>
            <span className="export-icon">📊</span>
            <span className="export-text">导出CSV数据</span>
            <span className="export-desc">原始数据表格</span>
          </button>
          
          <button className="export-btn pdf" onClick={() => alert("PDF导出功能开发中...")}>
            <span className="export-icon">📑</span>
            <span className="export-text">导出PDF</span>
            <span className="export-desc">打印友好格式</span>
          </button>
        </div>
      </div>

      <div className="quick-actions">
        <h2>⚡ 快速操作</h2>
        <div className="action-buttons">
          <button className="btn-primary" onClick={() => window.location.href = "/dashboard"}>
            📊 返回仪表板
          </button>
          <button className="btn-secondary" onClick={() => window.location.reload()}>
            🔄 刷新数据
          </button>
          <button className="btn-secondary" onClick={() => window.location.href = "/products"}>
            🛒 产品管理
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
