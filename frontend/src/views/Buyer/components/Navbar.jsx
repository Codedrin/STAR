import React, { useState } from 'react';
import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle,
  FaGraduationCap,
  FaPaintBrush,
  FaUniversity,
  FaUserNurse,
  FaLaptopCode
} from 'react-icons/fa';

import LogoLeft from '../../../assets/Logo.png';
import LogoRight from '../../../assets/Logo2.png';

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    { name: 'Engineering', icon: <FaGraduationCap /> },
    { name: 'Architecture', icon: <FaUniversity /> },
    { name: 'Fine arts', icon: <FaPaintBrush /> },
    { name: 'Arts and Sciences', icon: <FaUniversity /> },
    { name: 'Nursing', icon: <FaUserNurse /> },
    { name: 'Informatics and Computing Sciences', icon: <FaLaptopCode /> },
  ];

  return (
    <div>
      {/* Top Navbar */}
      <div className="bg-red-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={LogoLeft} alt="Logo Left" className="w-20 h-20" />
          <div className="text-center text-xs md:text-base">
            <h1 className="text-xl md:text-2xl font-bold">STAR</h1>
            <p>Welcome to Batangas State University!</p>
            <p className="italic text-sm">The Philippines’ National Engineering University</p>
          </div>
          <img src={LogoRight} alt="Logo Right" className="w-20 h-20" />
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-red-700 py-4 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4 relative">
          <FaBell className="text-white text-xl cursor-pointer" />
          <div className="relative flex-1">
            <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="appearance-none flex items-center justify-between rounded-full px-4 py-2 text-sm border border-gray-300 bg-white text-black w-36"
            >
              Category
              <FaChevronDown className="ml-2 text-gray-600 text-sm" />
            </button>

            {showCategories && (
              <div className="absolute top-12 left-0 bg-red-600 text-white rounded shadow-md w-48 flex">
                <div className="w-full">
                  {categories.map((cat, index) => (
                    <div
                      key={index}
                      onClick={() => alert(`You clicked ${cat.name}`)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-red-500 cursor-pointer transition rounded"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <FaUserCircle className="text-white text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
