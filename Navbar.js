import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from './green-tree-leaf-ecology-free-vector-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/clienthome">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/askhelp">Ask Help</Link>
        </li>
        <li>
          <Link to="/displayproduct">Display Product</Link>
        </li>
        <li>
          <Link to="/sale">SALE</Link>
        </li>
        <li>
          <Link to="/userhelp">Notification</Link>
        </li>
        <li>
          <Link to="/meeting">New Meeting</Link>
        </li>
        <li>
          <Link to="/mymeeting">My Meeting</Link>
        </li>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li>
          <Link to="/logout">Log out</Link>
        </li>
        <li>
          <Link to="/Cartpage">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
