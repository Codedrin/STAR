import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { FaFilePdf } from 'react-icons/fa';

const Sales_report = () => {
  const salesData = [
    { name: 'Mon', sales: 900 },
    { name: 'Tue', sales: 1200 },
    { name: 'Wed', sales: 1000 },
    { name: 'Thu', sales: 1400 },
    { name: 'Fri', sales: 1300 },
  ];

  const orders = [
    { id: '23456', name: 'Tilapia Paste', qty: 1, buyer: 'Kent Adrian', price: 150, status: 'Pending' },
    { id: '23458', name: 'Pink Cotton Shirt', qty: 2, buyer: 'Katrina P.', price: 300, status: 'Completed' },
  ];

  const returns = [
    { id: '23459', name: 'Pink Cotton Shirt', buyer: 'Katrina P.', reason: 'Wrong item', evidence: 'IMG', action: 'Resolved' },
  ];

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 text-black flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-red-700 text-white p-4 rounded-md">
          <h2 className="text-xl font-semibold text-center md:text-left w-full md:w-auto">Sales/Reports</h2>
          <button className="flex items-center justify-center bg-black px-4 py-2 rounded mt-2 md:mt-0">
            <FaFilePdf className="mr-2" /> Export to PDF
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-center">
          <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-lg font-bold">160</h3>
            <p>Item Delivered</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-lg font-bold">198</h3>
            <p>Total Order</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-lg font-bold">₱ 5,453
            </h3>
            <p>Total Sales</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="mb-6 overflow-auto">
          <h4 className="font-bold mb-2 text-center sm:text-left">ORDERS</h4>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-300">
                <th className="border px-2">ORDER ID</th>
                <th className="border px-2">PRODUCT NAME</th>
                <th className="border px-2">QUANTITY</th>
                <th className="border px-2">BUYER NAME</th>
                <th className="border px-2">Total Price</th>
                <th className="border px-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border px-2">{order.id}</td>
                  <td className="border px-2">{order.name}</td>
                  <td className="border px-2">{order.qty}</td>
                  <td className="border px-2">{order.buyer}</td>
                  <td className="border px-2">₱{order.price}</td>
                  <td className="border px-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Returns Table */}
        <div className="mb-6 overflow-auto">
          <h4 className="font-bold mb-2 text-center sm:text-left">Return Items</h4>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-300">
                <th className="border px-2">ORDER ID</th>
                <th className="border px-2">PRODUCT NAME</th>
                <th className="border px-2">BUYER NAME</th>
                <th className="border px-2">REASON</th>
                <th className="border px-2">EVIDENCE</th>
                <th className="border px-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {returns.map((item) => (
                <tr key={item.id}>
                  <td className="border px-2">{item.id}</td>
                  <td className="border px-2">{item.name}</td>
                  <td className="border px-2">{item.buyer}</td>
                  <td className="border px-2">{item.reason}</td>
                  <td className="border px-2">{item.evidence}</td>
                  <td className="border px-2">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart */}
        <div className="w-full h-64 bg-gray-100 rounded p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Sales_report;
