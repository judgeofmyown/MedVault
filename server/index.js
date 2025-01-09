const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const PORT = 3002;
const axios = require('axios')

const app = express();

app.use(express.json())
app.use(cors())
app.get("/", (req, res)=>{
    res.send("server is running")
})

app.post("/api/appointments", async (req, res) => {
  console.log(req.body)
  const { name, address } = req.body
  
  try {
    // Query the hospital with name and address and retrieve its id if exists
    const response = await axios.get(`http://localhost:8080/fhir/Organization?name=${name}&address=${address.city}&address=${address.state}`)
    if (response.status === 200){
      const data = response.data;
      if (data.total !== 0){
        const hospital = data.entry[0];
        const hospital_id = hospital.resource.id;

        return res.status(200).json({
          message: "Organization found",
          organizationId: hospital_id,
        });
      }else{
        // no organisation exist then create one 
        const newOrganization = {
          resourceType: "Organization",
          name: name,
          address: [
            {
              line: [address.road],
              city: address.city,
              state: address.state,
              postalCode: address.postcode,
              country: address.country
            }
          ]
        };

        try{
          const createResponse = await fetch("http://localhost:8080/fhir/Organization", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrganization)
          });
  
          if (createResponse.ok) {
            const createData = await createResponse.json();
            const hospital_id = createData.id;

            return res.status(201).json({
              message: "Organization Created",
              organizationId: hospital_id,
            });
          }else{
            const errText = await createResponse.text();
            throw new Error(`Failed to create organization: ${errText}`)
          }
        }catch(error){
          console.log(error)
        }
      }
    }else{
      console.log("reconsider what you are doing in your life [-_-]");
      res.status(500).json({
        message: "Unexpecte response from FHIR server",
      })
    }
  }catch(error){
    console.error('Error while query or creating organization', error);
    res.status(500).json({
      message: "Error processing the request",
      error: error.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});