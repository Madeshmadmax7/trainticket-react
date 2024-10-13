import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AccountManagement.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

function AccountManagement() {
    const [accountDetails, setAccountDetails] = useState({});
    const [password, setPassword] = useState('');
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

    const handleDeleteAccount = async () => {
        const username = accountDetails.username;
        const email = accountDetails.email; 
        const userPassword = accountDetails.password; 
        
        if (password !== userPassword) {
            alert('Password does not match.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/users`);
            const users = response.data; 

            const userToDelete = users.find(user => 
                user.username === username && 
                user.email === email && 
                user.password === password
            );

            if (userToDelete) {
                await axios.delete(`http://localhost:5000/users/${userToDelete.id}`);
                alert('Account deleted successfully');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                navigate('/signup');
            } else {
                alert('User does not exist or details do not match.');
            }
        } catch (error) {
            console.error('Error deleting account:', error.response ? error.response.data : error);
            alert('Failed to delete account');
        }
    };

    const handleEditAccount = () => {
        navigate('/edit-account');
    };

    return (
        <div className='jkl-account-management'>
            <nav className="navbar">
                <div className="logo">BookTrains</div>
                <div className="navbar-links">
                    <a href="/home" className="navbar-link">Home</a>
                    <a href="/about-us" className="navbar-link">About Us</a>
                    <a href="/contact" className="navbar-link">Contact</a>
                    <a href="/notifications" className="navbar-link">Notification</a>
                </div>
            </nav>
            <div className="jkl-account-details">
                <h2>Account Management</h2>
                <p><strong>Username:</strong> {accountDetails.username}</p>
                <p><strong>Email:</strong> {accountDetails.email}</p>
                <p><strong>Password:</strong> {accountDetails.password}</p>
                <div className="jkl-account-actions">
                    <button onClick={handleEditAccount} className='jkl-buttons'><FaEdit /></button>
                    <button onClick={handleDeleteAccount} className='jkl-buttons'><FaTrash /></button>
                </div>
                <div className="jkl-password-confirmation">
                    <h4>Confirm Password to Delete</h4>
                    <input
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='jkl-password'
                    />
                </div>
            </div>
        </div>
    );
}

export default AccountManagement;
