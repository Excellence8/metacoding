import './Header.css';

export function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="breadcrumb">
          <span>MetaCoding</span>
          <span className="separator">/</span>
          <span className="current">仪表板</span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="搜索模板或项目..." />
          <button className="search-btn">🔍</button>
        </div>
        
        <button className="theme-toggle">
          🌙
        </button>
        
        <div className="user-avatar">
          <span>👤</span>
        </div>
      </div>
    </header>
  );
}
