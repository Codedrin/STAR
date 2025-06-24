import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FaUserCircle } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const AdminDashboard = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Growth A (%)',
        data: [10, 20, 30, 40],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Growth B (%)',
        data: [5, 15, 35, 50],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Growth C (%)',
        data: [12, 18, 25, 30],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Growth D (%)',
        data: [8, 22, 28, 55],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Reports', 'Verified', 'Unverified'],
    datasets: [
      {
        label: 'Category Distribution (%)',
        data: [20, 50, 30],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-0 bg-gray-100 min-h-screen">

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 text-center border border-black h-40 flex flex-col justify-center">
            <h2 className="text-gray-700 text-lg font-semibold mb-2">User Registered</h2>
            <p className="text-3xl font-bold text-gray-800">543</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center border border-black h-40 flex flex-col justify-center">
            <h2 className="text-gray-700 text-lg font-semibold mb-2">Pending Verification</h2>
            <p className="text-3xl font-bold text-gray-800">13</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center border border-black h-40 flex flex-col justify-center">
            <h2 className="text-gray-700 text-lg font-semibold mb-2">Reports</h2>
            <p className="text-3xl font-bold text-gray-800">4</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Report</h3>
            <div className="min-w-[500px]">
              <Line data={lineData} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Stats</h3>
            <div className="min-w-[500px]">
              <Bar data={barData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
