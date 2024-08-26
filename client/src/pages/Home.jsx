import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CompanyProfile from './CompanyProfile';
import Department from './Department'; // Example additional page
import Dashboard from './Dashboard';
import RoleManagement from './Roles';
import Billing from './Billing';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden flex items-center p-5 fixed">
        <button
          className="text-black p-2 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
            {sidebarOpen ? '✕' : '☰'}

        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-0 md:inset-auto w-64 bg-gray-800 text-white p-5 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:translate-x-0 z-20 md:z-auto`}
      >
        <nav className="">
        <div className="md:hidden flex items-center p-5 fixed right-0 top-0">
        <button
          className="text-white p-2 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
            {sidebarOpen ? '✕' : '☰'}

        </button>
      </div>

          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center space-x-2 text-white">
                <span>Home</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/profile" className="flex items-center space-x-2 text-white">
                <span>Company Profile</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/department" className="flex items-center space-x-2 text-white">
                <span>Department</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/roles" className="flex items-center space-x-2 text-white">
                <span>Role(s)</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/billing" className="flex items-center space-x-2 text-white">
                <span>Billing</span>
              </Link>
            </li>

          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path='/home' element={<Dashboard />} />
          <Route path="/profile" element={<CompanyProfile />} />
          <Route path="/department" element={<Department />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/billing" element={<Billing/>} />
          {/* Add more routes here */}
        </Routes>
      </main>
    </div>
  );
};

export default Home;
