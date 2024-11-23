import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice'; 

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return <p className="no-items">No items in your cart to checkout.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(clearCart());
      
      navigate('/success');
    } catch (error) {
      navigate('/cancel');
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-cart">
        {cart.map((item) => (
          <div key={item.productId} className="checkout-item">
            <img src={item.imageUrl} alt={item.name} className="checkout-item-img" />
            <div>
              <h2>{item.name}</h2>
              <h3>Price: ${item.price}</h3>
              <p>Quantity: {item.quantity}</p>
              <h3>Total Price: ${item.quantity * item.price}</h3>
            </div>
          </div>
        ))}
      </div>
      <h3 className="checkout-total">Total Amount: ${totalAmount}</h3>
      <h2 className="checkout-subtitle">Enter Address Details</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" id="name" placeholder="Enter your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="doorNo">Door No / Building Name</label>
          <input type="text" name="doorNo" id="doorNo" placeholder="Enter your door number/building name" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Street Address</label>
          <input type="text" name="address" id="address" placeholder="Enter your street address" required />
        </div>
        <div className="form-group">
          <label htmlFor="contactNo">Contact Number</label>
          <input type="text" name="contactNo" id="contactNo" placeholder="Enter your contact number" required />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input type="text" name="pincode" id="pincode" placeholder="Enter your pincode" required />
        </div>
        <div>
          <button className="confirm-button" type="submit">Confirm and Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
