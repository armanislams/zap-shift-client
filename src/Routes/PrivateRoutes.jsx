import React from 'react';
import useAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return (
          <div className='w-full h-[100vw] mx-auto'>
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        );
    }
    if (!user) {
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoutes;