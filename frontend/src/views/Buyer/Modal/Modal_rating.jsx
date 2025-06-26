import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaStar,
  FaRegStar,
  FaExclamationCircle,
  FaUndo
} from 'react-icons/fa';

import Report from './Report';

const ModalRating = ({ product, buyerId, onClose, onRated }) => {
  const [score, setScore]                 = useState(0);
  const [comment, setComment]             = useState('');
  const [reportReason, setReportReason]   = useState(null);
  const [loading, setLoading]             = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const navigate                           = useNavigate();

  const handleStarClick = i => setScore(i + 1);

  const handleSubmit = async () => {
    if (score === 0) {
      return alert('Please select a star rating first.');
    }
    setLoading(true);

    const payload = {
      userId: buyerId,
      score,
      comment: comment.trim()
    };
    if (reportReason) payload.reportReason = reportReason;

    try {
      const res = await fetch(
        `http://localhost:5000/userRoute/products/${product.id}/ratings`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error('Network error');

      onRated?.();  // let parent refresh averageRating
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >✕</button>

          {/* Product Info + Report */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={product.image_urls?.[0]}
                alt={product.name}
                className="w-14 h-14 rounded object-cover mr-3 bg-gray-100"
                onError={e => (e.target.src = '')}
              />
              <div>
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">₱ {product.price}</p>
              </div>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="flex items-center gap-1 text-xs text-red-600 hover:underline"
            >
              <FaExclamationCircle /> Report seller/item
            </button>
          </div>

          {/* Stars */}
          <div className="flex items-center mb-3">
            {[0,1,2,3,4].map(i =>
              i < score ? (
                <FaStar
                  key={i}
                  className="text-yellow-500 cursor-pointer"
                  onClick={() => handleStarClick(i)}
                />
              ) : (
                <FaRegStar
                  key={i}
                  className="text-gray-400 cursor-pointer"
                  onClick={() => handleStarClick(i)}
                />
              )
            )}
          </div>

          {/* Comment */}
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Leave a comment (optional)…"
            className="w-full border rounded p-2 mb-4 text-sm"
            rows={3}
          />

          {/* Return Item */}
          <div className="mb-4">
            <button
              onClick={() => navigate(`/return-item/${product.id}`)}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-1 text-sm rounded hover:bg-gray-100 transition"
            >
              <FaUndo /> Return Item
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <Report
          onClose={() => setShowReportModal(false)}
          onSelect={reason => {
            setReportReason(reason);
            setShowReportModal(false);
          }}
        />
      )}
    </>
  );
};

export default ModalRating;
