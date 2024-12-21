import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('role');

    if (isAuthenticated) {
      if (role === 'admin') navigate('/adminhome');
      else if (role === 'farmer') navigate('/farmerhome');
      else if (role === 'client') navigate('/clienthome');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost/practice1/Login.php', { email, password });

      if (response.data.role) {
        const { role, user_id } = response.data;

       
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('role', role);

     
        if (role === 'admin') {
          navigate('/adminhome');
        } else if (role === 'farmer') {
          navigate('/farmerhome');
        } else if (role === 'client') {
          navigate('/clienthome');
        }
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container-login">
      <form onSubmit={handleSubmit} className="login-form">
        <p>Login</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}

 
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
