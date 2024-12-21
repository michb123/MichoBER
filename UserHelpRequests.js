import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './UserHelpRequest.css';



const UserHelpRequests = () => {
    const [helpRequests, setHelpRequests] = useState([]);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('user_id');

    const fetchUserHelpRequests = async () => {
        try {
            const { data } = await axios.get(`http://localhost/practice1/UserHelpRequests.php?user_id=${userId}`);
            if (data.success) {
                setHelpRequests(data.data);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error fetching user help requests:', err);
            setError('Failed to load help requests');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserHelpRequests();
        } else {
            setError('User not logged in');
        }
    }, [userId]);

    return (
        <div>
          <Navbar />
      
{error && <p className="error-message">{error}</p>}

<div className="help-requests-container">
    {helpRequests.length > 0 ? (
        helpRequests.map((request, index) => (
            <div className="help-request-card" key={index}>
                <p><strong>Crop:</strong> {request.crop}</p>
                <p><strong>Irrigation:</strong> {request.irrigation}</p>
                <p><strong>Plastic House:</strong> {request.plastichouse}</p>
                <p><strong>Problem:</strong> {request.problem}</p>

                {request.answer ? (
                    <div className="solution-section">
                        <h4>Solution:</h4>
                        <p>{request.answer}</p>
                        {request.answered_by && (
                            <p><strong>Answered by:</strong> {request.answered_by}</p>
                        )}
                    </div>
                ) : (
                    <p className="no-solution">No solution provided yet</p>
                )}
            </div>
        ))
    ) : (
        <p className="no-requests">No help requests found</p>
    )}
</div>


            <Footer />
        </div>
    );
};

export default UserHelpRequests;
