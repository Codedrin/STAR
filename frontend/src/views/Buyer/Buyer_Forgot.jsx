import React from 'react';
import Navbar_login from './components/Navbar_login'; // ✅ Import the Navbar_login

const Buyer_Forgot = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <Navbar_login />

        {/* Body */}
        <div className="bg-white px-6 py-8">
          <h2 className="text-lg md:text-xl font-bold text-center mb-6 text-red-600">
            Reset Buyer Password
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
          />

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full mb-6 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
          />

          <button
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buyer_Forgot;
