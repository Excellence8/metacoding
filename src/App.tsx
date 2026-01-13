import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// 首页组件
function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        maxWidth: "800px"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>🚀 MetaCoding</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px", opacity: 0.9 }}>
          智能代码生成平台 - 一键生成完整项目
        </p>
        <div style={{
          background: "rgba(255,255,255,0.2)",
          padding: "30px",
          borderRadius: "15px",
          margin: "30px 0"
        }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>✅ 项目运行正常</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "15px" }}>
            React + TypeScript + Vite 项目已成功启动
          </p>
          <p style={{ fontSize: "1rem", opacity: 0.8 }}>
            现在可以使用完整的一键生成项目功能
          </p>
        </div>
        <div style={{ marginTop: "40px" }}>
          <Link to="/generator" style={{
            display: "inline-block",
            padding: "18px 40px",
            background: "white",
            color: "#4f46e5",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            marginRight: "20px",
            transition: "all 0.3s",
            boxShadow: "0 4px 20px rgba(255,255,255,0.2)"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            ⚡ 前往生成器
          </Link>
          <Link to="/templates" style={{
            display: "inline-block",
            padding: "18px 40px",
            background: "transparent",
            color: "white",
            textDecoration: "none",
            border: "2px solid white",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "1.2rem",
            transition: "all 0.3s"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#4f46e5";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          >
            📚 查看模板
          </Link>
        </div>
        <div style={{ marginTop: "50px", opacity: 0.7 }}>
          <p>还支持：<Link to="/projects" style={{ color: "white", textDecoration: "underline" }}>📁 项目管理</Link> | 
          <Link to="/settings" style={{ color: "white", textDecoration: "underline", marginLeft: "10px" }}>⚙️ 设置</Link></p>
        </div>
      </div>
    </div>
  );
}

// 生成器页面组件
function Generator() {
  const [projectName, setProjectName] = React.useState("my-awesome-project");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  
  // 读取选择的模板
  const [selectedTemplate, setSelectedTemplate] = React.useState(() => {
    const saved = localStorage.getItem("selectedTemplate");
    return saved || "react-ts";
  });

  const handleGenerate = () => {
    if (!projectName.trim()) {
      alert("请输入项目名称");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    // 获取模板名称
    const templateName = localStorage.getItem("selectedTemplateName") || "React + TypeScript";
    
    // 模拟生成过程
    setTimeout(() => {
      const project = {
        success: true,
        projectId: "project_" + Date.now(),
        message: `项目 "${projectName}" 使用【${templateName}】模板生成成功！`,
        template: templateName,
        files: [
          "package.json",
          "src/App.tsx", 
          "src/main.tsx",
          "vite.config.ts",
          "tsconfig.json",
          "README.md"
        ],
        commands: [
          `cd ${projectName}`,
          "npm install",
          "npm run dev",
          "# 项目启动成功！"
        ]
      };
      
      setResult(project);
      setIsGenerating(false);
      console.log("🚀 项目生成成功:", project);

      // 保存到项目历史
      const saveToHistory = async () => {
        try {
          const { addProjectToHistory } = await import("./utils/projectHistory");
          addProjectToHistory(project);
        } catch (error) {
          console.error("保存历史失败:", error);
        }
      };
      saveToHistory();
    }, 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    
    // 创建下载链接
    const data = JSON.stringify(result, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.projectId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert("📥 项目配置文件已下载！");
  };

  // 导出为 ZIP
  const handleExportAsZip = async () => {
    if (!result) return;
    
    try {
      alert("📦 正在生成项目 ZIP 文件...");
      
      // 动态导入导出工具
      const { exportProjectAsZip } = await import("./utils/exportProject");
      
      // 调用导出函数
      await exportProjectAsZip(result);
      
      alert("✅ 项目 ZIP 文件已生成并开始下载！");
    } catch (error) {
      console.error("导出失败:", error);
      alert("❌ 导出失败，请检查控制台");
    }
  };

  // 复制项目配置
  const handleCopyConfig = () => {
    if (!result) return;
    
    const config = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(config)
      .then(() => alert("📋 项目配置已复制到剪贴板！"))
      .catch(() => {
        const textarea = document.createElement("textarea");
        textarea.value = config;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("📋 项目配置已复制到剪贴板！");
      });
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ color: "#333", fontSize: "2.5rem", marginBottom: "10px" }}>
        ⚡ 代码生成器
      </h1>
      <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "40px" }}>
        一键生成完整的项目结构，支持多种模板
      </p>

      {/* 配置区域 */}
      <div style={{ 
        background: "white", 
        padding: "30px", 
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: "30px"
      }}>
        <h2 style={{ margin: "0 0 25px 0", color: "#333" }}>
          📋 项目配置
        </h2>

        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              项目名称 *
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "16px"
              }}
              placeholder="my-awesome-project"
              disabled={isGenerating}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
              选择的模板
            </label>
            <div style={{
              padding: "12px 16px", 
              background: "#f3f4f6", 
              borderRadius: "8px", 
              border: "2px solid #e5e7eb"
            }}>
              <strong>📦 当前模板：</strong>
              <span style={{ color: "#4f46e5", marginLeft: "10px" }}>
                {localStorage.getItem("selectedTemplateName") || "React + TypeScript"}
              </span>
              <div style={{ marginTop: "10px" }}>
                <Link to="/templates" style={{ color: "#4f46e5", textDecoration: "none" }}>
                  🔄 更换模板
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 生成按钮 */}
      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{
            padding: "20px 60px",
            background: isGenerating 
              ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" 
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1.3rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            opacity: isGenerating ? 0.8 : 1
          }}
          onMouseOver={(e) => {
            if (!isGenerating) e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseOut={(e) => {
            if (!isGenerating) e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {isGenerating ? (
            <>
              <span style={{
                width: "20px",
                height: "20px",
                border: "3px solid rgba(255,255,255,0.3)",
                borderTop: "3px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></span>
              生成中...
            </>
          ) : (
            "🚀 一键生成项目"
          )}
        </button>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        
        <p style={{ marginTop: "15px", color: "#666", fontSize: "0.95rem" }}>
          点击按钮将生成完整的项目文件结构
        </p>
      </div>

      {/* 结果展示 */}
      {result && (
        <div style={{
          background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
          borderRadius: "16px",
          padding: "30px",
          marginTop: "30px",
          animation: "slideIn 0.5s ease"
        }}>
          <h3 style={{ color: "#065f46", margin: "0 0 15px 0" }}>
            ✅ 项目生成成功！
          </h3>
          <p style={{ color: "#047857", marginBottom: "20px" }}>
            {result.message}
          </p>
          
          <div style={{ 
            display: "flex", 
            gap: "15px", 
            marginBottom: "25px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={handleDownload}
              style={{
                padding: "12px 24px",
                background: "#059669",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              📥 JSON 配置
            </button>
            
            <button
              onClick={handleExportAsZip}
              style={{
                padding: "12px 24px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              📦 ZIP 项目
            </button>
            
            <button
              onClick={handleCopyConfig}
              style={{
                padding: "12px 24px",
                background: "#8b5cf6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              📋 复制配置
            </button>
            
            <button
              onClick={() => {
                const commands = result.commands.join("\n");
                navigator.clipboard.writeText(commands)
                  .then(() => alert("📋 命令已复制到剪贴板！"))
                  .catch(() => {
                    const textarea = document.createElement("textarea");
                    textarea.value = commands;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textarea);
                    alert("📋 命令已复制到剪贴板！");
                  });
              }}
              style={{
                padding: "12px 24px",
                background: "white",
                color: "#059669",
                border: "2px solid #059669",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              🚀 复制命令
            </button>
          </div>

          <div style={{ background: "rgba(255,255,255,0.7)", padding: "20px", borderRadius: "8px" }}>
            <h4 style={{ color: "#065f46", margin: "0 0 15px 0" }}>
              生成的文件：
            </h4>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
              gap: "10px" 
            }}>
              {result.files.map((file: string, index: number) => (
                <div key={index} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  background: "white",
                  borderRadius: "6px",
                  border: "1px solid #e5e7eb"
                }}>
                  <span>📄</span>
                  <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
                    {file}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ 
            marginTop: "25px", 
            background: "#1f2937", 
            color: "#e5e7eb",
            padding: "20px", 
            borderRadius: "8px",
            fontFamily: "monospace"
          }}>
            <h4 style={{ color: "#10b981", margin: "0 0 15px 0" }}>
              启动项目：
            </h4>
            {result.commands.map((cmd: string, index: number) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <span style={{ color: "#10b981", marginRight: "10px" }}>$</span>
                {cmd}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link 
          to="/" 
          style={{
            color: "#4f46e5",
            textDecoration: "none",
            fontSize: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
           返回首页
        </Link>
      </div>
    </div>
  );
}

// 模板库页面
function Templates() {
  const navigate = useNavigate();
  const templates = [
    { 
      id: "react-ts", 
      name: "React + TypeScript", 
      icon: "⚛️", 
      desc: "现代化的React应用模板" 
    },
    { 
      id: "vue-ts", 
      name: "Vue 3 + TypeScript", 
      icon: "🖖", 
      desc: "Vue 3 Composition API模板" 
    },
    { 
      id: "nestjs", 
      name: "NestJS API", 
      icon: "🐈", 
      desc: "企业级API服务模板" 
    },
    { 
      id: "express-ts", 
      name: "Express + TypeScript", 
      icon: "🚂", 
      desc: "简洁的Express API模板" 
    }
  ];

  const handleSelectTemplate = (templateId: string, templateName: string) => {
    console.log(`✅ 选择了模板: ${templateName} (ID: ${templateId})`);
    
    // 存储选择的模板到本地存储
    localStorage.setItem("selectedTemplate", templateId);
    localStorage.setItem("selectedTemplateName", templateName);
    
    // 跳转到生成器页面
    navigate("/generator");
    
    // 通知用户
    alert(`🎯 已选择"${templateName}"模板，正在跳转到生成器...`);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ color: "#333", fontSize: "2.5rem", marginBottom: "10px" }}>
        📚 模板库
      </h1>
      <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "40px" }}>
        选择适合的模板快速开始您的项目
      </p>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "25px",
        marginBottom: "50px"
      }}>
        {templates.map((template, index) => (
          <div key={index} style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
            transition: "transform 0.3s",
            cursor: "pointer"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          onClick={() => handleSelectTemplate(template.id, template.name)}
          >
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>
              {template.icon}
            </div>
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
              {template.name}
            </h3>
            <p style={{ color: "#666", margin: 0 }}>
              {template.desc}
            </p>
            <button
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500"
              }}
              onClick={(e) => {
                e.stopPropagation(); // 防止事件冒泡
                handleSelectTemplate(template.id, template.name);
              }}
            >
              ✅ 选择此模板
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link 
          to="/" 
          style={{
            color: "#4f46e5",
            textDecoration: "none",
            fontSize: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
           返回首页
        </Link>
      </div>
    </div>
  );
}

// 项目管理页面
function Projects() {
  const [history, setHistory] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    // 动态导入项目历史工具
    const loadHistory = async () => {
      try {
        const { getProjectHistory, getProjectStats } = await import("./utils/projectHistory");
        const history = getProjectHistory();
        const stats = getProjectStats();
        setHistory(history);
        setStats(stats);
      } catch (error) {
        console.error("加载项目历史失败:", error);
      }
    };
    loadHistory();
  }, []);

  const handleRegenerate = (projectData: any) => {
    if (confirm(`是否要重新生成项目 "${projectData.name}"？`)) {
      // 存储项目数据到本地存储
      localStorage.setItem("regenerate-project", JSON.stringify(projectData.data));
      alert("✅ 项目数据已加载，请前往生成器页面重新生成！");
      window.location.href = "/generator";
    }
  };

  const handleDelete = async (projectId: string, projectName: string) => {
    if (confirm(`确定要删除项目 "${projectName}" 吗？`)) {
      try {
        const { removeProjectFromHistory, getProjectHistory, getProjectStats } = await import("./utils/projectHistory");
        removeProjectFromHistory(projectId);
        // 刷新列表
        const updatedHistory = getProjectHistory();
        setHistory(updatedHistory);
        setStats(getProjectStats());
        alert("🗑️ 项目已删除");
      } catch (error) {
        console.error("删除失败:", error);
      }
    }
  };

  const handleClearAll = async () => {
    if (confirm("确定要清除所有项目历史吗？此操作不可恢复。")) {
      try {
        const { clearProjectHistory } = await import("./utils/projectHistory");
        clearProjectHistory();
        setHistory([]);
        setStats({ total: 0, templates: {}, latest: null });
        alert("🧹 所有项目历史已清除");
      } catch (error) {
        console.error("清除失败:", error);
      }
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ color: "#333", fontSize: "2.5rem", marginBottom: "10px" }}>
        📁 项目管理
      </h1>
      <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "40px" }}>
        管理和查看您生成的所有项目
      </p>

      {/* 项目统计 */}
      {stats && (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px",
          marginBottom: "40px"
        }}>
          <div style={{ 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
            padding: "25px", 
            borderRadius: "16px",
            color: "white"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>📊</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>项目总数</div>
            <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{stats.total}</div>
          </div>

          <div style={{ 
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", 
            padding: "25px", 
            borderRadius: "16px",
            color: "white"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>📦</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>模板分布</div>
            <div style={{ marginTop: "15px" }}>
              {Object.entries(stats.templates || {}).map(([template, count]: [string, any]) => (
                <div key={template} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span>{template}</span>
                  <span style={{ fontWeight: "bold" }}>{count}个</span>
                </div>
              ))}
            </div>
          </div>

          {stats.latest && (
            <div style={{ 
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", 
              padding: "25px", 
              borderRadius: "16px",
              color: "white"
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🕐</div>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>最近生成</div>
              <div style={{ marginTop: "15px", fontSize: "0.9rem" }}>
                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{stats.latest.name}</div>
                <div>{stats.latest.time}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 项目列表 */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "#333", margin: 0 }}>📋 项目历史</h2>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                padding: "10px 20px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              🧹 清空历史
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div style={{ 
            background: "#f8fafc", 
            padding: "60px 40px", 
            borderRadius: "16px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px", opacity: 0.5 }}>
              📁
            </div>
            <h3 style={{ color: "#4b5563", marginBottom: "15px" }}>
              暂无项目历史
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "30px" }}>
              前往生成器创建您的第一个项目吧！
            </p>
            <Link 
              to="/generator" 
              style={{
                display: "inline-block",
                padding: "15px 30px",
                background: "#4f46e5",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold"
              }}
            >
              生成新项目
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
            gap: "20px" 
          }}>
            {history.map((project, index) => (
              <div key={project.id} style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 5px 0", color: "#333", fontSize: "1.1rem" }}>
                      {project.name}
                    </h3>
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>
                      {project.template}
                    </div>
                  </div>
                  <span style={{ 
                    background: index < 3 ? "#fef3c7" : "#f3f4f6", 
                    color: index < 3 ? "#92400e" : "#6b7280",
                    padding: "4px 10px", 
                    borderRadius: "12px", 
                    fontSize: "0.8rem",
                    fontWeight: "500"
                  }}>
                    #{index + 1}
                  </span>
                </div>

                <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "15px" }}>
                  {new Date(project.timestamp).toLocaleString()}
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => handleRegenerate(project)}
                    style={{
                      padding: "8px 16px",
                      background: "#4f46e5",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      flex: 1
                    }}
                  >
                    🔄 重新生成
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    style={{
                      padding: "8px 16px",
                      background: "#f3f4f6",
                      color: "#ef4444",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "500"
                    }}
                  >
                    🗑️ 删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link 
          to="/" 
          style={{
            color: "#4f46e5",
            textDecoration: "none",
            fontSize: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
           返回首页
        </Link>
      </div>
    </div>
  );
}

// 设置页面
function Settings() {
  const [settings, setSettings] = React.useState({
    theme: "light",
    autoFormat: true,
    notifications: true,
    fontSize: 16,
    language: "zh"
  });

  const handleSave = () => {
    localStorage.setItem("metacoding-settings", JSON.stringify(settings));
    alert("✅ 设置已保存！");
  };

  const handleReset = () => {
    setSettings({
      theme: "light",
      autoFormat: true,
      notifications: true,
      fontSize: 16,
      language: "zh"
    });
    alert("🔄 设置已重置");
  };

  return (
    <div style={{ 
      padding: "40px", 
      maxWidth: "800px", 
      margin: "0 auto",
      minHeight: "70vh"
    }}>
      <h1 style={{ 
        color: "#333", 
        fontSize: "2.5rem", 
        marginBottom: "10px" 
      }}>
        ⚙️ 设置
      </h1>
      <p style={{ 
        color: "#666", 
        fontSize: "1.1rem", 
        marginBottom: "40px" 
      }}>
        自定义您的 MetaCoding 体验
      </p>

      <div style={{ 
        display: "grid", 
        gap: "30px" 
      }}>
        {/* 主题设置 */}
        <div style={{ 
          background: "white", 
          padding: "30px", 
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{ 
            margin: "0 0 25px 0", 
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span>🎨</span> 主题设置
          </h2>
          
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {["light", "dark", "blue", "purple"].map(theme => (
              <button
                key={theme}
                onClick={() => setSettings({...settings, theme})}
                style={{
                  padding: "15px 25px",
                  background: settings.theme === theme ? "#4f46e5" : "#f3f4f6",
                  color: settings.theme === theme ? "white" : "#333",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: settings.theme === theme ? "600" : "400",
                  transition: "all 0.2s",
                  textTransform: "capitalize"
                }}
              >
                {theme === "light" ? "浅色" :
                 theme === "dark" ? "深色" :
                 theme === "blue" ? "蓝色" : "紫色"}
              </button>
            ))}
          </div>
        </div>

        {/* 编辑器设置 */}
        <div style={{ 
          background: "white", 
          padding: "30px", 
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{ 
            margin: "0 0 25px 0", 
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span>🔧</span> 编辑器设置
          </h2>
          
          <div style={{ display: "grid", gap: "20px" }}>
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              padding: "15px",
              background: "#f9fafb",
              borderRadius: "10px"
            }}>
              <div>
                <div style={{ fontWeight: "600", color: "#333" }}>
                  自动格式化代码
                </div>
                <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                  保存时自动格式化代码
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoFormat}
                onChange={(e) => setSettings({...settings, autoFormat: e.target.checked})}
                style={{ transform: "scale(1.3)" }}
              />
            </label>

            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              padding: "15px",
              background: "#f9fafb",
              borderRadius: "10px"
            }}>
              <div>
                <div style={{ fontWeight: "600", color: "#333" }}>
                  启用通知
                </div>
                <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                  显示操作成功/失败通知
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                style={{ transform: "scale(1.3)" }}
              />
            </label>

            <div>
              <div style={{ fontWeight: "600", color: "#333", marginBottom: "10px" }}>
                字体大小：{settings.fontSize}px
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => setSettings({...settings, fontSize: parseInt(e.target.value)})}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* 语言设置 */}
        <div style={{ 
          background: "white", 
          padding: "30px", 
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{ 
            margin: "0 0 25px 0", 
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span>🌐</span> 语言设置
          </h2>
          
          <div style={{ display: "flex", gap: "15px" }}>
            {[
              { code: "zh", name: "中文" },
              { code: "en", name: "English" },
              { code: "ja", name: "日本語" }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => setSettings({...settings, language: lang.code})}
                style={{
                  padding: "15px 25px",
                  background: settings.language === lang.code ? "#4f46e5" : "#f3f4f6",
                  color: settings.language === lang.code ? "white" : "#333",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: settings.language === lang.code ? "600" : "400"
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          justifyContent: "center",
          paddingTop: "20px"
        }}>
          <button
            onClick={handleSave}
            style={{
              padding: "15px 40px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            💾 保存设置
          </button>
          
          <button
            onClick={handleReset}
            style={{
              padding: "15px 40px",
              background: "#f3f4f6",
              color: "#333",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🔄 恢复默认
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Link 
          to="/" 
          style={{
            color: "#4f46e5",
            textDecoration: "none",
            fontSize: "16px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
           返回首页
        </Link>
      </div>
    </div>
  );
}

// 主应用组件
function App() {
  return (
    <Router>
      <div style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        {/* 简单的导航 */}
        <nav style={{
          background: "white",
          padding: "0 20px",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            height: "64px"
          }}>
            <Link 
              to="/" 
              style={{ 
                textDecoration: "none", 
                color: "#333",
                fontSize: "1.5rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span>📦</span>
              <span>MetaCoding</span>
            </Link>
            
            <div style={{ 
              display: "flex", 
              gap: "25px", 
              marginLeft: "40px" 
            }}>
              <Link 
                to="/" 
                style={{ 
                  textDecoration: "none", 
                  color: "#333",
                  padding: "8px 0"
                }}
              >
                🏠 首页
              </Link>
              <Link 
                to="/generator" 
                style={{ 
                  textDecoration: "none", 
                  color: "#4f46e5",
                  padding: "8px 0",
                  fontWeight: "500"
                }}
              >
                ⚡ 生成器
              </Link>
              <Link 
                to="/templates" 
                style={{ 
                  textDecoration: "none", 
                  color: "#333",
                  padding: "8px 0"
                }}
              >
                📚 模板库
              </Link>
              <Link 
                to="/projects" 
                style={{ 
                  textDecoration: "none", 
                  color: "#333",
                  padding: "8px 0"
                }}
              >
                📁 项目
              </Link>
              <Link 
                to="/settings" 
                style={{ 
                  textDecoration: "none", 
                  color: "#333",
                  padding: "8px 0"
                }}
              >
                ⚙️ 设置
              </Link>
            </div>
          </div>
        </nav>

        {/* 路由内容 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        {/* 简单页脚 */}
        <footer style={{
          marginTop: "60px",
          padding: "30px 20px",
          background: "white",
          borderTop: "1px solid #e5e7eb",
          textAlign: "center",
          color: "#6b7280"
        }}>
          <p>MetaCoding © {new Date().getFullYear()} - 智能代码生成平台</p>
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            一键生成完整项目，提高开发效率
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

