import React, { useEffect, useState } from "react";
import './css/login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Spinner from "./Spinner";
function Register({ url,user, setUser }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(url +'/register', { name, username, password, mobile }, { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
                navigate("/");
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    }

    return (
        <div className="main-container">
            <form onSubmit={handleSubmit} method="post" className="form-container">
                <h2 className="loginheader">Register</h2>
                <label>Name:</label>
                <input 
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
                <label>Email:</label>
                <input 
                    type="email"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
                <label>Password:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <label>Mobile:</label>
                <input 
                    type="tel"
                    maxLength={10}
                    autoComplete="off"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required 
                />
                <button type="submit">Register</button>
                <div className="lowerprompt">Already have an account? <a href="/register">Login</a></div>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default Register;
