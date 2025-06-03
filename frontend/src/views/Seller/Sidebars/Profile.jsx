import React from 'react';
import { FaUserCircle, FaEdit, FaCheck, FaPlus } from 'react-icons/fa';

const Profile = () => {
  const handleLogout = () => {
    // Add your logout logic here
    alert('You have been logged out.');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <FaUserCircle className="text-6xl text-gray-500" />
        <h2 className="text-xl md:text-2xl font-bold text-red-800">Seller Name</h2>
      </div>

      {/* Profile Info Boxes */}
      <div className="space-y-4">
        {/* Email */}
        <div className="bg-gray-100 rounded p-4 shadow flex justify-between items-center flex-wrap">
          <div>
            <p className="text-xs text-gray-600">Email</p>
            <p className="font-medium text-sm md:text-base">seller@batstate-u.edu.ph</p>
          </div>
          <button className="flex items-center text-sm text-red-600 hover:underline">
            <FaEdit className="mr-1" /> Edit
          </button>
        </div>

        {/* Password */}
        <div className="bg-gray-100 rounded p-4 shadow flex justify-between items-center flex-wrap">
          <div>
            <p className="text-xs text-gray-600">Password</p>
            <p className="font-medium text-sm md:text-base">••••••••</p>
          </div>
          <button className="flex items-center text-sm text-blue-600 hover:underline">
            Change
          </button>
        </div>

        {/* Mobile Number */}
        <div className="bg-gray-100 rounded p-4 shadow flex justify-between items-center flex-wrap">
          <div>
            <p className="text-xs text-gray-600">Mobile Number</p>
            <p className="font-medium text-sm md:text-base">0998******</p>
          </div>
          <button className="flex items-center text-sm text-green-700 hover:underline">
            <FaPlus className="mr-1" /> Edit
          </button>
        </div>

        {/* Shop Name */}
        <div className="bg-gray-100 rounded p-4 shadow flex justify-between items-center flex-wrap">
          <div>
            <p className="text-xs text-gray-600">Shop Name</p>
            <p className="font-medium text-sm md:text-base">SPartmart</p>
          </div>
          <button className="flex items-center text-sm text-blue-600 hover:underline">
            Change
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-6 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-700 text-white px-6 py-2 rounded shadow hover:bg-red-800 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
