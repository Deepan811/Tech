  import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import UserPage from './pages/UserPage';
import Header from './components/Layout/Header';
import "./Header.css";
import "./Product.css"
import "./CartPage.css"
import "./UserPage.css"
import "./LoginPage.css"
import"./SignupPage.css"
import "./ManageProduct.css"
import "./CheckoutPage.css"
import "./SuccessPage.css"
import "./CancelPage.css"

const App = () => {
  return (
  <div>
    <Provider store={store}>
    
      <Header /> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/logout" element={<LogoutPage />} /> 
        <Route path="/signup" element={<SignupPage />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/user" element={<UserPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/admin" element={<AdminPage />} /> 
      </Routes> 
    
    </Provider>
    </div>
  );
};   
 
export default App;
