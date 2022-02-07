import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  return auth ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />;
};

export default PrivateRoute;
