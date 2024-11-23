import React from 'react';
import { Link } from 'react-router-dom';
 import { FaOpencart, FaRegCircleUser } from "react-icons/fa6";


const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">Cake-Shop</h1>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart"><FaOpencart className="cart"/></Link></li>
          <li><Link to="/user" ><FaRegCircleUser />User</Link></li>
          <li ><Link to="/admin" >Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
