import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';

const Buyer_forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError('');
    setSuccess('');
    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/userAuth/forgotPasswordBuyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Reset failed');
      setSuccess('Password successfully updated! You can now login.');
      setTimeout(() => navigate('/'), 2000); 
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
        <div className="bg-white px-6 py-8">
          <h2 className="text-lg md:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <FaShoppingCart className="text-red-600" />
            Forgot Password
          </h2>

          <input
            type="text"
            placeholder="Enter Email"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-4 text-center">{success}</div>}

          <button
            onClick={handleReset}
            className="w-40 mx-auto block bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-sm text-center mt-4">
            Remember your password?{' '}
            <span
              className="text-green-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              Login now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Buyer_forgot;
