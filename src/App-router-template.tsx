// Metacoding Studio - 使用正确的 React Router v7
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

// 您的原始组件导入...
// import Layout from './layouts/MainLayout'
// import HomePage from './pages/Home'
// import GeneratorPage from './pages/Generator'

// 创建路由 - 使用 createBrowserRouter 和 RouterProvider
const router = createBrowserRouter([
  // 您的路由配置...
  // {
  //   path: '/',
  //   element: <Layout />,
  //   children: [
  //     { index: true, element: <HomePage /> },
  //     { path: 'generator', element: <GeneratorPage /> }
  //   ]
  // }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
