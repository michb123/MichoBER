import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import './MyMeeting.css'; 

const MyMeeting = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchAcceptedMeetings = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        alert('User is not logged in. Please log in again.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost/practice1/GetAcceptedMeetings.php?user_id=${userId}`);
        if (response.data.success) {
          setMeetings(response.data.meetings);
        } else {
          alert('Failed to fetch your meetings: ' + response.data.message);
        }
      } catch (error) {
        alert('Error fetching your meetings.');
      }
    };

    fetchAcceptedMeetings();
  }, []);

  return (
    <div>
  <Navbar />


  <div className="cart-grid">
    {meetings.length > 0 ? (
      meetings.map((meeting) => (
        <div key={meeting.id} className="cart-item">
          <div className="cart-details">
            <h3>{meeting.event_title}</h3>
            <p><strong>Date:</strong> {meeting.start_date}</p>
            <p><strong>Time:</strong> {meeting.start_time} - {meeting.end_time}</p>
            <p><strong>Location:</strong> {meeting.location}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No meetings found.</p>
    )}
  </div>

  <Footer />
</div>

  );
};

export default MyMeeting;
