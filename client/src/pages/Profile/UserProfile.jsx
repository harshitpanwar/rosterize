import React, { useState } from 'react';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { getUser, updateUser } from '../../api/User';
import Loader from '../../Components/Loader/Loader';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    role: '',
    department: '',
    employeeId: '',
  });

  const { authData } = useAuth();
  const queryClient = new QueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUser(authData._id),
    enabled: !!authData._id,    
    cacheTime: 0,
    retry: 0,
  });

  const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries('userData');
        },
        onError: (error) => {
        console.error('Update user failed:', error);
        }
    });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = () => {
    // Add logic to save changes

        const user = {
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            phoneNo: profile.phoneNumber,
            emergencyContactName: profile.emergencyContactName,
            emergencyContactNo: profile.emergencyContactNumber,
            role: profile.role,
            department: profile.department,
            employeeId: profile.employeeId,
        };

    

    updateUserMutation.mutate(authData._id, user);
    console.log('Changes Saved:', user);
  };

  const handleCancel = () => {
    // Add logic to reset or cancel changes
    setProfile({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      role: '',
      department: '',
      employeeId: '',
    });
  };


  if(data) console.log(data);

  if(isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-gray-100 p-6 rounded-md shadow">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={data.phoneNo}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="emergencyContactName">
              Emergency Contact Name:
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={data.emergencyContactName}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="emergencyContactNumber">
              Emergency Contact Number:
            </label>
            <input
              type="tel"
              name="emergencyContactNumber"
              value={data.emergencyContactNo}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Employment Details</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
              Role/Position:
            </label>
            <input
              type="text"
              name="role"
              value={data.companyRole.name}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="department">
              Department:
            </label>
            <input
              type="text"
              name="department"
              value={data.department.name}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="employeeId">
              Employee ID:
            </label>
            <input
              type="text"
              name="employeeId"
              value={data.employeeId}
              onChange={handleChange}
              className="block w-full bg-white border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>


      </div>
    </div>
  );
};

export default UserProfile;
