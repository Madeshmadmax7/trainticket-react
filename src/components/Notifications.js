import React, { useState, useEffect } from 'react';
import './Notifications.css';
import img from './user2.png';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
        setNotifications(savedNotifications);
    }, []);

    return (
        <div className="mno-page">
            <nav className='mno-navbar'>
                <div className="mno-logo">BookTrains</div>
                <div className="mno-links">
                    <a href="/home" className="mno-link">Home</a>
                    <a href="/about-us" className="mno-link">About Us</a>
                    <a href="/contact" className="mno-link">Contact</a>
                    <a href="/notifications" className="mno-link">Notification</a>
                    <a href='/user-account' className='navbar-link'>
                        <img src={img} alt="User Icon" className="navbar-img" />
                    </a>
                </div>
            </nav>
            <div className="mno-container">
                <div className="mno-text-box">
                    <h2 className="mno-title">Notifications</h2>
                    {notifications.length > 0 ? (
                        <ul className="mno-list">
                            {notifications.map((notification, index) => (
                                <li key={index}>{notification}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mno-no-notifications">You have no new notifications.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notifications;
