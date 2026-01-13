import React from 'react';
import './basic.css';

interface basicProps {
  children?: React.ReactNode;
  className?: string;
}

const basic: React.FC<basicProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.toLowerCase()}`}>
      {children || (
        <div className='content'>
          <h3>basic 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default basic;


