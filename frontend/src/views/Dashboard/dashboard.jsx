import React, { useState, useRef, useEffect } from 'react';
import { FaHome, FaUserCheck, FaFlag, FaBell, FaUserCircle, FaBox } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb'; 

const Dashboard = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const ADMIN_USERNAME =
    import.meta.env.VITE_ADMIN_USERNAME || "STARADMIN"; 

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    // You may want to clear any storage here
    navigate('/admin-login'); // or your login route
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-red-700 text-white flex justify-between items-center px-6 py-5">
        <div className="flex items-center gap-4">
          <img src="/src/assets/Logo.png" alt="Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold">DASHBOARD</h1>
          <Breadcrumb />
        </div>
        <div className="flex gap-4 text-2xl items-center relative">
          <FaBell className="cursor-pointer" />
          {/* User Icon & Popup */}
          <div ref={userMenuRef} className="relative">
            <FaUserCircle
              className="text-2xl cursor-pointer"
              onClick={() => setShowUserMenu((prev) => !prev)}
            />
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded text-black z-30 py-2">
                <div className="px-4 py-2 font-bold border-b">{ADMIN_USERNAME}</div>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <span className="font-semibold text-lg hidden sm:inline">{ADMIN_USERNAME}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-red-700 text-white w-20 flex flex-col items-center py-8 gap-8 min-h-screen">
          <FaHome className="text-2xl cursor-pointer" onClick={() => navigate('home')} />
          <FaUserCheck className="text-2xl cursor-pointer" onClick={() => navigate('verify')} />
          <FaBox className="text-2xl cursor-pointer" onClick={() => navigate('products')} />
          <FaFlag className="text-2xl cursor-pointer" onClick={() => navigate('reports')} />
        </div>

        {/* Render nested components */}
        <div className="flex-1 p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
