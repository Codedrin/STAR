import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './views/Dashboard/dashboard';
import AdminDashboard from './views/Dashboard/admin_dashboard';
import AdminPro from './views/Dashboard/admin_pro';
import AdminVer from './views/Dashboard/admin_ver';
import AdminReport from './views/Dashboard/admin_report';
import Login from './views/Login';
import BuyerLogin from './views/Buyer/Buyer_login'; 
import BuyerRegister from './views/Buyer/Buyer_register'; 
import BuyerDashboard from './views/Buyer/Buyer_dashboard'; 
import BuyerDescription  from './views/Buyer/Buyer_Description'; 
import ReturnItem from './views/Buyer/Return_item'; // adjust path accordingly

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Buyer_login" element={<BuyerLogin />} />
        <Route path="/Buyer_register" element={<BuyerRegister />} />
        <Route path="/Buyer_dashboard" element={<BuyerDashboard />} />
        <Route path="/Buyer_description" element={<BuyerDescription />} />
        <Route path="/return-item" element={<ReturnItem />} />


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












