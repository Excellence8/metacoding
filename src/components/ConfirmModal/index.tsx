import React from 'react';
import './ConfirmModal.css';

interface ConfirmModalProps {
  children?: React.ReactNode;
  className?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.toLowerCase()}`}>
      {children || (
        <div className='content'>
          <h3>ConfirmModal 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default ConfirmModal;


