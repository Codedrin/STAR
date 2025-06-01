import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png'; // Adjust path if needed

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    // Add authentication logic here if needed
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-black p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex flex-col items-center mb-4">
          <img src={Logo} alt="STAR Logo" className="w-20 h-20 sm:w-24 sm:h-24 mb-2" />
          <h2 className="text-xl sm:text-2xl font-semibold text-center">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-black rounded-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-black rounded-full focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-2/3 sm:w-1/2 mx-auto block text-white text-lg sm:text-xl py-2 rounded-lg hover:brightness-90 transition"
            style={{ backgroundColor: '#a6a6a6', fontFamily: 'Times New Roman, serif' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;