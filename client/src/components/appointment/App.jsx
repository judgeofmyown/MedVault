import React, { useState } from "react";
import "./app.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


// Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyApwKgdClT01ifNPk_9wG2x0_npe45PQr4",
  authDomain: "medvaultauth.firebaseapp.com",
  projectId: "medvaultauth",
  storageBucket: "medvaultauth.firebasestorage.app",
  messagingSenderId: "527200140603",
  appId: "1:527200140603:web:66db2b93875702345dcb1e",
  measurementId: "G-JCXQ49B2E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
  });
  const [city, setCity] = useState("");

  // Fetch hospitals based on the entered city
  const fetchHospitals = async () => {
    if (!city) {
      alert("Please enter a city.");
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=hospital+in+${city}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setHospitals(data);
      } else {
        alert("No hospitals found in this location.");
        setHospitals([]);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      alert("Unable to fetch hospitals. Please try again.");
    }
  };

  // Handle dropdown change for hospital selection
  const handleHospitalSelect = (e) => {
    setSelectedHospital(e.target.value);
  };

  // Handle input changes for appointment date and time
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for booking appointments
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedHospital || !appointmentDetails.date || !appointmentDetails.time || !city) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      // Add a new document to the "appointments" collection
      const docRef = await addDoc(collection(db, "appointments"), {
        city: city,
        hospital: selectedHospital,
        date: appointmentDetails.date,
        time: appointmentDetails.time,
      });
  
      alert(`Appointment booked successfully with ID: ${docRef.id}`);
      setCity(""); // Clear the form fields
      setSelectedHospital("");
      setAppointmentDetails({ date: "", time: "" });
      setHospitals([]);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to book the appointment. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1>Hospital Locator & Appointment</h1>

      {/* City Input and Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchHospitals}>Search Hospitals</button>
      </div>

      {/* Hospital Dropdown and Appointment Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Select Hospital:
          <select value={selectedHospital} onChange={handleHospitalSelect}>
            <option value="" disabled>
              Select a hospital
            </option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={hospital.display_name}>
                {hospital.display_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={appointmentDetails.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={appointmentDetails.time}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default App;
