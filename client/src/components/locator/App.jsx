import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleSearch = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=hospital+in+${location}`
      );
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Hospital Locator</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city or town"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="hospital-list">
        {hospitals.map((hospital, index) => (
          <div key={index} className="hospital-card">
            <h2>{hospital.display_name}</h2>
            <p>Latitude: {hospital.lat}</p>
            <p>Longitude: {hospital.lon}</p>
            <button className="book-appointment">Book Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
