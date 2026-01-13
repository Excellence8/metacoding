import React from 'react';
import './Modal.css';

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({ 
  children, 
  className, 
  style 
}) => {
  return (
    <div 
      className={`${componentName.toLowerCase()}`}
      style={style}
    >
      {children || (
        <div className='content'>
          <h3>Modal 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default Modal;


