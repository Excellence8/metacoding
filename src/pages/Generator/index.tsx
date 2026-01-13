// 终极 Generator 页面 - 无任何外部依赖
import React from "react";

export default function Generator() {
  const handleBack = () => {
    window.location.href = "/dashboard";
  };

  const handleGenerate = (type: string) => {
    alert(`开始生成 ${type} 项目...`);
  };

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.title}>🚀 项目生成器</h1>
        <p style={styles.subtitle}>快速生成项目代码模板</p>
      </div>
      
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>⚛️</div>
          <h3 style={styles.cardTitle}>React 应用</h3>
          <p style={styles.cardDesc}>现代化React单页应用</p>
          <button 
            style={styles.button}
            onClick={() => handleGenerate("React")}
          >
            生成
          </button>
        </div>
        
        <div style={styles.card}>
          <div style={styles.cardIcon}>📊</div>
          <h3 style={styles.cardTitle}>仪表板</h3>
          <p style={styles.cardDesc}>管理后台仪表板</p>
          <button 
            style={styles.button}
            onClick={() => handleGenerate("Dashboard")}
          >
            生成
          </button>
        </div>
      </div>
      
      <div style={styles.footer}>
        <button 
          style={styles.backButton}
          onClick={handleBack}
        >
          返回 Dashboard
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    textAlign: "center" as const,
    padding: "40px 20px",
    backgroundColor: "#f8fafc"
  },
  title: {
    fontSize: "32px",
    color: "#111827",
    margin: "0 0 10px 0"
  },
  subtitle: {
    fontSize: "18px",
    color: "#6b7280",
    margin: 0
  },
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto"
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "center" as const,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "300px"
  },
  cardIcon: {
    fontSize: "50px",
    marginBottom: "15px"
  },
  cardTitle: {
    fontSize: "24px",
    color: "#111827",
    margin: "0 0 10px 0"
  },
  cardDesc: {
    fontSize: "16px",
    color: "#6b7280",
    margin: "0 0 20px 0"
  },
  button: {
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%"
  },
  footer: {
    textAlign: "center" as const,
    padding: "20px",
    borderTop: "1px solid #e5e7eb"
  },
  backButton: {
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer"
  }
};
