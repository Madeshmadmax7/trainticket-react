import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RouteSearch.css';

const RouteSearch = () => {
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [startingLocation, setStartingLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [seats, setSeats] = useState('');
    const navigate = useNavigate();

    const handleSelectSeats = () => {
        const today = new Date().toISOString().split('T')[0];
    
        if (startingLocation === destinationLocation) {
            alert('Starting location and destination location must be different.');
            return;
        }
    
        if (departureDate <= today) {
            alert('Departure date must be after today.');
            return;
        }
    
        if (seats > 15) {
            alert('Number of seats cannot be more than 15.');
            return;
        }
    
        navigate('/seat-selection', {
            state: {
                departureDate,
                returnDate,
                startingLocation,   
                destinationLocation, 
                seats,
            },
        });
    };
    

    return (
        <div className="homepage-container">
            <div className="navbar">
                <div className="logo">BookTrains</div>
                <div className="navbar-links">
                    <a href="/home" className="navbar-link">Home</a>
                </div>
            </div>
            <div className="route-search-container">
                <div className="form-content">
                    <h1>Check Availability</h1>
                    <form>
                        <div className="form-row">
                            <div className="form-col">
                                <label htmlFor="starting-location">Starting Location:</label>
                                <select 
                                    id="starting-location" 
                                    className="dropdown"
                                    value={startingLocation}
                                    onChange={(e) => setStartingLocation(e.target.value)}
                                    required
                                >
                                    <option value="">Select a location</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Coimbatore">Coimbatore</option>
                                    <option value="Madurai">Madurai</option>
                                    <option value="Tirupur">Tirupur</option>
                                    <option value="Pondicherry">Pondicherry</option>
                                    <option value="Vellore">Vellore</option>
                                    <option value="Nagercoil">Nagercoil</option>
                                    <option value="Salem">Salem</option>
                                </select>
                            </div>
                            <div className="form-col">
                                <label htmlFor="destination-location">Destination Location:</label>
                                <select 
                                    id="destination-location" 
                                    className="dropdown"
                                    value={destinationLocation}
                                    onChange={(e) => setDestinationLocation(e.target.value)}
                                    required
                                >
                                    <option value="">Select a location</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Coimbatore">Coimbatore</option>
                                    <option value="Madurai">Madurai</option>
                                    <option value="Tirupur">Tirupur</option>
                                    <option value="Pondicherry">Pondicherry</option>
                                    <option value="Vellore">Vellore</option>
                                    <option value="Nagercoil">Nagercoil</option>
                                    <option value="Salem">Salem</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label htmlFor="departure-date">Departure Date:</label>
                                <input 
                                    id="departure-date" 
                                    type="date" 
                                    className="input-control" 
                                    value={departureDate}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label htmlFor="seats">Number of Seats:</label>
                                <input 
                                    id="seats" 
                                    type="number" 
                                    className="input-control" 
                                    value={seats} 
                                    onChange={(e) => setSeats(Math.min(15, parseInt(e.target.value, 10) || 0))}
                                    min="0" 
                                    max="15"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <button 
                                type="button" 
                                className="btn" 
                                onClick={handleSelectSeats}
                            >
                                Select Seats
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RouteSearch;
