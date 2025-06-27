import React from 'react';
import LogoLeft from '../../../assets/Logo.png';
import LogoRight from '../../../assets/Logo2.png';

const Navbar_login = () => {
  return (
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
  );
};

export default Navbar_login;
