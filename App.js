import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AdminHome from './AdminHome';
import Clienthome from './Clienthome';
import Farmerhome from './Farmerhome';
import DisplayProduct from './DisplayProduct';
import Askhelp from './Askhelp';
import Sale from './Sale';
import CreateMeeting from './CreateMeeting';
import Requesthelp from './Requesthelp';
import AddProduct from './Addproduct';
import Makesale from './Makesale';
import UserHelpRequests from './UserHelpRequests';
import Meeting from './Meeting';
import MeetingDetails from './MeetingDetails';
import MyMeeting from './MyMeeting';
import AboutUs from './AboutUs';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import ShoppingCart from './ShoppingCart'; // Import ShoppingCart component

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/clienthome" element={<PrivateRoute><Clienthome /></PrivateRoute>} />
        <Route path="/farmerhome" element={<PrivateRoute><Farmerhome /></PrivateRoute>} />
        <Route path="/adminhome" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
        <Route path="/displayproduct" element={<PrivateRoute><DisplayProduct /></PrivateRoute>} />
        <Route path="/askhelp" element={<PrivateRoute><Askhelp /></PrivateRoute>} />
        <Route path="/sale" element={<PrivateRoute><Sale /></PrivateRoute>} />
        <Route path="/createmmeting" element={<PrivateRoute><CreateMeeting /></PrivateRoute>} />
        <Route path="/requesthelp" element={<PrivateRoute><Requesthelp /></PrivateRoute>} />
        <Route path="/addproduct" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/makesale" element={<PrivateRoute><Makesale /></PrivateRoute>} />
        <Route path="/userhelp" element={<PrivateRoute><UserHelpRequests /></PrivateRoute>} />
        <Route path="/meeting" element={<PrivateRoute><Meeting /></PrivateRoute>} />
        <Route path="/meeting-details/:id" element={<PrivateRoute><MeetingDetails /></PrivateRoute>} />
        <Route path="/mymeeting" element={<PrivateRoute><MyMeeting /></PrivateRoute>} />
        <Route path="/aboutus" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
        <Route path="/logout" element={<Logout />} />

        {/* Add route for Cartpage */}
        <Route path="/Cartpage" element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;
