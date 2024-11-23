import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
    alert("Product is Added to the cart");
  };
  

  return (
    <div className="pro-div">
      <h2 className="pro-h2">Products</h2>
      <ul className="pro-ul">
        {products.map((product) => (
          <li key={product._id} className="pro-li">
            <img src={product.imageUrl} alt={product.name} className="pro-img" />
            <h3 className="pro-h3">{product.name}</h3>
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
