import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, fetchCart, removeFromCart, updateQuantity, checkout } from '../redux/cartSlice';
import { AiOutlineDelete } from "react-icons/ai";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [updatedQuantity, setUpdatedQuantity] = useState({});

  useEffect(() => {
    
    dispatch(fetchCart());
    
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart()).then(() => {
      dispatch(fetchCart()); // again fetch the cart
    });
  };

  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId));  // Dispatch the removeFromCart action
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // atlst 1 in the quantity
    if (newQuantity < 1) {
      setUpdatedQuantity((prev) => ({ ...prev, [productId]: 1 }));
      return;
    }

    setUpdatedQuantity((prev) => ({ ...prev, [productId]: newQuantity }));
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };
  const handleBuy = async () => {
    if (!user) {
      alert('Please login if already a user or sign in to become one');
      return navigate('/login'); 
    }
    await dispatch(checkout());
    navigate('/checkout'); 
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const cartItems = Array.isArray(items) ? items : [];
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <button className="c-b1" onClick={handleClearCart}>Clear Cart</button>
      <button className="c-b2" onClick={() => navigate('/checkout')}>Check-Out</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => {
              const quantity = updatedQuantity[item.productId] || item.quantity;
              const totalPrice = quantity * item.price;

              return (
                <li key={item.productId} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-img" />
                  <div>
                    <h3>{item.name}</h3>
                    <p className="price">Price: ${item.price}</p>
                    {/* Input field for quantity */}
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                      min="1"
                    />
                    <p>Quantity: {quantity}</p>
                    <AiOutlineDelete onClick={() => handleDelete(item.productId)} className="logo1" />
                    {/* Display total price */}
                    <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
                    
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-actions">
            <button className="c-b3" onClick={handleBuy}>Buy Now</button>
          </div>
        </div>
          
      )}
    </div>
  );
};

export default CartPage;
