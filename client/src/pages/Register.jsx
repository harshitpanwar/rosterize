// src/pages/Register.jsx
import { useNavigate } from 'react-router-dom';
import companyLogo from '../assets/rosterize.png'

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="text-center mb-6">
          <img src={companyLogo} height='60px' width='60px' alt="Logo" className="mx-auto" />
          <h1 className="text-2xl font-bold">Register</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="input" />
          <input type="text" placeholder="Company" className="input" />
          <input type="email" placeholder="Email" className="input" />
          <input type="text" placeholder="Mobile Number" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <input type="password" placeholder="Confirm Password" className="input" />
          <input type="text" placeholder="Role/Position" className="input" />
          <input type="text" placeholder="UEN" className="input" />
          <input type="number" placeholder="No. of Employees" className="input" />
          <input type="text" placeholder="Industry" className="input" />
          <textarea placeholder="Message" className="col-span-2 input"></textarea>
        </div>
        <div className="flex justify-between mt-6">
          <button type="button" className="btn bg-gray-700 text-white" onClick={() => navigate(-1)}>Back</button>
          <button type="submit" className="btn bg-blue-600 text-white">Submit</button>
        </div>
      </form>
    </div>
  );
}
