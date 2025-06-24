import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  // Track carousel index per product by product id
  const [carouselIndexes, setCarouselIndexes] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:5000/userRoute/sellerProducts/${userId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Filter products by search (optional)
  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Carousel functions
  const handlePrev = (productId, images) => {
    setCarouselIndexes((prev) => {
      const idx = prev[productId] || 0;
      return {
        ...prev,
        [productId]: (idx - 1 + images.length) % images.length,
      };
    });
  };

  const handleNext = (productId, images) => {
    setCarouselIndexes((prev) => {
      const idx = prev[productId] || 0;
      return {
        ...prev,
        [productId]: (idx + 1) % images.length,
      };
    });
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <FaSearch className="text-black mr-2" />
        <input
          type="text"
          placeholder="Search Item"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border-2 border-purple-600 rounded px-3 py-1 w-full max-w-xs focus:outline-none"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((product) => {
          const images = product.image_urls || [];
          const index = carouselIndexes[product.id] || 0;

          return (
            <div
              key={product.id}
              className="bg-red-700 text-white p-4 rounded text-center shadow hover:shadow-lg"
            >
              <div className="w-full h-24 flex items-center justify-center bg-black mb-2 rounded relative">
                {/* Carousel controls */}
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 text-black rounded-full p-1"
                      onClick={() => handlePrev(product.id, images)}
                      tabIndex={-1}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 text-black rounded-full p-1"
                      onClick={() => handleNext(product.id, images)}
                      tabIndex={-1}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
                {images.length > 0 ? (
                  <img
                    src={images[index]}
                    alt={product.name}
                    className="object-cover w-full h-full rounded"
                    style={{ maxHeight: "6rem" }}
                  />
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>
              <p className="truncate">{product.name}</p>
              <p className="font-bold">₱{product.price}</p>
              {/* Dots for carousel */}
              {images.length > 1 && (
                <div className="flex justify-center mt-1 gap-1">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`inline-block w-2 h-2 rounded-full ${
                        idx === index ? "bg-white" : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {!filtered.length && (
          <div className="col-span-full text-center text-gray-700">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Products;
