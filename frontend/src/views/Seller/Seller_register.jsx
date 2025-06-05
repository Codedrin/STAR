import React from 'react';
import { Link } from 'react-router-dom';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';
import { FaUserCircle, FaIdCard } from 'react-icons/fa';

const Seller_register = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Red Navbar */}
      <div className="bg-red-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={LogoLeft} alt="Logo Left" className="w-20 h-20" />

          <div className="text-center text-xs md:text-base">
            <h1 className="text-xl md:text-2xl font-bold">STAR</h1>
            <p>Welcome to Batangas State University!</p>
            <p className="italic text-sm">
              The Philippines’ National Engineering University
            </p>
          </div>

          <img src={LogoRight} alt="Logo Right" className="w-20 h-20" />
        </div>
      </div>

      {/* Registration Card */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-6">Register as a Seller</h2>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter Fullname"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
              <input
                type="text"
                placeholder="Business Name"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
              <input
                type="text"
                placeholder="Campus"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
            </div>

            {/* Password */}
            <input
              type="password"
              placeholder="Create a password"
              className="border border-gray-400 px-4 py-2 rounded text-sm w-full mb-4"
            />

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Profile Upload */}
              <div className="flex items-center border border-gray-400 rounded overflow-hidden w-full">
                <span className="px-3 bg-gray-100 text-gray-600 flex items-center justify-center">
                  <FaUserCircle className="text-lg" />
                </span>
                <span className="flex-1 px-3 text-sm text-gray-700">Profile</span>
                <label className="px-4 py-2 bg-white text-sm cursor-pointer hover:bg-red-100 text-red-600 border-l border-gray-300">
                  Upload
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* ID Upload */}
              <div className="flex items-center border border-gray-400 rounded overflow-hidden w-full">
                <span className="px-3 bg-gray-100 text-gray-600 flex items-center justify-center">
                  <FaIdCard className="text-lg" />
                </span>
                <span className="flex-1 px-3 text-sm text-gray-700">Valid ID</span>
                <label className="px-4 py-2 bg-white text-sm cursor-pointer hover:bg-red-100 text-red-600 border-l border-gray-300">
                  Upload
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* Agreement */}
            <div className="mb-4 text-xs text-gray-700 flex gap-2 items-start">
              <input type="checkbox" />
              <p>
                I agree to follow the Seller’s Guidelines, Marketplace Policies,
                and STAR’s community commitment.
              </p>
            </div>

            {/* Submit Button */}
            <button className="w-40 mx-auto block bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm">
              Create account
            </button>

            {/* Login Link */}
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link
                to="/Seller_login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller_register;
