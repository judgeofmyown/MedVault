import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../appointment/Appointment'
import "./Reports.css"
import { useEffect,  } from 'react'

function Reports() {
    const auth = getAuth();
    const currUser = auth.currentUser;
    const userRef = doc(db, "users", currUser.uid);
    const [appointmentIds, setAppointmentIds] = useState([]);
    const [appointmentDeatils, setAppointmentDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [report, setReport] = useState(null)
    const [observations, setObservations] = useState([])
    useEffect(()=>{
        getUserData();
    }, []);

    const handlePatientClick = async (detail) => {
        setSelectedPatient(detail);
        const patientId = detail["Patient-Id"];
        try {
            const response = await fetch(`http://localhost:8080/fhir/DiagnosticReport?subject=Patient/${patientId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setReport(data)
            console.log("Retrieved Diagnostic Report:", data);
        } catch (error) {
            console.error("Error retrieving diagnostic report:", error);
        }
    };

    const handlePatientObservation = async (result) => {
        console.log(result)
        try{
            const fetchedObservations = [];
            for (const observation of result){
                
                const response = await fetch(`http://localhost:8080/fhir/${observation.reference}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok){
                    const data = await response.json();
                    fetchedObservations.push(data);
                }else{
                    throw new Error(`Error fetching observation : ${response.status} ${response.statusText}`);
                }
            }
            setObservations(fetchedObservations);
        }catch(error){
            console.log(error)
        }
    }

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
                    const details = {
                        "Hospital-name": data.hospital.name,
                        "Patient-FirstName": data.patient[0].name[0].given[0],
                        "Patient-LastName": data.patient[0].name[0].family,
                        "Patient-address": data.patient[0].address[0].text,
                        "Patient-Id": data.patientId
                    }
                    detailsArray.push(details);
                }
            }catch(error){
                console.error(`Error ho gaya while fetching appointment ${apptId}`, error);
            }
        }
        setAppointmentDetails(detailsArray)
        setLoading(false);
    }    
    useEffect(() => {
        if (appointmentIds.length > 0){
            setLoading(true);
            getAppointmentDocData(appointmentIds);
        }
    }, [appointmentIds])
    return (
      <div>
        {loading ? (
            <div className='loader'> Loading... </div>
        ):(
            <div className='report-container'>
                
                <h1>Reports</h1>
                <div className='patient-list'>
                    {appointmentDeatils.length > 0 ? (
                        appointmentDeatils.map((detail, index) => (
                            <div className='patient-detail' key={index} onClick={() => handlePatientClick(detail)}>
                                <p>Hospital: {detail['Hospital-name']}</p>
                                <p>Patient: {detail['Patient-FirstName']} {detail['Patient-LastName']}</p>
                                <p>Address: {detail['Patient-address']}</p>
                            </div>
                        ))
                    ):(
                        <p>No data available</p>
                    )}
                </div>
                
                {selectedPatient && (
                <div>
                    <h2>Selected Patient:</h2>
                    <p>Name: {selectedPatient["Patient-FirstName"]}</p>
                    <p>ID: {selectedPatient["Patient-Id"]}</p>
                    <button onClick={() => {setSelectedPatient(null); setReport(null); setObservations([])}}>Close</button>
                </div>
                )}
                {report && (
                <div className='patient-diag-report'>
                <h2>Diagnostic Report</h2>
                
                {report.entry && report.entry.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Patient Name</td>
                        <td>{report.entry[0].resource.subject.display}</td>
                      </tr>
                      <tr>
                        <td>Report ID</td>
                        <td>{report.entry[0].resource.id}</td>
                      </tr>
                      <tr>
                        <td>Test Name</td>
                        <td>{report.entry[0].resource.code.text}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>{report.entry[0].resource.status}</td>
                      </tr>
                      <tr>
                        <td>Effective Date</td>
                        <td>{new Date(report.entry[0].resource.effectiveDateTime).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Issued Date</td>
                        <td>{new Date(report.entry[0].resource.issued).toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td>Performer</td>
                        <td>{report.entry[0].resource.performer[0].display}</td>
                      </tr>
                      <tr>
                        <td>Result</td>
                        <td>
                          {report.entry[0].resource.result.map((res, index) => (
                            <div key={index}>
                              {res.display} ({res.reference})
                            </div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p>No diagnostic report available</p>
                )}
              
                {report.entry && report.entry.length > 0 && (
                  <button onClick={() => { handlePatientObservation(report.entry[0].resource.result) }}>
                    Show Observations
                  </button>
                )}
              </div>
              
                )}
                {observations.length > 0 && (
                <div className="observation-container">
                    <h2>Observations</h2>
                    {observations.map((obs, index) => (
                    <div className="observation-card" key={index}>
                    <h3>Observation: {obs.code.text}</h3>
                        <table className="observation-table">
                        <tbody>
                            <tr>
                            <th>Status</th>
                            <td>{obs.status}</td>
                            </tr>
                            <tr>
                            <th>Measurement</th>
                            <td>{obs.valueQuantity.value} {obs.valueQuantity.unit}</td>
                            </tr>
                            <tr>
                            <th>Reference Range</th>
                            <td>{obs.referenceRange[0].low.value} - {obs.referenceRange[0].high.value} {obs.referenceRange[0].low.unit}</td>
                            </tr>
                            <tr>
                            <th>System</th>
                            <td>{obs.code.coding[0].system}</td>
                            </tr>
                            <tr>
                            <th>Code</th>
                            <td>{obs.code.coding[0].code}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>                  
                    ))}
                </div>
                )}
            </div>
        )}
      </div>
    )
}

export default Reports