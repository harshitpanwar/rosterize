import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CompanyProfile from './CompanyProfile';
import Department from './Department'; // Example additional page
import CompanyDashboard from './Dashboard/CompanyDashboard';
import UserDashboard from './Dashboard/UserDashboard';
import ClockInOut from './ClockInOut';
import Schedule from './Schedule/UserSchedule';
import RoleManagement from './Roles';
import Billing from './Billing';
import { useAuth } from '../context/AuthContext';
import UserManagement from './UserManagement';
import SubmitReview from './SubmitReview';
import { HomeIcon, User, LogOut, Receipt, Calendar, Star, ChartNoAxesGantt, Settings, ChartPie, BriefcaseMedical } from 'lucide-react';
import ApplyLeave from './ApplyLeave';
import StatusPage from './Status';
import UserProfile from './Profile/UserProfile';

const roleToRoute = {
  superadmin: [
    {
      'path': '/profile',
      'component': <CompanyProfile />,
      'name': 'Company Profile'
    },
    {
      'path': '/department',
      'component': <Department />,
      'name': 'Department'
    },
    {
      'path': '/roles',
      'component': <RoleManagement />,
      'name': 'Role Management'
    },
    {
      'path': '/billing',
      'component': <Billing />,
      'name': 'Billing'
    }
  ],
  companyadmin: [
    {
      'path': '/',
      'component': <CompanyDashboard />,
      'name': 'Dashboard',
      'icon': <HomeIcon />
    },
    {
      'path': '/profile',
      'component': <CompanyProfile />,
      'name': 'Company Profile',
      'icon': <User />
    },
    {
      'path': '/department',
      'component': <Department />,
      'name': 'Department',
      'icon': <LogOut />
    },
    {
      'path': '/roles',
      'component': <RoleManagement />,
      'name': 'Role Management',
      'icon': <Settings />
    },
    {
      'path': '/billing',
      'component': <Billing />,
      'name': 'Billing',
      'icon': <Receipt />
    },
    {
      'path': '/users',
      'component': <UserManagement />,
      'name': 'User Management',
      'icon': <ChartNoAxesGantt />
    },
    {
      'path': '/review',
      'component': <SubmitReview />,
      'name': 'Submit Review',
      'icon': <Star />
    }

  ],
  departmenthead: [
    {
      'path': '/profile',
      'component': <CompanyProfile />,
      'name': 'Company Profile'
    },
    {
      'path': '/department',
      'component': <Department />,
      'name': 'Department'
    }
  ],
  user: [
    {
      'path': '/',
      'component': <UserDashboard />,
      'name': 'Dashboard',
      'icon': <HomeIcon />
    },
    {
      'path': '/profile',
      'component': <UserProfile />,
      'name': 'User Profile',
      'icon': <User />
    },
    {
      'path': '/clockinout',
      'component': <ClockInOut />,
      'name': 'Clock In/Out',
      'icon': <LogOut />
    },
    {
      'path': '/schedule',
      'component': <Schedule />,
      'name': 'Schedule',
      'icon': <Calendar />
    },
    {
      'path': '/leave',
      'component': <ApplyLeave />,
      'name': 'Apply Leave',
      'icon': <BriefcaseMedical />
    },
    {
      'path': '/status',
      'component': <StatusPage />,
      'name': 'Status',
      'icon': <ChartPie />
    },
    {
      'path': '/review',
      'component': <SubmitReview />,
      'name': 'Submit Review',
      'icon': <Star />
    }
  ]
}

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { authData, setAuth } = useAuth();

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
            {
              roleToRoute[authData?.role].map((route, index) => {
                return (
                  <li key={index} className="mb-4">
                    <Link to={route.path} className="flex items-center space-x-2 text-white">
                      <span className='flex flex-row gap-2'>{route.icon} {route.name}</span>
                    </Link>
                  </li>
                )
              })
            }
{/* 
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
            </li> */}

          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-auto">
        <Routes>
          {/* <Route path="/" element={<Dashboard/>} />
          <Route path='/home' element={<Dashboard />} />
          <Route path="/profile" element={<CompanyProfile />} />
          <Route path="/department" element={<Department />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/billing" element={<Billing/>} />
          <Route path="/users" element={<UserManagement />} />
          <Route path='/review' element={<SubmitReview />} /> */}
          {authData?.role &&
            roleToRoute[authData?.role].map((route, index) => {
              return (
                <Route key={index} path={route.path} element={route.component} />
              )
            })
          }
          {/* Add more routes here */}
        </Routes>
      </main>
    </div>
  );
};

export default Home;
