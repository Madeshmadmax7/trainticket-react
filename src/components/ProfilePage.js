import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import img from './user2.png';

function ProfilePage({ onLogout }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('token') ? true : false;
        setIsLoggedIn(loggedInStatus);

        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
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
        localStorage.removeItem('username');
    };

    const handleAccountSettings = () => {
        navigate('/account-management');
    };

    return (
        <div className="profile-page-container">
            <nav className="navbar">
                <div className="logo">BookTrains</div>
                <div className="navbar-links">
                    <a href="/home" className="navbar-link">Home</a>
                    <a href="/about-us" className="navbar-link">About Us</a>
                    <a href="/contact" className="navbar-link">Contact</a>
                    <a href="/notifications" className="navbar-link">Notification</a>
                    <a href='/search-trains' className='navbar-link'>
                        <img src={img} alt="User Icon" className="navbar-img" />
                    </a>
                </div>
            </nav>

            <div className="profile-container">
                <div className="profile-card">
                    <div className="text-center">
                        <img src={img} width="100" className="rounded-circle" alt="Profile" />
                    </div>
                    <div className="text-center mt-3">
                        <h5 className="mt-2 mb-0">{username}</h5>
                    </div>
                    <div className="recent-trips">
                        <h3>Recent Trips</h3>
                        <ul>
                            <li>Chennai to Coimbatore</li>
                            <li>Coimbatore to Tirupur</li>
                        </ul>
                    </div>
                    <div className="no-updates">
                        <p>No updates, see you soon.</p>
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button onClick={handleLogin} className="navbar-link">Login</button>
                <button onClick={handleAccountSettings} className="navbar-link">Account Settings</button>
                <button onClick={handleLogout} className="navbar-link">Logout</button>
            </div>
        </div>
    );
}

export default ProfilePage;
