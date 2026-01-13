// ============ 浏览器端诊断脚本 ============
console.log("🔍 开始诊断消息通道错误...");

// 检查浏览器扩展
function checkExtensions() {
    console.log("=== 浏览器扩展检查 ===");
    
    // 检查常见的可能引起问题的扩展
    const problematicExtensions = [
        "react-developer-tools",
        "redux-devtools", 
        "adblock",
        "ublock",
        "grammarly",
        "lastpass",
        "authy"
    ];
    
    // 检查是否有chrome.runtime可用（扩展环境）
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        console.log("✅ 检测到Chrome扩展API");
        
        // 尝试获取扩展信息
        try {
            // 这个方法可能被扩展屏蔽
            console.log("扩展环境可用");
        } catch (e) {
            console.log("扩展API访问受限:", e.message);
        }
    } else {
        console.log("ℹ️ 未检测到扩展API或非扩展环境");
    }
}

// 检查消息监听器
function checkMessageListeners() {
    console.log("\n=== 消息监听器检查 ===");
    
    // 检查window上的消息监听器
    const originalAddEventListener = window.addEventListener;
    let messageListenerCount = 0;
    
    window.addEventListener = function(type, listener, options) {
        if (type === 'message') {
            messageListenerCount++;
            console.log(`📨 发现消息监听器 #${messageListenerCount}:`, {
                listener: listener.toString().substring(0, 100) + '...',
                options: options
            });
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    // 也检查Service Worker消息
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', (event) => {
            console.log("📨 Service Worker消息:", event);
        });
    }
    
    console.log(`总计消息监听器: ${messageListenerCount}`);
}

// 检查postMessage调用
function interceptPostMessage() {
    console.log("\n=== postMessage调用跟踪 ===");
    
    const originalPostMessage = window.postMessage;
    window.postMessage = function(message, targetOrigin, transfer) {
        console.log("📤 postMessage调用:", {
            message: typeof message === 'object' ? JSON.stringify(message).substring(0, 200) : message,
            targetOrigin: targetOrigin,
            source: new Error().stack.split('\n')[2]?.trim()
        });
        return originalPostMessage.call(this, message, targetOrigin, transfer);
    };
}

// 检查iframe和worker
function checkIframesAndWorkers() {
    console.log("\n=== iframe和Worker检查 ===");
    
    // 检查iframe
    const iframes = document.getElementsByTagName('iframe');
    console.log(`iframe数量: ${iframes.length}`);
    
    // 检查Web Workers
    if (window.Worker) {
        console.log("✅ 浏览器支持Web Workers");
    }
}

// 运行诊断
function runDiagnostics() {
    console.clear();
    console.log("🚀 开始浏览器端诊断...\n");
    
    checkExtensions();
    checkMessageListeners();
    interceptPostMessage();
    checkIframesAndWorkers();
    
    console.log("\n=== 建议操作 ===");
    console.log("1. 禁用所有浏览器扩展，然后刷新页面");
    console.log("2. 如果错误消失，逐个启用扩展找出问题扩展");
    console.log("3. 使用无痕模式测试（自动禁用扩展）");
    console.log("4. 检查是否有React DevTools等开发者工具扩展");
    
    return {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
}

// 自动运行诊断
setTimeout(runDiagnostics, 1000);
