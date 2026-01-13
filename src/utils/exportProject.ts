// 项目导出工具函数
import JSZip from 'jszip';
import type { ProjectData, TemplateFile } from './types';

// 导出项目为ZIP
export const exportProjectAsZip = async (projectData: ProjectData): Promise<boolean> => {
  try {
    console.log(`🚀 开始导出项目: ${projectData.projectId}`);
    
    // 动态导入 JSZip
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // 添加项目文件到ZIP
    projectData.files.forEach(file => {
      if (file.type === 'file') {
        zip.file(file.path, file.content);
      } else if (file.type === 'dir') {
        zip.folder(file.path);
      }
    });
    
    // 生成ZIP内容
    const content = await zip.generateAsync({ type: 'blob' });
    
    // 创建下载链接
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.projectId}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ 项目 ZIP 文件已生成并开始下载！');
    return true;
    
  } catch (error: any) {
    console.error('ZIP 导出失败:', error);
    alert(`❌ ZIP 导出失败: ${error.message}\n请查看控制台获取详细信息。`);
    return false;
  }
};

// 导出项目为JSON配置
export const exportProjectAsJson = (projectData: ProjectData): void => {
  try {
    console.log(`📝 导出JSON配置: ${projectData.projectId}`);
    
    // 准备导出数据
    const exportData = {
      meta: {
        version: '1.0.0',
        generator: 'MetaCoding',
        generatedAt: new Date().toISOString(),
      },
      project: {
        id: projectData.projectId,
        name: projectData.projectName,
        template: projectData.template,
        description: projectData.description || '',
      },
      config: {
        dependencies: projectData.dependencies || {},
        devDependencies: projectData.devDependencies || {},
        scripts: projectData.scripts || {},
      },
      files: projectData.files.map(file => ({
        name: file.name,
        type: file.type,
        path: file.path,
        content: file.type === 'file' ? file.content : null,
      })),
    };
    
    // 创建JSON字符串
    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // 创建下载链接
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.projectId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('📄 项目配置已导出为 JSON 文件！');
    
  } catch (error: any) {
    console.error('JSON 导出失败:', error);
    alert(`❌ JSON 导出失败: ${error.message}`);
  }
};

// 导出项目为Markdown文档
export const exportProjectAsMarkdown = (projectData: ProjectData): void => {
  try {
    console.log(`📋 导出Markdown文档: ${projectData.projectId}`);
    
    // 创建Markdown内容 - 使用字符串连接避免模板嵌套问题
    const fileList = projectData.files.map(f => '- ' + f.path).join('\n');
    const scriptsList = Object.entries(projectData.scripts || {})
      .map(([key, value]) => '- `npm run ' + key + '`: ' + value)
      .join('\n');
    
    const content = `# ${projectData.projectName}

## 项目简介
这是一个使用 MetaCoding 生成的 ${projectData.template} 项目。

## 快速开始

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建版本
npm run preview
\`\`\`

## 项目结构
${fileList}

## 脚本说明
${scriptsList}

## 许可证
MIT

> 由 [MetaCoding](https://github.com/yourusername/metacoding) 生成于 ${new Date().toLocaleDateString()}
`;
    
    // 创建文件并下载
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.projectId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('📄 项目已导出为 Markdown 文件！');
    
  } catch (error: any) {
    console.error('Markdown 导出失败:', error);
    alert(`❌ Markdown 导出失败: ${error.message}`);
  }
};

// 复制项目配置到剪贴板
export const copyProjectConfig = async (projectData: ProjectData): Promise<boolean> => {
  try {
    const config = {
      name: projectData.projectName,
      template: projectData.template,
      files: projectData.files.length,
      dependencies: Object.keys(projectData.dependencies || {}).length,
      devDependencies: Object.keys(projectData.devDependencies || {}).length,
      generatedAt: new Date().toISOString(),
    };
    
    const configText = JSON.stringify(config, null, 2);
    await navigator.clipboard.writeText(configText);
    
    alert('📋 项目配置已复制到剪贴板！');
    return true;
    
  } catch (error: any) {
    console.error('复制失败:', error);
    alert(`❌ 复制失败: ${error.message}`);
    return false;
  }
};

// 复制启动命令到剪贴板
export const copyStartCommands = async (projectData: ProjectData): Promise<boolean> => {
  try {
    const commands = `# ${projectData.projectName}
cd ${projectData.projectId}
npm install
npm run dev`;
    
    await navigator.clipboard.writeText(commands);
    
    alert('📋 启动命令已复制到剪贴板！');
    return true;
    
  } catch (error: any) {
    console.error('复制失败:', error);
    alert(`❌ 复制失败: ${error.message}`);
    return false;
  }
};

// 获取项目统计信息
export const getProjectStats = (projectData: ProjectData) => {
  const fileCount = projectData.files.length;
  const dirCount = projectData.files.filter(f => f.type === 'dir').length;
  const codeFileCount = projectData.files.filter(f => 
    f.type === 'file' && 
    (f.path.endsWith('.ts') || f.path.endsWith('.tsx') || f.path.endsWith('.js') || f.path.endsWith('.jsx'))
  ).length;
  
  return {
    fileCount,
    dirCount,
    codeFileCount,
    totalSize: fileCount * 1024, // 估算大小
    dependencies: Object.keys(projectData.dependencies || {}).length,
    devDependencies: Object.keys(projectData.devDependencies || {}).length,
  };
};

// 生成项目README内容
export const generateReadmeContent = (projectData: ProjectData): string => {
  const fileList = projectData.files.map(f => '- ' + f.path).join('\n');
  const scriptsList = Object.entries(projectData.scripts || {})
    .map(([key, value]) => '- `npm run ' + key + '`: ' + value)
    .join('\n');
  
  return `# ${projectData.projectName}

## 项目简介
这是一个使用 MetaCoding 生成的 ${projectData.template} 项目。

## 快速开始

\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建版本
npm run preview
\`\`\`

## 项目结构
${fileList}

## 脚本说明
${scriptsList}

## 许可证
MIT

> 由 [MetaCoding](https://github.com/yourusername/metacoding) 生成于 ${new Date().toLocaleDateString()}
`;
};

// 类型定义
export interface ProjectStats {
  fileCount: number;
  dirCount: number;
  codeFileCount: number;
  totalSize: number;
  dependencies: number;
  devDependencies: number;
}
