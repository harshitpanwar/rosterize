import React, { useState } from 'react';

const Schedule = () => {
  const [selectedMonth, setSelectedMonth] = useState('');

  // Dummy data for the schedule
  const scheduleData = [
    { day: '1', status: '0800 - 1700' },
    { day: '2', status: 'OFF' },
    { day: '3', status: 'OFF' },
    { day: '4', status: '0800 - 1700' },
    { day: '5', status: '0800 - 1700' },
    { day: '6', status: '0800 - 1700' },
    { day: '7', status: '0800 - 1700' },
    { day: '8', status: 'OFF' },
    { day: '9', status: '0800 - 1700' },
    { day: '10', status: '0800 - 1700' },
    { day: '11', status: 'OFF' },
    { day: '12', status: '0800 - 1700' },
    { day: '13', status: '0800 - 1700' },
    { day: '14', status: '0800 - 1700' },
    { day: '15', status: '0800 - 1700' },
    { day: '16', status: '0800 - 1700' },
    { day: '17', status: 'OFF' },
    { day: '18', status: '0800 - 1700' },
    { day: '19', status: 'OFF' },
    { day: '20', status: '0800 - 1700' },
    { day: '21', status: '0800 - 1700' },
    { day: '22', status: '0800 - 1700' },
    { day: '23', status: 'OFF' },
    { day: '24', status: '0800 - 1700' },
    { day: '25', status: 'OFF' },
    { day: '26', status: 'AL' },
    { day: '27', status: 'AL' },
    { day: '28', status: 'AL' },
  ];

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Schedule</h1>

      <div className="flex items-center mb-6">
        <label className="mr-4">Select Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>Select month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          {/* Add more months as needed */}
        </select>
        <button className="ml-4 bg-blue-900 text-white py-2 px-4 rounded shadow">
          Download
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}

        {scheduleData.map((entry, index) => (
          <div
            key={index}
            className={`text-center p-4 border ${
              entry.status === 'OFF'
                ? 'border-red-500 text-red-500'
                : entry.status === 'AL'
                ? 'border-teal-500 text-teal-500'
                : 'border-gray-500 text-gray-900'
            }`}
          >
            <div>{entry.day}</div>
            <div>{entry.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
