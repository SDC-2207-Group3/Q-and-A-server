const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qanda');

const qaSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number,
  answers: [{ id: mongoose.ObjectId, question_id: Number, body: String, date_written: Number, answerer_name: String, answerer_email: String, reported: Boolean, helpful: Number, photos: [{id: mongoose.ObjectId, answer_id: Number, url: String}]}]
})

const QandA = mongoose.model('QandA', qaShema);

module.exports.QandA;