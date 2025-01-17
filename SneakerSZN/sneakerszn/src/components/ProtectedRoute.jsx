import React, { useEffect, useState, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function ProtectedRoute({ children, requiredRole }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (AuthService.isAuthenticated()) {
        setIsAuthenticated(true);

        try {
          const roles = await AuthService.getUserRoles();
          setUserRoles(roles);
        } catch (error) {
          console.error('Failed to fetch roles:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <Suspense fallback={<div>Loading...</div>}></Suspense>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === "" || userRoles.includes(requiredRole)) {
    return children;
  }

  return <Navigate to="/" />;
}

export default ProtectedRoute;