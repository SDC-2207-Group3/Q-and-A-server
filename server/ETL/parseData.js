const csv = require('csv-parser');
const fs = require('fs');
const model = require('../models/mongoModel.js');
const answerPics = {};
const answerResults ={};
const qaData = {};
const readyData = [];

//============PARSE CSV DATA===================
        //Answer picture CSV data
fs.createReadStream('/Users/amberly/hackreactorSEI/Q-and-A-server/server/oldData/answers_photos.csv')
  .pipe(csv())
  .on('data', (row) => {
    if(answerPics[row.answer_id]){
      answerPics[row.answer_id].push(row.url);
     } else {
      answerPics[row.answer_id] = [row.url];
    }
  })
  .on('end', () => {
    console.log('pics parsed');
  //Answer CSV
    fs.createReadStream('/Users/amberly/hackreactorSEI/Q-and-A-server/server/oldData/answers.csv')
    .pipe(csv())
    .on('data', (row) => {
      let currentRow =
        {
          body: row.body,
          date_written: parseInt(row.date_written),
          answerer_name: row.answerer_name,
          answerer_email: row.answerer_email,
          reported: parseInt(row.reported),
          helpful: parseInt(row.helpful),
          photos: answerPics[row.id] || []
        };
      if(answerResults[row.question_id]) {
        answerResults[row.question_id].push(currentRow);
      } else {
        answerResults[row.question_id] = [currentRow];
      }
      })
    .on('end', () => {
      console.log('answers parsed');
      //Question CSV data
      fs.createReadStream('/Users/amberly/hackreactorSEI/Q-and-A-server/server/oldData/questions.csv')
      .pipe(csv())
      .on('data', (row) => {
        let currentRow = {
          product_id: row.product_id,
          question_body: row.body,
          question_date: parseInt(row.date_written),
          asker_name: row.asker_name,
          asker_email: row.asker_email,
          reported: parseInt(row.reported),
          question_helpful: parseInt(row.helpful),
          answers: answerResults[row.id] || []
        };
      readyData.push(currentRow);
    })
      .on('end', () => {
        model.createMany(readyData);
      })
    })
  })









