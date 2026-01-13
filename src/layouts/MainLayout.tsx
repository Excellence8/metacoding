import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './MainLayout.css'

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/generator', label: 'Generator', icon: '⚡' },
    { path: '/components', label: 'Components', icon: '🧩' },
    { path: '/documentation', label: 'Docs', icon: '📚' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="logo">
            <span className="logo-icon">🚀</span>
            {sidebarOpen && 'Metacoding'}
          </h2>
          <button 
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '' : ''}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && (
                <span className="nav-label">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen && (
            <>
              <div className="user-info">
                <div className="avatar">👨‍💻</div>
                <div>
                  <div className="username">Developer</div>
                  <div className="user-role">Pro Plan</div>
                </div>
              </div>
              <div className="quick-actions">
                <button className="quick-action">🚀 New Project</button>
                <button className="quick-action">💾 Save Template</button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h1 className="page-title">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            <div className="breadcrumbs">
              <span>Metacoding Studio</span>
              <span>›</span>
              <span>{navItems.find(item => item.path === location.pathname)?.label || 'Home'}</span>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="header-action">🔔</button>
            <button className="header-action">🔍</button>
            <button className="header-action">🌙</button>
            <div className="user-menu">👤</div>
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>

        <footer className="main-footer">
          <p>© {new Date().getFullYear()} Metacoding Studio v2.0</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
            <a href="#">API Docs</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default MainLayout
