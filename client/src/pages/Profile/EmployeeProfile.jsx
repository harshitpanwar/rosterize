import React, { useState } from 'react';

const UserPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      name: 'Tasha Franklin',
      email: 'tasha.franklin@rosterize.com',
      department: 'Sales',
      role: 'Sales Executive',
      phoneNumber: '+6598765678',
      emergencyContact: 'mitch@rosterize.com',
      employeeID: 'S123',
    },
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Marketing',
        role: 'Marketing Manager',
        phoneNumber: '+1234567890',
        emergencyContact: 'jane.doe@example.com',
        employeeID: 'M123',
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'HR',
        role: 'HR Manager',
        phoneNumber: '+9876543210',
        emergencyContact: 'john.smith@example.com',
        employeeID: 'H123',
    },
    {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        department: 'Finance',
        role: 'Financial Analyst',
        phoneNumber: '+2468135790',
        emergencyContact: 'sarah.johnson@example.com',
        employeeID: 'F123',
    },
    {
        name: 'Sarah Thompson',
        email: 'sarah.thompson@example.com',
        department: 'Operations',
        role: 'Operations Manager',
        phoneNumber: '+1357924680',
        emergencyContact: 'michael.thompson@example.com',
        employeeID: 'O123',
    },
    {
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        department: 'IT',
        role: 'IT Manager',
        phoneNumber: '+3698521470',
        emergencyContact: 'lisa.brown@example.com',
        employeeID: 'I123',
    },
  ];

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Handle the update logic here
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      {/* Search Menu */}

        <div className="w-full p-4">
            <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full mb-4"
            />
        </div>

      {/* User Cards */}

        <div className='flex flex-row md:flex-col-reverse'>

            <div className="flex flex-wrap md:w-1/3 p-4">
                {filteredUsers.map((user, index) => (
                <div
                    key={index}
                    className="border rounded-lg p-4 m-2 cursor-pointer"
                    onClick={() => handleCardClick(user)}
                >
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Department:</strong> {user.department}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
                ))}
            </div>

            {/* User Details Form */}
            {selectedUser && (
                <div className="md:w-2/3 p-4">
                <h2 className="text-lg font-bold">Employee Profile</h2>
                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={selectedUser.name.split(' ')[0]} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={selectedUser.name.split(' ')[1]} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={selectedUser.email} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="text" value={selectedUser.phoneNumber} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label>Emergency Contact Name:</label>
                        <input type="email" value={selectedUser.emergencyContact} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label>Role/Position:</label>
                        <input type="text" value={selectedUser.role} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label>Employee ID:</label>
                        <input type="text" value={selectedUser.employeeID} className="border p-2 w-full" />
                    </div>
                    <div>
                        <label>Department:</label>
                        <input type="text" value={selectedUser.department} className="border p-2 w-full" />
                    </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Update</button>
                </form>
                </div>
            )}
        </div>
    </div>

  );
};

export default UserPage;
