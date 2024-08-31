import React, { useState, useEffect } from 'react';

const ApproveRejectLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);


  const handleApprove = (id) => {
    // Logic to approve the leave request
  };

  const handleReject = (id) => {
    // Logic to reject the leave request
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approve/Reject Leaves</h2>
      <div className="border p-4 bg-gray-50">
        <h3 className="font-semibold">Inbox:</h3>
        <ul>
          {leaveRequests.map((request) => (
            <li key={request._id} className="flex justify-between items-center p-2 border-b">
              <span>
                {request.date}: Leave Request - {request.userName} {request.startDate} - {request.endDate}
              </span>
              <div>
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded mr-2"
                  onClick={() => handleApprove(request._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => handleReject(request._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApproveRejectLeaves;
