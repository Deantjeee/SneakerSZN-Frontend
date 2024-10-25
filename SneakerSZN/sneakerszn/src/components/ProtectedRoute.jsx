import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function ProtectedRoute({ children, requiredRole }) {
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (AuthService.isAuthenticated()) {
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
    return null; 
  }

  if (userRoles.includes(requiredRole)) {
    return children;
  } else {
    return <Navigate to="/login" />; 
  }
}

export default ProtectedRoute;
