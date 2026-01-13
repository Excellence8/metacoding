// 项目历史记录管理
export interface ProjectHistoryItem {
  id: string;
  name: string;
  template: string;
  timestamp: number;
  data: any;
}

const STORAGE_KEY = "metacoding-project-history";
const MAX_HISTORY = 20;

export const getProjectHistory = (): ProjectHistoryItem[] => {
  try {
    const historyJson = localStorage.getItem(STORAGE_KEY);
    if (!historyJson) return [];
    
    const history = JSON.parse(historyJson);
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error("读取项目历史失败:", error);
    return [];
  }
};

export const addProjectToHistory = (projectData: any) => {
  try {
    const history = getProjectHistory();
    
    const historyItem: ProjectHistoryItem = {
      id: projectData.projectId || `project_\${Date.now()}`,
      name: projectData.projectId || "未命名项目",
      template: projectData.template || "未知模板",
      timestamp: Date.now(),
      data: projectData
    };
    
    history.unshift(historyItem);
    
    const limitedHistory = history.slice(0, MAX_HISTORY);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
    
    return historyItem;
  } catch (error) {
    console.error("保存项目历史失败:", error);
    return null;
  }
};

export const removeProjectFromHistory = (projectId: string) => {
  try {
    const history = getProjectHistory();
    const filteredHistory = history.filter(item => item.id !== projectId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
    return true;
  } catch (error) {
    console.error("删除项目历史失败:", error);
    return false;
  }
};

export const clearProjectHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("清除项目历史失败:", error);
    return false;
  }
};

export const getProjectStats = () => {
  const history = getProjectHistory();
  
  const templateStats: Record<string, number> = {};
  history.forEach(item => {
    templateStats[item.template] = (templateStats[item.template] || 0) + 1;
  });
  
  const latestProject = history.length > 0 ? history[0] : null;
  
  return {
    total: history.length,
    templates: templateStats,
    latest: latestProject ? {
      name: latestProject.name,
      time: new Date(latestProject.timestamp).toLocaleString()
    } : null
  };
};
