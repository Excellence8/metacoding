import React, { useState, useEffect } from "react";
import { ProjectGeneratorService } from "../services/ProjectGeneratorService";
import "./Projects.css";

interface SavedProject {
  id: string;
  name: string;
  description: string;
  template: string;
  status: "active" | "completed" | "archived" | "failed";
  createdAt: string;
  lastModified: string;
  fileCount: number;
  tags: string[];
  data?: any; // 原始项目数据
}

const ProjectCard = ({ project, onAction, isSelected, onSelect }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "#10b981";
      case "completed": return "#3b82f6";
      case "archived": return "#6b7280";
      case "failed": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "进行中";
      case "completed": return "已完成";
      case "archived": return "已归档";
      case "failed": return "失败";
      default: return "未知";
    }
  };

  const getTemplateIcon = (template: string) => {
    switch (template) {
      case "react-ts": return "⚛️";
      case "vue-ts": return "🖖";
      case "nestjs": return "🐈";
      case "express-ts": return "🚂";
      default: return "📁";
    }
  };

  return (
    <div className={`project-card ${isSelected ? "selected" : ""}`}>
      <div className="project-header">
        <div className="project-icon">{getTemplateIcon(project.template)}</div>
        <div className="project-status" style={{ backgroundColor: getStatusColor(project.status) }}>
          {getStatusText(project.status)}
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(project.id, e.target.checked)}
          className="project-checkbox"
        />
      </div>
      <div className="project-content">
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-meta">
          <span className="meta-item">
            <span className="meta-icon">📅</span>
            {project.createdAt}
          </span>
          <span className="meta-item">
            <span className="meta-icon">🔄</span>
            {project.lastModified}
          </span>
          <span className="meta-item">
            <span className="meta-icon">📁</span>
            {project.fileCount} 文件
          </span>
        </div>
        <div className="project-tags">
          {project.tags.map((tag: string, index: number) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="project-actions">
        <button 
          className="action-btn primary"
          onClick={() => onAction("regenerate", project)}
        >
          重新生成
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => onAction("download", project)}
        >
          下载
        </button>
        <button 
          className="action-btn outline"
          onClick={() => onAction("delete", project)}
        >
          删除
        </button>
      </div>
    </div>
  );
};

export function Projects() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setLoading(true);
    // 从本地存储加载项目
    const savedProjects = JSON.parse(localStorage.getItem("metacoding_projects") || "[]");
    
    // 转换格式
    const formattedProjects: SavedProject[] = savedProjects.map((project: any, index: number) => ({
      id: project.projectId || `project_${index}`,
      name: project.name || "未命名项目",
      description: project.message || "使用 MetaCoding 生成的项目",
      template: project.template || "react-ts",
      status: ["active", "completed", "archived", "failed"][index % 4] as any,
      createdAt: new Date(project.timestamp || Date.now()).toLocaleDateString(),
      lastModified: ["今天", "昨天", "3天前", "1周前"][index % 4],
      fileCount: project.files?.length || Math.floor(Math.random() * 50) + 10,
      tags: getRandomTags(project.template),
      data: project
    }));

    // 如果没有项目，添加一些示例
    if (formattedProjects.length === 0) {
      formattedProjects.push(...getSampleProjects());
    }

    setProjects(formattedProjects);
    setLoading(false);
  };

  const getRandomTags = (template: string): string[] => {
    const tagSets = {
      "react-ts": ["React", "TypeScript", "Vite", "现代", "SPA"],
      "vue-ts": ["Vue", "TypeScript", "Composition", "现代化"],
      "nestjs": ["NestJS", "后端", "API", "企业级"],
      "express-ts": ["Express", "Node.js", "REST", "简单"]
    };
    
    return tagSets[template as keyof typeof tagSets] || ["项目", "代码"];
  };

  const getSampleProjects = (): SavedProject[] => {
    return [
      {
        id: "sample_1",
        name: "电商后台管理系统",
        description: "基于 React + TypeScript 的电商后台管理系统，包含商品管理、订单处理、用户管理等功能",
        template: "react-ts",
        status: "active",
        createdAt: "2024-01-15",
        lastModified: "今天",
        fileCount: 42,
        tags: ["React", "TypeScript", "Admin", "E-commerce"]
      },
      {
        id: "sample_2",
        name: "移动端博客应用",
        description: "使用 React Native 开发的跨平台博客应用，支持文章发布、评论、用户认证等功能",
        template: "react-ts",
        status: "completed",
        createdAt: "2024-01-10",
        lastModified: "3天前",
        fileCount: 56,
        tags: ["React Native", "Blog", "Mobile", "Firebase"]
      },
      {
        id: "sample_3",
        name: "企业级 API 服务",
        description: "基于 NestJS 的企业级 REST API 服务，包含用户认证、权限管理、文件上传等功能",
        template: "nestjs",
        status: "active",
        createdAt: "2024-01-05",
        lastModified: "昨天",
        fileCount: 78,
        tags: ["NestJS", "API", "TypeORM", "JWT"]
      }
    ];
  };

  const filters = [
    { id: "all", name: "全部项目", count: projects.length },
    { id: "active", name: "进行中", count: projects.filter(p => p.status === "active").length },
    { id: "completed", name: "已完成", count: projects.filter(p => p.status === "completed").length },
    { id: "archived", name: "已归档", count: projects.filter(p => p.status === "archived").length },
    { id: "failed", name: "失败", count: projects.filter(p => p.status === "failed").length }
  ];

  const filteredProjects = selectedFilter === "all" 
    ? projects 
    : projects.filter(project => project.status === selectedFilter);

  const handleProjectAction = async (action: string, project: SavedProject) => {
    switch (action) {
      case "regenerate":
        if (confirm(`确定要重新生成项目 "${project.name}" 吗？`)) {
          try {
            // 使用原始数据重新生成
            if (project.data) {
              const newProject = await ProjectGeneratorService.generateProject({
                name: project.name + "-v2",
                template: project.template,
                language: "typescript",
                features: ["router", "state", "testing"],
                description: project.description + " (重新生成版本)",
                author: "MetaCoding 用户"
              });
              
              alert(`✅ 重新生成成功！\n\n新项目: ${newProject.name}\n已生成 ${newProject.files.length} 个文件`);
              
              // 添加到项目列表
              const updatedProjects = [...projects, {
                ...project,
                id: newProject.projectId,
                name: newProject.name,
                lastModified: "刚刚",
                data: newProject
              }];
              setProjects(updatedProjects);
              
              // 保存到本地存储
              const savedProjects = JSON.parse(localStorage.getItem("metacoding_projects") || "[]");
              savedProjects.push(newProject);
              localStorage.setItem("metacoding_projects", JSON.stringify(savedProjects));
            }
          } catch (error: any) {
            alert(`重新生成失败: ${error.message}`);
          }
        }
        break;
        
      case "download":
        if (project.data) {
          try {
            await ProjectGeneratorService.downloadProject(project.data);
            alert(`📥 项目 "${project.name}" 已开始下载！`);
          } catch (error) {
            alert("下载失败，请重试");
          }
        } else {
          alert("项目数据不可用，无法下载");
        }
        break;
        
      case "delete":
        if (confirm(`确定要删除项目 "${project.name}" 吗？此操作不可恢复。`)) {
          const updatedProjects = projects.filter(p => p.id !== project.id);
          setProjects(updatedProjects);
          
          // 从本地存储删除
          const savedProjects = JSON.parse(localStorage.getItem("metacoding_projects") || "[]");
          const filtered = savedProjects.filter((p: any) => p.projectId !== project.id);
          localStorage.setItem("metacoding_projects", JSON.stringify(filtered));
          
          // 从选中列表中移除
          setSelectedProjects(selectedProjects.filter(id => id !== project.id));
          
          alert(`项目 "${project.name}" 已删除`);
        }
        break;
    }
  };

  const handleSelectProject = (projectId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProjects([...selectedProjects, projectId]);
    } else {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    }
  };

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  const handleCreateNewProject = () => {
    window.location.href = "/generator";
  };

  const handleImportProject = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        try {
          const text = await file.text();
          const project = JSON.parse(text);
          
          // 验证项目数据
          if (project.projectId && project.files) {
            const savedProjects = JSON.parse(localStorage.getItem("metacoding_projects") || "[]");
            savedProjects.push(project);
            localStorage.setItem("metacoding_projects", JSON.stringify(savedProjects));
            
            loadProjects();
            alert("✅ 项目导入成功！");
          } else {
            alert("❌ 文件格式不正确");
          }
        } catch (error) {
          alert("❌ 导入失败，请检查文件格式");
        }
      }
    };
    input.click();
  };

  const handleExportAll = () => {
    if (selectedProjects.length === 0) {
      alert("请先选择要导出的项目");
      return;
    }

    const selectedData = projects.filter(p => selectedProjects.includes(p.id)).map(p => p.data);
    if (selectedData.some(data => !data)) {
      alert("部分项目数据不可用，无法导出");
      return;
    }

    const data = JSON.stringify(selectedData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `metacoding-projects-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`✅ 已导出 ${selectedProjects.length} 个项目`);
  };

  const handleBatchDelete = () => {
    if (selectedProjects.length === 0) {
      alert("请先选择要删除的项目");
      return;
    }

    if (confirm(`确定要删除选中的 ${selectedProjects.length} 个项目吗？此操作不可恢复。`)) {
      const updatedProjects = projects.filter(p => !selectedProjects.includes(p.id));
      setProjects(updatedProjects);
      
      // 从本地存储删除
      const savedProjects = JSON.parse(localStorage.getItem("metacoding_projects") || "[]");
      const filtered = savedProjects.filter((p: any) => !selectedProjects.includes(p.projectId));
      localStorage.setItem("metacoding_projects", JSON.stringify(filtered));
      
      setSelectedProjects([]);
      alert(`✅ 已删除 ${selectedProjects.length} 个项目`);
    }
  };

  const handleRefresh = () => {
    loadProjects();
  };

  const totalFiles = projects.reduce((sum, project) => sum + project.fileCount, 0);
  const activeProjects = projects.filter(p => p.status === "active").length;

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div>
          <h1>📁 我的项目</h1>
          <p className="page-subtitle">
            管理和查看您生成的所有项目
          </p>
        </div>
        <div className="header-actions">
          <button 
            className="header-btn outline"
            onClick={handleRefresh}
          >
            🔄 刷新
          </button>
          <button 
            className="header-btn outline"
            onClick={handleImportProject}
          >
            📥 导入项目
          </button>
          <button 
            className="header-btn primary"
            onClick={handleCreateNewProject}
          >
            + 新建项目
          </button>
        </div>
      </div>

      {/* 项目统计 */}
      <div className="projects-stats">
        <div className="stat-card">
          <span className="stat-number">{projects.length}</span>
          <span className="stat-label">项目总数</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{activeProjects}</span>
          <span className="stat-label">进行中</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{totalFiles}</span>
          <span className="stat-label">总文件数</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {projects.length > 0 
              ? Math.round(projects.filter(p => p.status === "completed").length / projects.length * 100)
              : 0}%
          </span>
          <span className="stat-label">完成率</span>
        </div>
      </div>

      {/* 批量操作 */}
      {selectedProjects.length > 0 && (
        <div className="batch-actions-bar">
          <div className="batch-info">
            <span>已选择 {selectedProjects.length} 个项目</span>
          </div>
          <div className="batch-buttons">
            <button className="batch-btn" onClick={handleExportAll}>
              📤 导出选中
            </button>
            <button className="batch-btn danger" onClick={handleBatchDelete}>
              🗑️ 删除选中
            </button>
          </div>
        </div>
      )}

      {/* 筛选器 */}
      <div className="projects-filters">
        <div className="filter-group">
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={selectedProjects.length > 0 && selectedProjects.length === filteredProjects.length}
              onChange={handleSelectAll}
            />
            全选
          </label>
        </div>
        
        <div className="filter-group">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${selectedFilter === filter.id ? "active" : ""}`}
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.name}
              <span className="filter-count">{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 项目网格 */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>加载项目中...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onAction={handleProjectAction}
              isSelected={selectedProjects.includes(project.id)}
              onSelect={handleSelectProject}
            />
          ))}
        </div>
      ) : (
        <div className="no-projects">
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>没有找到项目</h3>
            <p>{selectedFilter === "all" 
              ? "您还没有生成任何项目" 
              : `没有 ${filters.find(f => f.id === selectedFilter)?.name.toLowerCase()} 的项目`}
            </p>
            <button 
              className="create-first-btn"
              onClick={handleCreateNewProject}
            >
              🚀 创建第一个项目
            </button>
          </div>
        </div>
      )}

      {/* 项目操作指南 */}
      <div className="projects-guide">
        <h2>💡 项目管理提示</h2>
        <div className="guide-content">
          <div className="guide-item">
            <h4>✅ 重新生成项目</h4>
            <p>如果项目需要更新或修改配置，可以使用重新生成功能获得最新版本</p>
          </div>
          <div className="guide-item">
            <h4>📥 定期备份</h4>
            <p>建议定期导出重要项目，确保代码安全</p>
          </div>
          <div className="guide-item">
            <h4>🗂️ 分类管理</h4>
            <p>使用不同的状态标签来组织和管理您的项目</p>
          </div>
          <div className="guide-item">
            <h4>🔄 版本控制</h4>
            <p>所有生成的项目都建议使用 Git 进行版本控制</p>
          </div>
        </div>
      </div>
    </div>
  );
}
