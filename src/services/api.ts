// src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

interface ApiConfig {
  baseURL?: string;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config: ApiConfig = {}) {
    this.baseURL = config.baseURL || API_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.headers,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", ...options });
  }

  post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", ...options });
  }
}

// 创建实例
export const api = new ApiClient();

// 身份验证服务
export const authService = {
  login: async (email: string, password: string) => {
    return api.post("/auth/login", { email, password });
  },
  
  logout: async () => {
    return api.post("/auth/logout");
  },
  
  refreshToken: async () => {
    return api.post("/auth/refresh");
  }
};

// 数据服务
export const dataService = {
  // Analytics 相关
  getAnalyticsData: async () => {
    return api.get("/analytics");
  },
  
  exportReport: async (format: "json" | "csv" | "pdf") => {
    return api.get(`/analytics/export?format=${format}`);
  },
  
  // 项目相关
  getProjects: async () => {
    return api.get("/projects");
  },
  
  createProject: async (projectData: any) => {
    return api.post("/projects", projectData);
  }
};

// 本地存储辅助函数
export const storage = {
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  get: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};
