import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { path: '/', icon: '🏠', label: '首页' },
  { path: '/generator', icon: '⚡', label: '代码生成器' },
  { path: '/templates', icon: '📋', label: '模板库' },
  { path: '/projects', icon: '📁', label: '我的项目' },
  { path: '/settings', icon: '⚙️', label: '设置' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>📦 MetaCoding</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="project-stats">
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">模板</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">项目</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
