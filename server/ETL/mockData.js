const model = require('../models/mongoModel.js');

var mockDataOne = [
  {
    _id: '116',
    questions: [
      {
        body: 'What fabric is the top made of?',
        date_written: 1595884714409,
        asker_name: 'yankeelover',
        asker_email: 'first.last@gmail.com',
        reported: 0,
        helpful: 1,
        answers: [
          {
            body: 'this is body of first product',
            date_written: 1234567891012,
            answerer_name: 'nickandThack1',
            answerer_email: 'nickandThack1@gmail.com',
            reported: 0,
            helpful: 2,
            photos: []
          },
          {
            body: 'this is body of first product',
            date_written: 1234567891012,
            answerer_name: 'nickandThack1.5',
            answerer_email: 'nickandThack1.5@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}]
          }
        ]
      },
      {
        body: 'HEY THIS IS A WEIRD QUESTION!!!!?',
        date_written: 1613888219613,
        asker_name: 'jbilas',
        asker_email: 'first.last@gmail.com',
        reported: 1,
        helpful: 4,
        answers: [
          {
            body: 'this is body of first product',
            date_written: 1234567891013,
            answerer_name: 'nickandThackTwo',
            answerer_email: 'nickandThack2@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}, {url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}]
          },
          {
            body: 'this is body of second product',
            date_written: 1234567891013,
            answerer_name: 'nickandThack2.5',
            answerer_email: 'nickandThack2.5@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}]
          },
          {
            body: 'this is body of second product',
            date_written: 1234567891013,
            answerer_name: 'nickandThack2.8',
            answerer_email: 'nickandThack2.8@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}]
          }
        ]
      },
      {
        body: 'Does this product run big or small?',
        date_written: 1608535907083,
        asker_name: 'jbilas',
        asker_email: 'first.last@gmail.com',
        reported: 0,
        helpful: 8,
        answers: []
      }
    ]
  },
{
    _id: '145',
    questions: [
      {
        body: 'What fabric is the top made of?',
        date_written: 1595884714409,
        asker_name: 'yankeelover',
        asker_email: 'first.last@gmail.com',
        reported: 0,
        helpful: 1,
        answers: [
          {
            body: 'this is body of first product',
            date_written: 1234567891012,
            answerer_name: 'nickandThack1',
            answerer_email: 'nickandThack1@gmail.com',
            reported: 0,
            helpful: 2,
            photos: []
          },
          {
            body: 'this is body of first product',
            date_written: 1234567891012,
            answerer_name: 'nickandThack1.5',
            answerer_email: 'nickandThack1.5@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}]
          }
        ]
      },
      {
        body: 'HEY THIS IS A WEIRD QUESTION!!!!?',
        date_written: 1613888219613,
        asker_name: 'jbilas',
        asker_email: 'first.last@gmail.com',
        reported: 1,
        helpful: 4,
        answers: [
          {
            body: 'this is body of first product',
            date_written: 1234567891013,
            answerer_name: 'nickandThackTwo',
            answerer_email: 'nickandThack2@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}, {url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}]
          },
          {
            body: 'this is body of second product',
            date_written: 1234567891013,
            answerer_name: 'nickandThack2.5',
            answerer_email: 'nickandThack2.5@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}]
          },
          {
            body: 'this is body of second product',
            date_written: 1234567891013,
            answerer_name: 'nickandThack2.8',
            answerer_email: 'nickandThack2.8@gmail.com',
            reported: 0,
            helpful: 2,
            photos: [{url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "29038490//sjlsdj/sdfkjas/109328209"}, {url: "kslaksjdf908394jifd///ajpsdjof"}]
          }
        ]
      },
      {
        body: 'Does this product run big or small?',
        date_written: 1608535907083,
        asker_name: 'jbilas',
        asker_email: 'first.last@gmail.com',
        reported: 0,
        helpful: 8,
        answers: []
      }
    ]
  }
];

model.createMany(mockDataOne);