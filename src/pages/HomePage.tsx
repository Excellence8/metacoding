import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Zap, ArrowRight, Code, FileCode, Users, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="home-page min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 英雄区域 */}
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            🚀 MetaCoding Studio
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            AI驱动的现代化开发平台，加速您的React项目开发流程
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Zap size={20} />
              立即开始
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              查看演示
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>

        {/* 功能展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Code className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">智能组件生成</h3>
            <p className="text-gray-600 mb-6">
              基于AI的组件代码生成，支持TypeScript和多种样式方案
            </p>
            <Link to="/components">
              <Button variant="ghost" className="gap-2">
                探索组件库
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <FileCode className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">丰富模板库</h3>
            <p className="text-gray-600 mb-6">
              预置企业级模板，一键生成完整页面和功能模块
            </p>
            <Link to="/templates">
              <Button variant="ghost" className="gap-2">
                浏览模板
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">团队协作</h3>
            <p className="text-gray-600 mb-6">
              完整的团队开发工作流，支持代码评审和任务管理
            </p>
            <Link to="/team">
              <Button variant="ghost" className="gap-2">
                团队管理
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        {/* 快速开始指南 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">快速开始</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "创建项目", desc: "初始化新项目或导入现有项目" },
              { step: "2", title: "选择模板", desc: "从模板库中选择合适的起始模板" },
              { step: "3", title: "生成代码", desc: "使用AI生成或自定义组件代码" },
              { step: "4", title: "部署上线", desc: "一键部署到生产环境" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
