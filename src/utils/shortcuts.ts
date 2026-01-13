// 键盘快捷键管理
export interface Shortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

class ShortcutManager {
  private shortcuts: Shortcut[] = [];
  private enabled = true;

  constructor() {
    this.init();
  }

  private init() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  register(shortcut: Shortcut) {
    this.shortcuts.push(shortcut);
  }

  unregister(key: string) {
    this.shortcuts = this.shortcuts.filter(s => s.key !== key);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.enabled) return;
    
    const key = event.key.toLowerCase();
    
    for (const shortcut of this.shortcuts) {
      if (
        shortcut.key.toLowerCase() === key &&
        !!shortcut.ctrl === event.ctrlKey &&
        !!shortcut.alt === event.altKey &&
        !!shortcut.shift === event.shiftKey
      ) {
        event.preventDefault();
        shortcut.action();
        break;
      }
    }
  }

  // 常用快捷键
  registerCommonShortcuts() {
    // Ctrl+S: 保存
    this.register({
      key: "s",
      ctrl: true,
      action: () => {
        const saveButton = document.querySelector('button:contains("保存")') as HTMLButtonElement;
        if (saveButton) saveButton.click();
      },
      description: "保存设置"
    });

    // Ctrl+Enter: 生成项目
    this.register({
      key: "Enter",
      ctrl: true,
      action: () => {
        const generateButton = document.querySelector('button:contains("一键生成项目")') as HTMLButtonElement;
        if (generateButton) generateButton.click();
      },
      description: "生成项目"
    });

    // Ctrl+H: 返回首页
    this.register({
      key: "h",
      ctrl: true,
      action: () => {
        window.location.href = "/";
      },
      description: "返回首页"
    });

    // Ctrl+T: 打开模板库
    this.register({
      key: "t",
      ctrl: true,
      action: () => {
        window.location.href = "/templates";
      },
      description: "打开模板库"
    });
  }
}

export const shortcutManager = new ShortcutManager();

// 初始化常用快捷键
export const initShortcuts = () => {
  shortcutManager.registerCommonShortcuts();
};

// 在页面显示快捷键帮助
export const showShortcutHelp = () => {
  const shortcuts = [
    { keys: ["Ctrl", "S"], description: "保存设置" },
    { keys: ["Ctrl", "Enter"], description: "生成项目" },
    { keys: ["Ctrl", "H"], description: "返回首页" },
    { keys: ["Ctrl", "T"], description: "打开模板库" },
    { keys: ["Ctrl", "P"], description: "项目管理" },
    { keys: ["Ctrl", ","], description: "打开设置" },
    { keys: ["Esc"], description: "关闭弹窗/返回" }
  ];

  alert(\`可用快捷键：\n\${shortcuts.map(s => \`\${s.keys.join("+")}: \${s.description}\`).join("\n")}\`);
};
