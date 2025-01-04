import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext/UserContext'
import Logout_auth from '../../Authentication/Logout_auth'
import { auth, db } from '../../Authentication/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import "./Dashboard.css"
import Locator from '../locator/Locator'
import Appointment from '../appointment/Appointment'

function Dashboard() {
  const { fullName, 
          userEmail, 
          userPassword, 
          phone,
          permanentAddress,
          postOfficeAddress,
          profilePhoto,
          setFullName,
          setUserEmail,
          setPhone,
          setPermanentAddress,
          setPostOfficeAddress,
          setProfilePhoto
        } = useContext(UserContext)
  console.log(userEmail)

  const [selectedFeature, setSelectedFeature] = useState(null);
  
  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser){
          try{
            console.log("user is logged in");
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()){
              const data = userDoc.data();
              setFullName(data.fullname);
              setUserEmail(data.email);
              setPhone(data.phone);
              setPermanentAddress(data.permanentAddress);
              setPostOfficeAddress(data.postOfficeAddress);
              setProfilePhoto(data.profilePhotoURL);
            }
          }catch(error){
            console.error("Error fetching user data: ", error);
          }
        }else{
          console.log("user not logged in")
        }
    });
    return () => unsubscribe();
  }, [setFullName, setUserEmail, setPhone, setPermanentAddress, setPostOfficeAddress, setProfilePhoto])

  return (
    <>
      <div className='dashboard-container'>
          <div className="user-details-container">
            <div className="photo">
              <img src={profilePhoto} alt="Profile" />
            </div>
            <div className="user-demographs">
              <h3>{fullName}</h3>
              <p>Email: {userEmail}</p>
              <p>Phone: {phone}</p>
              <p>Permanent Address: {permanentAddress}</p>
              <p>Post Office Address: {postOfficeAddress}</p>
            </div>
          </div>
          <div className='features-btn'>
            <button onClick={()=> handleFeatureClick('Locator')}>locator</button>
            <button onClick={()=> handleFeatureClick('Appointment')}>Appointment</button>
          </div>
          <div className='features-container'>
            {selectedFeature == 'Locator' && <Locator/>}
            {selectedFeature == 'Appointment' && <Appointment/>}
          </div>
      </div>
      <Logout_auth/>
    </>
  )
}

export default Dashboard