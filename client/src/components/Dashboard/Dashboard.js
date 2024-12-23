import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext/UserContext'
import Logout_auth from '../../Authentication/Logout_auth'

function Dashboard() {
  const { fullName, 
          userEmail, 
          userPassword, 
          phone,
          permanentAddress,
          postOfficeAddress,
          profilePhoto
        } = useContext(UserContext)
  console.log(userEmail)
  return (
    <>
      <div>This is dashboard, this is {fullName}, {userEmail}, {phone}, {permanentAddress}, {postOfficeAddress}, {profilePhoto} </div>
      <Logout_auth/>
    </>
  )
}

export default Dashboard