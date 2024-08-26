import React from 'react'

// Subscription Plans:
// Newbie Plan -> 1- 50 Users
// Veteran Plan -> 51 - 300 Users
// Basic Plan -> 301 - 600 Users
// Basic Plus Plan -> 601 - 1000 Users
// Enterprise Plan -> 1001 - 3000 Users
// Enterprise Plus Plan -> > 3000 Users

const plans = [
    {
        name: 'Newbie Plan',
        range: '1 - 50 Users',
        price: '$100/month'
    },
    {
        name: 'Veteran Plan',
        range: '51 - 300 Users',
        price: '$300/month'
    },
    {
        name: 'Basic Plan',
        range: '301 - 600 Users',
        price: '$500/month'
    },
    {
        name: 'Basic Plus Plan',
        range: '601 - 1000 Users',
        price: '$800/month'
    },
    {
        name: 'Enterprise Plan',
        range: '1001 - 3000 Users',
        price: '$1000/month'
    },
    {
        name: 'Enterprise Plus Plan',
        range: '> 3000 Users',
        price: '$1500/month'
    }
]

const Billing = () => {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Billing</h2>
        <div className="grid grid-cols-2 gap-4">
        
            <div>
                <label className="block text-sm font-medium text-gray-700">Current Plan</label>
                <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value="Newbie Plan"
                    disabled
                />
            </div>
                    
          <div>
            <label className="block text-sm font-medium text-gray-700">Industry:</label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Select Plan:</option>
                {plans.map((plan, index) => (
                    <option key={index}>{plan.name}</option>
                ))}
            </select>
          </div>
        </div>
    </div>
  )
}

export default Billing