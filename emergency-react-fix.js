// 紧急修复：在浏览器控制台运行这个代码
console.log("🔧 紧急修复React导出问题...");

// 方法1：重新定义React导出
if (typeof window !== "undefined") {
  const originalReact = window.React;
  if (originalReact && !originalReact.default) {
    window.React = new Proxy(originalReact, {
      get(target, prop) {
        if (prop === "default") {
          return target;
        }
        return target[prop];
      }
    });
    console.log("✅ React导出已修复");
  }
}

// 方法2：重新加载页面但保持修复
setTimeout(() => {
  console.log("🔄 刷新页面应用修复...");
  window.location.reload();
}, 1000);
