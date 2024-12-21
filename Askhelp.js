import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Askhelp.css';

const Askhelp = () => {
  const [userId, setUserId] = useState(null);
  const [crop, setCrop] = useState('');
  const [irrigation, setIrrigation] = useState('surface');
  const [plastichouse, setPlastichouse] = useState(false);
  const [problem, setProblem] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log('No user_id found in localStorage');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('User not logged in. Please login first.');
      return;
    }

    const payload = {
      user_id: userId,
      crop,
      irrigation,
      plastichouse: plastichouse ? 'yes' : 'no',
      problem,
    };

    try {
      const response = await axios.post('http://localhost/practice1/Askhelp.php', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Help request sent successfully!');
      } else {
        alert(`Help request failed: ${response.data.message}`);
      }
    } catch (error) {
      alert('Error sending help request');
    }
  };

  return (
    <div className="askhelp-container">
      <Navbar />
      <div className="help-form-container">
        <form className="help-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="crop">Crop:</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              required
              placeholder="Crop..."
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={plastichouse}
              onChange={(e) => setPlastichouse(e.target.checked)}
            />
            <label htmlFor="plastic-house">Plastic House</label>
          </div>

          <div className="form-group">
            <label htmlFor="irrigation">Irrigation:</label>
            <select
              id="irrigation"
              name="irrigation"
              value={irrigation}
              onChange={(e) => setIrrigation(e.target.value)}
            >
              <option value="surface">Surface Irrigation</option>
              <option value="drip">Drip Irrigation</option>
              <option value="sprinkler">Sprinkler Irrigation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="problem">Problem:</label>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
              placeholder="Problem..."
            />
          </div>

          <button type="submit" className="submit-btn">Send Help</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Askhelp;
