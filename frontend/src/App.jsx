import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './views/Dashboard/dashboard';
import AdminDashboard from './views/Dashboard/admin_dashboard';
import AdminPro from './views/Dashboard/admin_pro';
import AdminVer from './views/Dashboard/admin_ver';
import AdminReport from './views/Dashboard/admin_report';
import Login from './views/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* This sets admin_dashboard.jsx as the default (index) view */}
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
