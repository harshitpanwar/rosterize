import React, { useState } from 'react';

const ClockInOut = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  const handleClockIn = () => {
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Clock In/Out</h1>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md w-full md:w-1/2">
        <div className={`text-center p-4 border-2 ${isClockedIn ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
          {isClockedIn ? 'Clocked In' : 'Clocked Out'}
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex flex-col items-start">
            <label className="mb-2">Shift Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              disabled={isClockedIn}
            />
          </div>

          <div className="flex flex-col items-start">
            <label className="mb-2">Shift End Time:</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              disabled={!isClockedIn}
            />
          </div>
        </div>

        <div className="mt-6">
          {!isClockedIn ? (
            <button
              onClick={handleClockIn}
              className="w-full bg-blue-900 text-white py-2 px-4 rounded shadow"
            >
              Clock In
            </button>
          ) : (
            <button
              onClick={handleClockOut}
              className="w-full bg-blue-900 text-white py-2 px-4 rounded shadow"
            >
              Clock Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;
