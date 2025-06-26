import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate }   from 'react-router-dom';

const ModalItemPurchase = ({ onClose, product }) => {
  const navigate = useNavigate();

  const handleViewOrder = () => {
    onClose();
    if (product?.id) {
      navigate(`/buyer_description/${product.id}`, { state: { product } });
    } else {
      navigate('/Buyer_dashboard');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-red-600 text-white rounded-lg w-full max-w-2xl p-10 relative text-center shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-3xl font-bold hover:text-gray-200"
        >
          &times;
        </button>

        {/* View Order */}
        <div className="text-left mb-8">
          <button
            onClick={handleViewOrder}
            className="border border-white text-white px-5 py-2 rounded text-sm hover:bg-white hover:text-red-600 transition"
          >
            View Order
          </button>
        </div>

        {/* Confirmation */}
        <div className="flex flex-col items-center justify-center mt-6">
          <FaCheckCircle className="text-6xl mb-4" />
          <h2 className="text-2xl font-semibold">Item Purchased</h2>
        </div>
      </div>
    </div>
  );
};

export default ModalItemPurchase;
