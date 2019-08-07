const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;
// const {getHomePage} = require('./routes');

const db = mysql.createConnection ({
  port: '3306',
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'craft'
});
// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/api/hello', (req, res) => {
  let query = "SELECT * FROM tblCraft"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send({ express: 'I failed the DB' });
    }
    console.log(result[0].craftName)
    res.send({express: `I succeeded ${result[0].craftName}`})
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));