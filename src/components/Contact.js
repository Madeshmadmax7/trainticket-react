import React, { useState } from 'react';
import './Contact.css';
import img from './user2.png';
import emailjs from 'emailjs-com'; 

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const sendEmail = (e) => {  
        e.preventDefault();

        if (formData.message.trim() === '') {
            alert('Message box cannot be empty.');
            return;  // Prevent sending email if the message is empty
        }

        const templateParams = {
            from_name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
        };

        emailjs.send(
            'service_w9z4l7j',
            'template_xu20ltj', 
            templateParams,
            '-VVCvTZdfwJe4QBBB' 
        ).then((response) => {
            alert('Quote request sent successfully!');
            console.log('SUCCESS!', response.status, response.text);
        }).catch((err) => {
            alert('Failed to send the quote. Please try again later.');
            console.log('FAILED...', err);
        });
    };

    return (
        <div className="landing-page">
            <div className="container">
                <nav className="navbar">
                    <div className="logo">BookTrains</div>
                    <div className="navbar-links">
                        <a href="/home" className="navbar-link">Home</a>
                        <a href="/about-us" className="navbar-link">About Us</a>
                        <a href="/contact" className="navbar-link">Contact</a>
                        <a href="/notifications" className="navbar-link">Notification</a>
                        <a href='/user-account' className='navbar-link'>
                            <img src={img} alt="User Icon" className="navbar-img" />
                        </a>
                    </div>
                </nav>
                <div className="form-container">
                    <form className="form" onSubmit={sendEmail}>
                        <p className="form-heading">Get a quote</p>
                        <p className="form-subheading">We will get back to you in 24 hours</p>
                        <div className="form-fields">
                            <input
                                className="input"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                className="input"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <input
                                className="input email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                className="input"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            <textarea
                                className="textarea"
                                name="message"
                                placeholder="Type message here"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="button-container">
                            <button className="submit-btn" type="submit">Get quote</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
