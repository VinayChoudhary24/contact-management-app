import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as ContactsIcon } from '../assets/icons/contact.svg';
import { ReactComponent as ChartsIcon } from '../assets/icons/charts.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'; // Placeholder for arrow icon SVG

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-screen bg-gray-100 fixed left-0 top-0 shadow-lg z-50 ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
      <div className={`space-y-2 mt-4 ${isCollapsed ? 'text-center' : 'pl-6'}`}>
        <div className="relative flex items-center justify-end mb-4">
          <button onClick={toggleSidebar} className="absolute top-[-10px] right-[-15px] bg-gray-300 p-1 rounded-full">
            <ArrowIcon className={`w-5 h-5 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div style={{ marginTop: "28px" }}>
        <Link to="/" className={`flex items-center p-2 rounded hover:bg-gray-200 ${location.pathname === '/' ? 'bg-gray-200' : ''} ${isCollapsed ? 'justify-center' : ''}`}>
          <ContactsIcon className="w-6 h-6" />
          <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Contacts</span>
        </Link>
        <Link to="/charts-and-maps" className={`flex items-center p-2 rounded hover:bg-gray-200 ${location.pathname === '/charts-and-maps' ? 'bg-gray-200' : ''} ${isCollapsed ? 'justify-center' : ''}`}>
          <ChartsIcon className="w-6 h-6" />
          <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>Charts and Maps</span>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;