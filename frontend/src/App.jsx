import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './views/Dashboard/dashboard';
import AdminDashboard from './views/Dashboard/admin_dashboard';
import AdminPro from './views/Dashboard/admin_pro';
import AdminVer from './views/Dashboard/admin_ver';
import AdminReport from './views/Dashboard/admin_report';
import Login from './views/admin/Login';
import BuyerLogin from './views/Buyer/Buyer_login'; 
import BuyerRegister from './views/Buyer/Buyer_register'; 
import BuyerDashboard from './views/Buyer/Buyer_dashboard'; 
import BuyerDescription  from './views/Buyer/Buyer_Description'; 
import ReturnItem from './views/Buyer/Return_item';
import SellerLogin from './views/Seller/Seller_login'; 
import SellerRegister from './views/Seller/Seller_register';
import SellerDashboard from './views/Seller/Seller_dashboard'; 
import Products from './views/Seller/Sidebars/Products';
import Add_Products from './views/Seller/Sidebars/Add_Products'; 
import Orders from './views/Seller/Sidebars/Orders';
import Message from './views/Seller/Sidebars/Message';
import Sales_report from './views/Seller/Sidebars/Sales_report';
import Profile from './views/Seller/Sidebars/Profile';
import SellerForgotPassword from './views/Seller/Seller_Forgotpassword'; 

import BuyerForgot from './views/Buyer/Buyer_Forgot'; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuyerLogin />} />
        <Route path="/Buyer_register" element={<BuyerRegister />} />
        <Route path="/Buyer_dashboard" element={<BuyerDashboard />} />
        <Route path="/Buyer_description/product/:id" element={<BuyerDescription />} />
        <Route path="/Buyer_forgot" element={<BuyerForgot />} />
        <Route path="/return-item" element={<ReturnItem />} />

        {/* Seller */}
        <Route path="/Seller_login" element={<SellerLogin />} />
          <Route path="/Seller_register" element={<SellerRegister />} />
          <Route path="/Seller_forgotpassword" element={<SellerForgotPassword />} />
          <Route path="/Seller_dashboard" element={<SellerDashboard />}>
          <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<Add_Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="messages" element={<Message />} />
          <Route path="sales-report" element={<Sales_report />} />
          <Route path="profile" element={<Profile />} />
        </Route>


        {/* Admin */}
      <Route path="/Admin_login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>      
          <Route index element={<AdminDashboard />} />
          <Route path="home" element={<AdminDashboard />} />
          <Route path="products" element={<AdminPro />} />
          <Route path="verify" element={<AdminVer />} />
          <Route path="reports" element={<AdminReport />} />
        </Route>
      </Routes>

    </Router>
  );
};

export default App;












