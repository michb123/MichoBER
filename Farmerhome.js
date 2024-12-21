import React from 'react';
import './FarmerHome.css';
import Footer from './Footer'; 
import NavbarFarmer from './NavbarFarmer';

const FarmerHome = () => {
  return (
    <div className="homee">
      <NavbarFarmer />
      
  
      <div className="hero-contentt">
        <h1>Hello Farmer</h1>
      </div>

      
      <Footer />
    </div>
  );
};

export default FarmerHome;
