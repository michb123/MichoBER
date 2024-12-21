import React from 'react';
import Hero1 from "./Hero1";
import Mission from "./Mission";
import History from "./History1";
import Contactus from "./Contactus";


const Aboutcontent1 = () => {
    return ( 
        <div className="about-page">
            <Hero1 />
         
            <Mission />
            <History />
            <Contactus />
        </div>
        
    );
}

export default Aboutcontent1; 