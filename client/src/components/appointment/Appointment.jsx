import React, { useState } from "react";
import "./Appointment.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Patient from "./Patient";


// Firebase configuration
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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function Appointment() {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
  });
  const [hospitalId, setHospitalId] = useState("");
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

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
    const selectedIdx = e.target.value;
    setSelectedHospital(hospitals[selectedIdx]);
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
      alert(`Please fill in all fields.\nHospital: ${selectedHospital ? selectedHospital.display_name : 'Not selected'}\nDate: ${appointmentDetails.date}\nTime: ${appointmentDetails.time}\nCity: ${city}`);
      return;
    }
    console.log(JSON.stringify(selectedHospital));

    try {
      const response = await fetch("http://localhost:3002/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedHospital),
      });

      if (response.ok){
        const result = await response.json();
        alert(`Appointment booked successfully: ${result.message}`);
        setHospitalId(result.organizationId);
        setShowModal(true);
        setCity(""); // Reset fields
        setSelectedHospital(null);
        setAppointmentDetails({ date: "", time: "" });
        setHospitals([]);
      }else{
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error){
      console.error("Error sending data: ", error);
      alert("Failed to book appointment, please try again.")
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
      setAppointmentId(docRef.id);
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
      <h1>Hospital Appointment</h1>
      <h2>"Hospital ID: "{hospitalId}</h2>
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
          <select value={hospitals.indexOf(selectedHospital)} onChange={(e) => handleHospitalSelect(e)}>
            <option value="" disabled>
              Select a hospital
            </option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={index}>
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
      
      {showModal ? <Patient hospitalId={hospitalId} setShowModal={setShowModal} appointmentId={appointmentId} /> : <></>}

    </div>
  );
}

export default Appointment;