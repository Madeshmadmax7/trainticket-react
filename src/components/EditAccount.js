import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditAccount.css';

function EditAccount() {
    const [accountDetails, setAccountDetails] = useState({ username: '', email: '', phone: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountDetails = async () => {
            const username = localStorage.getItem('username');
            try {
                const response = await axios.get('http://localhost:5000/users');
                const users = response.data;
                const user = users.find(user => user.username === username);

                if (user) {
                    setAccountDetails(user);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching account details:', error);
            }
        };

        fetchAccountDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:5000/users/${accountDetails.id}`, accountDetails);
            alert('Account details updated successfully');
            navigate('/account-management');
        } catch (error) {
            console.error('Error updating account details:', error);
            alert('Failed to update account details');
        }
    };

    return (
        <div className='poi-edit-account'>
            <nav className="navbar">
                <div className="logo">BookTrains</div>
                <div className="navbar-links">
                    <a href="/home" className="navbar-link">Home</a>
                    <a href="/about-us" className="navbar-link">About Us</a>
                    <a href="/contact" className="navbar-link">Contact</a>
                    <a href="/notifications" className="navbar-link">Notification</a>
                </div>
            </nav>
            <div className="poi-account-details">
                <h2>Edit Account</h2>
                <div className="poi-input-field">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={accountDetails.username}
                        onChange={handleInputChange}
                        className="poi-input"
                    />
                </div>
                <div className="poi-input-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={accountDetails.email}
                        onChange={handleInputChange}
                        className="poi-input"
                    />
                </div>
                <div className="poi-input-field">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={accountDetails.phone}
                        onChange={handleInputChange}
                        className="poi-input"
                    />
                </div>
                <button onClick={handleSaveChanges} className='poi-buttons'>Save Changes</button>
            </div>
        </div>
    );
}

export default EditAccount;
