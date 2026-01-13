# 文档更新脚本
param([switch]$UpdateStats)

$docPath = "PROJECT_COMPLETION.md"
if (-not (Test-Path $docPath)) {
    Write-Host "❌ 找不到主文档" -ForegroundColor Red
    exit 1
}

Write-Host "🔄 更新文档..." -ForegroundColor Yellow

$content = Get-Content $docPath -Raw

# 更新时间戳
$newTime = Get-Date -Format 'yyyy年MM月dd日 HH:mm:ss'
$updatedContent = $content -replace '创建时间: .*', "创建时间: $newTime"
$updatedContent = $updatedContent -replace '生成时间: .*', "生成时间: $newTime"

# 如果启用统计更新
if ($UpdateStats) {
    Write-Host "正在统计文件..." -ForegroundColor Cyan
    $componentCount = 20  # 默认值
    $pageCount = 13      # 默认值
    $totalFiles = 77     # 默认值
    
    try {
        if (Test-Path "src\components") {
            $componentCount = @(Get-ChildItem "src\components" -Recurse -Filter *.tsx -ErrorAction SilentlyContinue).Count
        }
        if (Test-Path "src\pages") {
            $pageCount = @(Get-ChildItem "src\pages" -Recurse -Filter *.tsx -ErrorAction SilentlyContinue).Count
        }
        $totalFiles = @(Get-ChildItem -Recurse -File -Exclude node_modules, .git -ErrorAction SilentlyContinue).Count
    } catch {
        Write-Host "⚠️  使用默认统计值" -ForegroundColor Yellow
    }
    
    $updatedContent = $updatedContent -replace '组件 \| \d+个', "组件 | ${componentCount}个"
    $updatedContent = $updatedContent -replace '页面 \| \d+个', "页面 | ${pageCount}个"
    $updatedContent = $updatedContent -replace '总文件 \| \d+个', "总文件 | ${totalFiles}个"
    
    Write-Host "📊 统计结果:" -ForegroundColor Cyan
    Write-Host "  组件: $componentCount 个" -ForegroundColor White
    Write-Host "  页面: $pageCount 个" -ForegroundColor White
    Write-Host "  总文件: $totalFiles 个" -ForegroundColor White
}

# 保存更新
$updatedContent | Out-File $docPath -Encoding UTF8
Write-Host "✅ 文档已更新: $docPath" -ForegroundColor Green
Write-Host "📅 时间已更新为: $newTime" -ForegroundColor Cyan
