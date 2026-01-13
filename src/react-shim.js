// React ES模块兼容性垫片
import * as React from "react"

// 确保默认导出可用
if (typeof window !== "undefined") {
  if (!window.React) {
    window.React = React
  }
  
  // 解决某些库需要React.default的问题
  const ReactWithDefault = { ...React, default: React }
  export default ReactWithDefault
}

export * from "react"
