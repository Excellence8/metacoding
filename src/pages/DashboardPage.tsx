import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Code, FileCode, Zap, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="dashboard-page p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📊 项目仪表板</h1>
          <p className="text-gray-600 mt-2">实时监控项目状态和开发进度</p>
        </div>
        <Button className="gap-2">
          <Zap size={16} />
          刷新数据
        </Button>
      </div>

      {/* 统计数据卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总组件数</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 本周新增</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">页面数量</CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">覆盖所有功能模块</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">代码生成</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">次自动生成</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">开发效率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+68%</div>
            <p className="text-xs text-muted-foreground">相比传统开发</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要功能区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 快速操作 */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} />
              快速操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Code size={16} />
                  生成新组件
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <FileCode size={16} />
                  创建新页面
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Users size={16} />
                  团队协作
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <BarChart3 size={16} />
                  查看报告
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle>最近活动</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">刚刚创建了 UserProfile 组件</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">10分钟前更新了 Dashboard 页面</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">1小时前生成了 API 服务</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">3小时前优化了构建配置</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 项目进度 */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>项目进度概览</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "核心框架", progress: 100, color: "bg-green-500" },
              { name: "组件库", progress: 85, color: "bg-blue-500" },
              { name: "文档系统", progress: 70, color: "bg-purple-500" },
              { name: "测试覆盖", progress: 60, color: "bg-yellow-500" },
              { name: "部署流水线", progress: 40, color: "bg-orange-500" }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-medium">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
