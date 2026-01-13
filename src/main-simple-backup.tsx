// 绝对简单的版本 - 确保能工作
console.log("🚀 main.tsx 开始执行");

// 检查 root 元素
const rootElement = document.getElementById("root");
console.log("root 元素:", rootElement);

if (!rootElement) {
  console.error("❌ 错误: 找不到 #root 元素");
  document.body.innerHTML = `
    <div style="padding: 40px; color: red; text-align: center;">
      <h1>错误: 找不到 #root 元素</h1>
      <p>请检查 index.html 文件</p>
    </div>
  `;
} else {
  // 先显示加载信息
  rootElement.innerHTML = `
    <div style="padding: 40px; text-align: center;">
      <h1 style="color: white;">🚀 React 正在加载...</h1>
      <p>请稍候</p>
    </div>
  `;
  
  // 动态导入 React 和 Router
  import("react").then(React => {
    import("react-dom/client").then(ReactDOM => {
      import("react-router-dom").then(routerModule => {
        const { createBrowserRouter, RouterProvider } = routerModule;
        
        console.log("✅ 所有依赖加载完成");
        
        // 创建简单的组件
        function Home() {
          return React.default.createElement("div", {
            style: { padding: "40px", textAlign: "center" }
          },
            React.default.createElement("h1", { style: { color: "blue" } }, "🏠 首页"),
            React.default.createElement("p", null, "React 工作正常！"),
            React.default.createElement("a", {
              href: "/generator",
              style: { color: "red", fontSize: "20px", display: "block", marginTop: "20px" }
            }, "去 Generator 页面")
          );
        }
        
        function Generator() {
          return React.default.createElement("div", {
            style: { 
              padding: "40px", 
              backgroundColor: "yellow",
              minHeight: "100vh",
              textAlign: "center"
            }
          },
            React.default.createElement("h1", { 
              style: { color: "red", fontSize: "48px" } 
            }, "🎉 GENERATOR 页面！"),
            React.default.createElement("p", { 
              style: { fontSize: "24px", margin: "20px 0" } 
            }, "✅ 路由修复成功！"),
            React.default.createElement("a", {
              href: "/",
              style: { 
                padding: "15px 30px",
                backgroundColor: "black",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px"
              }
            }, " 返回首页")
          );
        }
        
        // 创建路由
        const router = createBrowserRouter([
          { path: "/", element: React.default.createElement(Home) },
          { path: "/generator", element: React.default.createElement(Generator) }
        ]);
        
        // 创建 App 组件
        function App() {
          console.log("App 组件渲染");
          return React.default.createElement(RouterProvider, { router });
        }
        
        // 渲染应用
        const root = ReactDOM.default.createRoot(rootElement);
        root.render(
          React.default.createElement(React.default.StrictMode, null,
            React.default.createElement(App)
          )
        );
        
        console.log("✅ React 应用已渲染");
      }).catch(error => {
        console.error("❌ 加载 react-router-dom 失败:", error);
        rootElement.innerHTML = `
          <div style="padding: 40px; color: red; text-align: center;">
            <h1>加载 react-router-dom 失败</h1>
            <p>${error.message}</p>
            <p>请运行: npm install react-router-dom</p>
          </div>
        `;
      });
    }).catch(error => {
      console.error("❌ 加载 react-dom/client 失败:", error);
      rootElement.innerHTML = `
        <div style="padding: 40px; color: red; text-align: center;">
          <h1>加载 react-dom 失败</h1>
          <p>${error.message}</p>
        </div>
      `;
    });
  }).catch(error => {
    console.error("❌ 加载 react 失败:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; color: red; text-align: center;">
        <h1>加载 React 失败</h1>
        <p>${error.message}</p>
      </div>
    `;
  });
}
