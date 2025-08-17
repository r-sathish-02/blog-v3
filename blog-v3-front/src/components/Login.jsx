import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/login.css';
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
function Login({ url, user, setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(url + '/login', { username, password }, { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
                navigate("/");
            })
            .catch(() => {
                setError("Invalid Credentials, Try Again");
            });
    }
    return (
        <div className="main-container">
            <form onSubmit={handleSubmit} method="post" className="form-container">
                <h2 className="loginheader">Login</h2>
                <label>Email:</label>
                <input
                    type="email"
                    name="username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <div className="lowerprompt">Don't have an account? <a href="/register">Register Now</a></div>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default Login;
