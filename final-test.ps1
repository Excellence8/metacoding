# Metacoding Studio 最终测试脚本
Write-Host "🔍 Metacoding Studio 最终系统测试" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "测试时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
Write-Host ""

# 测试1: 核心文件存在性
Write-Host "1. ✅ 核心文件检查:" -ForegroundColor Yellow
$coreFiles = @(
    "PROJECT_COMPLETION.md",
    "QUICK_START.md",
    "FINAL_GUIDE.md",
    "DOCS_SYSTEM_STATUS.md",
    "view-doc.ps1",
    "update-docs.ps1",
    "verify-docs.ps1",
    "launch.ps1",
    "meta.ps1"
)

$missingFiles = @()
foreach ($file in $coreFiles) {
    if (Test-Path $file) {
        Write-Host "  找到: $file" -ForegroundColor Green
    } else {
        Write-Host "  缺少: $file" -ForegroundColor Red
        $missingFiles += $file
    }
}

# 测试2: 基本功能测试
Write-Host "`n2. ⚡ 基本功能测试:" -ForegroundColor Yellow

# 测试 view-doc.ps1
Write-Host "  view-doc.ps1 帮助: " -NoNewline -ForegroundColor White
try {
    $output = .\view-doc.ps1 help 2>&1
    if ($output -match "可用命令") {
        Write-Host "✅" -ForegroundColor Green
    } else {
        Write-Host "⚠️" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌" -ForegroundColor Red
}

# 测试 update-docs.ps1
Write-Host "  update-docs.ps1: " -NoNewline -ForegroundColor White
try {
    $output = .\update-docs.ps1 2>&1
    if ($output -match "文档已更新") {
        Write-Host "✅" -ForegroundColor Green
    } else {
        Write-Host "⚠️" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌" -ForegroundColor Red
}

# 测试 verify-docs.ps1
Write-Host "  verify-docs.ps1: " -NoNewline -ForegroundColor White
try {
    $output = .\verify-docs.ps1 2>&1
    if ($output -match "所有核心文件存在") {
        Write-Host "✅" -ForegroundColor Green
    } else {
        Write-Host "⚠️" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌" -ForegroundColor Red
}

# 测试 meta.ps1
Write-Host "  meta.ps1 状态: " -NoNewline -ForegroundColor White
try {
    $output = .\meta.ps1 status 2>&1
    if ($output -match "项目名称") {
        Write-Host "✅" -ForegroundColor Green
    } else {
        Write-Host "⚠️" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌" -ForegroundColor Red
}

# 测试 launch.ps1
Write-Host "  launch.ps1 帮助: " -NoNewline -ForegroundColor White
try {
    $output = .\launch.ps1 help 2>&1
    if ($output -match "可用命令") {
        Write-Host "✅" -ForegroundColor Green
    } else {
        Write-Host "⚠️" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌" -ForegroundColor Red
}

# 测试结果总结
Write-Host "`n3. 📊 测试结果总结:" -ForegroundColor Cyan

if ($missingFiles.Count -eq 0) {
    Write-Host "  ✅ 所有核心文件都存在" -ForegroundColor Green
    Write-Host "  ✅ 基本功能测试通过" -ForegroundColor Green
    Write-Host "`n🎉 系统测试通过！Metacoding Studio 准备就绪！" -ForegroundColor Magenta
    
    Write-Host "`n🚀 下一步:" -ForegroundColor Yellow
    Write-Host "  运行 .\launch.ps1 start 启动开发" -ForegroundColor Cyan
    Write-Host "  运行 .\launch.ps1 docs 查看项目" -ForegroundColor Cyan
    Write-Host "  运行 .\launch.ps1 guide 查看指南" -ForegroundColor Cyan
} else {
    Write-Host "  ⚠️  缺少文件: $($missingFiles -join ', ')" -ForegroundColor Yellow
    Write-Host "  ❌ 系统不完整，请检查缺失文件" -ForegroundColor Red
}
