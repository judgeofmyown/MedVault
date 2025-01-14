import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext/UserContext'
import { Login_auth } from '../../Authentication/Login_auth'
import "./Login.css"

function Login() {
  const { setUserEmail, setUserPassword } = useContext(UserContext);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to access your dashboard</p>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setUserEmail(e.target.value)}
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
        </form>
        <Login_auth />
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <Link to="/" className="home-button">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;