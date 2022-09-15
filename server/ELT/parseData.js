const csv = require('csv-parser');
const fs = require('fs');
const answerPics = {};
const answerResults={};
const qaResults= {};

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
          photos: answerPics[row.id]
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
      .on('data', (row) => qaResults[row.id] = {
        product_id: parseInt(row.product_id),
        body: row.body,
        date_written: parseInt(row.date_written),
        asker_name: row.asker_name,
        asker_email: row.asker_email,
        reported: parseInt(row.reported),
        helpful: parseInt(row.helpful),
        answers: answerResults[row.id]
      })
      .on('end', () => {
        for(let i = 0; i < 10; i++) {
          console.log(qaResults[i]);
        }
      })
    })
  })









