require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const { SERVER_PORT, DB_STRING, SESSION_SECRET} = process.env;
const authCtrl = require('./controllers/authController')

const app = express();
// let port = 4000;
app.use(express.json());

massive(DB_STRING)
  .then(db => {
    app.set('db', db);
    console.log('db connected');
  })
  .catch(err => console.log(err));

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    }
))

// backend endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

app.listen( SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));