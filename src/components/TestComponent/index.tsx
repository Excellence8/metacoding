import React from "react"
import "./TestComponent.css"

interface TestComponentProps {
  // 添加 props
}

const TestComponent: React.FC<TestComponentProps> = (props) => {
  return (
    <div className="-container">
      <h2>TestComponent 组件</h2>
      {/* 组件内容 */}
    </div>
  )
}

export default TestComponent
