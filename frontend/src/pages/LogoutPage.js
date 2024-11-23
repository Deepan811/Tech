import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); // Clear the cart
    alert("You're logged out of your account.");
    navigate('/user'); // Redirect to user after logout
  };

  return (
    <div className="user-page-container">
      <h1>Hi {user?.name}, welcome to my website</h1>
      <p>You're logged in, now go to shopping:</p>
      <button className="user-btn" onClick={() => navigate('/')}>Home Page</button>
      <p>Go to your Cart , For Purchase product</p>
      <button className="user-btn" onClick={() => navigate('/cart')}>Cart-Page</button>
      <p>Want to logout?</p>
      <button  className="user-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutPage;
