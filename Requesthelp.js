import React, { useState, useEffect } from "react";
import axios from "axios";
import './RequestHelp.css'; 
import Footer from './Footer'; 
import NavbarFarmer from './NavbarFarmer';

const Requesthelp = () => {
    const [helpRequests, setHelpRequests] = useState([]);
    const [solutions, setSolutions] = useState({});
    const [error, setError] = useState(null);

    const fetchHelpRequests = async () => {
        try {
            const { data } = await axios.get("http://localhost/practice1/Requesthelp.php");
            if (data.success) {
                setHelpRequests(data.data);
                setError(null);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error("Error fetching help requests:", err);
            setError("Error fetching help requests");
        }
    };

    useEffect(() => {
        fetchHelpRequests();
    }, []);

    const handleSolutionChange = (id, value) => {
        setSolutions({ ...solutions, [id]: value });
    };

    const handleSubmit = async (id) => {
        const storedUserId = localStorage.getItem("user_id");
        if (!storedUserId) {
            alert("User not logged in");
            return;
        }

        const payload = {
            answer: solutions[id],
            help_id: id,
            user_id: storedUserId,
        };

        try {
            const response = await axios.post("http://localhost/practice1/Requesthelp.php", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                alert("Solution submitted successfully!");
                setSolutions({ ...solutions, [id]: "" });
                fetchHelpRequests();
            } else {
                alert(`Failed to submit solution: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error during solution submission:", error);
            alert("Error during solution submission");
        }
    };

    return (
        <>
            <NavbarFarmer />
            <div className="container">
                {error && <p className="error-message">{error}</p>}

                {helpRequests.length > 0 ? (
                    helpRequests.map((request) => (
                        <div key={request.id} className="card">
                            <div className="details-container">
                                <h3>Username: {request.user_name}</h3>
                                <p><strong>Crop:</strong> {request.crop}</p>
                                <p><strong>Irrigation System:</strong> {request.irrigation}</p>
                                <p><strong>Problem:</strong> {request.problem}</p>
                            </div>
                            <textarea
                                className="solution-input"
                                value={solutions[request.id] || ""}
                                onChange={(e) => handleSolutionChange(request.id, e.target.value)}
                                placeholder="Type your solution here..."
                            />
                            <button
                                className="send-btn"
                                onClick={() => handleSubmit(request.id)}
                            >
                                Send
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No help requests available</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Requesthelp;
