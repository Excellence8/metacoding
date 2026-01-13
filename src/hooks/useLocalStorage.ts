import { useState, useEffect, useCallback } from 'react';

/**
 * 自定义 Hook: useLocalStorage
 * 用途: LocalStorage 功能的自定义Hook
 */
const useLocalStorage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData = {
        id: '1',
        name: 'LocalStorage 数据',
        timestamp: new Date().toISOString(),
        items: [
          { id: 1, name: '项目1' },
          { id: 2, name: '项目2' },
          { id: 3, name: '项目3' }
        ]
      };
      
      setData(mockData);
    } catch (err: any) {
      setError(err.message || '获取LocalStorage数据失败');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    reset,
    isEmpty: !data || (Array.isArray(data) && data.length === 0),
    hasError: !!error,
    isReady: !loading && !error && data !== null
  };
};

export default useLocalStorage;
