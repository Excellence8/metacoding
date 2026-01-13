# 简单的 metacoding 助手
param($cmd, $name)

if (!$cmd) {
    Write-Host "metacoding 助手" -ForegroundColor Cyan
    Write-Host "用法: .\meta.ps1 [命令] [名称]"
    Write-Host "命令: help, init, generate, status"
    exit
}

switch ($cmd) {
    "help" {
        Write-Host "可用命令:" -ForegroundColor Yellow
        Write-Host "  init                初始化项目"
        Write-Host "  generate component  生成组件"
        Write-Host "  generate page       生成页面"
        Write-Host "  status              项目状态"
    }
    "init" {
        New-Item -Path "src" -ItemType Directory -Force
        New-Item -Path "src/components" -ItemType Directory -Force
        New-Item -Path "src/pages" -ItemType Directory -Force
        Write-Host "✅ 项目结构已创建" -ForegroundColor Green
    }
    "generate" {
        if ($name) {
            if ($cmd -eq "component") {
                New-Item -Path "src/components/$name" -ItemType Directory -Force
                $content = "import React from 'react';`n`nexport default function $name() { return <div>$name</div>; }"
                Set-Content -Path "src/components/$name/index.tsx" -Value $content
                Write-Host "✅ 组件 $name 已创建" -ForegroundColor Green
            }
        }
    }
    "status" {
        $comps = if (Test-Path "src/components") { (Get-ChildItem "src/components" -Directory).Count } else { 0 }
        $pages = if (Test-Path "src/pages") { (Get-ChildItem "src/pages" -Directory).Count } else { 0 }
        Write-Host "📊 项目统计:" -ForegroundColor Cyan
        Write-Host "组件: $comps 个" -ForegroundColor Yellow
        Write-Host "页面: $pages 个" -ForegroundColor Yellow
    }
}
