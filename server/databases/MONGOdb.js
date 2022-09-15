const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qanda');

const qaSchema = new mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [{ id: Number, body: String, date: String, answerer_name: String, helpfulness: Number, photos: [{photo_id: Number, url: String}]}]
})

const QandA = mongoose.model('QandA', qaShema);

module.exports.QandA;