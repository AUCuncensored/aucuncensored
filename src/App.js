// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Confirmation from './confirmation';
import './App.css';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');
  const [year, setYear] = useState('1st'); // Added state for year
  const [major, setMajor] = useState('Humanities'); // Added state for major
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send the message, year, and major to the Flask backend
    try {
      await axios.post('http://127.0.0.1:5000/api/messages', { 
        message, 
        year, 
        major 
      });
      
      // After successful submission, navigate to the confirmation page
      navigate('/confirmation');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">  
      <div className="container">
        <h1>Submit Your Confession</h1>
        
        {/* Dropdown for selecting year */}
        <div className="dropdown-container">
          <label htmlFor="year">Select Your Year:</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="Graduate">Graduate</option>
            <option value="Dropout">Dropout</option>
          </select>
        </div>

        {/* Dropdown for selecting major */}
        <div className="dropdown-container">
          <label htmlFor="major">Select Your Major:</label>
          <select
            id="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          >
            <option value="Humanities">Humanities</option>
            <option value="Science">Science</option>
            <option value="Social Science">Social Science</option>
          </select>
        </div>

        {/* Textarea for message */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows="5"
          required
        ></textarea>

        <button type="submit" className="primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

// Wrap App with Router and define routes
const AppWrapper = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
