import React from "react"
import {{className}}Styles from "./{{className}}.module.css"

interface {{className}}Props {
  // 添加 props 类型定义
}

const {{className}}: React.FC<{{className}}Props> = (props) => {
  return (
    <div className={ {{className}}Styles.container}>
      {/* 组件内容 */}
    </div>
  )
}

export default {{className}}
