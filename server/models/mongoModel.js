const { Quest } = require('../databases/MONGOdb.js');
var ObjectId = require('mongoose').Types.ObjectId;

exports.createMany = (data) => {
  const cb = (err, result) => {
    if (err){
      console.log(err);
    } else {
      if (data.length > 0) {
        let batch = data.splice(0, 100);
        Quest.insertMany(batch, cb);
      } else {
        console.log('done inserting');
      }
    }
  }
  let firstBatch = data.splice(0, 100);
  Quest.insertMany(firstBatch, cb);
};

exports.createOne = (data, callback) => {
  //form the data as necessary
  //QandA.create({ info: , answers []})
};

exports.insertQuestion = (question, callback) => {
  Quest.create(question, (err, result) => {
    if(err){
      callback(err);
    }else {
      console.log('question added');
      callback(null);
    }
  })
};

exports.insertAnswer = (answer, id, callback) => {
  Quest.findOneAndUpdate({ _id: id }, { $push: {answers: answer} }, (err) => {
    if(err) {
      callback(err);
    }else {
      callback(null);
    }
  })
  //navigate to answersarray
  //insert new answer
}

exports.findQuestions = (id, count, callback) => {
  Quest.find({product_id: id}).limit(count).exec((err, results) => {
    if(err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
}

exports.findAnswers = (id, count, callback) => {
  Quest.find({ _id: id}).select('answers').exec((err, result) => {
    if(err) {
      callback(err);
    } else {
      console.log(result);
      callback(null, result);
    }
  });
}
