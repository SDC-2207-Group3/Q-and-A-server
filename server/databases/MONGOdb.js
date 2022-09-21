const mongoose = require('mongoose');
require('dotenv').config();
const { Schema } = mongoose;
mongoose.connect(process.env.DB_URL);

// //====Answer Picture Schema========
// const picSchema = new Schema({
//   url: String
// })

// const Pic = mongoose.model('Pic', picSchema);

//=========Answer Schema==========
const aSchema = new Schema({
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  photos: []
})

const Answer = mongoose.model('Answer', aSchema);

//=======Question Schema =============
const qSchema = new Schema({
  product_id: {type: Number, index: true},
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  question_helpful: Number,
  answers: [aSchema]
})

qSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.question_id = _id;
  return object;
});

const Quest = mongoose.model('Quest', qSchema);

exports.Quest = Quest;
exports.Answer = Answer;