import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { app, db } from '../appointment/Appointment'
import './ApptmntHist.css';

function ApptmntHist() {
    const auth = getAuth();
    const currUser = auth.currentUser;
    const userRef = doc(db, "users", currUser.uid);
    const [appointmentIds, setAppointmentIds] = useState([]);
    const [appointmentDeatils, setAppointmentDetails] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getUserData();
    }, []);

    const getUserData = async () => {
        try{
            const docSnap = await getDoc(userRef)
            if(docSnap.exists()){
                setAppointmentIds(docSnap.data().appointments || [])
            }else{
                console.log("no such doc")
            }
        }catch(error){
            console.log("error ho gaya bhai!!", error)
        }
    }
    const getAppointmentDocData = async (appointmentIds) => {
        const detailsArray = [];
        for (const apptId of appointmentIds){
            const appointmentRef = doc(db, "appointments", apptId)
            try{
                const appointmentSnap = await getDoc(appointmentRef);
                if (appointmentSnap.exists()){
                    const data = appointmentSnap.data();
                    console.log(data.patient[0].given, data.patient[0].family)
                    const details = {
                        "date-of-appointment": data.date,
                        "Hospital-name": data.hospital.name,
                        "Hospital-address": [
                            data.hospital.address.road,
                            data.hospital.address.city,
                            data.hospital.address.postcode, 
                            data.hospital.address.state_district, 
                            data.hospital.address.state
                        ],
                        "Patient-FirstName": data.patient[0].name[0].given[0],
                        "Patient-LastName": data.patient[0].name[0].family,
                        "Patient-address": data.patient[0].address[0].text
                    }
                    detailsArray.push(details);
                }
            }catch(error){
                console.error(`Error ho gaya while fetching appointment ${apptId}`, error);
            }
        }
        setAppointmentDetails(detailsArray)
        setLoading(false)
    }

    useEffect(() => {
        if (appointmentIds.length > 0){
            getAppointmentDocData(appointmentIds);
        }
    }, [appointmentIds])

    return (
        loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="apptmnt-hist">
            <h1 className="apptmnt-title">Appointment History</h1>
            {appointmentDeatils.length > 0 ? (
              <ul className="apptmnt-list">
                {appointmentDeatils.map((appointment, index) => (
                  <li key={index} className="apptmnt-item">
                    <p>Date: {appointment["date-of-appointment"]}</p>
                    <p>Hospital: {appointment["Hospital-name"]}</p>
                    <p>Address: {appointment["Hospital-address"].join(", ")}</p>
                    <p>Patient: {appointment["Patient-FirstName"]} {appointment["Patient-LastName"]}</p>
                    <p>Patient Address: {appointment["Patient-address"]}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments found</p>
            )}
          </div>
        )
      );
}

export default ApptmntHist