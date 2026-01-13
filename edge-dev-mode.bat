# 启动Edge开发者模式，完全禁用安全功能
start msedge.exe ^
  --new-window ^
  --disable-features=UpgradeInsecureRequests,SecurityButton,LookalikeUrlNavigationSuggestions ^
  --disable-component-update ^
  --disable-background-networking ^
  --disable-sync ^
  --disable-default-apps ^
  --disable-extensions ^
  --disable-plugins ^
  --disable-hang-monitor ^
  --disable-prompt-on-repost ^
  --disable-domain-reliability ^
  --disable-backgrounding-occluded-windows ^
  --disable-renderer-backgrounding ^
  --no-first-run ^
  --no-default-browser-check ^
  --ignore-certificate-errors ^
  --allow-insecure-localhost ^
  --test-type ^
  --unsafely-treat-insecure-origin-as-secure=http://localhost:8080,http://127.0.0.1:8080 ^
  http://localhost:8080
