// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const inventoryController = require('./controllers/inventoryController');

const app = express();
const PORT = 8080;

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost/unit11test'
    : 'mongodb://localhost/unit11dev';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use('/', express.static(path.resolve(__dirname, '../public')));

// Serve the main HTML file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// Endpoint to handle new item creation or updating inventory
app.post('/newItem', inventoryController.changeInventory, (req, res) => {
  res.status(200).json(res.locals.item);
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

module.exports = app;
