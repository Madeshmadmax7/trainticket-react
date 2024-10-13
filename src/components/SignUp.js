import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const newUser = { username, password, email, phone };

        try {
            const response = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert('Sign up successful! You can now log in.');
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                navigate('/login'); 
            } else {
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.message || 'Sign up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='signup-container'>
            <div className="signup-ring">
                <i style={{ "--clr": "#00ff0a" }}></i>
                <i style={{ "--clr": "#ff0057" }}></i>
                <i style={{ "--clr": "#fffd44" }}></i>
                <div className="signup-form-container">
                    <h2>Sign Up</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form onSubmit={handleSignUp}>
                        <div className="signup-inputBx">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="signup-inputBx">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="signup-inputBx">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="signup-inputBx">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="signup-inputBx">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="signup-inputBx">
                            <input type="submit" value="Sign up" />
                        </div>
                    </form>
                    <div className="signup-links">
                        <a onClick={handleGoToLogin} style={{ cursor: 'pointer' }}>Already have an account? Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
