import React from 'react';
import './Customers.css';

const Customers: React.FC = () => {
  return (
    <div className='page-container'>
      <header className='page-header'>
        <h1>Customers</h1>
        <p>欢迎来到 Customers 页面</p>
      </header>
      
      <main className='page-content'>
        <section className='intro-section'>
          <h2>页面介绍</h2>
          <p>这是一个使用 Metacoding Studio 生成的页面。</p>
          <p>你可以在此页面上添加自己的内容和功能。</p>
        </section>
      </main>
      
      <footer className='page-footer'>
        <p>© 2025 Customers 页面 | 使用 Metacoding Studio 创建</p>
      </footer>
    </div>
  );
};

export default Customers;
