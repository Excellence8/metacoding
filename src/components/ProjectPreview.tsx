import React from "react";

interface ProjectPreviewProps {
  projectData: any;
  onClose: () => void;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ projectData, onClose }) => {
  if (!projectData) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}
    onClick={onClose}
    >
      <div style={{
        background: "var(--card)",
        borderRadius: "16px",
        padding: "30px",
        maxWidth: "800px",
        width: "90%",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, color: "var(--text)" }}>📋 项目预览</h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "var(--text)"
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "var(--text)" }}>项目信息</h3>
          <div style={{
            background: "var(--background)",
            padding: "15px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "14px"
          }}>
            <div><strong>项目ID:</strong> {projectData.projectId}</div>
            <div><strong>模板:</strong> {projectData.template}</div>
            <div><strong>生成时间:</strong> {new Date().toLocaleString()}</div>
          </div>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "var(--text)" }}>文件结构</h3>
          <div style={{
            background: "var(--background)",
            padding: "15px",
            borderRadius: "8px"
          }}>
            {projectData.files.map((file: string, index: number) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                padding: "5px 0",
                borderBottom: "1px solid var(--border)"
              }}>
                <span>📄</span>
                <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
                  {file}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ margin: "0 0 10px 0", color: "var(--text)" }}>启动命令</h3>
          <div style={{
            background: "#1f2937",
            color: "#e5e7eb",
            padding: "15px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "14px"
          }}>
            {projectData.commands.map((cmd: string, index: number) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <span style={{ color: "#10b981" }}>$</span> {cmd}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "15px", marginTop: "25px" }}>
          <button
            onClick={() => {
              const data = JSON.stringify(projectData, null, 2);
              navigator.clipboard.writeText(data)
                .then(() => alert("配置已复制到剪贴板！"))
                .catch(() => {
                  const textarea = document.createElement("textarea");
                  textarea.value = data;
                  document.body.appendChild(textarea);
                  textarea.select();
                  document.execCommand("copy");
                  document.body.removeChild(textarea);
                  alert("配置已复制到剪贴板！");
                });
            }}
            style={{
              padding: "10px 20px",
              background: "var(--primary)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1
            }}
          >
            📋 复制配置
          </button>
          
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1
            }}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
