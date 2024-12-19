import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext/UserContext'
import Logout_auth from '../../Authentication/Logout_auth'

function Dashboard() {
  const { userName, userEmail, userPassword } = useContext(UserContext)
  console.log(userName, userEmail)
  return (
    <>
      <div>This is dashboard, this is {userName}, {userEmail} </div>
      <Logout_auth/>
    </>
  )
}

export default Dashboard