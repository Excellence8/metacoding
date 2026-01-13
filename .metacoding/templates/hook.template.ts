import { useState, useEffect, useCallback } from "react"

interface Use{{hookName}}Props {
  // Hook props
}

interface Use{{hookName}}Return {
  // 返回的数据和方法
  data: any
  loading: boolean
  error: Error | null
  fetchData: () => Promise<void>
  reset: () => void
}

const use{{hookName}} = (props?: Use{{hookName}}Props): Use{{hookName}}Return => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // API 调用或数据处理逻辑
      const result = await Promise.resolve({}) // 替换为实际逻辑
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("未知错误"))
    } finally {
      setLoading(false)
    }
  }, []) // 添加依赖项

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    // 初始加载数据（如果需要）
    // fetchData()
  }, []) // 添加依赖项

  return {
    data,
    loading,
    error,
    fetchData,
    reset
  }
}

export default use{{hookName}}
