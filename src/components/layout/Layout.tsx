import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-area">
          {children}
        </main>
        <footer className="app-footer">
          <p>MetaCoding &copy; {new Date().getFullYear()} - 代码生成利器</p>
        </footer>
      </div>
    </div>
  );
}
