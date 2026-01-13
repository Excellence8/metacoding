// src/config/env.ts
const config = {
  // API 配置
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    timeout: 30000,
    retryCount: 3,
  },

  // 应用配置
  app: {
    name: "Metacoding Studio",
    version: "2.0.0",
    description: "AI驱动的智能代码生成平台",
    defaultLocale: "zh-CN",
    supportEmail: "support@metacoding.com",
  },

  // 特性开关
  features: {
    enableAnalytics: true,
    enableExport: true,
    enableDarkMode: true,
    enableNotifications: true,
  },

  // 路由配置
  routes: {
    home: "/",
    dashboard: "/dashboard",
    analytics: "/analytics",
    components: "/components",
    settings: "/settings",
    docs: "/docs",
  },

  // 主题配置
  theme: {
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    successColor: "#10b981",
    dangerColor: "#ef4444",
    warningColor: "#f59e0b",
    infoColor: "#3b82f6",
    
    fonts: {
      primary: "'Inter', -apple-system, sans-serif",
      mono: "'Fira Code', monospace",
    },
    
    breakpoints: {
      mobile: "640px",
      tablet: "768px",
      desktop: "1024px",
      wide: "1280px",
    },
  },

  // 导出配置
  export: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFormats: ["json", "csv", "pdf", "xlsx"],
    defaultFormat: "json",
  },
};

export default config;
