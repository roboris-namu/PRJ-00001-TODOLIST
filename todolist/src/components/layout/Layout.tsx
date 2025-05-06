import React, { ReactNode, useState } from 'react';
import { FaSun, FaMoon, FaClipboardList } from 'react-icons/fa';
import { withIconType } from '../../utils/icons';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check if user has previously set dark mode
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set dark mode on mount
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Use our utility function to type-cast icons
  const ClipboardIcon = withIconType(FaClipboardList);
  const SunIcon = withIconType(FaSun);
  const MoonIcon = withIconType(FaMoon);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ClipboardIcon className="text-blue-500 text-2xl" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Todo List</h1>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <SunIcon className="text-yellow-400" /> : <MoonIcon className="text-blue-700" />}
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Todo List App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout; 