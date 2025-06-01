import React from 'react';
import { FaHome, FaUserCheck, FaFlag, FaBell, FaUserCircle, FaBox } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb'; 

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-red-700 text-white flex justify-between items-center px-6 py-5">
        <div className="flex items-center gap-4">
          <img src="/src/assets/Logo.png" alt="Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold">DASHBOARD</h1> <Breadcrumb />

        </div>
        <div className="flex gap-4 text-2xl">
          <FaBell />
          <FaUserCircle />
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
