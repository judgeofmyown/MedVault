<<<<<<< HEAD
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext/UserContext";
import Logout_auth from "../../Authentication/Logout_auth";
import { auth, db } from "../../Authentication/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import "./Dashboard.css";
import Locator from "../locator/Locator";
import Appointment from "../appointment/Appointment";
import ApptmntHist from '../AppointmentHistory/ApptmntHist'

=======
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext/UserContext'
import Logout_auth from '../../Authentication/Logout_auth'
import { auth, db } from '../../Authentication/firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import "./Dashboard.css"
import Locator from '../locator/Locator'
import Appointment from '../appointment/Appointment'
import ApptmntHist from '../AppointmentHistory/ApptmntHist'
>>>>>>> 42692b503b78713bf2fc869ac32144804605b6f7

function Dashboard() {
  const {
    fullName,
    userEmail,
    phone,
    permanentAddress,
    postOfficeAddress,
    profilePhoto,
    setFullName,
    setUserEmail,
    setPhone,
    setPermanentAddress,
    setPostOfficeAddress,
    setProfilePhoto,
  } = useContext(UserContext);

  const [selectedFeature, setSelectedFeature] = useState("Locator"); // Default to Locator

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          console.log("User is logged in");
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFullName(data.fullname);
            setUserEmail(data.email);
            setPhone(data.phone);
            setPermanentAddress(data.permanentAddress);
            setPostOfficeAddress(data.postOfficeAddress);
            setProfilePhoto(data.profilePhotoURL);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        console.log("User not logged in");
      }
    });
    return () => unsubscribe();
  }, [setFullName, setUserEmail, setPhone, setPermanentAddress, setPostOfficeAddress, setProfilePhoto]);


  return (
    <>
      <div className='dashboard-container'>
        {/* Top Section */}
        <div className="top-section">
          {/* Profile Photo */}
          <div className="photo">
            <img src={profilePhoto} alt="Profile" />
          </div>
  
          {/* User Info */}
          <div className="user-details-container">
<<<<<<< HEAD
            <h3>{fullName}</h3>
            <p>Email: {userEmail}</p>
            <p>Phone: {phone}</p>
            <p>Permanent Address: {permanentAddress}</p>
            <p>Post Office Address: {postOfficeAddress}</p>
          </div>
  
          {/* Features Menu */}
          <div className="features-menu">
            <button onClick={() => handleFeatureClick("Locator")}>Locator</button>
            <button onClick={() => handleFeatureClick("Appointment")}>Appointment</button>
            <button onClick={() => handleFeatureClick("FHIRReport")}>FHIR Report</button>
            <button onClick={() => handleFeatureClick("History")}>History</button>
            <Logout_auth />
=======
            <div className="photo">
              <img src={profilePhoto} alt="Profile" />
            </div>
            <div className="user-demographs">
              <h3>{console.log(fullName)}</h3>
              <p>Email: {userEmail}</p>
              <p>Phone: {phone}</p>
              <p>Permanent Address: {permanentAddress}</p>
              <p>Post Office Address: {postOfficeAddress}</p>
            </div>
          </div>
          <div className='features-btn'>
            <button onClick={()=> handleFeatureClick('Locator')}>locator</button>
            <button onClick={()=> handleFeatureClick('Appointment')}>Appointment</button>
            <button onClick={()=> handleFeatureClick('Appointment History')}>Appointment History</button>
          </div>
          <div className='features-container'>
            {selectedFeature === 'Locator' && <Locator/>}
            {selectedFeature === 'Appointment' && <Appointment/>}
            {selectedFeature === 'Appointment History' && <ApptmntHist/>}
>>>>>>> 42692b503b78713bf2fc869ac32144804605b6f7
          </div>
        </div>
  
        {/* Main Content */}
        <div className='main-content'>
          {selectedFeature === 'Locator' && <Locator />}
          {selectedFeature === 'Appointment' && <Appointment />}
          {selectedFeature === 'FHIRReport' && <p>FHIR Report Content coming soon...</p>}
          {selectedFeature === 'History' && <ApptmntHist/>}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

