const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const { error } = require('console');

const PORT = 8080;

const app = express();

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost/unit11test'
    : 'mongodb://localhost/unit11dev';
mongoose.connect(mongoURI);

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 * in req.body
 */
app.use(express.json());
app.use(express.urlencoded());

app.use('/client', express.static(path.resolve(__dirname, '../client')));

/**
 * root
 */
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

/**
 * signup
 */
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  sessionController.isLoggedIn,
  (req, res) => {
    // what should happen here on successful sign up?
    res.redirect('/secret');
  }
);

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
