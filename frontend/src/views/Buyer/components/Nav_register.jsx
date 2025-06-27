import React from 'react';
import LogoLeft from '../../../assets/Logo.png';
import LogoRight from '../../../assets/Logo2.png';

const Nav_register = () => {
  return (
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
  );
};

export default Nav_register;
