import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from './green-tree-leaf-ecology-free-vector-removebg-preview.png';


const NavbarFarmer = () => {
  return (
    <nav className="navbarr">
          <div className="logo">
                <Link to="/farmerhome">
                    <img src={logo} alt="Logo" /> 
                </Link>
            </div>
      <ul>
        <li>
          <Link to="/requesthelp"> Request Help </Link>
        </li>
        <li>
          <Link to="/createmmeting">Create Meeting</Link>
        </li>
            <li>
                  <Link to="/logout">Log out</Link>
                </li>
                
    
      </ul>
    </nav>
  );
};

export default NavbarFarmer;
