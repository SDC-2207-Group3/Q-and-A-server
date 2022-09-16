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

exports.createMany = createMany;