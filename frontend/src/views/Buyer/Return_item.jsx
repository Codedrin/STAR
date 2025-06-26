// src/views/Buyer/Return_item.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate }           from 'react-router-dom';
import {
  FaBell, FaSearch, FaUserCircle, FaUndo,
  FaCheckCircle, FaSpinner
} from 'react-icons/fa';
import LogoLeft    from '../../assets/Logo.png';
import LogoRight   from '../../assets/Logo2.png';
import sampleImage from '../../assets/Logo.png';

const REASONS = [
  { value: '',                label: '-- Select a reason --' },
  { value: 'damaged',         label: 'Damaged Item' },
  { value: 'wrong',           label: 'Wrong Item Delivered' },
  { value: 'not_as_described',label: 'Not as Described' },
  { value: 'others',          label: 'Others' },
];

const Return_item = () => {
  const { productId } = useParams();  
  const buyerId       = localStorage.getItem('userId');
  const navigate      = useNavigate();

  // product info
  const [product, setProduct]             = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  // form
  const [selectedReason, setSelectedReason] = useState('');
  const [uploadedFile, setUploadedFile]     = useState(null);
  const [previewUrl, setPreviewUrl]         = useState(null);

  // submission
  const [submitting, setSubmitting]         = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef();

  // fetch product details
  useEffect(() => {
    (async () => {
      try {
        setLoadingProduct(true);
        const res = await fetch(
          `http://localhost:5000/userRoute/returns/${productId}`
        );
        if (!res.ok) throw new Error();
        setProduct(await res.json());
      } catch {
        navigate('/Buyer_dashboard', { replace: true });
      } finally {
        setLoadingProduct(false);
      }
    })();
  }, [productId, navigate]);

  const onFileChange = e => {
    const f = e.target.files?.[0];
    if (f) {
      setUploadedFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    }
  };

  const handleReturnSubmit = async () => {
    if (!selectedReason) return alert('Select a reason.');
    if (!uploadedFile)     return alert('Upload an image.');
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append('buyerId',   buyerId);
      form.append('productId', productId);
      form.append('reason',    selectedReason);
      form.append('image',     uploadedFile);

      const res = await fetch(
        'http://localhost:5000/userRoute/returns',
        { method: 'POST', body: form }
      );
      if (!res.ok) throw new Error();
      setShowSuccessModal(true);
    } catch {
      alert('Return failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <div className="bg-red-700 text-white py-4 px-6 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between">
            <img src={LogoLeft}  className="w-20 h-20" alt="" />
            <div className="text-center text-xs md:text-base">
              <h1 className="text-xl md:text-2xl font-bold">STAR</h1>
              <p>BATANGAS STATE UNIVERSITY</p>
              <p className="italic text-sm">…</p>
            </div>
            <img src={LogoRight} className="w-20 h-20" alt="" />
          </div>
        </div>

        {/* Search */}
        <div className="bg-red-700 py-4 px-6">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <FaBell className="text-white text-xl" />
            <div className="relative flex-1">
              <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
              <input
                className="w-full pl-10 pr-4 py-2 rounded-full text-sm"
                placeholder="Search…"
              />
            </div>
            <FaUserCircle className="text-white text-2xl" />
          </div>
        </div>

        {/* Return Form */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-600 rounded-lg shadow text-white">
          <div className="bg-white text-black rounded p-3 flex items-center gap-3 mb-4">
            <img
              src={product?.imageUrl || sampleImage}
              className="w-14 h-14 object-cover rounded bg-gray-200"
              alt=""
            />
            <div>
              <p className="font-semibold text-sm">{product?.name}</p>
              <p className="text-xs text-gray-600">₱ {product?.price}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex flex-col items-center">
              <label
                htmlFor="returnImage"
                className="w-20 h-20 bg-white rounded border-dashed border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                {previewUrl
                  ? <img src={previewUrl} className="w-full h-full object-cover rounded" />
                  : <span className="text-xs">+</span>}
              </label>
              <input
                id="returnImage"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={onFileChange}
              />
              <span className="text-xs mt-1">Upload</span>
            </div>
            <div className="flex-1">
              <label htmlFor="reason" className="block text-sm mb-1">Reason of return</label>
              <select
                id="reason"
                value={selectedReason}
                onChange={e => setSelectedReason(e.target.value)}
                className="w-full p-2 rounded text-sm text-black"
              >
                {REASONS.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleReturnSubmit}
              disabled={submitting}
              className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-red-600 disabled:opacity-50"
            >
              {submitting
                ? <FaSpinner className="animate-spin" />
                : <FaUndo />}
              Return Item
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-red-600 text-white rounded-lg p-6 max-w-md w-full text-center shadow-lg">
            <button
              onClick={()=>setShowSuccessModal(false)}
              className="absolute top-3 right-3 text-white text-2xl hover:text-gray-200"
            >✕</button>
            <FaCheckCircle className="text-5xl mb-3"/>
            <h2 className="text-xl font-bold">Return Request Submitted</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Return_item;
