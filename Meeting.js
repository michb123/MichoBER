import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MeetingsCart.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        alert('User is not logged in. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost/practice1/GetMeetings.php?user_id=${userId}`
        );
        if (response.data.success) {
          setMeetings(response.data.meetings);
        } else {
          alert('Failed to fetch meetings: ' + response.data.message);
        }
      } catch (error) {
        alert('Error fetching meetings');
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="page-container">
      <div className="navbar-container">
        <Navbar />
      </div>
  
      <div className="main-content">
        <div className="cart-grid">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <div key={meeting.id} className="cart-item">
                <h3>{meeting.event_title}</h3>
                <button
                  className="view-button"
                  onClick={() => navigate(`/meeting-details/${meeting.id}`)}
                >
                  View Meeting
                </button>
              </div>
            ))
          ) : (
            <p>No meetings found.</p>
          )}
        </div>
      </div>
  
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
  
  
};

export default Meeting;
