import React from 'react';
import { Link } from 'react-router-dom';
import logo from './green-tree-leaf-ecology-free-vector-removebg-preview.png';


const NavbarFarmer = () => {
  return (
    <nav className="navbarrr">
          <div className="logo">
                <Link to="/adminhome">
                    <img src={logo} alt="Logo" /> 
                </Link>
            </div>
      <ul>
        <li>
          <Link to="/addproduct">Add Product </Link>
        </li>
        <li>
          <Link to="/makesale">Make Sale</Link>
        </li>
        <li>
              <Link to="/logout">Log out</Link>
            </li>
            
      </ul>
    </nav>
  );
};

export default NavbarFarmer;
