import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar_login from './components/Navbar_login'; // ✅ Import Navbar_login

const Buyer_login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <Navbar_login /> {/* ✅ Use your reusable Navbar */}

        {/* Body */}
        <div className="bg-white px-6 py-8">
          <h2 className="text-lg md:text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <FaShoppingCart className="text-red-600" />
            Log in
          </h2>

          <input
            type="text"
            placeholder="Enter Username"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none text-sm"
          />

          <button
            onClick={() => navigate('/Buyer_dashboard')}
            className="w-32 mx-auto block bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm"
          >
            Log in
          </button>

          <p
            onClick={() => navigate('/Buyer_forgot')}
            className="text-sm text-center mt-2 text-gray-600 cursor-pointer hover:underline"
          >
            Forgot password?
          </p>

          <p className="text-sm text-center mt-4">
            Don’t you have an account?{' '}
            <span
              className="text-green-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/Buyer_register')}
            >
              Register now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Buyer_login;
