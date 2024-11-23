import React from 'react';
import { useNavigate } from 'react-router-dom';


const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-icon">&#10003;</div> {/* Unicode checkmark */}
      <h1 className="success-title">Your Order is Placed!</h1>
      <p className="success-message">Thank you for shopping with us.</p>
      <button className="home-button" onClick={() => navigate('/')}>
        Go Back to Home Page
      </button>
    </div>
  );
};

export default SuccessPage;
