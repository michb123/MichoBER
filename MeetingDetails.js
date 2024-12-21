import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import './MeetingDetails.css';

const MeetingDetails = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [meeting, setMeeting] = useState(null);

    useEffect(() => {
        const fetchMeetingDetails = async () => {
            try {
                const response = await axios.get(`http://localhost/practice1/GetMeetingDetails.php?id=${id}`);
                if (response.data.success) {
                    setMeeting(response.data.meeting);
                } else {
                    alert('Failed to fetch meeting details: ' + response.data.message);
                }
            } catch (error) {
                alert('Error fetching meeting details');
            }
        };

        fetchMeetingDetails();
    }, [id]);

    
    const handleAccept = async () => {
        const userId = localStorage.getItem('user_id');

        if (!userId) {
            alert("User ID is not available. Please log in again.");
            return;
        }

        const payload = { client_id: userId, meeting_id: id };

        try {
            const response = await axios.post(
                'http://localhost/practice1/AcceptMeeting.php',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.success) {
                alert(response.data.message);

               
                setMeeting(null); 
                navigate('/meeting'); 
            } else if (response.data.message === "Meeting already accepted.") {
                alert("This meeting has already been accepted.");
                navigate('/meeting'); 
            } else {
                alert("Failed to accept meeting: " + response.data.message);
            }
        } catch (error) {
            console.error("Error accepting meeting:", error);
            alert("Error accepting meeting.");
        }
    };

  
    const handleDelete = async () => {
        navigate('/meeting');
    };

    return (
        <div className="page-container">
            
            <div className="navbar-container">
                <Navbar />
            </div>

        
            <div className="main-content">
                <div className="cart-container">
                    {meeting ? (
                        <div className="cart-item">
                            <div className="cart-details">
                                <h3>{meeting.event_title}</h3>
                                <p><strong>Farmer:</strong> {meeting.farmer_name}</p>
                                <p><strong>Date:</strong> {meeting.start_date}</p>
                                <p><strong>Start Time:</strong> {meeting.start_time}</p>
                                <p><strong>End Time:</strong> {meeting.end_time}</p>
                                <p><strong>Location:</strong> {meeting.location}</p>
                            </div>
                            <div className="cart-actions">
                                <button className="accept-button" onClick={handleAccept}>Accept</button>
                                <button className="delete-button" onClick={handleDelete}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <p>Meeting accepted or no meeting details available.</p>
                    )}
                </div>
            </div>

            <div className="footer-container">
                <Footer />
            </div>
        </div>
    );
};

export default MeetingDetails;
