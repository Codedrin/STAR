import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaPlus, FaChevronDown } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal_chat = ({ onClose }) => {
  const [showSellers, setShowSellers] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') return;

    toast.success('Message sent!', {
      position: 'top-right',
      autoClose: 2000,
    });

    setMessage('');
  };

  return (
    <>
      <ToastContainer />

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
        <div className="bg-white rounded-lg w-full h-[90vh] md:h-[500px] max-w-4xl relative flex flex-col md:flex-row shadow-lg overflow-hidden">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-red-600 text-3xl font-bold hover:text-red-800 z-10"
          >
            &times;
          </button>

          {/* Dropdown (Mobile) */}
          <div className="flex justify-between items-center md:hidden px-4 pt-2 pb-0 w-full">
            <button
              onClick={() => setShowSellers(!showSellers)}
              className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full flex items-center gap-1"
            >
              <FaChevronDown className="text-xs" />
              Sellers
            </button>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-300 p-4 flex flex-col">
            <h2 className="text-red-600 font-bold text-lg mb-4 hidden md:block">Chat now</h2>

            {/* Search Bar */}
            <div className={`relative mb-4 ${showSellers ? 'block' : 'hidden'} md:block`}>
              <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm"
              />
            </div>

            {/* Seller List */}
            <div className={`space-y-3 overflow-y-auto flex-1 ${showSellers ? 'block' : 'hidden'} md:block`}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-2 py-2 rounded cursor-pointer ${
                    i === 0 ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaUserCircle className="text-lg" />
                  <span className="text-sm">Seller Name</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="w-full md:w-2/3 flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-gray-100 p-3 rounded text-sm w-fit max-w-[80%]">
                Hello! We are exclusive deals just for you, valid for a limited time only.
                Buy now before someone else does.
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 cursor-pointer">
                <FaPlus />
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal_chat;
