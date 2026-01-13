import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import "./ProjectDetail.css";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载项目数据
    const loadProject = async () => {
      setLoading(true);
      // 模拟API调用
      setTimeout(() => {
        setProject({
          id: id,
          name: `项目 ${id}`,
          type: "react-app",
          description: "这是一个示例项目描述",
          progress: 75,
          status: "进行中",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-06",
          technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
          team: ["开发者A", "开发者B"],
          tasks: [
            { id: 1, name: "设计UI界面", status: "已完成" },
            { id: 2, name: "开发核心功能", status: "进行中" },
            { id: 3, name: "编写测试用例", status: "待开始" },
            { id: 4, name: "部署上线", status: "待开始" },
          ]
        });
        setLoading(false);
      }, 500);
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="project-detail-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>加载项目详情中...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="not-found">
          <h2>项目不存在</h2>
          <p>找不到ID为 {id} 的项目</p>
          <Button variant="primary" onClick={() => navigate("/dashboard")}>
            返回仪表板
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      <div className="page-header">
        <div className="header-content">
          <h1>{project.name}</h1>
          <div className="header-meta">
            <span className="project-id">ID: {project.id}</span>
            <span className="project-status" style={{ 
              backgroundColor: project.status === "进行中" ? "#fef3c7" : 
                              project.status === "已完成" ? "#d1fae5" : "#e5e7eb",
              color: project.status === "进行中" ? "#92400e" : 
                    project.status === "已完成" ? "#065f46" : "#374151"
            }}>
              {project.status}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
             返回
          </Button>
          <Button variant="primary">编辑项目</Button>
        </div>
      </div>

      <div className="content-grid">
        <div className="main-content">
          <Card title="项目概览">
            <div className="overview-section">
              <p>{project.description}</p>
              
              <div className="progress-section">
                <h4>项目进度</h4>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="progress-text">{project.progress}%</div>
              </div>

              <div className="dates-section">
                <div className="date-item">
                  <strong>创建时间:</strong> {project.createdAt}
                </div>
                <div className="date-item">
                  <strong>最后更新:</strong> {project.updatedAt}
                </div>
              </div>
            </div>
          </Card>

          <Card title="任务列表">
            <div className="tasks-list">
              {project.tasks.map((task: any) => (
                <div key={task.id} className="task-item">
                  <div className="task-info">
                    <span className="task-name">{task.name}</span>
                    <span className={`task-status status-${task.status}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="task-actions">
                    <Button variant="secondary" size="small">编辑</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="sidebar">
          <Card title="技术栈">
            <div className="tech-stack">
              {project.technologies.map((tech: string, index: number) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </Card>

          <Card title="团队成员">
            <div className="team-list">
              {project.team.map((member: string, index: number) => (
                <div key={index} className="team-member">
                  <span className="member-avatar">👤</span>
                  <span className="member-name">{member}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="快速操作">
            <div className="quick-actions">
              <Button variant="primary" fullWidth>生成代码</Button>
              <Button variant="secondary" fullWidth>导出项目</Button>
              <Button variant="secondary" fullWidth>项目设置</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
