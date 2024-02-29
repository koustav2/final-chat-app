/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children, redirectTo = '/login' }) => {

  if (!isAuthenticated) return <Navigate
    to={{
      pathname: redirectTo,
      state: { from: window.location.pathname }
    }}
    replace={true}
  />;

  return children ? children : <Outlet />
};

export default ProtectedRoute;

