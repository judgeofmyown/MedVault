// import React, { useState } from 'react'
// import { db } from './Appointment';
// import { getDoc, updateDoc } from 'firebase/firestore';
// import { doc } from 'firebase/firestore';
// import { arrayUnion } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import "./Patient.css"


// function Patient({ hospitalId, setShowModal, appointmentId }) {
//     const [patientDetails, setPatientDetails] = useState({
//         firstName: "",
//         lastName: "",
//         address: "",
//         telecom: "",
//         gender: "",
//         birthDate: ""
//     });
//     const auth = getAuth();
//     const user = auth.currentUser;

//     const handlePatientChange = (e) => {
//         const { name, value } = e.target;
//         setPatientDetails((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleFinishAppointment = async () => {
//         const patientResource = {
//             resourceType: "Patient",
//             name: [{
//                 use: "official",
//                 family: patientDetails.lastName,
//                 given: [patientDetails.firstName]
//             }],
//             address: [{
//                 text: patientDetails.address
//             }],
//             gender: patientDetails.gender,
//             birthDate: patientDetails.birthDate,
//             managingOrganization: {
//                 reference: `Organization/${hospitalId}`
//             }
//         };
//         try{
//             const response = await fetch("http://localhost:8080/fhir/Patient", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(patientResource)
//             });
//             if(response.ok){
//                 const responseData = await response.json();
//                 alert("Patient Registered Successfully");
//                 const patientId = responseData.id;
//                 try{
//                     console.log(appointmentId)
//                     const appointmentRef = doc(db, "appointments", appointmentId);
//                     const appointmentSnap = await getDoc(appointmentRef)
                    
//                     await updateDoc(appointmentRef, {
//                         patientId: patientId,
//                         patient: arrayUnion(patientResource)
//                     });
//                     const userRef = doc(db, "users", user.uid);
//                     await updateDoc(userRef, {
//                         appointments: arrayUnion(appointmentId)
//                     })
//                     alert("Patient details linked to appointment!");
//                     setPatientDetails({
//                         firstName: "",
//                         lastName: "",
//                         address: "",
//                         telecom: "",
//                         gender: "",
//                         birthDate: ""
//                     });
//                     setShowModal(false);
//                 }catch(error){
//                     console.log("error ho gaya baal");
//                     console.log(error);
//                 }  
//             }else{
//                 alert("Failed to register patient");
//             }
//         } catch (error){
//             console.error('Error creating patient:', error);
//         }
//     }

//     return (
//         <>
//             <div className="modal-overlay">
//             <div className="modal">
//                 <h2>Enter Patient Details</h2>
//                 <label>First Name:</label>
//                 <input
//                 type="text"
//                 name="firstName"
//                 value={patientDetails.firstName}
//                 onChange={handlePatientChange}
//                 />
//                 <label>Last Name:</label>
//                 <input
//                 type="text"
//                 name="lastName"
//                 value={patientDetails.lastName}
//                 onChange={handlePatientChange}
//                 />
//                 <label>Address:</label>
//                 <input
//                 type='text'
//                 name='address'
//                 value={patientDetails.address}
//                 onChange={handlePatientChange}
//                 />
//                 <label>Telecom:</label>
//                 <input
//                 type='text'
//                 name='telecom'
//                 value={patientDetails.telecom}
//                 onChange={handlePatientChange}
//                 />
//                 <label>Gender:</label>
//                 <select
//                 name="gender"
//                 value={patientDetails.gender}
//                 onChange={handlePatientChange}
//                 >
//                 <option value="">Select Gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//                 </select>
//                 <label>Birth Date:</label>
//                 <input
//                 type="date"
//                 name="birthDate"
//                 value={patientDetails.birthDate}
//                 onChange={handlePatientChange}
//                 />
//                 <button onClick={handleFinishAppointment}>Finish Appointment</button>
//                 <button onClick={() => setShowModal(false)}>Close</button>
//             </div>
//             </div>
//         </>
//     )
// }

// export default Patient


import React, { useState } from "react";
import { db } from "./Appointment";
import { getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Patient.css";

function Patient({ hospitalId, setShowModal, appointmentId }) {
  const [patientDetails, setPatientDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    telecom: "",
    gender: "",
    birthDate: "",
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFinishAppointment = async () => {
    const patientResource = {
      resourceType: "Patient",
      name: [
        {
          use: "official",
          family: patientDetails.lastName,
          given: [patientDetails.firstName],
        },
      ],
      address: [
        {
          text: patientDetails.address,
        },
      ],
      gender: patientDetails.gender,
      birthDate: patientDetails.birthDate,
      managingOrganization: {
        reference: `Organization/${hospitalId}`,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/fhir/Patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientResource),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Patient registered successfully!", {
            position: "top-right",
            autoClose: 3000,
        });

        const patientId = responseData.id;

        try {
          const appointmentRef = doc(db, "appointments", appointmentId);
          await updateDoc(appointmentRef, {
            patientId: patientId,
            patient: arrayUnion(patientResource),
          });

          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            appointments: arrayUnion(appointmentId),
          });

          toast.success("Patient details linked to appointment!", {
            position: "top-right",
            autoClose: 3000,
          });

          setPatientDetails({
            firstName: "",
            lastName: "",
            address: "",
            telecom: "",
            gender: "",
            birthDate: "",
          });
          setShowModal(false);
        } catch (error) {
          console.error("Error updating document:", error);
          toast.error("Error linking patient details to appointment.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Failed to register patient.", {
            position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      toast.error("Error creating patient. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Enter Patient Details</h2>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={patientDetails.firstName}
            onChange={handlePatientChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={patientDetails.lastName}
            onChange={handlePatientChange}
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={patientDetails.address}
            onChange={handlePatientChange}
          />
          <label>Telecom:</label>
          <input
            type="text"
            name="telecom"
            value={patientDetails.telecom}
            onChange={handlePatientChange}
          />
          <label>Gender:</label>
          <select
            name="gender"
            value={patientDetails.gender}
            onChange={handlePatientChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={patientDetails.birthDate}
            onChange={handlePatientChange}
          />
          <button onClick={handleFinishAppointment}>Finish Appointment</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
      {/* ToastContainer to enable notifications */}
      <ToastContainer />
    </>
  );
}

export default Patient;

