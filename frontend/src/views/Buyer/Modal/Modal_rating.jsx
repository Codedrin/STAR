import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaStar, FaUndo, FaExclamationCircle } from 'react-icons/fa';
import sampleImage from '../../../assets/Logo.png'; // Replace with your actual image path
import Report from './Report';

const Modal_rating = ({ onClose }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const navigate = useNavigate(); // ✅ for routing

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
        <div className="bg-red-600 rounded-lg p-4 max-w-xl w-full shadow-lg relative">
          {/* Close Button */}
          <button
            className="absolute top-2 right-3 text-white text-2xl font-bold hover:text-gray-200"
            onClick={onClose}
          >
            &times;
          </button>

          {/* Product Row */}
          <div className="flex items-center justify-between bg-white rounded p-3 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={sampleImage}
                alt="Item"
                className="w-14 h-14 object-cover rounded bg-gray-200"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Item Name</span>
                <span className="text-xs text-gray-500">₱ Price</span>
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center gap-1 text-xs text-red-600 hover:underline"
              >
                <FaExclamationCircle className="text-base" />
                Report seller/item
              </button>
            </div>
          </div>

          {/* Rate Section */}
          <div className="text-white flex items-center gap-3 mb-4">
            <FaUserCircle className="text-xl" />
            <span className="text-sm font-semibold">Rate the Seller:</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className="text-white text-lg cursor-pointer hover:text-yellow-400"
                />
              ))}
            </div>
          </div>

          {/* Return Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate('/return-item')} // ✅ Go to route
              className="flex items-center gap-2 border border-white text-white px-4 py-1 text-sm rounded hover:bg-white hover:text-red-600 transition"
            >
              <FaUndo />
              Return Item
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && <Report onClose={() => setShowReportModal(false)} />}
    </>
  );
};

export default Modal_rating;
