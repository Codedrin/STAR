import React, { useState } from 'react';
import {
  FaCommentDots,
  FaMapMarkerAlt,
  FaStar,
  FaShoppingCart,
  FaUserCircle
} from 'react-icons/fa';

import sampleImage from '../../assets/Logo.png';
import ModalChat from './Modal/Modal_chat';
import ModalPlaceOrder from './Modal/Modal_placeorder';
import ModalRating from './Modal/Modal_rating';
import Navbar from './components/Navbar'; // ✅ Import your Navbar

const Buyer_Description = () => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

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
      {showRatingModal && <ModalRating onClose={() => setShowRatingModal(false)} />}
    </div>
  );
};

export default Buyer_Description;
