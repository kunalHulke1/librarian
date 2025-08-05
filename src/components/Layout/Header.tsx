import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  backTo?: string;
  userRole?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "Library Management System", 
  showBackButton = false, 
  backTo = "/",
  userRole,
  userName 
}) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Handle sign out logic
    navigate('/login');
  };

  return (
    <header className="bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {showBackButton && (
              <Link 
                to={backTo}
                className="text-gray-600 hover:text-gray-900 px-3 py-1 border border-gray-300 rounded-md hover:border-gray-900 transition-colors"
              >
                ← Back
              </Link>
            )}
          </div>
          
          {userRole && userName && (
            <div className="flex items-center space-x-4">
              <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium uppercase">
                {userRole}
              </span>
              <span className="text-gray-700">{userName}</span>
              <Link 
                to="/profile" 
                className="text-gray-600 hover:text-gray-900 px-3 py-1 border border-gray-300 rounded-md hover:border-gray-900 transition-colors"
              >
                Profile
              </Link>
              <button 
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 px-3 py-1 border border-gray-300 rounded-md hover:border-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;