import React from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.toLowerCase()}`}>
      {children || (
        <div className='content'>
          <h3>MainLayout 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default MainLayout;


