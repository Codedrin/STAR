import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaCheck, FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('seller@batstate-u.edu.ph');
  const [editingEmail, setEditingEmail] = useState(false);

  const [password, setPassword] = useState('••••••••');
  const [editingPassword, setEditingPassword] = useState(false);

  const [mobile, setMobile] = useState('0998******');
  const [editingMobile, setEditingMobile] = useState(false);

  const [shopName, setShopName] = useState('SPartmart');
  const [editingShop, setEditingShop] = useState(false);

  const handleLogout = () => {
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      onClose: () => navigate('/Seller_login'),
    });
  };

  const showToast = (field) => {
    toast.success(`${field} updated successfully!`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <ToastContainer />

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
            {editingEmail ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              />
            ) : (
              <p className="font-medium text-sm md:text-base">{email}</p>
            )}
          </div>
          {editingEmail ? (
            <button
              className="flex items-center text-sm text-green-700 hover:underline"
              onClick={() => {
                setEditingEmail(false);
                showToast('Email');
              }}
            >
              <FaCheck className="mr-1" /> Save
            </button>
          ) : (
            <button
              className="flex items-center text-sm text-red-600 hover:underline"
              onClick={() => setEditingEmail(true)}
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          )}
        </div>

        {/* Password */}
        <div className="bg-gray-100 rounded p-4 shadow flex justify-between items-center flex-wrap">
          <div>
            <p className="text-xs text-gray-600">Password</p>
            {editingPassword ? (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              />
            ) : (
              <p className="font-medium text-sm md:text-base">{password}</p>
            )}
          </div>
          {editingPassword ? (
            <button
              className="flex items-center text-sm text-green-700 hover:underline"
              onClick={() => {
                setEditingPassword(false);
                showToast('Password');
              }}
            >
              <FaCheck className="mr-1" /> Save
            </button>
          ) : (
            <button
              className="flex items-center text-sm text-blue-600 hover:underline"
              onClick={() => setEditingPassword(true)}
            >
              Change
            </button>
          )}
        </div>

        {/* Mobile Number */}
        <div className="bg-gray-100 rounded p-4 shadow flex justify-between items-center flex-wrap">
          <div>
            <p className="text-xs text-gray-600">Mobile Number</p>
            {editingMobile ? (
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              />
            ) : (
              <p className="font-medium text-sm md:text-base">{mobile}</p>
            )}
          </div>
          {editingMobile ? (
            <button
              className="flex items-center text-sm text-green-700 hover:underline"
              onClick={() => {
                setEditingMobile(false);
                showToast('Mobile number');
              }}
            >
              <FaCheck className="mr-1" /> Save
            </button>
          ) : (
            <button
              className="flex items-center text-sm text-green-700 hover:underline"
              onClick={() => setEditingMobile(true)}
            >
              <FaPlus className="mr-1" /> Edit
            </button>
          )}
        </div>

        {/* Shop Name */}
        <div className="bg-gray-100 rounded p-4 shadow flex justify-between items-center flex-wrap">
          <div>
            <p className="text-xs text-gray-600">Shop Name</p>
            {editingShop ? (
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              />
            ) : (
              <p className="font-medium text-sm md:text-base">{shopName}</p>
            )}
          </div>
          {editingShop ? (
            <button
              className="flex items-center text-sm text-green-700 hover:underline"
              onClick={() => {
                setEditingShop(false);
                showToast('Shop name');
              }}
            >
              <FaCheck className="mr-1" /> Save
            </button>
          ) : (
            <button
              className="flex items-center text-sm text-blue-600 hover:underline"
              onClick={() => setEditingShop(true)}
            >
              Change
            </button>
          )}
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
