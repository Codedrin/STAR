import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_Products = () => {
  const [images, setImages] = useState([]);           
  const [imageFiles, setImageFiles] = useState([]);   
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
    setImageFiles(files);
  };

  const handleCancel = () => {
    setImages([]);
    setImageFiles([]);
    setName('');
    setCategory('');
    setPrice('');
    setQuantity('');
    setDescription('');
  };

  const handleAddProduct = async () => {
    if (!name || !category || !price || !quantity) {
      toast.error("Please fill all required fields.", { position: 'top-right' });
      return;
    }

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('description', description);
      formData.append('sellerId', userId || 'dummySellerId');
      imageFiles.forEach((file) => formData.append('images', file));

      const res = await fetch('http://localhost:5000/userRoute/addProduct', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add product');

      toast.success('Product added successfully!', { position: 'top-right', autoClose: 2000 });
      handleCancel();
    } catch (err) {
      toast.error(err.message, { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  const [carouselIndex, setCarouselIndex] = useState(0);
  const showPrev = () => setCarouselIndex(i => i === 0 ? images.length - 1 : i - 1);
  const showNext = () => setCarouselIndex(i => i === images.length - 1 ? 0 : i + 1);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-6 text-red-800">Add Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload & Carousel */}
        <div className="flex flex-col items-center border border-dashed border-gray-400 p-4 rounded">
          {images.length > 0 ? (
            <div className="relative w-40 h-40 flex items-center justify-center mb-2 rounded">
              <img
                src={images[carouselIndex]}
                alt="Preview"
                className="w-40 h-40 object-cover rounded"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={showPrev}
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded"
                    type="button"
                  >{"<"}</button>
                  <button
                    onClick={showNext}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded"
                    type="button"
                  >{">"}</button>
                </>
              )}
            </div>
          ) : (
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center mb-2 rounded">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <label className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600">
            Add Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-4 py-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">Select Category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="accessories">Accessories</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded px-4 py-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <textarea
          placeholder="Add Brief Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-4 py-2"
          rows={4}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Add_Products;
