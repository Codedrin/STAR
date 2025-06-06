import React, { useState } from 'react';
import {
  FaSearch, FaBell, FaUserCircle, FaCommentDots,
  FaChevronDown, FaGraduationCap, FaPaintBrush, FaUniversity,
  FaUserNurse, FaLaptopCode, FaMapMarkerAlt, FaStar, FaShoppingCart
} from 'react-icons/fa';

import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';
import sampleImage from '../../assets/Logo.png';

import ModalChat from './Modal/Modal_chat';
import ModalPlaceOrder from './Modal/Modal_placeorder';
import ModalRating from './Modal/Modal_rating'; // <-- Import your rating modal

const Buyer_Description = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false); // <-- State for rating modal

  const categories = [
    { name: 'Engineering', icon: <FaGraduationCap /> },
    { name: 'Architecture', icon: <FaUniversity /> },
    { name: 'Fine arts', icon: <FaPaintBrush /> },
    { name: 'Arts and Sciences', icon: <FaUniversity /> },
    { name: 'Nursing', icon: <FaUserNurse /> },
    { name: 'Informatics and Computing Sciences', icon: <FaLaptopCode /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-red-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={LogoLeft} alt="Logo Left" className="w-20 h-20" />
          <div className="text-center text-xs md:text-base">
            <h1 className="text-xl md:text-2xl font-bold">STAR</h1>
            <p>BATANGAS STATE UNIVERSITY</p>
            <p className="italic text-sm">
              A premier national university that develops leaders in the global knowledge economy
            </p>
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
                      onClick={() => alert(`You clicked ${cat.name}`)} // You can replace this with actual logic
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

      {/* Main Content */}
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Product & Buy */}
        <div className="bg-white p-4 rounded shadow col-span-2">
          <img src={sampleImage} alt="Item" className="w-full h-64 object-cover rounded mb-4" />
          <div className="flex gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-16 bg-gray-300 rounded" />
            ))}
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Item Description</h2>
            <p className="text-sm text-gray-700 mt-2">
              This is a sample item description. It provides information about the product, condition,
              features, and more.
            </p>
          </div>

          {/* Buy + Chat Inline */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <button
              onClick={() => setShowPlaceOrderModal(true)}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold flex items-center gap-2"
            >
              Buy
              <FaShoppingCart className="text-white text-sm" />
            </button>

            <div className="flex gap-2 flex-1">
              <input
                type="text"
                placeholder="Hi, is this available?"
                className="w-full border border-gray-400 rounded px-4 py-2 text-sm"
              />
              <button className="bg-red-600 text-white px-4 rounded hover:bg-red-700 text-sm">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right: Seller Info */}
        <div className="bg-red-600 text-white p-4 rounded shadow flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-xl" />
            <span>Seller's Name</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer hover:underline"
            onClick={() => setShowChatModal(true)}
          >
            <FaCommentDots className="text-xl" />
            <span>Chat now</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-xl" />
            <span>Location of Seller</span>
          </div>

          {/* ⭐ Rate Product Button */}
          <button
            onClick={() => setShowRatingModal(true)}
            className="mt-4 bg-white text-red-600 flex items-center justify-center gap-2 py-2 px-4 rounded hover:bg-gray-100 font-semibold text-sm"
          >
            <FaStar className="text-yellow-500" />
            Rate Product
          </button>
        </div>
      </div>

      {/* Floating Chat */}
      <div
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-md cursor-pointer"
      >
        <FaCommentDots className="text-red-600 text-xl" />
      </div>

      {/* Modals */}
      {showChatModal && <ModalChat onClose={() => setShowChatModal(false)} />}
      {showPlaceOrderModal && <ModalPlaceOrder onClose={() => setShowPlaceOrderModal(false)} />}
      {showRatingModal && <ModalRating onClose={() => setShowRatingModal(false)} />} {/* Rating Modal */}

    </div>
  );
};

export default Buyer_Description;
