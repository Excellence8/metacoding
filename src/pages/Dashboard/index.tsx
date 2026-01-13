import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import "./Dashboard.css";

// 简单图标组件
const Icon = ({ name, size = 24 }) => {
  const icons = {
    TrendingUp: "📈",
    Users: "👥",
    DollarSign: "💰",
    Code: "💻",
    Clock: "⏱️",
    Zap: "⚡",
    BarChart: "📊",
    Settings: "⚙️",
    Add: "➕",
    Folder: "📁",
    Check: "✅",
    Fire: "🔥",
    Rocket: "🚀",
    Star: "⭐",
    Refresh: "🔄"
  };
  return <span style={{ fontSize: size }}>{icons[name] || "📦"}</span>;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("react-app");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats] = useState([
    { id: 1, label: "项目总数", value: "0", change: "+0", icon: "Folder", color: "#10b981" },
    { id: 2, label: "活跃项目", value: "0", change: "+0", icon: "Fire", color: "#3b82f6" },
    { id: 3, label: "完成率", value: "0%", change: "+0%", icon: "Check", color: "#8b5cf6" },
    { id: 4, label: "团队协作", value: "1人", change: "+0", icon: "Users", color: "#f59e0b" },
  ]);

  // 加载项目数据
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      // 模拟加载数据
      setTimeout(() => {
        const mockProjects = [
          { id: 1, name: "电商后台系统", type: "dashboard", progress: 85, status: "进行中", createdAt: "2026-01-01", updatedAt: "2026-01-06", technologies: ["React", "TypeScript", "Vite"] },
          { id: 2, name: "移动端应用", type: "mobile-app", progress: 100, status: "已完成", createdAt: "2026-01-02", updatedAt: "2026-01-05", technologies: ["React Native", "Redux"] },
          { id: 3, name: "数据分析平台", type: "analytics", progress: 45, status: "进行中", createdAt: "2026-01-03", updatedAt: "2026-01-06", technologies: ["Vue", "D3.js", "Express"] },
        ];
        setProjects(mockProjects);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("加载项目失败:", error);
      setLoading(false);
    }
  };

  // 处理新建项目按钮点击
  const handleNewProject = () => {
    setShowProjectModal(true);
  };

  // 处理创建项目
  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      alert("请输入项目名称");
      return;
    }

    try {
      // 创建新项目
      const newProject = {
        id: projects.length + 1,
        name: projectName,
        type: projectType,
        description: projectDescription,
        progress: 0,
        status: "新建",
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        technologies: ["React", "TypeScript", "Vite"]
      };

      // 添加到项目列表
      setProjects([newProject, ...projects]);
      
      // 重置表单
      setProjectName("");
      setProjectType("react-app");
      setProjectDescription("");
      setShowProjectModal(false);
      
      // 显示成功消息
      alert(`✅ 项目 "${projectName}" 创建成功！`);
      
      // 重新加载数据
      loadProjects();
    } catch (error) {
      console.error("创建项目失败:", error);
      alert("创建项目失败，请重试");
    }
  };

  const getProjectTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      "react-app": "React应用",
      "dashboard": "仪表板",
      "mobile-app": "移动应用",
      "ecommerce": "电商网站",
      "landing": "落地页",
      "api-server": "API服务器",
      "analytics": "数据分析"
    };
    return types[type] || type;
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleOpenGenerator = () => {
    navigate("/generator");
  };

  const handleProjectClick = (projectId: number) => {
    alert(`项目 ${projectId} 详情功能开发中...`);
    // navigate(`/project/${projectId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "新建": return "#3b82f6";
      case "进行中": return "#f59e0b";
      case "已完成": return "#10b981";
      case "已暂停": return "#6b7280";
      default: return "#9ca3af";
    }
  };

  const getProjectIcon = (type: string) => {
    const icons: Record<string, string> = {
      "react-app": "⚛️",
      "dashboard": "📊",
      "mobile-app": "📱",
      "ecommerce": "🛒",
      "landing": "🚀",
      "api-server": "🔌",
      "analytics": "📈"
    };
    return icons[type] || "📁";
  };

  return (
    <div className="dashboard-page">
      {/* 头部 */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>
            <Icon name="TrendingUp" size={32} />
            项目总览
          </h1>
          <p>管理您的所有项目，跟踪进度和统计数据</p>
        </div>
        <div className="header-actions">
          <Button variant="primary" onClick={handleNewProject}>
            <Icon name="Add" size={20} /> 新建项目
          </Button>
          <Button variant="secondary" onClick={handleOpenGenerator}>
            <Icon name="Rocket" size={20} /> 快速生成
          </Button>
          <Button variant="secondary" onClick={handleSettings}>
            <Icon name="Settings" size={20} /> 设置
          </Button>
        </div>
      </div>

      {/* 统计卡片网格 */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <Card key={stat.id} className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                <Icon name={stat.icon} size={24} style={{ color: stat.color }} />
              </div>
              <div className="stat-info">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-change" style={{ color: stat.color }}>
                  {stat.change}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 主要内容区域 */}
      <Card title="最近项目" extra={
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>{projects.length} 个项目</span>
          <Button 
            variant="secondary" 
            size="small"
            onClick={() => loadProjects()}
          >
            <Icon name="Refresh" size={16} /> 刷新
          </Button>
        </div>
      }>
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>加载项目中...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>暂无项目</h3>
            <p>点击"新建项目"按钮开始创建您的第一个项目</p>
            <Button variant="primary" onClick={handleNewProject}>
              <Icon name="Add" size={16} /> 创建第一个项目
            </Button>
          </div>
        ) : (
          <div className="projects-list">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="project-item"
                onClick={() => handleProjectClick(project.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="project-header">
                  <div className="project-icon">
                    {getProjectIcon(project.type)}
                  </div>
                  <div className="project-details">
                    <h4>{project.name}</h4>
                    <div className="project-meta">
                      <span className="project-type">{getProjectTypeLabel(project.type)}</span>
                      <span className="project-date">创建于: {project.createdAt}</span>
                    </div>
                  </div>
                  <span 
                    className="project-status" 
                    style={{ 
                      backgroundColor: `${getStatusColor(project.status)}20`,
                      color: getStatusColor(project.status)
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                
                <div className="project-progress">
                  <div className="progress-info">
                    <span>进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${project.progress}%`,
                        backgroundColor: getStatusColor(project.status)
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="project-footer">
                  <div className="project-tech">
                    {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="tech-tag">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  <div className="project-update">
                    <Icon name="Clock" size={12} /> 更新: {project.updatedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 新建项目模态框 */}
      {showProjectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <Icon name="Add" size={24} /> 创建新项目
              </h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowProjectModal(false);
                  setProjectName("");
                  setProjectType("react-app");
                  setProjectDescription("");
                }}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>项目名称 *</label>
                <input
                  type="text"
                  placeholder="输入项目名称，如：电商后台管理系统"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="form-input"
                  autoFocus
                />
                <div className="form-hint">项目名称应该简洁明了，易于识别</div>
              </div>
              
              <div className="form-group">
                <label>项目类型</label>
                <div className="type-options">
                  {[
                    { id: "react-app", label: "React应用", icon: "⚛️", desc: "单页应用" },
                    { id: "dashboard", label: "仪表板", icon: "📊", desc: "数据监控" },
                    { id: "mobile-app", label: "移动应用", icon: "📱", desc: "跨平台" },
                    { id: "ecommerce", label: "电商网站", icon: "🛒", desc: "在线商店" },
                    { id: "landing", label: "落地页", icon: "🚀", desc: "营销页面" },
                    { id: "api-server", label: "API服务", icon: "🔌", desc: "后端接口" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      className={`type-option ${projectType === type.id ? "active" : ""}`}
                      onClick={() => setProjectType(type.id)}
                    >
                      <span className="type-icon">{type.icon}</span>
                      <span className="type-label">{type.label}</span>
                      <span className="type-desc">{type.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>项目描述（可选）</label>
                <textarea
                  placeholder="描述项目的主要功能和目标..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="form-textarea"
                  rows={3}
                />
                <div className="form-hint">简洁描述项目用途，帮助团队成员理解</div>
              </div>
            </div>
            
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setShowProjectModal(false);
                  setProjectName("");
                  setProjectType("react-app");
                  setProjectDescription("");
                }}
              >
                取消
              </Button>
              <Button 
                variant="primary" 
                onClick={handleCreateProject}
                disabled={!projectName.trim()}
              >
                <Icon name="Add" size={16} /> 创建项目
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
