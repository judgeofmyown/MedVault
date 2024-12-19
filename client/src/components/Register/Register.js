import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ButtonComp from '../Button/ButtonComp'
import { UserContext } from '../../Context/UserContext/UserContext'
import { Register_auth } from '../../Authentication/Register_auth'

export function Register() {

    const { setUserEmail, setUserPassword, setUserName} = useContext(UserContext)
    

  return (
    <div>
    <h2>Register</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required onChange={(event)=>{setUserEmail(event.target.value)}}/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required onChange={(e)=>{setUserPassword(e.target.value)}}/>
      </div>
      <div>
          <label htmlFor="userName">Username:</label>
          <input type="text" id="username" name="username" required onChange={(e)=>{setUserName(e.target.value)}}/>
      </div>
      {/* <button onClick={Register_auth}>Register</button> */}
      <Register_auth/>
    <p>
      Already an user? <Link to={"/login"}>Login here</Link>
    </p>
    <ButtonComp Label={"go to home"} to={"/"}/>
  </div>
  )
}

