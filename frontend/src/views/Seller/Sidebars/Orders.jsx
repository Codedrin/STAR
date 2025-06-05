import React from 'react';
import { FaBell } from 'react-icons/fa';

const orders = [
  {
    id: '135532',
    product: 'Pink Cotton Shirt',
    customer: 'Katrina Alberto | Sta. Tomas Batangas',
    date: 'May 1, 2025, 12:40',
    payment: 150,
    quantity: 1,
    status: 'Pending',
  },
  {
    id: '168752',
    product: 'Tilapia Paste',
    customer: 'Kent Adrian Leon | Tanauan City Batangas',
    date: 'May 2, 2025, 3:40',
    payment: 210,
    quantity: 2,
    status: 'Pending',
  },
];

const Orders = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center bg-red-700 text-white px-4 py-2 rounded-t">
        <h2 className="text-xl font-semibold">New Orders</h2>
        <div className="relative">
          <FaBell className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {orders.length}
          </span>
        </div>
      </div>

      {/* Order Cards */}
      <div className="space-y-4 mt-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded shadow-sm p-4 flex gap-4 items-start"
          >
            {/* Image Placeholder */}
            <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600">IMG</span>
            </div>

            {/* Order Info */}
            <div className="flex-1">
              <div className="font-semibold text-lg">{order.product}</div>
              <div className="text-sm text-gray-600">{order.customer}</div>
              <div className="text-sm text-gray-600">Order on: {order.date}</div>
              <div className="text-sm text-gray-600">Order ID: {order.id}</div>

              {/* Row */}
              <div className="flex items-center mt-2 gap-6 text-sm">
                <span>Payment: ₱{order.payment}</span>
                <span>Qty: {order.quantity}</span>
                <span>Status: {order.status}</span>
              </div>

              {/* Buttons */}
              <div className="mt-3 flex gap-3">
                <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                  Accept
                </button>
                <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
