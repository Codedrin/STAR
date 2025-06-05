import React, { useState } from 'react';
import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import sampleImage from '../../../assets/Logo.png';
import ModalItemPurchase from './Modal_Item_purchaase'; // ✅ Import the modal

const ModalPlaceOrder = ({ onClose }) => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg w-full max-w-lg p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-red-600 text-2xl font-bold hover:text-red-800"
          >
            &times;
          </button>

          <div className="bg-red-600 text-white px-4 py-2 rounded-t flex items-center gap-2">
            <FaUserCircle className="text-lg" />
            <span className="font-semibold text-sm">Seller's Name</span>
          </div>

          <div className="bg-red-600 p-4 rounded-b flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={sampleImage}
                alt="Item"
                className="w-16 h-16 rounded object-cover bg-white"
              />
              <div className="bg-white p-2 rounded flex-1 flex justify-between items-center text-sm">
                <span>Item Name</span>
                <span className="font-semibold">₱ Price</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowPurchaseModal(true)} // ✅ Show next modal
                className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-red-600 transition text-sm"
              >
                <FaShoppingBag />
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Show Purchased Confirmation Modal */}
      {showPurchaseModal && (
        <ModalItemPurchase onClose={() => {
          setShowPurchaseModal(false);
          onClose(); // Optional: close both modals
        }} />
      )}
    </>
  );
};

export default ModalPlaceOrder;
