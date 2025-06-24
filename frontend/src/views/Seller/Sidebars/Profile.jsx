import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaCheck } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const navigate = useNavigate();

  // State for seller profile
  const [fullname, setFullname] = useState('Seller Name');
  const [profileUrl, setProfileUrl] = useState('');
  const [email, setEmail] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);

  const [password, setPassword] = useState('••••••••');
  const [editingPassword, setEditingPassword] = useState(false);

  const [shopName, setShopName] = useState('');
  const [editingShop, setEditingShop] = useState(false);

  useEffect(() => {

    const userId = localStorage.getItem('userId');
    if (!userId) return;
 
    fetch(`http://localhost:5000/userAuth/sellerProfile/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) return;
        setFullname(data.fullname || 'Seller Name');
        setProfileUrl(data.profile_url || '');
        setEmail(data.email || '');
        setShopName(data.businessname || '');
      });
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      onClose: () => {
        localStorage.clear();
        navigate('/Seller_login');
      },
    });
  };

  const handleSaveEmail = async () => {
  const userId = localStorage.getItem('userId');
  try {
    const res = await fetch('http://localhost:5000/userAuth/updateSellerProfile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update email");
    setEditingEmail(false);
    showToast("Email");
  } catch (err) {
    toast.error(err.message);
  }
};

  const handleSavePassword = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch('http://localhost:5000/userAuth/updateSellerProfile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");
      setEditingPassword(false);
      showToast("Password");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSaveShopName = async () => {
  const userId = localStorage.getItem('userId');
  try {
    const res = await fetch('http://localhost:5000/userAuth/updateSellerProfile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, businessname: shopName }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update shop name");
    setEditingShop(false);
    showToast("Shop name");
  } catch (err) {
    toast.error(err.message);
  }
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
        {profileUrl ? (
          <img
            src={profileUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-red-700 shadow"
          />
        ) : (
          <FaUserCircle className="text-6xl text-gray-500" />
        )}
        <h2 className="text-xl md:text-2xl font-bold text-red-800">{fullname}</h2>
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
              onClick={handleSaveEmail}
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
              onClick={handleSavePassword}
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
              onClick={handleSaveShopName}
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
