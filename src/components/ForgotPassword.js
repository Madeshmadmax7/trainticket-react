import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok) throw new Error('Network response was not ok');

            const users = await response.json();
            const user = users.find((user) => user.username === username);

            if (user && user.password === oldPassword) {
                user.password = newPassword;
                await fetch(`http://localhost:5000/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                alert('Password updated successfully!');
                navigate('/login');
            } else {
                setErrorMessage('Old password is incorrect or user does not exist.');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            setErrorMessage('An error occurred while resetting the password. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="back-icon" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                &lt;
            </div>
            <div className="login-ring">
                <i style={{ "--clr": "#00ff0a" }}></i>
                <i style={{ "--clr": "#ff0057" }}></i>
                <i style={{ "--clr": "#fffd44" }}></i>
                <div className="forgot-password-form-container">
                    <h2>Reset Password</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form onSubmit={handlePasswordReset}>
                        <div className="login-inputBx">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-inputBx">
                            <input
                                type="password"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-inputBx">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-inputBx">
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-inputBx">
                            <input type="submit" value="Reset Password" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
