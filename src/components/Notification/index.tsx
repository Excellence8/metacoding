import React from 'react';
import './Notification.css';

interface NotificationProps {
  children?: React.ReactNode;
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={\${componentName.toLowerCase()} }>
      {children || (
        <div className='content'>
          <h3>Notification 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default Notification;



