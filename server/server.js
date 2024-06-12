// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const itemController = require('./controllers/itemController');
const cors = require('cors');
const app = express();
const PORT = 8080;

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost/pantrypartnertest'
    : 'mongodb://localhost/pantrypartnerdev';

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// Serve static files from the public directory
app.use('/', express.static(path.resolve(__dirname, '../public')));

// Serve the main HTML file for the root path
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// Endpoint to handle new item creation or updating inventory
app.post('/newItem', itemController.changeInventory, (req, res) => {
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

// Define a route to proxy requests to the back end
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:8080', // Your back end server address
//     changeOrigin: true,
//   })
// );

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy is running on port ${PORT}...`);
});

module.exports = app;
