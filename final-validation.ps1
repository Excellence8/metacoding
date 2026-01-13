Write-Host "🎯 Metacoding Studio v2.0 最终验证" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Yellow
Write-Host ""

# 验证模板数量
Write-Host "📋 验证模板系统..." -ForegroundColor Cyan

$templatesToTest = @(
    @{Name="基础组件"; Type="component"; Template="basic"},
    @{Name="模态框组件"; Type="component"; Template="modal"},
    @{Name="表单组件"; Type="component"; Template="form"},
    @{Name="表格组件"; Type="component"; Template="table"},
    @{Name="基础页面"; Type="page"; Template="basic"},
    @{Name="仪表板页面"; Type="page"; Template="dashboard"}
)

foreach ($test in $templatesToTest) {
    $testName = "Test" + (Get-Random -Minimum 1000 -Maximum 9999)
    
    Write-Host "测试: $($test.Name) ($($test.Template))" -ForegroundColor Yellow -NoNewline
    
    # 删除已存在的测试文件
    $testPath = if ($test.Type -eq "component") { "src/components/$testName" } else { "src/pages/$testName" }
    if (Test-Path $testPath) {
        Remove-Item -Path $testPath -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    # 生成组件
    .\meta.ps1 generate $($test.Type) $testName --template=$($test.Template) 2>&1 | Out-Null
    
    # 验证生成
    if (Test-Path $testPath) {
        $files = Get-ChildItem $testPath -File
        Write-Host " ✅ ($($files.Count) 个文件)" -ForegroundColor Green
    } else {
        Write-Host " ❌" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📊 项目最终统计：" -ForegroundColor Cyan
.\meta.ps1 status

Write-Host ""
Write-Host "🎉 验证完成！" -ForegroundColor Magenta
Write-Host "你的 Metacoding Studio v2.0 现在包含：" -ForegroundColor Cyan
Write-Host "• 4种组件模板 (basic, modal, form, table)" -ForegroundColor Green
Write-Host "• 2种页面模板 (basic, dashboard)" -ForegroundColor Green
Write-Host "• 项目管理工具 (status, health check)" -ForegroundColor Green
Write-Host "• 完整的代码生成系统" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 开始使用：" -ForegroundColor Yellow
Write-Host "   .\meta.ps1 generate component [名称] --template=[模板]" -ForegroundColor Cyan
Write-Host "   .\meta.ps1 generate page [名称] --template=[模板]" -ForegroundColor Cyan
Write-Host "   .\meta.ps1 status" -ForegroundColor Cyan
Write-Host "   .\meta.ps1 studio health" -ForegroundColor Cyan
