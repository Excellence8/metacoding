import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Copy, Download, Sparkles, Code, FileCode, Cpu } from "lucide-react"

export default function GeneratorPage() {
  const [code, setCode] = useState("// 生成的代码将显示在这里")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // 模拟生成过程
    setTimeout(() => {
      const sampleCode = `import React from 'react'
import { Button } from '@/components/ui/button'

interface SampleComponentProps {
  title: string
  count: number
}

export default function SampleComponent({ title, count }: SampleComponentProps) {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">
        这是一个自动生成的React组件，当前计数: {count}
      </p>
      <div className="flex gap-3">
        <Button>主要操作</Button>
        <Button variant="outline">次要操作</Button>
      </div>
    </div>
  )
}`
      setCode(sampleCode)
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    alert("代码已复制到剪贴板！")
  }

  return (
    <div className="generator-page p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🎉 代码生成器</h1>
          <p className="text-gray-600 mt-2">AI驱动的智能代码生成，快速创建React组件</p>
        </div>
        <Button className="gap-2" onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Cpu className="animate-spin" size={16} />
              生成中...
            </>
          ) : (
            <>
              <Zap size={16} />
              生成新代码
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：生成选项 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles size={20} />
                生成选项
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">组件类型</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>功能组件</option>
                    <option>UI组件</option>
                    <option>表单组件</option>
                    <option>布局组件</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">技术栈</label>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind CSS", "Material-UI", "Ant Design"].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">复杂度</label>
                  <input type="range" min="1" max="5" defaultValue="3" className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode size={20} />
                常用模板
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["用户卡片", "数据表格", "登录表单", "仪表板卡片", "导航菜单"].map((template) => (
                  <Button key={template} variant="outline" className="w-full justify-start">
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 中间：代码预览 */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Code size={20} />
                生成结果
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy size={16} />
                  复制代码
                </Button>
                <Button size="sm">
                  <Download size={16} />
                  导出文件
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-auto text-sm">
                <code>{code}</code>
              </pre>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">使用说明</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>复制上面的代码到你的项目中</li>
                  <li>根据需要修改组件props和样式</li>
                  <li>在需要的地方导入并使用组件</li>
                  <li>运行项目测试组件功能</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-gray-600">今日生成</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">2,843</div>
            <p className="text-gray-600">累计生成</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <p className="text-gray-600">代码质量</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-orange-600">3.2s</div>
            <p className="text-gray-600">平均耗时</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
