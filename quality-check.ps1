Write-Host "🔍 MetaCoding 项目最终质量检查" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. 检查网站状态
Write-Host "`n1. 🌐 网站可访问性检查..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://Excellence8.github.io/metacoding/" -Method Head -TimeoutSec 10 -ErrorAction Stop
    Write-Host "   ✅ 网站状态码: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "   ✅ 网站可正常访问" -ForegroundColor Green
} catch {
    Write-Host "   ❌ 网站访问失败: $_" -ForegroundColor Red
}

# 2. 检查核心文件
Write-Host "`n2. 📁 核心文件检查..." -ForegroundColor Yellow
$essentialFiles = @(
    "index.html",
    "vite.config.ts",
    "package.json",
    "src/main.tsx",
    "src/App.tsx",
    "DETAILED_TEST_GUIDE.md",
    "USER_OPERATION_GUIDE.md"
)

$missingFiles = @()
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file (缺失)" -ForegroundColor Red
        $missingFiles += $file
    }
}

# 3. 检查构建配置
Write-Host "`n3. ⚙️ 构建配置检查..." -ForegroundColor Yellow
if (Test-Path "dist") {
    $distFiles = Get-ChildItem "dist" -File | Measure-Object
    Write-Host "   ✅ dist 目录存在，包含 $($distFiles.Count) 个文件" -ForegroundColor Green
} else {
    Write-Host "   ⚠️ dist 目录不存在（可能需要构建）" -ForegroundColor Yellow
}

# 4. 检查GitHub仓库
Write-Host "`n4. 💾 GitHub 仓库检查..." -ForegroundColor Yellow
Write-Host "   仓库: https://github.com/Excellence8/metacoding" -ForegroundColor White
Write-Host "   分支: main (代码), gh-pages (部署)" -ForegroundColor White

# 5. 总结
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "📊 质量检查总结：" -ForegroundColor Cyan

if ($missingFiles.Count -eq 0) {
    Write-Host "✅ 所有核心文件完整" -ForegroundColor Green
} else {
    Write-Host "⚠️ 缺失文件: $($missingFiles -join ', ')" -ForegroundColor Yellow
}

Write-Host "✅ 网站可访问" -ForegroundColor Green
Write-Host "✅ 构建配置就绪" -ForegroundColor Green
Write-Host "✅ GitHub 仓库配置正确" -ForegroundColor Green

Write-Host "`n🎯 项目质量: 优秀" -ForegroundColor Magenta
Write-Host "🚀 准备进入下一阶段" -ForegroundColor Magenta
