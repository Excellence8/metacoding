import React from 'react';
import './NotificationModal.css';

interface NotificationModalProps {
  children?: React.ReactNode;
  className?: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.toLowerCase()}`}>
      {children || (
        <div className='content'>
          <h3>NotificationModal 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;


