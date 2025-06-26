import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, push, set, serverTimestamp } from "firebase/database";
import { db } from '../../../services/firebaseClient';
import {
  FaBell, FaSearch, FaCommentDots, FaShoppingCart,
  FaUserCircle, FaStar
} from 'react-icons/fa';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';

import ModalChat from './Modal/Modal_chat';
import ModalPlaceOrder from './Modal/Modal_placeorder';
import ModalRating from './Modal/Modal_rating';

const Buyer_Description = () => {
  const { id: paramId } = useParams();
  const navigate       = useNavigate();
  const buyerId        = localStorage.getItem('userId');

  const [product, setProduct]     = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading]     = useState(true);

  const [showChatModal, setShowChatModal]             = useState(false);
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState(false);
  const [showRatingModal, setShowRatingModal]         = useState(false);

  const [message, setMessage] = useState('Hi, Is this available ?');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!paramId) {
      navigate('/Buyer_dashboard', { replace: true });
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/userRoute/products/${paramId}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setMainImage(data.image_urls?.[0] || '');
      })
      .catch(() => {
        navigate('/Buyer_dashboard', { replace: true });
      })
      .finally(() => setLoading(false));
  }, [paramId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Product not found.
      </div>
    );
  }

const handleSendMessage = async () => {
  if (!message.trim() || sending) return;
  setSending(true);

  try {
    const conversationId = `${buyerId}_${product.sellerId}_${product.id}`;
    const messagesRef = ref(db, `chats/${conversationId}/messages`);

    await push(messagesRef, {
      senderId: buyerId,
      receiverId: product.sellerId,
      productId: product.id,
       text: message.trim(),  
      timestamp: Date.now(),
      type: "text",
      // imageUrl: (optional, for image messages)
    });

    // (optional) update last message meta
    const conversationMetaRef = ref(db, `chats/${conversationId}/meta`);
    await set(conversationMetaRef, {
      buyerId,
      sellerId: product.sellerId,
      productId: product.id,
      lastMessage: message.trim(),
      lastText: message.trim(),   
      lastSender: buyerId,
      lastTimestamp: Date.now(),
      productName: product.name,
      productImage: product.image_urls?.[0] || "",
      sellerName: product.seller?.fullname || "",
      sellerProfile: product.seller?.profile_url || "",
    });

    setMessage("Hi, Is this available ?");  
    setShowChatModal(true);

  } catch (err) {
    alert("Failed to send message.");
    console.error(err);
  } finally {
    setSending(false);
  }
};

  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-red-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={LogoLeft} className="w-20 h-20" alt="Logo Left" />
          <div className="text-center text-xs md:text-base">
            <h1 className="text-xl md:text-2xl font-bold">STAR</h1>
            <p>BATANGAS STATE UNIVERSITY</p>
            <p className="italic text-sm">
              A premier national university that develops leaders in the global knowledge economy
            </p>
          </div>
          <img src={LogoRight} className="w-20 h-20" alt="Logo Right" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-red-700 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center">
          <FaBell className="text-white text-xl mr-4" />
          <div className="relative flex-1">
            <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Images + Details */}
        <div className="bg-white p-4 rounded shadow col-span-2 flex flex-col">
          <img
            src={mainImage || LogoLeft}
            alt={product.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <div className="flex gap-2 mb-4">
            {product.image_urls?.map((url, i) => (
              <img
                key={i}
                src={url}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  url === mainImage ? 'border-red-600' : 'border-transparent'
                }`}
                onClick={() => setMainImage(url)}
                alt={`Thumbnail ${i+1}`}
              />
            ))}
          </div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-gray-700 mt-2">{product.description}</p>
       <div className="flex flex-row items-center gap-4 mt-4">
  {/* Price */}
  <span className="text-2xl font-bold whitespace-nowrap">₱ {product.price}</span>
  
  {/* Buy Button */}
  <button
    onClick={() => setShowPlaceOrderModal(true)}
    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 flex items-center gap-2 whitespace-nowrap"
  >
    Buy <FaShoppingCart />
  </button>

  {/* Inline Chat to Seller */}
  <div className="flex items-center gap-2 flex-1 min-w-0">
    <input
      type="text"
      value={message}
      onChange={e => setMessage(e.target.value)}
      className="rounded-full px-3 py-2 text-sm w-full max-w-xs border"
      disabled={sending}
      placeholder="Hi, Is this available ?"
    />
    <button
      className="bg-white text-red-600 rounded px-3 py-1 font-semibold text-sm hover:bg-red-100"
      onClick={handleSendMessage}
      disabled={sending}
      style={{ minWidth: 50 }}
    >
      {sending ? '...' : 'Send'}
    </button>
  </div>
</div>
        </div>


        {/* Right: Seller & Rating */}
        <div className="bg-red-600 text-white p-4 rounded shadow flex flex-col gap-6">
          <div className="flex items-center gap-2">
            {product.seller?.profile_url ? (
              <img
                src={product.seller.profile_url}
                alt={product.seller.fullname || "Seller"}
                className="w-8 h-8 rounded-full object-cover"
                onError={e => (e.target.src = LogoLeft)}
              />
            ) : (
              <FaUserCircle className="text-2xl" />
            )}
            <span>{product.seller?.fullname || "Unknown Seller"}</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer hover:underline"
            onClick={() => setShowChatModal(true)}
          >
            <FaCommentDots className="text-xl" />
            <span>Chat now</span>
          </div>

          <button
            onClick={() => setShowRatingModal(true)}
            className="mt-4 bg-white text-red-600 flex items-center justify-center gap-2 py-2 px-4 rounded hover:bg-gray-100"
          >
            <FaStar className="text-yellow-500" />
            {product.averageRating}
          </button>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div
        onClick={() => setShowChatModal(true)}
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-md cursor-pointer"
      >
        <FaCommentDots className="text-red-600 text-xl" />
      </div>

      {/* Modals */}
        {showChatModal && (
          <ModalChat
            onClose={() => setShowChatModal(false)}
            buyerId={buyerId}
            productId={product.id}
            sellerId={product.sellerId}
            productName={product.name}
            productImage={product.image_urls?.[0]}
            sellerName={product.seller?.fullname}
            sellerProfile={product.seller?.profile_url}
          />
        )}

      {showPlaceOrderModal && product && (
        <ModalPlaceOrder
          onClose={() => setShowPlaceOrderModal(false)}
          sellerName={product.seller?.fullname || "Unknown Seller"}
          productImage={product.image_urls?.[0] || sampleImage}
          productName={product.name}
          productPrice={product.price}
        />
      )}

      {showRatingModal && (
        <ModalRating
          onClose={() => setShowRatingModal(false)}
          productId={product.id}
          buyerId={buyerId}
        />
      )}
    </div>
  );
};

export default Buyer_Description;
