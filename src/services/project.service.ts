// src/services/project.service.ts

export interface Project {
  id: number;
  name: string;
  type: string;
  description?: string;
  progress: number;
  status: '新建' | '进行中' | '已完成' | '已暂停';
  createdAt: string;
  updatedAt: string;
  technologies?: string[];
  team?: string[];
}

class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      name: "电商后台系统",
      type: "dashboard",
      progress: 85,
      status: "进行中",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-06",
      technologies: ["React", "TypeScript", "Tailwind"],
      team: ["开发者A", "开发者B"]
    },
    {
      id: 2,
      name: "移动端应用",
      type: "mobile-app",
      progress: 100,
      status: "已完成",
      createdAt: "2026-01-02",
      updatedAt: "2026-01-05",
      technologies: ["React Native", "Redux"],
      team: ["开发者C"]
    },
    {
      id: 3,
      name: "数据分析平台",
      type: "analytics",
      progress: 45,
      status: "进行中",
      createdAt: "2026-01-03",
      updatedAt: "2026-01-06",
      technologies: ["Vue", "D3.js", "Express"],
      team: ["开发者A", "开发者D"]
    }
  ];

  // 获取所有项目
  getAllProjects(): Promise<Project[]> {
    return Promise.resolve([...this.projects]);
  }

  // 获取单个项目
  getProjectById(id: number): Promise<Project | null> {
    const project = this.projects.find(p => p.id === id);
    return Promise.resolve(project || null);
  }

  // 创建新项目
  createProject(projectData: {
    name: string;
    type: string;
    description?: string;
  }): Promise<Project> {
    const newProject: Project = {
      id: Date.now(),
      name: projectData.name,
      type: projectData.type,
      description: projectData.description,
      progress: 0,
      status: "新建",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      technologies: ["React", "TypeScript", "Vite"],
      team: ["当前用户"]
    };

    this.projects.unshift(newProject);
    return Promise.resolve(newProject);
  }

  // 更新项目
  updateProject(id: number, updates: Partial<Project>): Promise<Project | null> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return Promise.resolve(null);

    const updatedProject = {
      ...this.projects[index],
      ...updates,
      updatedAt: new Date().toISOString().split("T")[0]
    };

    this.projects[index] = updatedProject;
    return Promise.resolve(updatedProject);
  }

  // 删除项目
  deleteProject(id: number): Promise<boolean> {
    const initialLength = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id);
    return Promise.resolve(this.projects.length < initialLength);
  }

  // 获取项目统计
  getProjectStats() {
    const total = this.projects.length;
    const completed = this.projects.filter(p => p.status === "已完成").length;
    const inProgress = this.projects.filter(p => p.status === "进行中").length;
    const averageProgress = this.projects.reduce((acc, p) => acc + p.progress, 0) / total;

    return {
      total,
      completed,
      inProgress,
      averageProgress: Math.round(averageProgress),
      recentProjects: this.projects.slice(0, 5)
    };
  }
}

export const projectService = new ProjectService();
