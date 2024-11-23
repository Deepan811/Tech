import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.items);
  const { token, user } = useSelector((state) => state.auth);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    countInStock: '',
    imageUrl: '',
  });

 

  useEffect(() => {
    if(!token) {
      navigate('login');
    }else{
      dispatch(fetchProducts());
    }
    
  }, [dispatch, navigate, token]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     

      await axios.post(
        '/api/products/create',
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchProducts());
      setNewProduct({ name: '', description: '', price: '', countInStock: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
        />
        <input
          type="number"
          name="countInStock"
          value={newProduct.countInStock}
          onChange={handleChange}
          placeholder="Count In Stock"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <button type="submit" className="add-product-btn">Add Product</button>
      </form>
      <ul className="product-list">
        {products
          .slice() // Create a shallow copy of the array
          .reverse() // Reverse the array to show the latest product first
          .map((product) => (
            <li key={product._id} className="product-item">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">${product.price}</p>
              <p className="product-stock">In Stock: {product.countInStock}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};


export default ManageProducts;
