require('dotenv').config();
const express = require('express');
const app = express();

//connect


//add middleware
const path = require('path');
app.use(express.json());


// =============== QANDA ROUTES ===============

app.get('route', (req, res) => {
  //speak to model(req.body)
})

app.post('route', (req, res) => {
  //speak to model
})

app.listen(process.env.PORT, () => {
  console.log(`WW server listening on port ${process.env.PORT}`)
})