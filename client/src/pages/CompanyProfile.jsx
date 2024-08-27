import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCompany } from '../api/Company';
import { useAuth } from '../context/AuthContext';
import Loader from '../Components/Loader/Loader';

const CompanyProfile = () => {

  const {authData} = useAuth();
  console.log('authData:', authData);
  const { data, isLoading, error } = useQuery({
    queryKey: ['companyData'],
    queryFn: () => getCompany(authData.company),
    cacheTime: 0,
    retry: 0,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Company Profile</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name:</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data?.name || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">UEN Number:</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data?.UEN || ''}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Industry:</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data?.industry || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Address:</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data?.address || ''}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-6 mb-4">Contact Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data?.phone || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address:</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data?.email || ''}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website:</label>
            <input
              type="url"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={data?.website || ''}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
