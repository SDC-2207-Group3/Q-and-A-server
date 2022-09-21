const { Quest } = require('../databases/MONGOdb.js');
const underscore = require('underscore');
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
}

exports.findQuestions = (id, count, callback) => {
  Quest.find({product_id: id, reported: false}).limit(count).exec((err, results) => {
    if(err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
}

exports.findAnswers = (id, count, callback) => {
  Quest.find({ _id: id }).select('answers').exec((err, results) => {
    if(err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });

}

exports.incQHelpful = (id, callback) => {
  Quest.findOneAndUpdate({ _id: id }, { $inc: {question_helpful: 1} }, (err) => {
    if(err) {
      callback(err);
    }else {
      callback(null);
    }
  })
}

exports.updateQReport = (id, callback) => {
  Quest.findOneAndUpdate({ _id: id }, {reported: true}, (err) => {
    if(err) {
      callback(err);
    }else {
      callback(null);
    }
  })

}

exports.incAHelpful = (id, callback) => {
  Quest.findOneAndUpdate({ 'answers._id': id }, { $inc: {'answers.$.helpful': 1} }, (err) => {
    if(err) {
      callback(err);
    }else {
      callback(null);
    }
  })
}

exports.updateAReport = (id, callback) => {
  Quest.findOneAndUpdate({ 'answers._id': id }, { 'answers.$.reported': true}, (err) => {
    if(err) {
      callback(err);
    }else {
      callback(null);
    }
  })
}
