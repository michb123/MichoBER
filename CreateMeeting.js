import React, { useState } from 'react';
import axios from 'axios';
import './CreateMeeting.css';
import Footer from './Footer'; 
import NavbarFarmer from './NavbarFarmer';

const CreateMeeting = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const farmerId = localStorage.getItem('user_id');
    if (!farmerId) {
      alert("Error: Farmer ID not found. Please log in again.");
      return;
    }

    const payload = {
      farmerId,
      eventTitle,
      startDate,
      startTime,
      endTime,
      location,
    };

    try {
      const response = await axios.post('http://localhost/practice1/CreateMeeting.php', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Meeting created successfully!');
      } else {
        alert(`Failed to create meeting: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert('Error during meeting creation.');
    }
  };

  return (
    <>
      <NavbarFarmer />
      <div className="meeting-container" style={{ textAlign: 'left' }}>
        <h2>Create New Meeting</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="event-title">Event Title</label>
          <input
            type="text"
            id="event-title"
            placeholder="Event title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />

          <label>Date</label>
          <input
            type="date"
            style={{ width: '150px' }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label>Start Time</label>
          <input
            type="time"
            style={{ width: '147px' }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <label>End Time</label>
          <input
            type="time"
            style={{ width: '147px' }}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <button type="submit">Create Meeting</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateMeeting;
