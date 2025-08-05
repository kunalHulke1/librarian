import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  backTo?: string;
  userRole?: string;
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showBackButton, 
  backTo, 
  userRole, 
  userName 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={title}
        showBackButton={showBackButton}
        backTo={backTo}
        userRole={userRole}
        userName={userName}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;