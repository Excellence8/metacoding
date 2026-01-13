import React from 'react';
import './Admin.css';

const Admin: React.FC = () => {
  return (
    <div className='page-container'>
      <header className='page-header'>
        <h1>Admin</h1>
        <p>欢迎来到 Admin 页面</p>
      </header>
      
      <main className='page-content'>
        <section className='intro-section'>
          <h2>页面介绍</h2>
          <p>这是一个使用 Metacoding Studio 生成的页面。</p>
          <p>你可以在此页面上添加自己的内容和功能。</p>
        </section>
        
        <section className='features-section'>
          <h2>主要功能</h2>
          <div className='features-grid'>
            <div className='feature-card'>
              <h3>功能一</h3>
              <p>描述功能一的详细信息和用途。</p>
            </div>
            <div className='feature-card'>
              <h3>功能二</h3>
              <p>描述功能二的详细信息和用途。</p>
            </div>
            <div className='feature-card'>
              <h3>功能三</h3>
              <p>描述功能三的详细信息和用途。</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className='page-footer'>
        <p>© 2025 Admin 页面 | 使用 Metacoding Studio 创建</p>
      </footer>
    </div>
  );
};

export default Admin;
