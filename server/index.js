const express = require("express");

const PORT = 3001;

const app = express();
app.get("/", (req, res)=>{
    res.send("server is running")
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});