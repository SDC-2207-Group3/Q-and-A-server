const model = require('./models/mongoModel.js');


exports.getAllquestions = (reqQuery, callback) => {
  const product_id = reqQuery.product_id;
  const index = reqQuery.count;
  model.findQuestions(product_id, index, (err, results) => {
    if(err) {
      callback(err);
    } else {
      let transformResults = [];
      results.map((question) => {
        let newQ = JSON.parse(JSON.stringify(question));
        let newAnswers = {};
        question.answers = question.answers.filter(elem => elem.reported === false);
        for (let answer of question.answers) {
          answer.id = answer._id.toString();
          newAnswers[answer.id]= {
            id: answer.id,
            body: answer.body,
            date: answer.date_written,
            answerer_name: answer.answerer_name,
            helpful: answer.helpful,
            photos: answer.photos
          }
        }
        newQ.answers = newAnswers;
        transformResults.push(newQ);
      })
      callback(null, { results: transformResults});
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
      let transformResults = [];
      const resolve = results[0].answers.filter(elem => elem.reported === false);
      resolve.forEach((answer) => {
        transformResults.push({
          answer_id: answer._id.toString(),
          body: answer.body,
          date: answer.date_written,
          answerer_name: answer.answerer_name,
          helpful: answer.helpful,
          photos: answer.photos
        })
      })
      callback(null, { results: transformResults.slice(0, index)});
    }
  })
}

exports.addOneQuestion = (reqBody, callback) => {
  const newQuest = {
    product_id: reqBody.product_id,
    question_body: reqBody.body,
    question_date: Date.now(),
    asker_name: reqBody.name,
    asker_email: reqBody.email,
    reported: 0,
    question_helpful: 0,
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
    photos: [req.body.photos]
  };
  model.insertAnswer( newAnswer, req.params.question_id, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

exports.markQHelpful = (req, callback) => {
  const question_id = req.params.question_id;
  model.incQHelpful(question_id, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

exports.reportQuestion = (req, callback) => {
  const question_id = req.params.question_id;
  model.updateQReport(question_id, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

exports.markAHelpful = (req, callback) => {
  const answer_id = req.params.answer_id;
  model.incAHelpful(answer_id, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

exports.reportAnswer = (req, callback) => {
  const answer_id = req.params.answer_id;
  model.updateAReport(answer_id, (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

