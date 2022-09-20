const model = require('./models/mongoModel.js');


exports.getAllquestions = (reqQuery, callback) => {
  const product_id = reqQuery.product_id;
  const index = reqQuery.count;
  model.findQuestions(product_id, index, (err, results) => {
    if(err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
}

exports.getAllAnswers = (request, callback) => {
  const question_id = request.params.question_id.toString();
  const index = request.query.count;
  model.findAnswers(question_id, index, (err, results) => {
    if(err) {
      callback(err);
    } else {
      console.log(results);
      callback(null, results);
    }
  })
}

exports.addOneQuestion = (reqBody, callback) => {
  const newQuest = {
    product_id: reqBody.product_id,
    body: reqBody.body,
    date_written: Date.now(),
    asker_name: reqBody.name,
    asker_email: reqBody.email,
    reported: 0,
    helpful: 0,
    answers: []
  };
  model.insertQuestion( newQuest, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

exports.addOneAnswer = (req, callback) => {
  const newAnswer = {
    body: req.body.body,
    date_written: Date.now(),
    answerer_name: req.body.name,
    answerer_email: req.body.email,
    reported: 0,
    helpful: 0,
    photos: []
  };
  model.insertAnswer( newAnswer, req.params.question_id, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

