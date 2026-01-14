import{_ as l}from"./index-455573e5.js";const p=async e=>{try{console.log(`🚀 开始导出项目: ${e.projectId}`);const n=(await l(()=>import("./jszip.min-71537938.js").then(t=>t.j),["assets/jszip.min-71537938.js","assets/index-455573e5.js"])).default,s=new n;e.files.forEach(t=>{t.type==="file"?s.file(t.path,t.content):t.type==="dir"&&s.folder(t.path)});const c=await s.generateAsync({type:"blob"}),o=URL.createObjectURL(c),r=document.createElement("a");return r.href=o,r.download=`${e.projectId}.zip`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o),alert("✅ 项目 ZIP 文件已生成并开始下载！"),!0}catch(n){return console.error("ZIP 导出失败:",n),alert(`❌ ZIP 导出失败: ${n.message}
请查看控制台获取详细信息。`),!1}},m=e=>{try{console.log(`📝 导出JSON配置: ${e.projectId}`);const n={meta:{version:"1.0.0",generator:"MetaCoding",generatedAt:new Date().toISOString()},project:{id:e.projectId,name:e.projectName,template:e.template,description:e.description||""},config:{dependencies:e.dependencies||{},devDependencies:e.devDependencies||{},scripts:e.scripts||{}},files:e.files.map(t=>({name:t.name,type:t.type,path:t.path,content:t.type==="file"?t.content:null}))},s=JSON.stringify(n,null,2),c=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(c),r=document.createElement("a");r.href=o,r.download=`${e.projectId}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o),alert("📄 项目配置已导出为 JSON 文件！")}catch(n){console.error("JSON 导出失败:",n),alert(`❌ JSON 导出失败: ${n.message}`)}},u=e=>{try{console.log(`📋 导出Markdown文档: ${e.projectId}`);const n=e.files.map(i=>"- "+i.path).join(`
`),s=Object.entries(e.scripts||{}).map(([i,d])=>"- `npm run "+i+"`: "+d).join(`
`),c=`# ${e.projectName}

## 项目简介
这是一个使用 MetaCoding 生成的 ${e.template} 项目。

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
${n}

## 脚本说明
${s}

## 许可证
MIT

> 由 [MetaCoding](https://github.com/yourusername/metacoding) 生成于 ${new Date().toLocaleDateString()}
`,o=new Blob([c],{type:"text/markdown;charset=utf-8"}),r=URL.createObjectURL(o),t=document.createElement("a");t.href=r,t.download=`${e.projectId}.md`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(r),alert("📄 项目已导出为 Markdown 文件！")}catch(n){console.error("Markdown 导出失败:",n),alert(`❌ Markdown 导出失败: ${n.message}`)}},h=async e=>{try{const n={name:e.projectName,template:e.template,files:e.files.length,dependencies:Object.keys(e.dependencies||{}).length,devDependencies:Object.keys(e.devDependencies||{}).length,generatedAt:new Date().toISOString()},s=JSON.stringify(n,null,2);return await navigator.clipboard.writeText(s),alert("📋 项目配置已复制到剪贴板！"),!0}catch(n){return console.error("复制失败:",n),alert(`❌ 复制失败: ${n.message}`),!1}},g=async e=>{try{const n=`# ${e.projectName}
cd ${e.projectId}
npm install
npm run dev`;return await navigator.clipboard.writeText(n),alert("📋 启动命令已复制到剪贴板！"),!0}catch(n){return console.error("复制失败:",n),alert(`❌ 复制失败: ${n.message}`),!1}},y=e=>{const n=e.files.length,s=e.files.filter(o=>o.type==="dir").length,c=e.files.filter(o=>o.type==="file"&&(o.path.endsWith(".ts")||o.path.endsWith(".tsx")||o.path.endsWith(".js")||o.path.endsWith(".jsx"))).length;return{fileCount:n,dirCount:s,codeFileCount:c,totalSize:n*1024,dependencies:Object.keys(e.dependencies||{}).length,devDependencies:Object.keys(e.devDependencies||{}).length}},b=e=>{const n=e.files.map(c=>"- "+c.path).join(`
`),s=Object.entries(e.scripts||{}).map(([c,o])=>"- `npm run "+c+"`: "+o).join(`
`);return`# ${e.projectName}

## 项目简介
这是一个使用 MetaCoding 生成的 ${e.template} 项目。

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
${n}

## 脚本说明
${s}

## 许可证
MIT

> 由 [MetaCoding](https://github.com/yourusername/metacoding) 生成于 ${new Date().toLocaleDateString()}
`};export{h as copyProjectConfig,g as copyStartCommands,m as exportProjectAsJson,u as exportProjectAsMarkdown,p as exportProjectAsZip,b as generateReadmeContent,y as getProjectStats};
