# 专门修复 Card 组件脚本
Write-Host "🔧 修复 Card 组件" -ForegroundColor Magenta

$cardFile = "src\components\Card\index.tsx"
if (-not (Test-Path $cardFile)) {
    Write-Host "❌ Card 文件不存在" -ForegroundColor Red
    exit 1
}

# 读取文件
$content = Get-Content $cardFile
$fixedLines = @()

Write-Host "修复过程:" -ForegroundColor Cyan
foreach ($line in $content) {
    # 检查第14行（或其他有问题的行）
    if ($line -match 'className=\\\{\\\$\{componentName') {
        Write-Host "发现错误行: $line" -ForegroundColor Red
        
        # 直接替换为正确的语法
        $fixedLine = '      <div className={`${componentName.toLowerCase()}`}>'
        Write-Host "修复为: $fixedLine" -ForegroundColor Green
        
        $fixedLines += $fixedLine
    } elseif ($line -match 'className=\{\$\{componentName') {
        Write-Host "发现错误行（未转义）: $line" -ForegroundColor Red
        
        # 直接替换为正确的语法
        $fixedLine = '      <div className={`${componentName.toLowerCase()}`}>'
        Write-Host "修复为: $fixedLine" -ForegroundColor Green
        
        $fixedLines += $fixedLine
    } else {
        $fixedLines += $line
    }
}

# 保存修复后的文件
$fixedLines | Out-File $cardFile -Encoding UTF8
Write-Host "✅ Card 组件修复完成！" -ForegroundColor Green

# 验证修复
Write-Host "`n验证修复结果:" -ForegroundColor Yellow
Get-Content $cardFile | Select-String -Pattern "className=" -Context 0
