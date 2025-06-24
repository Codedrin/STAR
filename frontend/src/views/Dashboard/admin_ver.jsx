import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const AdminVer = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/userRoute/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleApprove = async (userId) => {
    await fetch(`http://localhost:5000/userRoute/users/${userId}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" })
    });
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    await fetch(`http://localhost:5000/userRoute/users/${userId}`, {
      method: "DELETE"
    });
    fetchUsers();
  };

  const filteredUsers = users.filter(user => {
    const nameMatch = (user.fullname || '').toLowerCase().includes(search.toLowerCase());
    const statusMatch = statusFilter
      ? (user.status || '').toLowerCase() === statusFilter.toLowerCase()
      : true;
    return nameMatch && statusMatch;
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-black focus:outline-none"
          />
        </div>
        {/* Status Dropdown */}
        <div className="relative ml-4 w-40">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-full appearance-none focus:outline-none"
          >
            <option value="">Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-400 rounded min-h-[550px]">
        <table className="min-w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="text-right px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-700">No users found.</td>
              </tr>
            )}
            {filteredUsers.map(user => (
              <tr key={user.id} className="bg-white even:bg-gray-200 border-b">
                <td className="px-6 py-4">{user.fullname}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.status || 'pending'}</td>
                <td className="px-6 py-4 flex items-center justify-end gap-4">
                  <button
                    onClick={() => handleApprove(user.id)}
                    className="px-4 py-1 text-sm rounded-full border border-black bg-white text-black hover:bg-green-500 hover:text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-1 text-sm rounded-full border border-black bg-white text-black hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVer;
