const mysql = require('mysql2');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

const qadb = Promise.promisifyAll(connection, { multiArgs: true });

qadb.connectAsync()
  .then(() => console.log('Connected!'))
  .then(() => qadb.queryAsync('CREATE DATABASE IF NOT EXISTS QandA'))
  .then(() => qadb.queryAsync('USE QandA'))
  .then(() => {
    const queryQ = `CREATE TABLE IF NOT EXISTS questions(
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    question_body TEXT NOT NULL,
    qustion_date VARCHAR(150) NOT NULL,
    asker_name VARCHAR(60) NOT NULL,
    question_helpfulness INT NOT NULL DEFAULT 0,
    reported BOOLEAN DEFAULT 0,
    PRIMARY KEY(id))`;
    qadb.queryAsync(queryQ);
  })
  .then(() => {
    const queryA = `CREATE TABLE IF NOT EXISTS answers(
    id INT NOT NULL AUTO_INCREMENT,
    question_id INT NOT NULL,
    body TEXT NOT NULL,
    date VARCHAR(150) NOT NULL,
    answerer_name VARCHAR(60) NOT NULL,
    helpfulness INT NOT NULL DEFAULT 0,
    PRIMARY KEY(id))`
    qadb.queryAsync(queryA);
  })
  .then(() => {
    const queryP = `CREATE TABLE IF NOT EXISTS answer_pics(
      id INT NOT NULL AUTO_INCREMENT,
      answer_id INT NOT NULL,
      pic_url VARCHAR(250),
      PRIMARY KEY(id))`;
    qadb.queryAsync(queryP);
  })
  .catch((err) => console.log(err));

  //load data and refactor

  module.exports.qadb;