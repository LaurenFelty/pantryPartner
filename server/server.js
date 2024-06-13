const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const inventoryController = require('./controllers/inventoryController'); // Ensure this path is correct
const cors = require('cors');
const app = express();
const PORT = 8080;

const mongoURI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost/pantrypartnertest'
    : 'mongodb://localhost/pantrypartnerdev';

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/', express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// Define your routes
app.post('/newItem', inventoryController.changeInventory, (req, res) => {
  if (!res.locals.items) {
    return res
      .status(500)
      .json({ error: 'Failed to process inventory change' });
  }
  return res.status(201).json({ items: res.locals.items });
});

app.get('/getInventory', inventoryController.getInventory, (req, res) => {
  if (!res.locals.items) {
    return res.status(500).json({ error: 'Failed to retrieve inventory' });
  }
  return res.status(200).json({ items: res.locals.items });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

module.exports = app;
