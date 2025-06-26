
import React, { useState } from 'react';
const REASONS = [
  "Prohibited (Banned) Items",
  "Counterfeits and Copyright",
  "Order Brushing",
  "Others"
];

const Report = ({ onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (!selected) {
      return alert("Please choose a reason before submitting.");
    }
    onSelect?.(selected);
    onClose();
  };

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

        {/* Clickable List */}
        <ul className="space-y-2 mb-6">
          {REASONS.map(reason => (
            <li
              key={reason}
              onClick={() => setSelected(reason)}
              className={`cursor-pointer list-disc list-inside text-sm px-3 py-2 rounded transition
                ${selected === reason 
                  ? "bg-red-100 text-red-600 font-medium" 
                  : "hover:bg-gray-100 hover:text-red-600"}`}
            >
              {reason}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
