import React, { useState } from 'react';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    'Human Resource',
    'Finance',
    'Sales',
    'Marketing',
    'Information Technology',
    'Operations',
    'Legal',
    'Engineering',
    'Customer Support',
  ]);

  const [newDepartment, setNewDepartment] = useState('');

  const handleAddDepartment = () => {
    if (newDepartment.trim() !== '') {
      setDepartments([...departments, newDepartment]);
      setNewDepartment('');
    }
  };

  const handleDeleteDepartment = (index) => {
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Department Management</h2>
      <div className="mb-4">
        <label className="block font-bold mb-2">List Of Departments:</label>
        <ul className="border rounded-md p-2 max-h-40 overflow-y-auto">
          {departments.map((dept, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2"
            >
              <span>{dept}</span>
              <button
                className="text-red-500 hover:text-red-700 font-bold text-sm"
                onClick={() => handleDeleteDepartment(index)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Add New Department:</label>
        <input
          type="text"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          className="border rounded px-2 py-1 mt-2 w-full"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setNewDepartment('')}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddDepartment}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DepartmentManagement;
