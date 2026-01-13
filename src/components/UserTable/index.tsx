import React from 'react';
import './UserTable.css';

interface UserTableProps {
  children?: React.ReactNode;
  className?: string;
}

const UserTable: React.FC<UserTableProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.toLowerCase()}`}>
      {children || (
        <div className='content'>
          <h3>UserTable 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;


