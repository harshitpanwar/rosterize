import React, { useState } from 'react';

const RoleManagement = () => {
    const [roles, setRoles] = useState([
        'HR Manager',
        'Recruiter',
        'HRBP',
        'Payroll Specialist',
        'Chief Financial Officer',
        'Accountant',
        'Finance Executive',
        'Sales Manager',
        'Account Executive',
    ]);

    const [newRole, setNewRole] = useState('');

    const addRole = () => {
        if (newRole.trim() !== '' && !roles.includes(newRole)) {
            setRoles([...roles, newRole]);
            setNewRole('');
        }
    };

    const removeRole = (index) => {
        const updatedRoles = roles.filter((_, i) => i !== index);
        setRoles(updatedRoles);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Role Management</h2>
            <div className="mb-4">
                <label className="block font-bold mb-2">List of Roles:</label>
                <ul className="border rounded-md p-2 max-h-40 overflow-y-auto">
                    {roles.map((role, index) => (
                        <li key={index} className="flex justify-between items-center mb-2">
                            {role}
                            <button
                                onClick={() => removeRole(index)}
                                className="text-red-500 hover:text-red-700 font-bold text-sm"
                            >
                                x
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <label className="block font-bold mb-2">Add New Role:</label>
                <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
            </div>
            <div className="flex justify-end">
                <button
                    onClick={addRole}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2"
                >
                    Save Changes
                </button>
                <button
                    onClick={() => setNewRole('')}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RoleManagement;
