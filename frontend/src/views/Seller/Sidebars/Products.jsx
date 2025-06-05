import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Products = () => {
  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <FaSearch className="text-black mr-2" />
        <input
          type="text"
          placeholder="Search Item"
          className="border-2 border-purple-600 rounded px-3 py-1 w-full max-w-xs focus:outline-none"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-red-700 text-white p-4 rounded text-center shadow hover:shadow-lg"
          >
            <div className="w-full h-24 bg-black mb-2" />
            <p>Item Description</p>
            <p className="font-bold">Price</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
