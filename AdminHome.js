import React from 'react';
import './AdminHome.css';
import Footer from './Footer'; 
import NavbarAdmin from './NavbarAdmin'; 

const AdminHome = () => {
  return (
    <div className="homeee">
      <NavbarAdmin />
      
     
      <div className="hero-contenttt">
        <h1>Hello Admin</h1>
      </div>

   
      <Footer />
    </div>
  );
};

export default AdminHome;
