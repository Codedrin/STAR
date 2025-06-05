import React from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const AdminVer = () => {
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
            className="w-full pl-10 pr-4 py-2 rounded-full border border-black focus:outline-none"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative ml-4 w-40">
          <select className="w-full px-4 py-2 border border-black rounded-full appearance-none focus:outline-none">
            <option>Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Declined</option>
          </select>
          <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-400 rounded min-h-[550px]">
        <table className="min-w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="text-right px-6 py-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-6">
                <div className="flex items-center justify-end gap-4">
                 
                  {/* Approve Button */}
                  <button className="px-4 py-1 text-sm rounded-full border border-black bg-white text-black hover:bg-green-500 hover:text-white">
                    Approve
                  </button>

                  {/* Delete Button */}
                  <button className="px-4 py-1 text-sm rounded-full border border-black bg-white text-black hover:bg-red-500 hover:text-white">
                    Delete
                  </button>

                </div>
              </td>
            </tr>
            {/* More rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVer;
