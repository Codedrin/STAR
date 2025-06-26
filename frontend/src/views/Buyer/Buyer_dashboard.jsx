import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch, FaBell, FaUserCircle, FaCommentDots,
  FaChevronDown, FaGraduationCap, FaPaintBrush, FaUniversity,
  FaUserNurse, FaLaptopCode
} from 'react-icons/fa';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';
import ModalChat from './Modal/Modal_chat'; 



const Buyer_dashboard = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/userAuth/buyerProfile/${userId}`)
        .then(res => res.json())
        .then(data => setProfile(data));
    }
  }, [userId]);

   useEffect(() => {
    fetch('http://localhost:5000/userRoute/getAllProducts')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to load products', err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const categories = [
    { name: 'Engineering', icon: <FaGraduationCap /> },
    { name: 'Architecture', icon: <FaUniversity /> },
    { name: 'Fine arts', icon: <FaPaintBrush /> },
    { name: 'Arts and Sciences', icon: <FaUniversity /> },
    { name: 'Nursing', icon: <FaUserNurse /> },
    { name: 'Informatics and Computing Sciences', icon: <FaLaptopCode /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-red-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img src={LogoLeft} alt="Logo Left" className="w-20 h-20" />
          <div className="text-center text-xs md:text-base">
            <h1 className="text-xl md:text-2xl font-bold">STAR</h1>
            <p>Welcome to Batangas State University!</p>
            <p className="italic text-sm">The Philippines’ National Engineering University</p>
          </div>
          <img src={LogoRight} alt="Logo Right" className="w-20 h-20" />
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-red-700 py-4 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4 relative">
          <FaBell className="text-white text-xl cursor-pointer" />
          <div className="relative flex-1">
            <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="appearance-none flex items-center justify-between rounded-full px-4 py-2 text-sm border border-gray-300 bg-white text-black w-36"
            >
              Category
              <FaChevronDown className="ml-2 text-gray-600 text-sm" />
            </button>

            {showCategories && (
              <div className="absolute top-12 left-0 bg-red-600 text-white rounded shadow-md w-48 flex">
              <div className="w-full">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => alert(`You clicked ${cat.name}`)} 
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-500 cursor-pointer transition rounded"
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-sm">{cat.name}</span>
              </div>
            ))}
          </div>

              </div>
            )}
          </div>
           <div className="relative flex items-center gap-2">
            <FaUserCircle
              className="text-white text-2xl cursor-pointer"
              onClick={() => setShowUserMenu(!showUserMenu)}
            />
            {profile && (
              <span className="ml-2 text-white font-semibold text-base">
                {profile.fullname}
              </span>
            )}
            {/* Popup menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 bg-white text-black rounded shadow-md w-56 z-20">
                <div className="p-4">
                  <div className="font-semibold text-lg">{profile?.fullname}</div>
                  <div className="text-sm text-gray-600">{profile?.email}</div>
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-red-600 text-white rounded py-2 hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Items Grid */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map(prod => (
          <div
            key={prod.id}
         onClick={() => navigate(`/Buyer_description/product/${prod.id}`, { state: { product: prod } })}
            className="bg-red-600 text-white rounded-lg p-2 cursor-pointer hover:shadow-lg transition"
          >
            {prod.image_urls?.[0] ? (
              <img
                src={prod.image_urls[0]}
                alt={prod.name}
                className="h-24 w-full object-cover rounded mb-2"
              />
            ) : (
              <div className="bg-black h-24 rounded mb-2"></div>
            )}
            <p className="text-sm font-semibold">{prod.name}</p>
            <p className="text-xs">₱ {prod.price}</p>
          </div>
        ))}
      </div>

      {/* Floating Chat */}
      <div
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-md cursor-pointer"
      >
        <FaCommentDots className="text-red-600 text-xl" />
      </div>

      {/* Chat Modal */}
     {showModal && <ModalChat onClose={() => setShowModal(false)} />}

    </div>
  );
};

export default Buyer_dashboard;
