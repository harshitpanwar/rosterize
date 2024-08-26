import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-8">
    <h1 className="text-3xl font-bold mb-6">Company Admin</h1>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-yellow-100 p-4 rounded shadow text-center">
        <p className="text-6xl font-bold text-yellow-600">579</p>
        <p>Employee Counts</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow text-center">
        <p className="text-6xl font-bold text-blue-600">48</p>
        <p>Today - Employee On Leaves Counts</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow text-center">
        <p className="text-6xl font-bold text-red-600">18</p>
        <p>Today - Employee On MC Counts</p>
      </div>
    </div>
  </div>

  );
};

export default Dashboard;
