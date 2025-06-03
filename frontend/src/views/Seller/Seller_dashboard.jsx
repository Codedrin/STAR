import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';
import Logo2 from '../../assets/Logo2.png';
import { Outlet, useNavigate } from 'react-router-dom';

const Seller_dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="relative flex min-h-screen font-sans overflow-x-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
    className={`fixed md:static top-0 left-0 z-[9999] min-h-screen bg-red-800 text-white flex flex-col items-center py-20 space-y-4 transition-transform duration-300 ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-1/5 w-64`}
        >

        <img src={Logo} alt="Logo" className="w-24 mb-4" />
        <h2 className="text-xl font-bold">STAR</h2>

        <button onClick={() => navigate('products')} className="bg-red-700 w-52 py-2 rounded hover:bg-red-600">
        My Product
        </button>

        <button onClick={() => navigate('add-product')} className="bg-red-700 w-52 py-2 rounded hover:bg-red-600">
        Add Product
        </button>

        <button onClick={() => navigate('orders')} className="bg-red-700 w-52 py-2 rounded hover:bg-red-600">
        Orders
        </button>

        <button onClick={() => navigate('messages')} className="bg-red-700 w-52 py-2 rounded hover:bg-red-600">
        Message/Inbox
        </button>

        <button onClick={() => navigate('sales-report')} className="bg-red-700 w-52 py-2 rounded hover:bg-red-600">
        Sales/Report
        </button>

       <button onClick={() => navigate('profile')} className="bg-red-700 w-52 py-2 rounded hover:bg-red-600">
        Account Settings
        </button>
      </div>

      {/* Main Content (Navbar only) */}
      <div className="flex-1 bg-white min-h-screen">
        <div className="bg-red-800 text-white px-6 py-4 flex justify-between items-center md:pl-10">
          {/* Burger Icon */}
          <button className="md:hidden text-white text-2xl" onClick={toggleSidebar}>
            <FaBars />
          </button>

          <div className="flex-1 text-center md:text-left md:ml-4">
            <h1 className="text-base md:text-2xl font-bold leading-tight text-left pl-4 md:pl-0">
              Welcome to Batangas State University!
              <br />
              <span className="text-sm md:text-lg font-normal">
                The Philippines’ National Engineering University
              </span>
            </h1>
          </div>

          <img src={Logo2} alt="Logo2" className="w-16 md:w-20" />
        </div>
          {/* Nested Route Output */}
            <div className="p-6">
                <Outlet />
            </div>
            
      </div>
    </div>
  );
};

export default Seller_dashboard;
