import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Zap, Download, Share2 } from "lucide-react"

export default function ComponentsPage() {
  return (
    <div className="componentspage-page p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🧩 🧩 组件库</h1>
          <p className="text-gray-600 mt-2">浏览和管理所有可复用组件</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Share2 size={16} />
            分享
          </Button>
          <Button className="gap-2">
            <Zap size={16} />
            快速开始
          </Button>
        </div>
      </div>

      {/* 功能特色 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {[
          'UI组件', '表单组件', '布局组件', '业务组件'
        ].map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                {feature}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                完整的{feature}功能，支持自定义配置和快速集成。
              </p>
              <Button variant="ghost" className="gap-2 px-0">
                了解更多
                <ArrowRight size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 主要内容区域 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>🧩 组件库 功能详解</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="prose max-w-none">
              <h3>核心功能</h3>
              <ul>
                <li>完整的🧩 组件库管理系统</li>
                <li>支持实时预览和编辑</li>
                <li>一键导出和导入功能</li>
                <li>版本控制和历史记录</li>
                <li>团队协作和权限管理</li>
              </ul>
              
              <h3>使用方式</h3>
              <ol>
                <li>在左侧导航选择对应功能</li>
                <li>浏览或搜索需要的资源</li>
                <li>点击"使用"按钮应用到项目</li>
                <li>根据需要进行自定义调整</li>
                <li>保存并同步到代码库</li>
              </ol>
              
              <h3>最佳实践</h3>
              <p>
                浏览和管理所有可复用组件 建议定期更新和维护，保持与项目需求同步。
                团队成员应遵循统一的规范和使用流程。
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button className="gap-2">
                <Download size={16} />
                下载资源包
              </Button>
              <Button variant="outline">
                查看示例项目
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">42</div>
              <p className="text-gray-600">可用资源</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <p className="text-gray-600">累计使用</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <p className="text-gray-600">用户满意度</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
