const { QandA, Quest, Answer, Pic } = require('../databases/MONGOdb.js');

const createMany = (data) => {
  const cb = (err, result) => {
    if (err){
      console.log(err);
    } else {
      if (data.length > 0) {
        let batch = data.splice(0, 100);
        QandA.insertMany(batch, cb);
      } else {
        console.log('done inserting');
      }
    }
  }
  let firstBatch = data.splice(0, 100);
  QandA.insertMany(firstBatch, cb);
};

const createOne = (data, callback) => {
  //form the data as necessary
  //QandA.create({ info: , answers []})
};

const insertQuestion = (data, callback) => {
  //look up given product_id
  //navigate to questions array
  //insert new question
};

const checkNewQuestion = (questionReq, callback) => {
  //check if provided productID exist in db
  //if yes
    //call insert question
    //successful? callback with data
  //otherwise
    //call create one
    //successful? callback with data
};

const insertAnswer = (answerReq, callback) => {
  //lookup given questonID
  //navigate to answersarray
  //insert new answer
}

exports.createMany = createMany;