import React, { useState, useRef, useEffect } from "react";
import "./Locator.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import default Leaflet marker assets
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Configure Leaflet default marker icons
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Locator = () => {
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5); // Default view (India)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Cleanup function to properly remove the map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!location) {
      alert("Please enter a location to search for hospitals.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=hospital+in+${location}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setError("No hospitals found for this location.");
        setLoading(false);
        return;
      }

      setHospitals(data);

      // Clear existing markers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Center the map on the first hospital
      const firstHospital = data[0];
      const lat = parseFloat(firstHospital.lat);
      const lon = parseFloat(firstHospital.lon);
      mapRef.current.setView([lat, lon], 13);

      // Add markers for each hospital
      data.forEach((hospital) => {
        const marker = L.marker([hospital.lat, hospital.lon]).addTo(mapRef.current);
        marker.bindPopup(`<b>${hospital.display_name}</b>`);
      });
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError("An error occurred while searching for hospitals.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setLocation("");
    setHospitals([]);
    setError(null);

    // Clear the map markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });
  };

  return (
    <div className="app-container">
      <h1>Hospital Locator</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city or region"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div ref={mapContainerRef} id="map"></div>
      <div className="hospital-list">
        {hospitals.map((hospital, index) => (
          <div key={index} className="hospital-card">
            <h2>{hospital.display_name}</h2>
            <p>Latitude: {hospital.lat}</p>
            <p>Longitude: {hospital.lon}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locator;
