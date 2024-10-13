import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TicketConfirmation.css';
import trainIcon from './trainfront.jpg';

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const TrainTicket = () => {
    const { state } = useLocation();
    const { departureDate, selectedSeats, startingLocation, destinationLocation } = state || {};

    const [trainNumber, setTrainNumber] = useState('');
    const [platformNumber, setPlatformNumber] = useState('');
    const [departureTime, setDepartureTime] = useState('');

    useEffect(() => {
        setTrainNumber(generateRandomNumber(10000, 99999));
        setPlatformNumber(generateRandomNumber(1, 15));
        setDepartureTime(`${generateRandomNumber(1, 12)}:${generateRandomNumber(0, 59).toString().padStart(2, '0')} ${generateRandomNumber(0, 1) === 0 ? 'AM' : 'PM'}`);
    }, []);

    const handlePrint = () => {
        const ticketDetails = `Train No: ${trainNumber}, Date: ${departureDate}, Seats: ${selectedSeats?.join(', ')}, Platform: ${platformNumber}, Departure Time: ${departureTime}, Starting: ${startingLocation}, Destination: ${destinationLocation}`;
        const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
        savedNotifications.push(ticketDetails);
        localStorage.setItem('notifications', JSON.stringify(savedNotifications));
        window.print();
    };

    return (
        <div className="outerlayout">    
            <div className="ticket-container">
                <div className="ticket">
                    <div className="ticket-icon">
                        <img src={trainIcon} alt="Train Icon" />
                    </div>
                    <div className="ticket-info">
                        <h2 className="ticket-title">TRAIN TICKET</h2>
                        <div className="ticket-details">
                            <p><strong>TRAIN NO:</strong> {trainNumber}</p>
                            <p><strong>STARTING LOCATION:</strong> {startingLocation}</p>
                            <p><strong>DESTINATION LOCATION:</strong> {destinationLocation}</p>
                            <p><strong>DATE:</strong> {departureDate}</p>
                            <p><strong>SEAT:</strong> {selectedSeats?.join(', ')}</p>
                            <p><strong>PLATFORM:</strong> {platformNumber}</p>
                            <p><strong>DEPARTURE TIME:</strong> {departureTime}</p>
                        </div>
                    </div>
                </div>
                <button className="print-btn" onClick={handlePrint}>Print</button>
            </div>
        </div>
    );
};

export default TrainTicket;
