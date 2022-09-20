const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost/qanda');

//====Answer Picture Schema========
const picSchema = new Schema({
  url: String
})

const Pic = mongoose.model('Pic', picSchema);

//=========Answer Schema==========
const aSchema = new Schema({
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  photos: [picSchema]
})

const Answer = mongoose.model('Answer', aSchema);

//=======Question Schema =============
const qSchema = new Schema({
  product_id: {type: Number, index: true},
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
  answers: [aSchema]
})

const Quest = mongoose.model('Quest', qSchema);

//========Product Schema ================
// const qaSchema = new Schema({
//   _id: Number, //make sure to set this to product_id with each instance
//   questions: [qSchema]
// })

// const QandA = mongoose.model('QandA', qaSchema);


// exports.QandA = QandA;
exports.Quest = Quest;
exports.Answer = Answer;
exports.Pic = Pic;