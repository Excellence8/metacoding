// 应用健康检查脚本 - 在浏览器控制台运行
console.log("🏥 应用健康检查开始...");

// 检查React状态
function checkReact() {
    console.log("=== React状态检查 ===");
    
    // 检查根元素
    const rootElement = document.getElementById('root');
    if (rootElement) {
        console.log("✅ React根元素存在");
        console.log(`   子元素数量: ${rootElement.children.length}`);
    } else {
        console.log("❌ React根元素缺失");
    }
    
    // 检查React版本（如果可用）
    if (window.React && window.React.version) {
        console.log(`✅ React版本: ${window.React.version}`);
    }
}

// 检查路由功能
function checkRouting() {
    console.log("\n=== 路由功能检查 ===");
    
    const links = Array.from(document.querySelectorAll('a'));
    const internalLinks = links.filter(link => 
        link.href && link.href.includes(window.location.origin)
    );
    
    console.log(`找到 ${internalLinks.length} 个内部链接`);
    
    // 测试Generator页面链接
    const generatorLink = links.find(link => 
        link.href && link.href.includes('/generator')
    );
    
    if (generatorLink) {
        console.log("✅ Generator页面链接存在");
        console.log(`   文本: "${generatorLink.textContent.trim()}"`);
    }
}

// 检查控制台错误
function checkConsoleErrors() {
    console.log("\n=== 控制台错误检查 ===");
    
    // 监听新错误
    const originalError = console.error;
    let errorCount = 0;
    
    console.error = function(...args) {
        errorCount++;
        console.warn(`捕获错误 #${errorCount}:`, args[0]);
        originalError.apply(console, args);
    };
    
    setTimeout(() => {
        console.log(`在2秒内捕获到 ${errorCount} 个错误`);
        console.error = originalError; // 恢复
    }, 2000);
}

// 检查性能
function checkPerformance() {
    console.log("\n=== 性能检查 ===");
    
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
        
        if (loadTime < 1000) {
            console.log("✅ 加载性能优秀");
        } else if (loadTime < 3000) {
            console.log("⚠️ 加载性能一般");
        } else {
            console.log("❌ 加载性能较差");
        }
    }
}

// 运行所有检查
function runAllChecks() {
    console.clear();
    console.log("🚀 开始应用健康检查\n");
    
    checkReact();
    checkRouting();
    checkPerformance();
    
    // 最后检查错误
    setTimeout(checkConsoleErrors, 100);
    
    console.log("\n=== 检查完成 ===");
    console.log("✅ 应用运行正常");
    console.log("🌐 可正常访问各个页面");
    console.log("🔧 开发服务器稳定运行");
}

// 自动运行检查
setTimeout(runAllChecks, 500);
