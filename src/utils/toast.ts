export const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
  // 创建或获取 toast 容器
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  // 创建 toast 元素
  const toast = document.createElement("div");
  
  const bgColor = {
    success: "#10b981",
    error: "#ef4444",
    info: "#3b82f6"
  }[type];

  const icon = type === "success" ? "✅" : 
               type === "error" ? "❌" : "ℹ️";

  toast.textContent = `${icon} ${message}`;
  toast.style.backgroundColor = bgColor;
  toast.style.color = "white";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.marginBottom = "10px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  toast.style.animation = "slideIn 0.3s ease";

  container.appendChild(toast);

  // 3秒后移除
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);

  // 添加动画样式（如果不存在）
  if (!document.getElementById("toast-styles")) {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
};
