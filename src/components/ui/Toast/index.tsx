import React, { useState, useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️"
  };

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  );
};

// Toast 管理器
export const toast = {
  success: (message: string, duration?: number) => showToast(message, "success", duration),
  error: (message: string, duration?: number) => showToast(message, "error", duration),
  info: (message: string, duration?: number) => showToast(message, "info", duration),
  warning: (message: string, duration?: number) => showToast(message, "warning", duration)
};

let toastContainer: HTMLElement | null = null;

function showToast(message: string, type: ToastProps["type"] = "info", duration?: number) {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toastId = `toast-${Date.now()}`;
  const toastElement = document.createElement("div");
  toastElement.id = toastId;

  // 使用 ReactDOM.render 或直接插入
  const toastHTML = `
    <div class="toast toast-${type}">
      <span class="toast-icon">${getIcon(type)}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="document.getElementById('${toastId}').remove()">✕</button>
    </div>
  `;

  toastElement.innerHTML = toastHTML;
  toastContainer.appendChild(toastElement);

  setTimeout(() => {
    if (toastElement.parentNode) {
      toastElement.remove();
    }
  }, duration || 3000);
}

function getIcon(type: ToastProps["type"]) {
  switch (type) {
    case "success": return "✅";
    case "error": return "❌";
    case "warning": return "⚠️";
    default: return "ℹ️";
  }
}

export default Toast;
