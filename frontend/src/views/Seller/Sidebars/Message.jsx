import React, { useState } from 'react';
import { FaSearch, FaUserCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const buyers = Array(10).fill('Buyer Name');

const Message = () => {
  const [selectedBuyer, setSelectedBuyer] = useState('Buyer Name');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hi, is this available?', from: 'buyer' }
  ]);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSend = () => {
    if (message.trim() === '') return;

    setMessages([...messages, { text: message, from: 'seller' }]);

    toast.success('Message sent!', {
      position: 'top-right',
      autoClose: 2000,
    });

    setMessage('');
  };

  return (
    <div className="relative flex h-[80vh] bg-white shadow rounded overflow-hidden">
      <ToastContainer />

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute top-72 left-0 z-50 bg-red-700 text-white p-2 rounded-r-md shadow-md hover:bg-red-600 md:hidden"
      >
        {showSidebar ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'block' : 'hidden'
        } md:block w-64 bg-gray-100 border-r p-4 transition-all duration-300`}
      >
        <h2 className="text-lg font-bold text-red-800 mb-4">MESSAGES</h2>

        {/* Search */}
        <div className="flex items-center bg-white border rounded px-2 py-1 mb-4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Name"
            className="outline-none w-full"
          />
        </div>

        {/* Buyer List */}
        <div className="space-y-2 overflow-y-auto max-h-[calc(100%-120px)]">
          {buyers.map((name, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedBuyer(name);
                setMessages([]); // clear messages on switch
                setShowSidebar(false);
              }}
              className="flex items-center bg-gray-300 hover:bg-gray-400 px-2 py-2 rounded cursor-pointer"
            >
              <FaUserCircle className="text-xl mr-2" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-red-100 px-4 py-2 font-semibold border-b">
          {selectedBuyer}
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Preview Card */}
          <div className="border rounded p-4 bg-gray-50 w-fit">
            <div className="w-24 h-24 bg-gray-300 mb-2" />
            <p className="font-semibold text-sm">Item Description</p>
          </div>

          {/* Chat Bubbles */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded text-sm max-w-[80%] ${
                msg.from === 'buyer' ? 'bg-gray-200' : 'bg-red-100 self-end'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex items-center gap-2">
          <label className="cursor-pointer flex items-center">
            <input
              type="file"
              className="hidden"
              onChange={(e) => console.log(e.target.files[0])}
            />
            <div className="text-gray-600 hover:text-red-700 text-xl px-2">
              📎
            </div>
          </label>

          <input
            type="text"
            placeholder="Type a message..."
            className="border rounded px-4 py-2 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
