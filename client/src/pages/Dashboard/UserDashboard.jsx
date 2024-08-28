import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-100 border-l-4 border-yellow-500">
          <div className="text-4xl text-yellow-500">18</div>
          <div className="text-gray-700">Number of Hours Worked This Week</div>
        </div>
        <div className="p-4 bg-gray-100 border-l-4 border-blue-500">
          <div className="text-4xl text-blue-500">48</div>
          <div className="text-gray-700">Number of Hours Assigned To You</div>
        </div>
        <div className="p-4 bg-gray-100 border-l-4 border-red-500">
          <div className="text-4xl text-red-500">18</div>
          <div className="text-gray-700">Balance of Annual Leaves</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-gray-100">
          <div className="text-lg font-semibold mb-2">Online</div>
          <div className="space-y-2">
            <button className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md">UserA</button>
            <button className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md">UserB</button>
            <button className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md">UserC</button>
            <button className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md">Tony</button>
          </div>
        </div>
        <div className="p-4 bg-gray-100">
          <div className="text-lg font-semibold mb-2 text-red-500">Offline</div>
          <div className="space-y-2">
            <button className="px-4 py-2 m-2 bg-red-500 text-white rounded-md">UserD</button>
            <button className="px-4 py-2 m-2 bg-red-500 text-white rounded-md">UserD</button>
          </div>
        </div>
        <div className="p-4 bg-gray-100">
          <div className="text-lg font-semibold mb-2 text-blue-500">Medical Leaves</div>
          <div className="space-y-2">
            <button className="px-4 py-2 m-2 bg-teal-500 text-white rounded-md">Chao</button>
            <button className="px-4 py-2 m-2 bg-teal-500 text-white rounded-md">Keng</button>
            <button className="px-4 py-2 m-2 bg-teal-500 text-white rounded-md">Jess</button>
            <button className="px-4 py-2 m-2 bg-teal-500 text-white rounded-md">NotHere</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
