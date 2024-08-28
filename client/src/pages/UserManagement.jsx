import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listDepartments } from "../api/Department";
import { listRoles } from "../api/Role";

import { useAuth } from "../context/AuthContext";
import Loader from "../Components/Loader/Loader";
import { listUsers, createUser, deleteUser } from "../api/User";

const UserManagement = () => {

  const { authData } = useAuth();
  const queryClient = useQueryClient();

  const { data: departments, isLoading: loadingDepartments, error: errorDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => listDepartments(authData.company),
    enabled: !!authData.company,
    retry: 0,
  });

  const { data: roles, isLoading: loadingRoles, error: errorRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => listRoles(authData.company),
    enabled: !!authData.company,
    retry: 0,
  });

  const {data: users, isLoading: loadingUsers, error: errorUsers} = useQuery({
    queryKey: ['users'],
    queryFn: () => listUsers(authData.company),
    enabled: !!authData.company,
    retry: 0,
  });
  
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {
      console.error('Add user failed:', error);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries('users');
    },
    onError: (error) => {
      console.error('Delete user failed:', error);
    },
  });
  

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    companyRole: "",
    phoneNumber: "",
    role: "",
  });

  const handleAddUser = () => {
    console.log(newUser);
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.department || !newUser.companyRole || !newUser.phoneNumber || !newUser.role) {
      return alert("All fields are required");
    }
    createUserMutation.mutate({ ...newUser, company: authData.company });
    
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      role: "",
      phoneNumber: "",
      companyRole: "",
    });
  };

  const handleDeleteUser = (userId) => {
    // setUsers(users.filter((user) => user.email !== email));
    deleteUserMutation.mutate(userId);
  };

  if (loadingDepartments || loadingRoles) return <Loader />;

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
            required
          />

          <label className="block text-sm font-medium mb-1 mt-4">
            Email Address:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />

          <label className="block text-sm font-medium mb-1 mt-4">
            Department:
          </label>
          <select 
          className="border p-2 rounded w-full" 
          required 
          value={newUser.department}
          onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}>
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            User Last Name:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            required
          />

          <label className="block text-sm font-medium mb-1 mt-4">Role:</label>
          <select 
          className="border p-2 rounded w-full" 
          value={newUser.companyRole} 
          onChange={(e) => setNewUser({ ...newUser, companyRole: e.target.value })}
          required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-1 mt-4">
            Phone Number:
          </label>
          <input
            className="border p-2 rounded w-full"
            value={newUser.phoneNumber}
            onChange={(e) =>
              setNewUser({ ...newUser, phoneNumber: e.target.value })
            }
            required
          />
          <label className="block text-sm font-medium mb-1 mt-4">
            Department Head:
          </label>
          <select 
          className="border p-2 rounded w-full"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
          >
            <option value="">Select Department Head</option>
            <option value="departmenthead">Yes</option>
            <option value="user">No</option>
          </select>

        </div>
      </div>

      <button
        onClick={handleAddUser}
        className="bg-blue-700 text-white p-2 rounded w-full lg:w-1/4"
      >
        Add User
      </button>

      {
        users?.length === 0? <p className="text-center mt-4">No users found</p>:
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Search User</h3>
          <input
            type="text"
            placeholder="To search or delete user, key in email"
            className="border p-2 rounded w-full"
          />

          <div className="mt-4">
            {users?.map((user) => (
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
                    <strong>Department:</strong> {user?.department?.name}
                  </p>
                  <p className="text-sm">
                    <strong>Role:</strong> {user?.companyRole?.name}
                  </p>
                </div>
                {
                  user.role == 'user' &&
                  <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 text-xl"
                  >
                    &times;
                  </button>
                }

              </div>
            ))}
          </div>
        </div>
      }

    </div>
  );
};

export default UserManagement;
