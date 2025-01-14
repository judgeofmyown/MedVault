import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to <strong>MedVault</strong>, your trusted partner in modern healthcare management.
        Our mission is to empower individuals with easy access to their healthcare information and
        to provide cutting-edge tools that simplify and improve the healthcare experience. <br/>
        <br/>At <strong>MedVault</strong>, we are committed to revolutionizing healthcare management through cutting-edge 
        technology and innovation. Our mission is to simplify and streamline healthcare processes, 
        making them accessible, efficient, and personalized for everyone.
      </p>

      <div className="about-content">
        <h2>Our Vision</h2>
        <p>
          To revolutionize the healthcare industry by integrating technology and personalized care,
          ensuring that healthcare is accessible, transparent, and efficient for everyone. <br/>
          <br/>We aim to bridge the gap between healthcare providers and patients by offering a 
          user-friendly platform that empowers individuals to take charge of their health. 
          From securely storing medical records to finding nearby hospitals and scheduling 
          appointments, MedVault ensures that every aspect of healthcare is just a click away.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Comprehensive healthcare management tools</li>
          <li>Secure storage and easy access to health records</li>
          <li>Real-time hospital locator and appointment scheduling</li>
          <li>User-centric design and advanced API integrations</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
