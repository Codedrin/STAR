import React from 'react';
import { FaStore } from 'react-icons/fa'; // <-- changed icon here
import { useNavigate } from 'react-router-dom';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';

const Seller_login = () => {
  const navigate = useNavigate();

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
            <FaStore className="text-red-600" /> {/* <-- updated icon here */}
            Seller Log in
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
            onClick={() => navigate('/Seller_dashboard')}
            className="w-32 mx-auto block bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm"
          >
            Log in
          </button>

          <p
            className="text-sm text-center mt-2 text-gray-600 cursor-pointer hover:underline"
            onClick={() => navigate('/Seller_forgotpassword')}
          >
            Forgot password?
          </p>



          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <span
              className="text-green-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/Seller_register')}
            >
              Register now
            </span>

          </p>
        </div>
      </div>
    </div>
  );
};

export default Seller_login;
