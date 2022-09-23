require('dotenv').config();
const express = require('express');
const morgan = require('morgan');


//require
const controller = require('./controller.js');

//connect
const app = express();

//add middleware
// app.use(morgan('dev'));
app.use(express.json());

// =============== QANDA ROUTES ===============

//loader.io route FOR TESTING ONLY
// app.get(process.env.LOADER, (req, res) => {
//   res.send(process.env.LOADER_TOKEN);
// })


//get all questions for given product_id//
app.get('/qa/questions', (req, res) => {
  //grab product_id, page, and count from req.query
  controller.getAllquestions(req.query, (err, results) => {
    if(err){
      res.sendStatus(401);
    } else {
      res.status(200).json(results);
    }
  })
})
//get all answers for given question_id//
app.get('/qa/questions/:question_id/answers', (req, res) => {
  //grab question_id from req.params.question_id
  //grab page and count from req.query
  controller.getAllAnswers(req, (err, results) => {
    if(err){
      res.sendStatus(401);
    } else {
      res.status(200).json(results);
    }
  })
})
//post new question for given product_id//
app.post('/qa/questions', (req, res) => {
  //grab body, name, email, product_id from req.body.
  controller.addOneQuestion(req.body, (err) => {
    if(err){
      res.sendStatus(401);
    } else {
      res.sendStatus(201);
    }
  })
})
//post new answer for gicen question_id
app.post('/qa/questions/:question_id/answers', (req, res) => {
  //grab question_id from req.params.questions_id
  //grab body, name, email, photos from req.body
  controller.addOneAnswer(req, (err) => {
    if(err) {
      res.sendStatus(401);
    } else {
      res.sendStatus(201);
    }
  })
})
//increment helpful count of given question_id
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  controller.markQHelpful(req, (err) => {
    if(err) {
      res.sendStatus(401);
    } else {
      res.sendStatus(204);
    }
  })
})
//mark given question_id as reported (1)//
app.put('/qa/questions/:question_id/report', (req, res) => {
  controller.reportQuestion(req, (err) => {
    if(err) {
      res.sendStatus(401);
    } else {
      res.sendStatus(204);
    }
  })
})
//increment helpful count of given answer_id
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  controller.markAHelpful(req, (err) => {
    if(err) {
      res.sendStatus(401);
    } else {
      res.sendStatus(204);
    }
  })
})
//mark given answer_id as reported (1)//
app.put('/qa/answers/:answer_id/report', (req, res) => {
  controller.reportAnswer(req, (err) => {
    if(err) {
      res.sendStatus(401);
    } else {
      res.sendStatus(204);
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log(`WW server listening on port ${process.env.PORT}`)
})