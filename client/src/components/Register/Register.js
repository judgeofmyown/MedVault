import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext/UserContext';
import { Register_auth } from '../../Authentication/Register_auth';
import "./Register.css";

export function Register() {
  const {
    setUserEmail,
    setUserPassword,
    setFullName,
    setPhone,
    setPermanentAddress,
    setPostOfficeAddress,
    setProfilePhotoURL, // Changed to URL
  } = useContext(UserContext);

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Fill in your details to get started</p>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={(event) => setUserEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <h3 className="additional-details">Additional Details</h3>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter your full name"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="permanentAddress">Permanent Address</label>
          <input
            type="text"
            id="permanentAddress"
            name="permanentAddress"
            placeholder="Enter your permanent address"
            required
            onChange={(e) => setPermanentAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postOfficeAddress">Post Office Address</label>
          <input
            type="text"
            id="postOfficeAddress"
            name="postOfficeAddress"
            placeholder="Enter your post office address"
            required
            onChange={(e) => setPostOfficeAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePhotoURL">Profile Photo URL</label>
          <input
            type="url"
            id="profilePhotoURL"
            name="profilePhotoURL"
            placeholder="Enter the URL of your profile photo"
            required
            onChange={(e) => setProfilePhotoURL(e.target.value)} // Save URL in context
          />
        </div>

        <Register_auth />

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
