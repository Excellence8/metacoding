// Service Worker清理脚本 - 在浏览器控制台运行
console.log("正在清理Service Worker...");

// 方法1: 注销所有Service Worker
async function unregisterAllServiceWorkers() {
    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log(`找到 ${registrations.length} 个Service Worker注册`);
    
    for (let registration of registrations) {
        console.log(`注销: ${registration.scope}`);
        const result = await registration.unregister();
        console.log(`结果: ${result ? "成功" : "失败"}`);
    }
    
    if (registrations.length === 0) {
        console.log("没有需要注销的Service Worker");
    }
}

// 方法2: 清除所有缓存
async function clearAllCaches() {
    try {
        const cacheNames = await caches.keys();
        console.log(`找到 ${cacheNames.length} 个缓存`);
        
        for (const cacheName of cacheNames) {
            console.log(`删除缓存: ${cacheName}`);
            await caches.delete(cacheName);
        }
        
        console.log("缓存清理完成");
    } catch (error) {
        console.error("清理缓存失败:", error);
    }
}

// 方法3: 禁用Service Worker（开发时）
function disableServiceWorkerInDev() {
    // 覆盖Service Worker注册
    const originalRegister = navigator.serviceWorker.register;
    navigator.serviceWorker.register = function() {
        console.warn("Service Worker注册被阻止（开发模式）");
        return Promise.reject(new Error("Service Worker在开发模式下被禁用"));
    };
    console.log("Service Worker已禁用");
}

// 执行清理
if ('serviceWorker' in navigator) {
    console.log("浏览器支持Service Worker");
    
    // 执行清理
    unregisterAllServiceWorkers().then(() => {
        return clearAllCaches();
    }).then(() => {
        console.log("✅ Service Worker清理完成");
        console.log("请刷新页面查看错误是否消失");
    }).catch(error => {
        console.error("清理过程中出错:", error);
    });
    
    // 开发模式下禁用新注册
    disableServiceWorkerInDev();
} else {
    console.log("浏览器不支持Service Worker");
}
