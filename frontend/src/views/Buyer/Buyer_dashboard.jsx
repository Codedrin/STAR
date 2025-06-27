import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import ModalChat from './Modal/Modal_chat';
import Navbar from './components/Navbar'; // ✅ Import the new Navbar

const Buyer_dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Items Grid */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            onClick={() => navigate('/Buyer_description')}
            className="bg-red-600 text-white rounded-lg p-2 cursor-pointer hover:shadow-lg transition"
          >
            <div className="bg-black h-24 rounded mb-2"></div>
            <p className="text-sm font-semibold">Item Description</p>
            <p className="text-xs">₱ Price</p>
          </div>
        ))}
      </div>

      {/* Floating Chat */}
      <div
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-md cursor-pointer"
      >
        <FaCommentDots className="text-red-600 text-xl" />
      </div>

      {/* Chat Modal */}
      {showModal && <ModalChat onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Buyer_dashboard;
