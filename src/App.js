import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import BookTickets from './components/BookTickets';
import TrainMap from './components/TrainMap';
import RouteSearch from './components/RouteSearch';
import SeatSelection from './components/SeatSelection';
import TicketConfirmation from './components/TicketConfirmation';
import UserAccount from './components/UserAccount';
import Notifications from './components/Notifications';
import SignUp from './components/SignUp';
import AccountManagement from './components/AccountManagement';
import './App.css';
import ForgotPassword from './components/ForgotPassword';
import EditAccount from './components/EditAccount';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'loggedIn');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/home"  />} 
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage onLogout={handleLogout} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-tickets" element={isLoggedIn ? <BookTickets /> : <Navigate to="/login" />} />
          <Route path="/train-map" element={isLoggedIn ? <TrainMap /> : <Navigate to="/login" />} />
          <Route path="/route-search" element={isLoggedIn ? <RouteSearch /> : <Navigate to="/login" />} />
          <Route path="/seat-selection" element={isLoggedIn ? <SeatSelection /> : <Navigate to="/login" />} />
          <Route path="/ticket-confirmation" element={isLoggedIn ? <TicketConfirmation /> : <Navigate to="/login" />} />
          <Route path="/user-account" element={isLoggedIn ? <UserAccount onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/account-management" element={isLoggedIn ? <AccountManagement onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/edit-account" element={<EditAccount/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
