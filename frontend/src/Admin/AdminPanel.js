import React from 'react';
import { useSelector } from 'react-redux';
import ManageProducts from './ManageProducts';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !user.isAdmin) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <ManageProducts />
    </div>
  );
};

export default AdminPanel;
