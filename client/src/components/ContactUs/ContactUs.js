import React, { useState } from 'react';
import "./ContactUs.css";
import { collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyApwKgdClT01ifNPk_9wG2x0_npe45PQr4",
  authDomain: "medvaultauth.firebaseapp.com",
  projectId: "medvaultauth",
  storageBucket: "medvaultauth.firebasestorage.app",
  messagingSenderId: "527200140603",
  appId: "1:527200140603:web:66db2b93875702345dcb1e",
  measurementId: "G-JCXQ49B2E1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState(false); // Added for state management

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'queries'), {
        ...formData,
        submittedAt: new Date(),
      });
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' }); 
    } catch (error) {
      setSuccess(false);
      console.error('Error submitting query: ', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        Have questions or need help? Reach out to us, and we’ll get back to you shortly.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="contact-button">Send Message</button>
      </form>
      {success && <p className="success-message">Thank you for your message. We’ll get back to you soon!</p>}
    </div>
  );
};

export default ContactUs;
