import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Jonathan",
      lastName: "Pang",
      email: "jonathan.pang@rosterize.com",
      department: "Finance",
      role: "Account Executive",
    },
    {
      firstName: "Priya",
      lastName: "Bandhan",
      email: "priya.bandhan@rosterize.com",
      department: "Human Resources",
      role: "HR Manager",
    },
    {
      firstName: "Tasha",
      lastName: "Franklin",
      email: "tasha.franklin@rosterize.com",
      department: "Sales",
      role: "Sales Executive",
    },
  ]);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
    phoneNumber: "",
  });

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      role: "",
      phoneNumber: "",
    });
  };

  const handleDeleteUser = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">
            User First Name:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          />

          <label className="block text-sm font-medium mb-1 mt-4">
            Email Address:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />

          <label className="block text-sm font-medium mb-1 mt-4">
            Department:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.department}
            onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            User Last Name:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          />

          <label className="block text-sm font-medium mb-1 mt-4">Role:</label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />

          <label className="block text-sm font-medium mb-1 mt-4">
            Phone Number:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.phoneNumber}
            onChange={(e) =>
              setNewUser({ ...newUser, phoneNumber: e.target.value })
            }
          />
        </div>
      </div>

      <button
        onClick={handleAddUser}
        className="bg-blue-700 text-white p-2 rounded w-full lg:w-1/4"
      >
        Add User
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Search User</h3>
        <input
          type="text"
          placeholder="To search or delete user, key in email"
          className="border p-2 rounded w-full"
        />

        <div className="mt-4">
          {users.map((user) => (
            <div
              key={user.email}
              className="flex justify-between items-center border p-2 rounded mb-2"
            >
              <div>
                <p className="text-sm">
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm">
                  <strong>Department:</strong> {user.department}
                </p>
                <p className="text-sm">
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.email)}
                className="text-red-500 text-xl"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
