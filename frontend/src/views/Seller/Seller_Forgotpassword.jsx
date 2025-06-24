import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';

const Seller_Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/userAuth/forgotPasswordSeller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password');
      setSuccess('Password changed successfully. Redirecting to login...');
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/Seller_login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-red-700 text-white py-4 relative">
          <div className="flex justify-between items-center px-4">
            <img src={LogoLeft} alt="Left Logo" className="w-20 h-20 md:w-24 md:h-24" />
            <div className="text-center text-xs md:text-base">
              <h1 className="text-xl md:text-2xl font-bold">STAR</h1>
              <p className="leading-tight">Welcome to Batangas State University!</p>
              <p className="italic leading-tight">
                The Philippines’ National Engineering University
              </p>
            </div>
            <img src={LogoRight} alt="Right Logo" className="w-20 h-20 md:w-24 md:h-24" />
          </div>
        </div>

        {/* Body */}
        <form className="bg-white px-6 py-8" onSubmit={handleChangePassword}>
          <h2 className="text-lg md:text-xl font-bold text-center mb-6 text-red-600">
            Change Password
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full mb-6 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2">{success}</div>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Seller_Forgotpassword;
