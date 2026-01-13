import React from 'react';
import './UserForm.css';

interface UserFormProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const UserForm: React.FC<UserFormProps> = ({ 
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
          <h3>UserForm 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;


