import React from 'react';
import './DataTable.css';

interface DataTableProps {
  children?: React.ReactNode;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${componentName.toLowerCase()}`}>
      {children || (
        <div className='content'>
          <h3>DataTable 组件</h3>
          <p>这是一个自动生成的组件</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;


