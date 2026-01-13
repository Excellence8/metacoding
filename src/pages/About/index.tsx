import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="-page">
      <header>
        <h1>About</h1>
        <p>欢迎来到 About 页面</p>
      </header>
      
      <main>
        <section>
          <h2>页面内容</h2>
          <p>这是一个自动生成的页面组件。</p>
          <p>你可以在这里添加页面特定的内容和功能。</p>
        </section>
      </main>
      
      <footer>
        <p>? 2025 About 页面</p>
      </footer>
    </div>
  );
};

export default About;
