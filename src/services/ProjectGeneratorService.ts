// src/services/ProjectGeneratorService.ts

export interface ProjectConfig {
  name: string;
  template: string;
  language: string;
  features: string[];
  description: string;
  author: string;
}

export interface GeneratedProject {
  success: boolean;
  projectId: string;
  message: string;
  files: Array<{
    path: string;
    content: string;
    language: string;
  }>;
  commands: string[];
  timestamp: string;
}

export class ProjectGeneratorService {
  private static validateProjectName(name: string): boolean {
    // 项目名只能包含字母、数字、连字符和下划线
    const regex = /^[a-zA-Z0-9-_]+$/;
    return regex.test(name) && name.length >= 2;
  }

  static async generateProject(config: ProjectConfig): Promise<GeneratedProject> {
    // 验证项目名称
    if (!this.validateProjectName(config.name)) {
      throw new Error("项目名称只能包含字母、数字、连字符和下划线，且至少2个字符");
    }

    console.log("🚀 开始生成项目:", config);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const projectId = `project_${Date.now()}`;
    const files = this.generateProjectFiles(config);
    
    return {
      success: true,
      projectId,
      message: `项目 "${config.name}" 生成成功！`,
      files,
      commands: [
        `cd ${config.name}`,
        "npm install",
        "npm run dev",
        "# 或使用 yarn",
        "# yarn",
        "# yarn dev"
      ],
      timestamp: new Date().toISOString()
    };
  }

  private static generateProjectFiles(config: ProjectConfig): Array<{path: string; content: string; language: string}> {
    const files = [];
    
    // 根据模板生成不同的文件
    if (config.template === "react-ts") {
      files.push(...this.generateReactTSFiles(config));
    } else if (config.template === "vue-ts") {
      files.push(...this.generateVueTSFiles(config));
    } else if (config.template === "nestjs") {
      files.push(...this.generateNestJSFiles(config));
    } else if (config.template === "express-ts") {
      files.push(...this.generateExpressTSFiles(config));
    }
    
    return files;
  }

  private static generateReactTSFiles(config: ProjectConfig) {
    return [
      {
        path: "package.json",
        content: JSON.stringify({
          name: config.name,
          version: "1.0.0",
          private: true,
          description: config.description,
          author: config.author,
          scripts: {
            dev: "vite",
            build: "tsc && vite build",
            preview: "vite preview",
            lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
          },
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0"
          },
          devDependencies: {
            "@types/react": "^18.2.43",
            "@types/react-dom": "^18.2.17",
            "@typescript-eslint/eslint-plugin": "^6.14.0",
            "@typescript-eslint/parser": "^6.14.0",
            "@vitejs/plugin-react": "^4.2.1",
            eslint: "^8.55.0",
            "eslint-plugin-react-hooks": "^4.6.0",
            "eslint-plugin-react-refresh": "^0.4.5",
            typescript: "^5.2.2",
            vite: "^5.0.8"
          }
        }, null, 2),
        language: "json"
      },
      {
        path: "tsconfig.json",
        content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
        language: "json"
      },
      {
        path: "vite.config.ts",
        content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})`,
        language: "typescript"
      },
      {
        path: "src/App.tsx",
        content: `import React from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>欢迎来到 ${config.name}</h1>
      <p>这是一个使用 MetaCoding 生成的 React + TypeScript 项目</p>
      <div className="features">
        <h2>包含的功能：</h2>
        <ul>
          ${config.features.map(feature => `<li key="${feature}">${feature}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  )
}

export default App`,
        language: "typescript"
      },
      {
        path: "src/main.tsx",
        content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
        language: "typescript"
      },
      {
        path: "README.md",
        content: `# ${config.name}

${config.description}

## 项目特性

- 基于 React + TypeScript
- 使用 Vite 构建工具
- 包含 ESLint 代码检查
- 包含以下功能：
${config.features.map(feature => `  - ${feature}`).join('\n')}

## 开始使用

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
\`\`\`

## 项目结构

\`\`\`
${config.name}/
 src/
    App.tsx
    main.tsx
    index.css
    App.css
 public/
 package.json
 tsconfig.json
 vite.config.ts
 README.md
\`\`\`

## 使用说明

1. 修改 \`src/App.tsx\` 开始编写你的应用
2. 添加新组件到 \`src/components/\` 目录
3. 在 \`vite.config.ts\` 中配置项目设置
4. 运行 \`npm run build\` 构建生产版本

---
*由 MetaCoding 生成于 ${new Date().toLocaleDateString()}*`,
        language: "markdown"
      }
    ];
  }

  private static generateVueTSFiles(config: ProjectConfig) {
    return [
      {
        path: "package.json",
        content: JSON.stringify({
          name: config.name,
          version: "1.0.0",
          private: true,
          description: config.description,
          author: config.author,
          scripts: {
            dev: "vite",
            build: "vue-tsc && vite build",
            preview: "vite preview",
            lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
          },
          dependencies: {
            vue: "^3.3.8"
          },
          devDependencies: {
            "@vitejs/plugin-vue": "^4.5.0",
            "@vue/eslint-config-typescript": "^12.0.0",
            "@vue/tsconfig": "^0.4.0",
            typescript: "^5.2.2",
            vite: "^5.0.8",
            "vue-tsc": "^1.8.22"
          }
        }, null, 2),
        language: "json"
      }
    ];
  }

  private static generateNestJSFiles(config: ProjectConfig) {
    return [
      {
        path: "package.json",
        content: JSON.stringify({
          name: config.name,
          version: "1.0.0",
          description: config.description,
          author: config.author,
          scripts: {
            build: "nest build",
            start: "nest start",
            "start:dev": "nest start --watch",
            "start:debug": "nest start --debug --watch",
            "start:prod": "node dist/main",
            lint: "eslint \"{src,apps,libs,test}/**/*.ts\"",
            test: "jest",
            "test:watch": "jest --watch",
            "test:cov": "jest --coverage",
            "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"
          },
          dependencies: {
            "@nestjs/common": "^10.0.0",
            "@nestjs/core": "^10.0.0",
            "@nestjs/platform-express": "^10.0.0",
            "reflect-metadata": "^0.1.13",
            rxjs: "^7.8.1"
          },
          devDependencies: {
            "@nestjs/cli": "^10.0.0",
            "@nestjs/schematics": "^10.0.0",
            "@nestjs/testing": "^10.0.0",
            "@types/express": "^4.17.17",
            "@types/jest": "^29.5.2",
            "@types/node": "^20.3.1",
            "@typescript-eslint/eslint-plugin": "^6.0.0",
            "@typescript-eslint/parser": "^6.0.0",
            eslint: "^8.42.0",
            "eslint-config-prettier": "^8.8.0",
            "eslint-plugin-prettier": "^4.2.1",
            jest: "^29.5.0",
            prettier: "^2.8.8",
            "ts-jest": "^29.1.0",
            "ts-loader": "^9.4.3",
            "ts-node": "^10.9.1",
            "tsconfig-paths": "^4.2.0",
            typescript: "^5.1.3"
          }
        }, null, 2),
        language: "json"
      }
    ];
  }

  private static generateExpressTSFiles(config: ProjectConfig) {
    return [
      {
        path: "package.json",
        content: JSON.stringify({
          name: config.name,
          version: "1.0.0",
          description: config.description,
          author: config.author,
          main: "dist/index.js",
          scripts: {
            start: "node dist/index.js",
            build: "tsc",
            dev: "ts-node-dev src/index.ts",
            test: "jest"
          },
          dependencies: {
            express: "^4.18.2",
            cors: "^2.8.5",
            dotenv: "^16.3.1"
          },
          devDependencies: {
            "@types/express": "^4.17.17",
            "@types/node": "^20.3.1",
            "@types/cors": "^2.8.13",
            typescript: "^5.1.3",
            "ts-node-dev": "^2.0.0",
            jest: "^29.5.0",
            "@types/jest": "^29.5.2"
          }
        }, null, 2),
        language: "json"
      }
    ];
  }

  // 下载项目为ZIP文件（模拟）
  static async downloadProject(project: GeneratedProject): Promise<void> {
    console.log("📥 下载项目:", project.projectId);
    
    // 创建项目文件内容的JSON字符串
    const projectData = {
      ...project,
      downloadTime: new Date().toISOString()
    };
    
    const data = JSON.stringify(projectData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.projectId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log("✅ 下载完成");
  }

  // 复制文本到剪贴板
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // 备用方法
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);
        return success;
      } catch {
        return false;
      }
    }
  }

  // 验证项目配置
  static validateConfig(config: ProjectConfig): string[] {
    const errors: string[] = [];
    
    if (!config.name.trim()) {
      errors.push("项目名称不能为空");
    } else if (!this.validateProjectName(config.name)) {
      errors.push("项目名称只能包含字母、数字、连字符和下划线，且至少2个字符");
    }
    
    if (!config.description.trim()) {
      errors.push("项目描述不能为空");
    }
    
    return errors;
  }
}
