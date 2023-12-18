import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthenticatedRoute = ({ element, ...rest }) => {
  const { token } = useAuth();

    console.log(token);
    
  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

// const AuthenticatedRoute = ({ children }) => {
//     const { token } = useAuth();
  
//     if (!token) {
//       return <Navigate to="/" replace />;
//     }
  
//     return children;
//   };


export default AuthenticatedRoute;
