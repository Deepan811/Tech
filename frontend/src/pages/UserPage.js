import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Access user state

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); // Clear cart when logging out
    alert("You're logged out of your account.");
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="user-page-container">
      {user ? (
        <>
          <h1>Hi {user.name}, welcome to my website!</h1>
          <p>You're logged in. Now go to shopping:</p>
          <button className="user-btn" onClick={() => handleNavigate('/')}>
            Home Page
          </button>
          <p>Go to your Cart , For Purchase product</p>
        <button className="user-btn" onClick={() => handleNavigate('/cart')}>
          Cart-Page</button>
          <p>Want to logout?</p>
          <button className="user-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>Welcome to My E-Commerce Website!</h1>
          <p>Please login to access and purchase products.</p>
          <div className="button-group">
            <button
              className="user-btn"
              onClick={() => handleNavigate('/login')}
            >
              Login
            </button>
            <button
              className="user-btn"
              onClick={() => handleNavigate('/signup')}
            >
              Signup
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
