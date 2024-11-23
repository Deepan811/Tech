import React from 'react';
import { useNavigate } from 'react-router-dom';


const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="cancel-container">
      <div className="cancel-icon">&#10008;</div> {/* Unicode for right cek*/}
      <h1 className="cancel-title">Your Order is Not Placed</h1>
      <p className="cancel-message">We’re sorry, something went wrong.</p>
      <button className="home-button" onClick={() => navigate('/')}>
        Go Back to Home Page
      </button>
    </div>
  );
};

export default CancelPage;
