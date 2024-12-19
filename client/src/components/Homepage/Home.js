import React, { useContext } from 'react'
import ButtonComp from '../Button/ButtonComp'
import "./Home.css"
import { UserContext } from '../../Context/UserContext/UserContext'

export default function Home() {

  const { isLogged } = useContext(UserContext)

  return (
    <>
      <div className='Home-container'>
        <div className='temp-header'>
          <h2>MedVault: advancing fast healthcare</h2>
        </div>
        <div className='Auth-container'>
          <ButtonComp Label={"Login"} to={"/login"}/>
          <ButtonComp Label={"Register"} to={"/register"}/>
          <ButtonComp Label={"dashboard"} to={isLogged?"/dashboard":"#"} disabled={!isLogged}/>
        </div>
      </div>
    </>
  )
}
