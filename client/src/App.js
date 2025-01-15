import React, { useContext } from 'react';
import { UserContext } from './Context/UserContext/UserContext';
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Homepage/Home';
import Dashboard from './components/Dashboard/Dashboard';
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import { Register } from './components/Register/Register';
import Login from './components/Login/Login';

function App() {
  const { isLogged } = useContext(UserContext); // Access the login state from context
  const navigate = useNavigate(); // useNavigate hook to handle redirection

  return (
    <>
      <header className="header">
        <Link to="/">
          <img src="./medvaultlogo1.png" alt="Site Logo" className="logo"/>
        </Link>
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li>
              <Link 
                to={isLogged ? "/dashboard" : "/login"} 
                onClick={(e) => {
                  if (!isLogged) {
                    e.preventDefault(); 
                    navigate("/login"); 
                  }
                }}
              >
                Dashboard
              </Link>
            </li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/login">Login/Register</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>

      <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Your go-to solution for efficient and secure healthcare management.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Features</a></li>
            <li><a href="/contactus">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#!"><i className="fab fa-facebook"></i></a>
            <a href="#!"><i className="fab fa-twitter"></i></a>
            <a href="#!"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MedVault. All rights reserved.
      </div>
    </footer>
    </>
  );
}

export default App;
