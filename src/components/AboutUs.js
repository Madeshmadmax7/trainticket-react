import React from 'react';
import './AboutUs.css';
import img from './user2.png';

function AboutUs() {
    return (
        <div className="abc-page">
            <nav className="abc-navbar">
                <div className="abc-logo">BookTrains</div>
                <div className="abc-links">
                    <a href="/home" className="abc-link">Home</a>
                    <a href="/about-us" className="abc-link">About Us</a>
                    <a href="/contact" className="abc-link">Contact</a> 
                    <a href="/notifications" className="navbar-link">Notification</a>
                    <a href='/user-account' className='navbar-link'>
                        <img src={img} alt="User Icon" className="navbar-img" />
                    </a>
                </div>
            </nav>
            <div className="xyz-container">
                <div className="xyz-text-box">
                    <h2 className="xyz-title">About Us</h2>
                    <p className="xyz-text">
                        Welcome to our Train Ticket Booking System. We provide seamless online booking for train tickets, 
                        making your journey planning as smooth and convenient as possible. Our system is designed with the 
                        traveler in mind, ensuring that every step of the booking process is intuitive and user-friendly. 
                        Whether you are planning a short trip or a long journey, our platform offers a wide range of 
                        options to suit your needs. From selecting your preferred train and seat to making secure payments, 
                        we cover all aspects of the booking process. Our dedicated customer service team is always ready 
                        to assist you with any queries or issues you may encounter. We understand the importance of timely 
                        and reliable travel arrangements, which is why we strive to provide real-time updates and accurate 
                        information on train schedules and availability.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
