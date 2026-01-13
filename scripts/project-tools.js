#!/usr/bin/env node
// scripts/project-tools.js

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class ProjectTools {
  constructor() {
    this.projectRoot = process.cwd();
  }

  // 检查项目健康状态
  checkHealth() {
    console.log("🔍 检查项目健康状态...\n");
    
    const checks = [
      this.checkNodeVersion(),
      this.checkDependencies(),
      this.checkConfigFiles(),
      this.checkBuildStatus(),
    ];

    const results = checks.filter(check => !check.healthy);
    
    if (results.length === 0) {
      console.log("✅ 所有检查通过！项目状态健康。");
    } else {
      console.log("❌ 发现问题：");
      results.forEach(result => {
        console.log(`  - ${result.message}`);
      });
    }
  }

  // 生成组件
  generateComponent(name, options = {}) {
    const componentDir = path.join(this.projectRoot, "src/components", name);
    
    if (fs.existsSync(componentDir)) {
      console.error(`❌ 组件 ${name} 已存在`);
      return;
    }

    // 创建目录
    fs.mkdirSync(componentDir, { recursive: true });

    // 创建组件文件
    const componentTemplate = this.getComponentTemplate(name, options);
    fs.writeFileSync(
      path.join(componentDir, "index.tsx"),
      componentTemplate
    );

    // 创建样式文件
    fs.writeFileSync(
      path.join(componentDir, `${name}.css`),
      this.getCSSTemplate(name)
    );

    console.log(`✅ 组件 ${name} 创建成功`);
  }

  // 获取组件模板
  getComponentTemplate(name, options) {
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    
    return `
import React from "react";
import "./${name}.css";

interface ${pascalName}Props {
  // 定义组件属性
}

const ${pascalName}: React.FC<${pascalName}Props> = (props) => {
  return (
    <div className="${name}">
      {/* 组件内容 */}
    </div>
  );
};

export default ${pascalName};
    `.trim();
  }

  // 获取CSS模板
  getCSSTemplate(name) {
    return `
.${name} {
  /* 组件样式 */
}
    `.trim();
  }

  // 辅助方法
  checkNodeVersion() {
    const version = process.version;
    const major = parseInt(version.replace("v", "").split(".")[0]);
    
    return {
      healthy: major >= 16,
      message: `Node.js 版本 ${version} (需要 v16+)`,
    };
  }

  checkDependencies() {
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(this.projectRoot, "package.json"), "utf8")
      );
      
      return {
        healthy: true,
        message: "依赖项检查通过",
      };
    } catch (error) {
      return {
        healthy: false,
        message: "无法读取 package.json",
      };
    }
  }

  checkConfigFiles() {
    const requiredFiles = [
      "package.json",
      "vite.config.ts",
      "tsconfig.json",
      "src/config/env.ts",
    ];

    const missingFiles = requiredFiles.filter(
      file => !fs.existsSync(path.join(this.projectRoot, file))
    );

    return {
      healthy: missingFiles.length === 0,
      message: missingFiles.length === 0 
        ? "配置文件完整"
        : `缺少文件: ${missingFiles.join(", ")}`,
    };
  }

  checkBuildStatus() {
    try {
      execSync("npm run build --dry-run", { stdio: "pipe" });
      return {
        healthy: true,
        message: "构建配置正常",
      };
    } catch (error) {
      return {
        healthy: false,
        message: "构建配置可能有问题",
      };
    }
  }
}

// CLI 接口
const args = process.argv.slice(2);
const command = args[0];
const tools = new ProjectTools();

switch (command) {
  case "health":
    tools.checkHealth();
    break;
    
  case "generate":
    const componentName = args[1];
    if (componentName) {
      tools.generateComponent(componentName);
    } else {
      console.error("❌ 请提供组件名称");
    }
    break;
    
  case "help":
  default:
    console.log(`
Metacoding Studio 项目管理工具

用法:
  node scripts/project-tools.js <命令> [参数]

命令:
  health       检查项目健康状态
  generate <名称>  生成新组件
  help        显示帮助信息

示例:
  node scripts/project-tools.js health
  node scripts/project-tools.js generate Button
    `);
}
