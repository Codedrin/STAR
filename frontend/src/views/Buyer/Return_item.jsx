import React, { useState } from 'react';
import { FaBell, FaSearch, FaUserCircle, FaUndo, FaCheckCircle } from 'react-icons/fa';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';
import sampleImage from '../../assets/Logo.png';

const Return_item = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleReturnSubmit = () => {
    setShowSuccessModal(true);
  };

  return (
    <>
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

        {/* Search + Icons */}
        <div className="bg-red-700 py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <FaBell className="text-white text-xl cursor-pointer" />
            <div className="relative flex-1">
              <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-sm"
              />
            </div>
            <FaUserCircle className="text-white text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Return Form Content */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-600 rounded-lg shadow text-white">
          {/* Item Details */}
          <div className="bg-white text-black rounded p-3 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={sampleImage} alt="Item" className="w-14 h-14 object-cover rounded bg-gray-200" />
              <div>
                <p className="font-semibold text-sm">Item Name</p>
                <p className="text-xs text-gray-600">₱ Price</p>
              </div>
            </div>
          </div>

          {/* Image Upload & Reason */}
          <div className="flex gap-4 mb-4 flex-wrap">
            {/* Upload Box */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="uploadImage"
                className="w-20 h-20 bg-white rounded cursor-pointer border border-dashed border-gray-400 flex items-center justify-center text-gray-500 hover:bg-gray-100"
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover rounded" />
                ) : (
                  <span className="text-xs">+</span>
                )}
              </label>
              <input
                type="file"
                id="uploadImage"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-xs mt-1">Upload</span>
            </div>

            {/* Reason Dropdown */}
            <div className="flex-1">
              <label htmlFor="reason" className="block text-sm mb-1">Reason of return</label>
              <select
                id="reason"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full p-2 rounded text-sm text-black"
              >
                <option value="">-- Select a reason --</option>
                <option value="damaged">Damaged Item</option>
                <option value="wrong">Wrong Item Delivered</option>
                <option value="not_as_described">Not as Described</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleReturnSubmit}
              className="flex items-center gap-2 border border-white text-white px-4 py-2 text-sm rounded hover:bg-white hover:text-red-600 transition"
            >
              <FaUndo />
              Return Item
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-red-600 text-white rounded-lg p-6 max-w-md w-full text-center relative shadow-lg">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-2 right-3 text-white text-2xl font-bold hover:text-gray-200"
            >
              &times;
            </button>
            <div className="flex flex-col items-center justify-center mt-4">
              <FaCheckCircle className="text-5xl mb-3" />
              <h2 className="text-xl font-bold">Product Return Successful</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Return_item;
