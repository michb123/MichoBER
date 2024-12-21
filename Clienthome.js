import React from 'react';
import './Clienthome.css';
import Footer from './Footer'; 
import Navbar from './Navbar';

const Clienthome = () => {
  return (
    <div className="home">
      <Navbar />
      
    
      <div className="hero-content">
        <h1>Hello Client</h1>
      </div>

     
      <Footer />
    </div>
  );
};

export default Clienthome;
