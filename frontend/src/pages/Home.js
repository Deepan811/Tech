import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductList from '../components/product/ProductList';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return ( 
    <div>
      <h1>Home Page</h1>
      <ProductList products={products} />
      
    </div>
  );
};

export default Home;
