# PROJECT_COMPLETION.md 查看器 - 修复版
# 使用方法: .\view-doc.ps1 [section]

param(
    [string]$Section = "help"
)

$docPath = "PROJECT_COMPLETION.md"
if (-not (Test-Path $docPath)) {
    Write-Host "❌ 找不到项目完成文档: $docPath" -ForegroundColor Red
    Write-Host "请先创建 PROJECT_COMPLETION.md 文件" -ForegroundColor Yellow
    exit 1
}

function Show-SimpleSection {
    param($title, $startPattern)
    
    $lines = Get-Content $docPath
    $inSection = $false
    $sectionContent = @()
    
    foreach ($line in $lines) {
        if ($line -match $startPattern) {
            $inSection = $true
            continue
        }
        
        if ($inSection -and $line -match "^## ") {
            break
        }
        
        if ($inSection) {
            $sectionContent += $line
        }
    }
    
    if ($sectionContent.Count -gt 0) {
        Write-Host ""
        Write-Host $title -ForegroundColor Cyan
        Write-Host ("=" * ($title.Length)) -ForegroundColor Cyan
        $sectionContent | ForEach-Object { Write-Host $_ -ForegroundColor Gray }
    } else {
        Write-Host "未找到 $title 部分" -ForegroundColor Yellow
    }
}

Write-Host "`n📖 项目文档查看器 v2.0" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green

switch ($Section.ToLower()) {
    "overview" { 
        Show-SimpleSection "📋 项目概览" '^## 📋 项目信息'
    }
    "structure" { 
        Show-SimpleSection "📁 项目结构" '^## 📁 项目结构'
    }
    "quickstart" { 
        Show-SimpleSection "🚀 快速开始" '^## 🎮 快速开始'
    }
    "tech" { 
        Show-SimpleSection "🔧 技术栈" '^## 🔧 技术栈'
    }
    "stats" { 
        Show-SimpleSection "📊 生成统计" '^## 📊 生成统计'
    }
    "progress" { 
        Show-SimpleSection "📈 开发进度" '^## 📈 开发进度'
    }
    "plan" { 
        Show-SimpleSection "🔮 下一步计划" '^## 🔮 下一步计划'
    }
    "all" {
        Write-Host "显示完整文档..." -ForegroundColor Yellow
        Get-Content $docPath | Out-Host -Paging
    }
    "info" {
        $doc = Get-Item $docPath
        $lineCount = (Get-Content $docPath).Count
        Write-Host "📄 文档信息" -ForegroundColor Cyan
        Write-Host "==========" -ForegroundColor Cyan
        Write-Host "文件: $($doc.FullName)" -ForegroundColor White
        Write-Host "大小: $([Math]::Round($doc.Length/1KB, 2)) KB" -ForegroundColor White
        Write-Host "行数: $lineCount 行" -ForegroundColor White
        Write-Host "创建: $($doc.CreationTime.ToString('yyyy-MM-dd HH:mm'))" -ForegroundColor White
        Write-Host "修改: $($doc.LastWriteTime.ToString('yyyy-MM-dd HH:mm'))" -ForegroundColor White
    }
    default {
        Write-Host "可用命令:" -ForegroundColor Yellow
        Write-Host "  .\view-doc.ps1 overview    - 项目概览" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 structure   - 项目结构" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 quickstart  - 快速开始" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 tech        - 技术栈" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 stats       - 生成统计" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 progress    - 开发进度" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 plan        - 下一步计划" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 info        - 文档信息" -ForegroundColor White
        Write-Host "  .\view-doc.ps1 all         - 完整文档" -ForegroundColor White
        Write-Host ""
        Write-Host "示例:" -ForegroundColor Cyan
        Write-Host "  .\view-doc.ps1 overview" -ForegroundColor Gray
        Write-Host "  .\view-doc.ps1 info" -ForegroundColor Gray
    }
}
