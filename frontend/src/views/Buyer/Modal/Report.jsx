import React from 'react';

const Report = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm relative shadow-lg border-2 border-red-600">
        {/* Close Button */}
        <button
          className="absolute top-2 right-3 text-black text-2xl font-bold hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold mb-4 text-center">Select a Reason</h2>

        {/* Bullet List */}
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>Prohibited (Banned) Items</li>
          <li>Counterfeits and Copyright</li>
          <li>Order Brushing</li>
          <li>Others</li>
        </ul>
      </div>
    </div>
  );
};

export default Report;
