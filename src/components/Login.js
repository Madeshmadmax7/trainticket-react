import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const users = await response.json();
            const user = users.find((user) => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem('token', user.token || 'dummy-token');
                localStorage.setItem('username', username);
                localStorage.setItem('email', user.email);
                localStorage.setItem('password', user.password);
                onLogin();
                navigate('/home');
            } else {
                alert('Incorrect username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while logging in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className='login-container'>
            <div className="login-ring">
                <i style={{ "--clr": "#00ff0a" }}></i>
                <i style={{ "--clr": "#ff0057" }}></i>
                <i style={{ "--clr": "#fffd44" }}></i>
                <div className="login-form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-inputBx">
                            <input type="submit" value={loading ? "Signing in..." : "Sign in"} disabled={loading} />
                        </div>
                    </form>
                    <div className="login-links">
                        <a onClick={() => navigate('/forgot-password')} style={{ cursor: 'pointer' }}>Forget Password</a>
                        <button onClick={handleSignup} className="signup-button">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
