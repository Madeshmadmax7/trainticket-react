import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTickets.css';

function BookTickets() {
    const navigate = useNavigate();
    return (
        <div className="book-tickets-container">
            <div className="buttons-container">
                <h2>Book Tickets</h2>
                <button onClick={() => navigate('/route-search')}>
                    Book Tickets
                </button>
                <button  onClick={() => navigate('/train-map')}>
                    Search Trains
                </button>
            </div>
            <div className="image-container">
                <img src="path-to-your-train-image.jpg" alt="Train" />
            </div>
        </div>
    );
}

export default BookTickets;