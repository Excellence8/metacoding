import React, { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Component, 
  FileCode, 
  Settings, 
  BookOpen, 
  Users,
  Zap,
  Home
} from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { path: "/dashboard", label: "仪表板", icon: <LayoutDashboard size={20} /> },
  { path: "/components", label: "组件库", icon: <Component size={20} /> },
  { path: "/templates", label: "模板库", icon: <FileCode size={20} /> },
  { path: "/generator", label: "代码生成", icon: <Zap size={20} /> },
  { path: "/docs", label: "文档", icon: <BookOpen size={20} /> },
  { path: "/team", label: "团队", icon: <Users size={20} /> },
  { path: "/settings", label: "设置", icon: <Settings size={20} /> },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 侧边栏 */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Home size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">MetaCoding</h1>
              <p className="text-xs text-gray-500">AI驱动开发平台</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500" 
                      : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <div className={isActive ? "text-blue-500" : "text-gray-500"}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* 主内容区 */}
      <div className="ml-64">
        {/* 顶部栏 */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || "仪表板"}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                新建项目
              </button>
            </div>
          </div>
        </header>
        
        {/* 页面内容 */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
