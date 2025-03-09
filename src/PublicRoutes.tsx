import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Authorization from "./helpers/Authorization";
interface PublicRouteProps {
  element: React.ReactElement;
//   path: string;
}

const PublicRoutes: React.FC<PublicRouteProps> = ({ element }) => {
  const isAuthenticated = Authorization.isLoggedIn();
  return isAuthenticated ? <Navigate to="/news-check" /> : element;
};

export default PublicRoutes;
