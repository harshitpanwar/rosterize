import React from 'react'
import { useAuth } from '../context/AuthContext'

const Header = () => {

  const { authData, logout } = useAuth();
  console.log(authData);
  return (
    <div className="flex-1 p-1 bg-gray-800">
    <header className="flex flex-row justify-between items-center m-2">
      {/* <button
        className="sm:hidden text-gray-800"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button> */}
      <p className="text-sm text-white sm:text-xl">{authData?.role}</p>
      <div className="flex items-center">
        <span className="mr-4 text-white text-sm sm:text-md">{authData?.email}</span>
        <button className="bg-gray-700 text-white p-2 rounded"
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>
    </header>
  </div>

  )
}

export default Header