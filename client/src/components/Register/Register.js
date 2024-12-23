import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ButtonComp from '../Button/ButtonComp'
import { UserContext } from '../../Context/UserContext/UserContext'
import { Register_auth } from '../../Authentication/Register_auth'
import "./Register.css"

export function Register() {

    const { 
      setUserEmail, 
      setUserPassword, 
      setFullName,
      setPhone,
      setPermanentAddress,
      setProfilePhotoURL,
      setPostOfficeAddress
    } = useContext(UserContext)
    

  return (
    <div className='register-container'>
      <div className='register-form'>
        <div className='firebase'>
                <div className='firebase-auth'>
                        <h2>Register</h2>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required onChange={(event)=>{setUserEmail(event.target.value)}}/>
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required onChange={(e)=>{setUserPassword(e.target.value)}}/>
                        </div>
                </div>
                <div className='divider'></div>
                <div className='firebase-db'>
                        <h2>Aditional details</h2>
                        <div>
                          <div>
                            <label htmlFor="fullname">Full Name:</label>
                            <input type="text" id="fullname" name="fullname" required onChange={(e) => setFullName(e.target.value)} />
                          </div>

                          <div>
                            <label htmlFor="phone">Phone:</label>
                            <input type="tel" id="phone" name="phone" required onChange={(e) => setPhone(e.target.value)} />
                          </div>

                          <div>
                            <label htmlFor="permanentAddress">Permanent Address:</label>
                            <input type="text" id="permanentAddress" name="permanentAddress" required onChange={(e) => setPermanentAddress(e.target.value)} />
                          </div>

                          <div>
                            <label htmlFor="postOfficeAddress">Post Office Address:</label>
                            <input type="text" id="postOfficeAddress" name="postOfficeAddress" required onChange={(e) => setPostOfficeAddress(e.target.value)} />
                          </div>

                          <div>
                            <label htmlFor="profilePhotoURL">Profile Photo URL:</label>
                            <input type="url" id="profilePhotoURL" name="profilePhotoURL" required onChange={(e) => setProfilePhotoURL(e.target.value)} />
                          </div>
                        </div>
                </div>

        </div>
        
        {/* <button onClick={Register_auth}>Register</button> */}
        <Register_auth/>
        <p>
          Already an user? <Link to={"/login"}>Login here</Link>
        </p>
        <ButtonComp Label={"go to home"} to={"/"}/>
      </div>

    </div>
  )
}

