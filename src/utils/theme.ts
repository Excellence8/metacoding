// 主题管理
export type Theme = "light" | "dark" | "blue" | "purple";

export interface ThemeConfig {
  name: Theme;
  label: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  card: string;
  border: string;
}

export const themes: Record<Theme, ThemeConfig> = {
  light: {
    name: "light",
    label: "浅色",
    primary: "#4f46e5",
    secondary: "#7c3aed",
    background: "#f5f7fa",
    text: "#1f2937",
    card: "#ffffff",
    border: "#e5e7eb"
  },
  dark: {
    name: "dark",
    label: "深色",
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    background: "#111827",
    text: "#f9fafb",
    card: "#1f2937",
    border: "#374151"
  },
  blue: {
    name: "blue",
    label: "蓝色",
    primary: "#3b82f6",
    secondary: "#60a5fa",
    background: "#eff6ff",
    text: "#1e3a8a",
    card: "#ffffff",
    border: "#dbeafe"
  },
  purple: {
    name: "purple",
    label: "紫色",
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    background: "#faf5ff",
    text: "#5b21b6",
    card: "#ffffff",
    border: "#ede9fe"
  }
};

export const getCurrentTheme = (): Theme => {
  const saved = localStorage.getItem("metacoding-theme") as Theme;
  return saved && themes[saved] ? saved : "light";
};

export const setTheme = (theme: Theme) => {
  localStorage.setItem("metacoding-theme", theme);
  applyTheme(theme);
};

export const applyTheme = (theme: Theme) => {
  const themeConfig = themes[theme];
  
  // 应用 CSS 变量
  const root = document.documentElement;
  root.style.setProperty("--primary", themeConfig.primary);
  root.style.setProperty("--secondary", themeConfig.secondary);
  root.style.setProperty("--background", themeConfig.background);
  root.style.setProperty("--text", themeConfig.text);
  root.style.setProperty("--card", themeConfig.card);
  root.style.setProperty("--border", themeConfig.border);
  
  // 添加主题类名
  root.className = \`theme-\${theme}\`;
};

// 初始化主题
export const initTheme = () => {
  const theme = getCurrentTheme();
  applyTheme(theme);
};
