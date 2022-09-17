require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');

//connect
const app = express();
app.use(express.static(path.join(__dirname, '')))//fix this
//add middleware
app.use(morgan('dev'));
app.use(express.json());

// =============== QANDA ROUTES ===============

//get all questions for given product_id//
app.get('/qa/questions', (req, res) => {
  //grab product_id, page, and count from req.query
  //speak to controller
})
//get all answers for given question_id//
app.get('/qa/questions/:question_id/answers', (req, res) => {
  //grab question_id from req.params.question_id
  //grab page and count from req.query
})
//post new question for given product_id//
app.post('/qa/questions', (req, res) => {
  //grab body, name, email, product_id from req.body
})
//post new answer for gicen question_id
app.post('/qa/questions/:question_id/answers', (req, res) => {
  //grab question_id from req.params.questions_id
  //grab body, name, email, photos from req.body
  //speak to model
})
//increment helpful count of given question_id
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  //grab question_id from req.params
})
//mark given question_id as reported (1)//
app.put('/qa/questions/:question_id/report', (req, res) => {
  //grab question_id from req.params
})
//increment helpful count of given answer_id
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  //grab answer_id from req.params
})
//mark given answer_id as reported (1)//
app.put('/qa/answers/:answer_id/report', (req, res) => {
  //grab answer_id from req.params
})

app.listen(process.env.PORT, () => {
  console.log(`WW server listening on port ${process.env.PORT}`)
})