import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './css/navbar.css';
import axios from "axios";

function Navbar({ url, user, setUser }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate=useNavigate();
    function handleLogout() {
        axios.get(url + '/logout', { withCredentials: true })
            .then(response => {
                alert("Logged out successfully");
                setUser(null);
                setIsNavOpen(false);
                navigate('/');
            })
            .catch(error => {
                console.error("Error during logout", error);
            });
    }

    function toggleNavbar() {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div>
            <nav>
                <p className="headername">Sathish's Public Blog</p>
                <div className="toggle-button" onClick={toggleNavbar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`nav-comp ${isNavOpen ? 'active' : ''}`}>
                    <a href="/" className="nav-element">HOME</a>
                    <a href="/about" className="nav-element">ABOUT US</a>
                    <a href="/contact" className="nav-element">CONTACT</a>
                    <a href="/compose" className="nav-element">COMPOSE</a>
                    {user ?
                        <div className="navbar-username">
                            {user.name}
                            <img src="/prof.png" alt="" className="profile-pic" />
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                        :
                        <div className="login">
                            <a href="/login" className="nav-element">LOGIN</a>
                            <a href="/register" className="nav-element">REGISTER</a>
                        </div>}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
