import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminReport = () => {
  const barData = {
    labels: ['Spam', 'Abuse', 'Fake Info', 'Inappropriate', 'Other'],
    datasets: [
      {
        label: 'Reports',
        data: [30, 12, 20, 10, 14],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Report Categories</h2>
          <Bar data={barData} />
        </div>

        {/* Stats Box */}
        <div className="flex flex-col gap-2">
          <div className="border border-black p-4 bg-white flex justify-between font-semibold">
            <span>Total Reports</span>
            <span>68</span>
          </div>
          <div className="border border-black p-4 bg-white flex justify-between font-semibold">
            <span>Pending Reports</span>
            <span className="text-red-600">13</span>
          </div>
          <div className="border border-black p-4 bg-white flex justify-between font-semibold">
            <span>Resolved Reports</span>
            <span>55</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-gray-400 rounded min-h-[400px]">
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

                  {/* View Button */}
                  <button className="px-4 py-1 text-sm rounded-full border border-black bg-white text-black hover:bg-blue-500 hover:text-white">
                    View
                  </button>

                  {/* Delete Button */}
                  <button className="px-4 py-1 text-sm rounded-full border border-black bg-white text-black hover:bg-red-500 hover:text-white">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReport;
