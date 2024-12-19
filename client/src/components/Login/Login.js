import React from 'react'
import { Link } from 'react-router-dom'
import ButtonComp from '../Button/ButtonComp'

function Login() {
  return (
    <>
    <div>
      <h2>Login</h2>
      <form action="/login" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to={"/register"}>Register here</Link>
      </p>
      <ButtonComp Label={"go to home"} to={"/"}/>
    </div>
    </>
  )
}

export default Login