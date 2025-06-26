import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoLeft from '../../assets/Logo.png';
import LogoRight from '../../assets/Logo2.png';
import { FaUserCircle, FaIdCard } from 'react-icons/fa';

const Seller_register = () => {
  const navigate = useNavigate();
  
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [businessname, setBusinessname] = useState('');
  const [campus, setCampus] = useState('');
  const [password, setPassword] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agree) {
      setError('You must agree to the guidelines.');
      return;
    }
    if (!fullname || !email || !businessname || !campus || !password) {
      setError('Please fill out all fields.');
      return;
    }
      if (!/^\d+@g\.batstate-u\.edu\.ph$/.test(email)) {
    setError('Email must contain only numbers followed by @g.batstate-u.edu.ph');
    return;
      }
      
    if (!profileFile || !idFile) {
      setError('Please upload both profile and valid ID.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('email', email);
      formData.append('businessname', businessname);
      formData.append('campus', campus);
      formData.append('password', password);
      formData.append('profile', profileFile);
      formData.append('id', idFile);

      const res = await fetch('http://localhost:5000/userAuth/registerSeller', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      // Success
      navigate('/Seller_login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="flex justify-center mt-10 px-4"
        encType="multipart/form-data"
      >
        <div className="w-full max-w-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-6">Register as a Seller</h2>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                value={fullname}
                onChange={e => setFullname(e.target.value)}
                type="text"
                placeholder="Enter Fullname"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
              <input
                value={businessname}
                onChange={e => setBusinessname(e.target.value)}
                type="text"
                placeholder="Business Name"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
              <input
                value={campus}
                onChange={e => setCampus(e.target.value)}
                type="text"
                placeholder="Campus"
                className="border border-gray-400 px-4 py-2 rounded text-sm w-full"
              />
            </div>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              className="border border-gray-400 px-4 py-2 rounded text-sm w-full mb-4"
            />

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Profile Upload */}
              <div className="flex items-center border border-gray-400 rounded overflow-hidden w-full">
                <span className="px-3 bg-gray-100 text-gray-600 flex items-center justify-center">
                  <FaUserCircle className="text-lg" />
                </span>
                <span className="flex-1 px-3 text-sm text-gray-700">
                  {profileFile ? profileFile.name : 'Profile'}
                </span>
                <label className="px-4 py-2 bg-white text-sm cursor-pointer hover:bg-red-100 text-red-600 border-l border-gray-300">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => setProfileFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
              {/* ID Upload */}
              <div className="flex items-center border border-gray-400 rounded overflow-hidden w-full">
                <span className="px-3 bg-gray-100 text-gray-600 flex items-center justify-center">
                  <FaIdCard className="text-lg" />
                </span>
                <span className="flex-1 px-3 text-sm text-gray-700">
                  {idFile ? idFile.name : 'Valid ID'}
                </span>
                <label className="px-4 py-2 bg-white text-sm cursor-pointer hover:bg-red-100 text-red-600 border-l border-gray-300">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => setIdFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </div>

            {/* Agreement */}
            <div className="mb-4 text-xs text-gray-700 flex gap-2 items-start">
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
              />
              <p>
                I agree to follow the Seller’s Guidelines, Marketplace Policies,
                and STAR’s community commitment.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-40 mx-auto block bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Create account"}
            </button>

            {/* Login Link */}
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link
                to="/Seller_login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login now
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Seller_register;
