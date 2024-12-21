import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [namee, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            namee,
            email,
            password,
            role,
        };

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        try {
            const response = await axios.post('http://localhost/practice1/Register.php', payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            if (response.data.success) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert(`Registration failed: ${response.data.message}`);
            }
        } catch (error) {
            alert('Error during registration');
        }
    }        
    return (
        <div className='register-content'>
            <div className="register-container">
                <div className="register-form">
                    <p className="register-message">Register Here!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="register-form-group">
                            <input
                                type="text"
                                value={namee}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Name"
                            />
                            <br />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email"
                            />
                        </div>
                        <div className="register-form-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                            />
                            <br />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Confirm Password"
                            />
                            <select
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                required
                            >
                                <option value="admin">Admin</option>
                                <option value="farmer">Farmer</option>
                                <option value="client">Client</option>
                            </select>
                        </div>

                        <button type="submit" className="register-button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
