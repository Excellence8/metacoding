import React from 'react';
import './MyModal.css';

interface MyModalProps {
  children?: React.ReactNode;
  className?: string;
}

const MyModal: React.FC<MyModalProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.toLowerCase()}`}>
      {children || (
        <div className='content'>
          <h3>MyModal 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default MyModal;


