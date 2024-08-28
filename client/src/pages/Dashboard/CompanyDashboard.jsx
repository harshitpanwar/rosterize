import React from 'react';

const CompanyDashboard = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Company Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-100 border-l-4 border-yellow-500 text-center">
          <p className="text-4xl text-yellow-600">579</p>
          <p className="text-gray-700">Employee Counts</p>
        </div>
        <div className="p-4 bg-gray-100 border-l-4 border-blue-500 text-center">
          <p className="text-4xl text-blue-600">48</p>
          <p className="text-gray-700">Today - Employee On Leaves Counts</p>
        </div>
        <div className="p-4 bg-gray-100 border-l-4 border-red-500 text-center">
          <p className="text-4xl text-red-600">18</p>
          <p className="text-gray-700">Today - Employee On MC Counts</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
