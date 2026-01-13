# 完全干净的Chrome环境
start chrome.exe ^
  --new-instance ^
  --no-first-run ^
  --disable-extensions ^
  --disable-plugins ^
  --disable-default-apps ^
  --disable-component-extensions-with-background-pages ^
  --disable-background-networking ^
  --disable-sync ^
  --metrics-recording-only ^
  --disable-background-timer-throttling ^
  --disable-client-side-phishing-detection ^
  --disable-default-apps ^
  --disable-hang-monitor ^
  --disable-prompt-on-repost ^
  --disable-domain-reliability ^
  --disable-backgrounding-occluded-windows ^
  --disable-renderer-backgrounding ^
  --disable-features=TranslateUI,BlinkGenPropertyTrees,IsolateOrigins,site-per-process,UpgradeInsecureRequests ^
  --ignore-certificate-errors ^
  http://127.0.0.1:8888
