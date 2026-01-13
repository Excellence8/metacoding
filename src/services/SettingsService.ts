// src/services/SettingsService.ts

export interface UserSettings {
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: number;
    language: string;
  };
  editor: {
    theme: string;
    fontSize: number;
    tabSize: number;
    wordWrap: boolean;
    minimap: boolean;
    formatOnSave: boolean;
  };
  generator: {
    defaultTemplate: string;
    autoSave: boolean;
    validateOnGenerate: boolean;
    showHints: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    updates: boolean;
    sounds: boolean;
  };
  advanced: {
    analytics: boolean;
    errorReporting: boolean;
    experimental: boolean;
  };
}

export class SettingsService {
  private static readonly STORAGE_KEY = 'metacoding_settings';

  static getDefaultSettings(): UserSettings {
    return {
      appearance: {
        theme: 'light',
        fontSize: 16,
        language: 'zh-CN'
      },
      editor: {
        theme: 'vs-dark',
        fontSize: 14,
        tabSize: 2,
        wordWrap: true,
        minimap: true,
        formatOnSave: true
      },
      generator: {
        defaultTemplate: 'react-ts',
        autoSave: true,
        validateOnGenerate: true,
        showHints: true
      },
      notifications: {
        email: true,
        push: true,
        updates: false,
        sounds: true
      },
      advanced: {
        analytics: true,
        errorReporting: true,
        experimental: false
      }
    };
  }

  static loadSettings(): UserSettings {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...this.getDefaultSettings(), ...parsed };
      }
    } catch (error) {
      console.error('加载设置失败:', error);
    }
    return this.getDefaultSettings();
  }

  static saveSettings(settings: UserSettings): boolean {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
      this.applySettings(settings);
      return true;
    } catch (error) {
      console.error('保存设置失败:', error);
      return false;
    }
  }

  static applySettings(settings: UserSettings) {
    // 应用主题
    const root = document.documentElement;
    if (settings.appearance.theme === 'dark' || 
        (settings.appearance.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }

    // 应用字体大小
    root.style.setProperty('--font-size', `${settings.appearance.fontSize}px`);
    root.style.setProperty('--editor-font-size', `${settings.editor.fontSize}px`);

    // 发送设置更新事件
    window.dispatchEvent(new CustomEvent('settings-changed', { detail: settings }));
  }

  static resetSettings(): UserSettings {
    const defaultSettings = this.getDefaultSettings();
    this.saveSettings(defaultSettings);
    return defaultSettings;
  }

  static exportSettings(): string {
    const settings = this.loadSettings();
    return JSON.stringify(settings, null, 2);
  }

  static importSettings(json: string): boolean {
    try {
      const settings = JSON.parse(json);
      if (this.validateSettings(settings)) {
        return this.saveSettings(settings);
      }
      return false;
    } catch (error) {
      console.error('导入设置失败:', error);
      return false;
    }
  }

  private static validateSettings(settings: any): boolean {
    // 简单的验证
    return settings && 
           settings.appearance && 
           settings.editor && 
           settings.generator && 
           settings.notifications;
  }

  static clearCache(): void {
    // 清除特定于应用的缓存
    const keys = [
      'metacoding_recent_projects',
      'metacoding_templates_cache',
      'metacoding_editor_state'
    ];
    
    keys.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`清除缓存 ${key} 失败:`, error);
      }
    });
    
    // 清除 sessionStorage
    sessionStorage.clear();
  }

  static resetAllData(): void {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('metacoding_')) {
        keys.push(key);
      }
    }
    
    keys.forEach(key => localStorage.removeItem(key));
    
    // 也清除 settings
    localStorage.removeItem(this.STORAGE_KEY);
    
    sessionStorage.clear();
  }

  static checkForUpdates(): Promise<{ available: boolean; version?: string; changelog?: string }> {
    return new Promise((resolve) => {
      // 模拟检查更新
      setTimeout(() => {
        const hasUpdate = Math.random() > 0.5;
        if (hasUpdate) {
          resolve({
            available: true,
            version: '1.1.0',
            changelog: '• 新增更多项目模板\n• 优化生成器性能\n• 修复已知问题'
          });
        } else {
          resolve({ available: false });
        }
      }, 1500);
    });
  }

  static getSystemInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth
      },
      localStorage: {
        used: JSON.stringify(localStorage).length,
        quota: 5 * 1024 * 1024 // 5MB 估计值
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      date: new Date().toISOString()
    };
  }
}
