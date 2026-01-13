# ==========================================
# Metacoding AI Development Studio v2.0
# 完全修复版 - 包含 table 模板
# ==========================================

param(
    [string]$command,
    [string]$type,
    [string]$name,
    [string]$template = "basic"
)

# 颜色定义
$colors = @{
    Primary = "Cyan"
    Success = "Green"
    Error = "Red"
    Warning = "Yellow"
    Info = "Blue"
    Highlight = "Magenta"
    Dim = "DarkGray"
}

function Show-Banner {
    Write-Host ""
    Write-Host "" -ForegroundColor $colors.Primary
    Write-Host "     Metacoding Studio v2.0      " -ForegroundColor $colors.Primary
    Write-Host "" -ForegroundColor $colors.Primary
    Write-Host ""
}

function Show-Header {
    param([string]$title)
    Write-Host ""
    Write-Host "=== $title ===" -ForegroundColor $colors.Primary
    Write-Host ""
}

function Write-Message {
    param([string]$message, [string]$level = "INFO")
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    
    switch ($level) {
        "SUCCESS" { 
            $color = $colors.Success
            $icon = "✓"
        }
        "ERROR" { 
            $color = $colors.Error
            $icon = "✗"
        }
        "WARNING" { 
            $color = $colors.Warning
            $icon = "⚠"
        }
        "INFO" { 
            $color = $colors.Info
            $icon = "ℹ"
        }
        default { 
            $color = $colors.Dim
            $icon = "•"
        }
    }
    
    Write-Host "[$timestamp] $icon $message" -ForegroundColor $color
}

# ==========================================
# 核心功能
# ==========================================

function Initialize-Studio {
    Show-Header "初始化工作室"
    
    Write-Message "开始初始化项目结构" "INFO"
    
    # 创建核心目录
    $coreDirs = @(
        "src",
        "src/components",
        "src/pages",
        "src/layouts",
        "src/services",
        "src/hooks",
        "src/utils",
        "src/assets",
        "src/styles",
        "src/types",
        "tests",
        "docs",
        ".metacoding/templates",
        ".metacoding/logs"
    )
    
    $createdCount = 0
    foreach ($dir in $coreDirs) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Message "创建目录: $dir" "SUCCESS"
            $createdCount++
        }
    }
    
    # 创建配置文件
    Create-BaseFiles
    
    Write-Message "初始化完成! 创建了 $createdCount 个目录" "SUCCESS"
    Write-Host ""
    Write-Host "🎉 你的 AI 开发工作室已就绪!" -ForegroundColor $colors.Highlight
    Write-Host "   使用 .\meta.ps1 help 查看所有功能" -ForegroundColor $colors.Info
}

function Create-BaseFiles {
    # TypeScript 配置
    if (-not (Test-Path "tsconfig.json")) {
        $tsconfig = '{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}'
        Set-Content -Path "tsconfig.json" -Value $tsconfig -Encoding UTF8
        Write-Message "创建: tsconfig.json" "SUCCESS"
    }
    
    # 项目 README
    if (-not (Test-Path "README.md")) {
        $projectName = Split-Path $PWD -Leaf
        $readme = "# $projectName

## 🚀 简介
使用 Metacoding Studio 创建的 React + TypeScript 项目。

## 📁 项目结构
\`\`\`
src/
 components/   # 可复用组件
 pages/       # 页面组件  
 services/    # API 服务
 hooks/       # 自定义 Hooks
 utils/       # 工具函数
 assets/      # 静态资源
\`\`\`

## 🛠 开发
\`\`\`bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 代码检查
npm run lint
\`\`\`

## 📝 使用 Metacoding Studio
\`\`\`powershell
# 生成组件
.\meta.ps1 generate component Button

# 生成页面
.\meta.ps1 generate page Home

# 查看状态
.\meta.ps1 status
\`\`\`
"
        Set-Content -Path "README.md" -Value $readme -Encoding UTF8
        Write-Message "创建: README.md" "SUCCESS"
    }
}

# ==========================================
# 智能生成系统（包含 table 模板）
# ==========================================

function Generate-Component {
    param([string]$componentName, [string]$template = "basic")
    
    Show-Header "生成组件: $componentName"
    
    $componentDir = "src/components/$componentName"
    
    if (Test-Path $componentDir) {
        Write-Message "组件 '$componentName' 已存在" "ERROR"
        return
    }
    
    New-Item -ItemType Directory -Path $componentDir -Force | Out-Null
    
    # 根据模板生成不同的组件
    $componentCode = switch ($template) {
        "modal" {
            "import React from 'react';
import './${componentName}.css';

interface ${componentName}Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className='${componentName.ToLower()}-overlay' onClick={onClose}>
      <div className='${componentName.ToLower()}-content' onClick={e => e.stopPropagation()}>
        <div className='${componentName.ToLower()}-header'>
          {title && <h2>{title}</h2>}
          <button className='close-button' onClick={onClose}></button>
        </div>
        <div className='${componentName.ToLower()}-body'>
          {children}
        </div>
        <div className='${componentName.ToLower()}-footer'>
          <button onClick={onClose}>关闭</button>
        </div>
      </div>
    </div>
  );
};

export default ${componentName};"
        }
        
        "form" {
            "import React, { useState } from 'react';
import './${componentName}.css';

interface FormData {
  [key: string]: any;
}

interface ${componentName}Props {
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  onSubmit, 
  initialData = {} 
}) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className='${componentName.ToLower()}' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>名称</label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name || ''}
          onChange={handleChange}
          placeholder='请输入名称'
        />
      </div>
      
      <div className='form-group'>
        <label htmlFor='email'>邮箱</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email || ''}
          onChange={handleChange}
          placeholder='请输入邮箱'
        />
      </div>
      
      <div className='form-actions'>
        <button type='submit'>提交</button>
        <button type='button' onClick={() => setFormData(initialData)}>
          重置
        </button>
      </div>
    </form>
  );
};

export default ${componentName};"
        }
        
        "table" {
            "import React from 'react';
import './${componentName}.css';

interface Column {
  key: string;
  title: string;
  width?: string;
}

interface ${componentName}Props {
  data: any[];
  columns: Column[];
  onRowClick?: (item: any) => void;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  data, 
  columns, 
  onRowClick 
}) => {
  return (
    <div className='${componentName.ToLower()}'>
      <table className='table'>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ width: col.width }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={index} 
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? 'clickable-row' : ''}
            >
              {columns.map(col => (
                <td key={col.key}>
                  {item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ${componentName};"
        }
        
        default {  # basic 模板
            "import React from 'react';
import './${componentName}.css';

interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.ToLower()} \${className || ''}`}>
      {children || (
        <div className='content'>
          <h3>${componentName} 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default ${componentName};"
        }
    }
    
    # CSS 代码
    $cssCode = switch ($template) {
        "modal" {
            ".${componentName.ToLower()}-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.${componentName.ToLower()}-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.${componentName.ToLower()}-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.${componentName.ToLower()}-header h2 {
  margin: 0;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-button:hover {
  background: #f5f5f5;
}

.${componentName.ToLower()}-body {
  margin-bottom: 20px;
}

.${componentName.ToLower()}-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}"
        }
        
        "form" {
            ".${componentName.ToLower()} {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #007acc;
  box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.form-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.form-actions button[type='submit'] {
  background: #007acc;
  color: white;
}

.form-actions button[type='submit']:hover {
  background: #005a9e;
}

.form-actions button[type='button'] {
  background: #f5f5f5;
  color: #666;
}

.form-actions button[type='button']:hover {
  background: #e0e0e0;
}"
        }
        
        "table" {
            ".${componentName.ToLower()} {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.${componentName.ToLower()} .table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 600px;
}

.${componentName.ToLower()} th {
  background: #f8f9fa;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
  white-space: nowrap;
}

.${componentName.ToLower()} td {
  padding: 12px 16px;
  border-bottom: 1px solid #e9ecef;
  color: #495057;
}

.${componentName.ToLower()} tr.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.${componentName.ToLower()} tr.clickable-row:hover {
  background-color: #f8f9fa;
}

.${componentName.ToLower()} tr:last-child td {
  border-bottom: none;
}

.${componentName.ToLower()} tr:nth-child(even) {
  background-color: #fafafa;
}

.${componentName.ToLower()} tr:hover td {
  background-color: #f5f5f5;
}"
        }
        
        default {  # basic 模板
            ".${componentName.ToLower()} {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.${componentName.ToLower()}:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.${componentName.ToLower()} .content {
  text-align: center;
}

.${componentName.ToLower()} h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
}

.${componentName.ToLower()} p {
  margin: 0;
  color: #666;
  font-size: 14px;
}"
        }
    }
    
    # 保存文件
    Set-Content -Path "$componentDir/index.tsx" -Value $componentCode -Encoding UTF8
    Set-Content -Path "$componentDir/${componentName}.css" -Value $cssCode -Encoding UTF8
    
    Write-Message "组件 '$componentName' 已生成 (模板: $template)" "SUCCESS"
    Write-Message "位置: $componentDir/" "INFO"
}

function Generate-Page {
    param([string]$pageName, [string]$template = "basic")
    
    Show-Header "生成页面: $pageName"
    
    # 确保pages目录存在
    if (-not (Test-Path "src/pages")) {
        New-Item -ItemType Directory -Path "src/pages" -Force | Out-Null
    }
    
    $pageDir = "src/pages/$pageName"
    
    if (Test-Path $pageDir) {
        Write-Message "页面 '$pageName' 已存在" "ERROR"
        return
    }
    
    New-Item -ItemType Directory -Path $pageDir -Force | Out-Null
    
    # 页面模板
    $pageCode = switch ($template) {
        "dashboard" {
            "import React from 'react';
import './${pageName}.css';

const ${pageName}: React.FC = () => {
  return (
    <div className='dashboard'>
      <header className='dashboard-header'>
        <h1>${pageName} Dashboard</h1>
        <p>数据分析和概览面板</p>
      </header>
      
      <div className='dashboard-content'>
        <div className='stats-grid'>
          <div className='stat-card'>
            <div className='stat-title'>用户总数</div>
            <div className='stat-value'>1,234</div>
            <div className='stat-change'> 12%</div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-title'>订单数量</div>
            <div className='stat-value'>567</div>
            <div className='stat-change'> 8%</div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-title'>销售额</div>
            <div className='stat-value'>89,000</div>
            <div className='stat-change'> 15%</div>
          </div>
          
          <div className='stat-card'>
            <div className='stat-title'>转化率</div>
            <div className='stat-value'>4.5%</div>
            <div className='stat-change'> 2%</div>
          </div>
        </div>
        
        <div className='dashboard-main'>
          <div className='chart-section'>
            <h2>数据趋势</h2>
            <div className='chart-placeholder'>图表区域</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ${pageName};"
        }
        
        default {  # basic 模板
            "import React from 'react';
import './${pageName}.css';

const ${pageName}: React.FC = () => {
  return (
    <div className='page-container'>
      <header className='page-header'>
        <h1>${pageName}</h1>
        <p>欢迎来到 ${pageName} 页面</p>
      </header>
      
      <main className='page-content'>
        <section className='intro-section'>
          <h2>页面介绍</h2>
          <p>这是一个使用 Metacoding Studio 生成的页面。</p>
          <p>你可以在此页面上添加自己的内容和功能。</p>
        </section>
      </main>
      
      <footer className='page-footer'>
        <p>© 2025 ${pageName} 页面 | 使用 Metacoding Studio 创建</p>
      </footer>
    </div>
  );
};

export default ${pageName};"
        }
    }
    
    # CSS 代码
    $cssCode = if ($template -eq "dashboard") {
        ".dashboard {
  min-height: 100vh;
  background: #f5f7fa;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 30px;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 600;
}

.dashboard-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 16px;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.stat-title {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

.stat-change {
  font-size: 14px;
  font-weight: 500;
}

.chart-section {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.chart-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
}

.chart-placeholder {
  height: 300px;
  background: #f9fafb;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 16px;
}"
    } else {
        ".page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  margin: 0 0 15px 0;
  font-size: 48px;
  font-weight: 700;
}

.page-header p {
  margin: 0;
  font-size: 18px;
  opacity: 0.9;
}

.page-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
  width: 100%;
}

.intro-section {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.intro-section h2 {
  color: #333;
  font-size: 32px;
  margin: 0 0 20px 0;
}

.intro-section p {
  color: #666;
  font-size: 18px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 15px;
}

.page-footer {
  background: #f8f9fa;
  padding: 30px 20px;
  text-align: center;
  border-top: 1px solid #e9ecef;
}

.page-footer p {
  margin: 0;
  color: #666;
  font-size: 14px;
}"
    }
    
    # 保存文件
    Set-Content -Path "$pageDir/index.tsx" -Value $pageCode -Encoding UTF8
    Set-Content -Path "$pageDir/${pageName}.css" -Value $cssCode -Encoding UTF8
    
    Write-Message "页面 '$pageName' 已生成 (模板: $template)" "SUCCESS"
    Write-Message "位置: $pageDir/" "INFO"
}

function Show-ProjectStatus {
    Show-Header "项目状态"
    
    $projectName = Split-Path $PWD -Leaf
    Write-Host "📋 项目名称: $projectName" -ForegroundColor $colors.Highlight
    Write-Host "📁 项目路径: $PWD" -ForegroundColor $colors.Dim
    
    # 统计信息
    $components = if (Test-Path "src/components") { 
        (Get-ChildItem "src/components" -Directory).Count 
    } else { 0 }
    
    $pages = if (Test-Path "src/pages") { 
        (Get-ChildItem "src/pages" -Directory).Count 
    } else { 0 }
    
    $services = if (Test-Path "src/services") { 
        (Get-ChildItem "src/services" -File -Filter "*.ts").Count 
    } else { 0 }
    
    $hooks = if (Test-Path "src/hooks") { 
        (Get-ChildItem "src/hooks" -File -Filter "*.ts").Count 
    } else { 0 }
    
    $totalFiles = if (Test-Path "src") { 
        (Get-ChildItem "src" -Recurse -File).Count 
    } else { 0 }
    
    $totalSize = if (Test-Path "src") { 
        [math]::Round(((Get-ChildItem "src" -Recurse -File | Measure-Object Length -Sum).Sum / 1MB), 2)
    } else { 0 }
    
    Write-Host ""
    Write-Host "📊 代码统计:" -ForegroundColor $colors.Info
    Write-Host "  组件: $components 个" -ForegroundColor $colors.Highlight
    Write-Host "  页面: $pages 个" -ForegroundColor $colors.Highlight
    Write-Host "  服务: $services 个" -ForegroundColor $colors.Highlight
    Write-Host "  Hooks: $hooks 个" -ForegroundColor $colors.Highlight
    Write-Host "  文件总数: $totalFiles 个" -ForegroundColor $colors.Highlight
    Write-Host "  总大小: $totalSize MB" -ForegroundColor $colors.Highlight
    
    # 列出组件
    if ($components -gt 0) {
        Write-Host ""
        Write-Host "📁 组件列表:" -ForegroundColor $colors.Info
        Get-ChildItem "src/components" -Directory | ForEach-Object {
            $dirPath = $_.FullName
            $fileCount = if (Test-Path $dirPath) { (Get-ChildItem $dirPath -File).Count } else { 0 }
            Write-Host "  • $($_.Name.PadRight(15)) ($fileCount 个文件)" -ForegroundColor $colors.Dim
        }
    }
    
    # 列出页面
    if ($pages -gt 0) {
        Write-Host ""
        Write-Host "📄 页面列表:" -ForegroundColor $colors.Info
        Get-ChildItem "src/pages" -Directory | ForEach-Object {
            $dirPath = $_.FullName
            $fileCount = if (Test-Path $dirPath) { (Get-ChildItem $dirPath -File).Count } else { 0 }
            Write-Host "  • $($_.Name.PadRight(15)) ($fileCount 个文件)" -ForegroundColor $colors.Dim
        }
    }
    
    # 项目健康检查
    Write-Host ""
    Write-Host "🔍 项目健康:" -ForegroundColor $colors.Info
    
    $healthItems = @(
        @{Name="package.json"; Check={Test-Path "package.json"}},
        @{Name="tsconfig.json"; Check={Test-Path "tsconfig.json"}},
        @{Name="src目录"; Check={Test-Path "src"}},
        @{Name="README.md"; Check={Test-Path "README.md"}}
    )
    
    foreach ($item in $healthItems) {
        $exists = & $item.Check
        $status = if ($exists) { "✓" } else { "✗" }
        $color = if ($exists) { $colors.Success } else { $colors.Error }
        Write-Host "  $status $($item.Name)" -ForegroundColor $color
    }
}

function Check-ProjectHealth {
    Show-Header "项目健康检查"
    
    $score = 100
    $issues = @()
    $warnings = @()
    $goodItems = @()
    
    Write-Message "开始检查项目健康状况..." "INFO"
    
    # 检查必要文件
    if (Test-Path "package.json") {
        $goodItems += "package.json"
    } else {
        $issues += "缺失 package.json 文件"
        $score -= 20
    }
    
    if (Test-Path "tsconfig.json") {
        $goodItems += "tsconfig.json"
    } else {
        $warnings += "建议添加 tsconfig.json"
        $score -= 10
    }
    
    if (Test-Path "README.md") {
        $goodItems += "README.md"
    } else {
        $warnings += "建议添加 README.md"
        $score -= 5
    }
    
    # 检查目录结构
    if (Test-Path "src") {
        $goodItems += "src目录"
        
        # 检查子目录
        $requiredDirs = @("components", "pages")
        foreach ($dir in $requiredDirs) {
            $fullPath = "src/$dir"
            if (Test-Path $fullPath) {
                $goodItems += "src/$dir"
            } else {
                $warnings += "建议创建目录: src/$dir"
                $score -= 5
            }
        }
    } else {
        $issues += "缺失 src 目录"
        $score -= 30
    }
    
    # 显示结果
    if ($goodItems.Count -gt 0) {
        Write-Host ""
        Write-Host "✅ 良好项目:" -ForegroundColor $colors.Success
        foreach ($item in $goodItems) {
            Write-Host "  • $item" -ForegroundColor $colors.Dim
        }
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host ""
        Write-Host "⚠️  建议改进:" -ForegroundColor $colors.Warning
        foreach ($warning in $warnings) {
            Write-Host "  • $warning" -ForegroundColor $colors.Warning
        }
    }
    
    if ($issues.Count -gt 0) {
        Write-Host ""
        Write-Host "❌ 发现问题:" -ForegroundColor $colors.Error
        foreach ($issue in $issues) {
            Write-Host "  • $issue" -ForegroundColor $colors.Error
        }
    }
    
    # 显示健康度评分
    Write-Host ""
    Write-Host "📊 健康度评分: $score/100" -ForegroundColor $(if ($score -ge 80) { $colors.Success } elseif ($score -ge 60) { $colors.Warning } else { $colors.Error })
    
    if ($score -ge 80) {
        Write-Message "项目健康状况良好!" "SUCCESS"
    } elseif ($score -ge 60) {
        Write-Message "项目基本正常，建议改进" "WARNING"
    } else {
        Write-Message "项目存在问题，需要修复" "ERROR"
    }
}

function Show-Help {
    Show-Banner
    
    Write-Host "📚 使用说明" -ForegroundColor $colors.Primary
    Write-Host "  .\meta.ps1 [命令] [参数]" -ForegroundColor $colors.Highlight
    Write-Host ""
    
    Write-Host "🚀 核心命令" -ForegroundColor $colors.Primary
    Write-Host "  studio init                  初始化开发工作室" -ForegroundColor $colors.Highlight
    Write-Host "  studio health                项目健康检查" -ForegroundColor $colors.Highlight
    
    Write-Host ""
    Write-Host "✨ 智能生成系统" -ForegroundColor $colors.Primary
    Write-Host "  generate component [名称]              生成基本组件" -ForegroundColor $colors.Highlight
    Write-Host "  generate component [名称] --template=modal   生成模态框组件" -ForegroundColor $colors.Highlight
    Write-Host "  generate component [名称] --template=form    生成表单组件" -ForegroundColor $colors.Highlight
    Write-Host "  generate component [名称] --template=table   生成数据表格组件" -ForegroundColor $colors.Highlight
    Write-Host "  generate page [名称]                   生成基本页面" -ForegroundColor $colors.Highlight
    Write-Host "  generate page [名称] --template=dashboard    生成仪表板页面" -ForegroundColor $colors.Highlight
    
    Write-Host ""
    Write-Host "📊 项目信息" -ForegroundColor $colors.Primary
    Write-Host "  status                       显示项目状态" -ForegroundColor $colors.Highlight
    Write-Host "  help                        显示帮助信息" -ForegroundColor $colors.Highlight
    
    Write-Host ""
    Write-Host "💡 示例" -ForegroundColor $colors.Info
    Write-Host "  .\meta.ps1 studio init" -ForegroundColor $colors.Dim
    Write-Host "  .\meta.ps1 generate component Modal --template=modal" -ForegroundColor $colors.Dim
    Write-Host "  .\meta.ps1 generate component UserForm --template=form" -ForegroundColor $colors.Dim
    Write-Host "  .\meta.ps1 generate component DataTable --template=table" -ForegroundColor $colors.Dim
    Write-Host "  .\meta.ps1 generate page Admin --template=dashboard" -ForegroundColor $colors.Dim
    Write-Host "  .\meta.ps1 status" -ForegroundColor $colors.Dim
    Write-Host "  .\meta.ps1 studio health" -ForegroundColor $colors.Dim
}

# ==========================================
# 主程序
# ==========================================

function Main {
    # 如果没有参数，显示帮助
    if (-not $command) {
        Show-Banner
        Show-Help
        return
    }
    
    # 解析命令
    switch ($command.ToLower()) {
        "studio" {
            switch ($type.ToLower()) {
                "init" { Initialize-Studio }
                "health" { Check-ProjectHealth }
                default { 
                    Write-Message "未知的 studio 命令: $type" "ERROR"
                    Show-Help 
                }
            }
        }
        
        "generate" {
            if (-not $name) {
                Write-Message "请指定要生成的名称!" "ERROR"
                Show-Help
                return
            }
            
            switch ($type.ToLower()) {
                "component" { Generate-Component $name $template }
                "page" { Generate-Page $name $template }
                default { 
                    Write-Message "未知的生成类型: $type" "ERROR"
                    Write-Host "支持的生成类型: component, page" -ForegroundColor $colors.Info
                }
            }
        }
        
        "status" {
            Show-ProjectStatus
        }
        
        "help" {
            Show-Help
        }
        
        default {
            Write-Message "未知命令: $command" "ERROR"
            Show-Help
        }
    }
}

# 启动程序
Main
