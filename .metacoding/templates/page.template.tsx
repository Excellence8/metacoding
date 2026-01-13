import React from "react"
import Layout from "@/components/Layout"
import {{className}}Styles from "./{{className}}.module.css"

interface {{className}}Props {
  // 页面 props
}

const {{className}}: React.FC<{{className}}Props> = (props) => {
  return (
    <Layout>
      <div className={ {{className}}Styles.page}>
        <h1 className={ {{className}}Styles.title}>{{pageTitle}}</h1>
        {/* 页面内容 */}
      </div>
    </Layout>
  )
}

export default {{className}}
