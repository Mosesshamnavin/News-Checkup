import React from 'react';
import { Route, Navigate, RouteProps, Outlet } from 'react-router-dom';
import Authorization from "./helpers/Authorization";

interface PrivateRouteProps {
    element: React.ReactElement;
    // path: string
  }

const PrivateRoutes: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
    const isAuthenticated = Authorization.isLoggedIn();
  return isAuthenticated ? element : <Navigate to="/home" />;
};

export default PrivateRoutes;
