import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_Products = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setImage(null);
    setName('');
    setCategory('');
    setPrice('');
    setQuantity('');
    setDescription('');
  };

  const handleAddProduct = () => {
    toast.success('Product added successfully!', {
      position: 'top-right',
      autoClose: 2000,
    });

    // You can optionally clear fields after add
    handleCancel();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <ToastContainer /> {/* Toast UI */}

      <h2 className="text-2xl font-bold mb-6 text-red-800">Add Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload */}
        <div className="flex flex-col items-center border border-dashed border-gray-400 p-4 rounded">
          {image ? (
            <img src={image} alt="Preview" className="w-40 h-40 object-cover mb-2 rounded" />
          ) : (
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center mb-2 rounded">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <label className="cursor-pointer bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600">
            Add Image
            <input type="file" 
            accept="image/*" onChange={handleImageChange} className="hidden" />
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
          className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Add Product
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Add_Products;
