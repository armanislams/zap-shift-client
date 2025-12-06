import React from 'react';
import Loader from '../components/Loader';
import useRole from '../hooks/useRole';
import Unauthorized from '../pages/Errors/Unauthorized';
import useAuth from '../hooks/UseAuth';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth()
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loader />;
  }

  if (role !== 'admin' && role !== 'super-admin') {
    return <Unauthorized />
  }
  return children
};

export default AdminRoute;