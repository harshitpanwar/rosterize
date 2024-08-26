import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader/Loader.jsx';

const ProtectedRoute = ({
  children
}) => {

  const {authData, loading} = useAuth();

  if(loading) return <Loader/>

  if (!authData?.email) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
