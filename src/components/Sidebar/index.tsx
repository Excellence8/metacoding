import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={\${componentName.toLowerCase()} }>
      {children || (
        <div className='content'>
          <h3>Sidebar 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;



