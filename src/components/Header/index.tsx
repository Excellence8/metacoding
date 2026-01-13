import React from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <div className="">
      {title && <h3>{title}</h3>}
      <div className="content">
        {children || <p>Header ×é¼şÄÚÈİ</p>}
      </div>
    </div>
  );
};

export default Header;
