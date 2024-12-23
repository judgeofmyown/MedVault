import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ButtonComp from '../Button/ButtonComp'
import { UserContext } from '../../Context/UserContext/UserContext'
import { Login_auth } from '../../Authentication/Login_auth'
import "../Register/Register.css"

function Login() {

  const { setUserEmail, setUserPassword } = useContext(UserContext)

  return (
    <>
    <div className='register-container'>
      <div className='register-form'>
      <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required onChange={(e) => {setUserEmail(e.target.value)}}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required onChange={(e) => {setUserPassword(e.target.value)}}/>
        </div>
        <Login_auth/>
      <p>
        New user? <Link to={"/register"}>Register here</Link>
      </p>
      <ButtonComp Label={"go to home"} to={"/"}/>
      </div>
    </div>
    </>
  )
}

export default Login