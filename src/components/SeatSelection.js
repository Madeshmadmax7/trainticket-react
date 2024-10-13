import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SeatSelection.css';

function SeatSelection() {
    const [seats, setSeats] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
    const maxSeats = state?.seats || 0;

    const handleSeatChange = (e) => {
        const seatId = e.target.id;
        if (e.target.checked) {
            if (seats.length < maxSeats) {
                setSeats([...seats, seatId]);
            } else {
                alert(`You can only select a maximum of ${maxSeats} seats.`);
                e.target.checked = false; 
            }
        } else {
            setSeats(seats.filter(seat => seat !== seatId));
        }
    };

    const handlePay = () => {
        if (seats.length === 0) {
            alert('Please select at least one seat before proceeding to payment.');
            return; 
        }

        const totalPrice = seats.length * 100; 
        navigate('/ticket-confirmation', {
            state: {
                ...state,
                totalPrice,
                selectedSeats: seats,
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
            <div className="seat-selection-container-unique">
                <div className="seat-selection-content-unique">
                    <div className="seats-background-unique">
                        <h1>Please select your seats</h1>
                        <div className="seats-container-unique">
                            {[...Array(7)].map((_, rowIndex) => (
                                <div key={rowIndex} className="row-unique">
                                    {[...Array(6)].map((_, colIndex) => {
                                        const seatId = `${rowIndex + 1}${String.fromCharCode(65 + colIndex)}`;
                                        return (
                                            <div key={seatId} className="seat-unique">
                                                <input
                                                    type="checkbox"
                                                    id={seatId}
                                                    onChange={handleSeatChange}
                                                />
                                                <label htmlFor={seatId} className={`seat-label-unique ${colIndex === 2 ? 'partition' : ''}`}>
                                                    {seatId}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                        <div className="button-container-unique">
                            <button onClick={handlePay} className="pay-button-unique">Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeatSelection;
