import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAccount.css';
import img from './user2.png';

function UserAccount({ onLogout }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('token') ? true : false;
        setIsLoggedIn(loggedInStatus);

        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || '');
    }, []);

    const handleLogin = () => {
        if (isLoggedIn) {
            alert('Already logged in');
        } else {
            navigate('/login'); 
        }
    };

    const handleLogout = () => {
        onLogout();
    };

    const handleUserIconClick = () => {
        if (isLoggedIn) {
            navigate('/user-account'); 
        } else {
            navigate('/login'); 
        }
    };

    const handleAccountSettings = () => {
        navigate('/account-management');
    };

    return (
        <div className="pqrst-profile-page-container">
            <nav className="pqrst-navbar">
                <div className="pqrst-logo">BookTrains</div>
                <div className="pqrst-navbar-links">
                    <a href="/home" className="pqrst-navbar-link">Home</a>
                    <a href="/about-us" className="pqrst-navbar-link">About Us</a>
                    <a href="/contact" className="pqrst-navbar-link">Contact</a>
                    <a href="/notifications" className="pqrst-navbar-link">Notification</a>
                    <a className='navbar-link' onClick={handleUserIconClick}>
                        <img src={img} alt="User Icon" className="navbar-img" />
                    </a>
                </div>
            </nav>

            <div className="pqrst-profile-container">
                <div className="pqrst-profile-card">
                    <div className="text-center">
                        <img src={img} width="100" className="rounded-circle" alt="Profile" />
                    </div>
                    <div className="text-center mt-3">
                        <h5 className="mt-2 mb-0">{username || 'Guest'}</h5>
                    </div>
                    <div className="pqrst-recent-trips">
                        <h3>Recent Trips</h3>
                        <ul>
                            <li>Chennai to Coimbatore</li>
                            <li>Coimbatore to Tirupur</li>
                        </ul>
                    </div>
                    <div className="pqrst-no-updates">
                        <p>No updates, see you soon.</p>
                    </div>
                </div>
            </div>

            <div className="pqrst-button-container">
                <button onClick={handleLogin} className="pqrst-button">Login</button>
                <button onClick={handleAccountSettings} className="pqrst-button">Account Settings</button>
                <button onClick={handleLogout} className="pqrst-button">Logout</button>
            </div>
        </div>
    );
}

export default UserAccount;
