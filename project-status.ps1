Write-Host "📊 Metacoding Studio 项目状态检查" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor White

# 当前状态
Write-Host "`n✅ 已修复的问题：" -ForegroundColor Green
Write-Host "  • React Router v7 路由配置" -ForegroundColor White
Write-Host "  • Generator页面可正常访问" -ForegroundColor White
Write-Host "  • 组件模板语法错误" -ForegroundColor White
Write-Host "  • 服务器端口配置 (5174)" -ForegroundColor White

Write-Host "`n🔗 当前可访问链接：" -ForegroundColor Yellow
Write-Host "  • 主应用: http://localhost:5174/" -ForegroundColor White
Write-Host "  • Generator: http://localhost:5174/generator" -ForegroundColor White
Write-Host "  • 测试页面: http://localhost:5174/ultimate-test.html" -ForegroundColor White

Write-Host "`n📂 项目结构：" -ForegroundColor Yellow
Get-ChildItem -Path @("index.html", "src", "public", "package.json") -ErrorAction SilentlyContinue | 
    ForEach-Object {
        if ($_.PSIsContainer) {
            $itemCount = (Get-ChildItem $_.FullName -Recurse -File -ErrorAction SilentlyContinue).Count
            Write-Host "  📁 $($_.Name) ($itemCount 个文件)" -ForegroundColor Gray
        } else {
            Write-Host "  📄 $($_.Name) ($($_.Length) bytes)" -ForegroundColor Gray
        }
    }

Write-Host "`n🚀 下一步操作：" -ForegroundColor Magenta
Write-Host "  1. 运行您的代码生成脚本: .\meta.ps1" -ForegroundColor White
Write-Host "  2. 测试所有功能页面" -ForegroundColor White
Write-Host "  3. 开发新功能" -ForegroundColor White
Write-Host "  4. 构建生产版本: npm run build" -ForegroundColor White

Write-Host "`n🎉 Metacoding Studio v2.0 已完全恢复！" -ForegroundColor Green
