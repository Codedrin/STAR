import React, { useState, useEffect } from 'react';
import { useNavigate }            from 'react-router-dom';
import { FaUserCircle, FaShoppingBag, FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer }   from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sampleImage                 from '../../../assets/Logo.png';
import ModalItemPurchase           from './Modal_Item_purchaase';

const ModalPlaceOrder = ({
  onClose,
  buyerId,
  sellerId,
  productId,
  productName,
  productImage,
  productPrice,
}) => {
  const [sellerProfile, setSellerProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sellerId) return;
    fetch(`http://localhost:5000/userRoute/users/${sellerId}`)
      .then(res => {
        if (!res.ok) throw new Error('Profile fetch failed');
        return res.json();
      })
      .then(data => setSellerProfile(data))
      .catch(console.error)
      .finally(() => setLoadingProfile(false));
  }, [sellerId]);


  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const res = await fetch('http://localhost:5000/userRoute/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerId,
          sellerId,
          productId,
          productName,
          productPrice,
        }),
      });
      if (!res.ok) throw new Error('Order failed');
      toast.success('Order placed successfully!', { position: 'top-right' });
      setShowPurchaseModal(true);
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order.', { position: 'top-right' });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div className=" rounded-lg w-full max-w-lg p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-red-600 text-2xl font-bold hover:text-red-800"
          >&times;</button>

          {/* seller header */}
          <div className="bg-red-600 text-white px-4 py-2 rounded-t flex items-center gap-2">
            {loadingProfile
              ? <FaSpinner className="animate-spin" />
              : sellerProfile?.profile_url
                ? <img
                    src={sellerProfile.profile_url}
                    alt={sellerProfile.fullname}
                    className="w-6 h-6 rounded-full"
                  />
                : <FaUserCircle className="text-lg" />
            }
            <span className="font-semibold text-sm">
              {loadingProfile
                ? 'Loading…'
                : sellerProfile?.fullname || 'Unknown Seller'
              }
            </span>
          </div>

          {/* product info */}
          <div className="bg-red-600 p-4 rounded-b flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={productImage || sampleImage}
                alt={productName}
                className="w-16 h-16 rounded object-cover bg-white"
              />
              <div className="bg-white p-2 rounded flex-1 flex justify-between items-center text-sm">
                <span>{productName}</span>
                <span className="font-semibold">₱ {productPrice}</span>
              </div>
            </div>

            {/* actions */}
            <div className="flex justify-between items-center">
              <button
                onClick={onClose}
                className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-red-600 transition text-sm"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-red-600 transition text-sm disabled:opacity-50"
              >
                {placing
                  ? <FaSpinner className="animate-spin" />
                  : <FaShoppingBag />
                }
                {placing ? 'Placing…' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>

  
      {showPurchaseModal && (
        <ModalItemPurchase
          onClose={() => {
            setShowPurchaseModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default ModalPlaceOrder;
