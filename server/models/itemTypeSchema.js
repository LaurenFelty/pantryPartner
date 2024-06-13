const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the item schema
const itemSchema = new Schema({
  item: { type: String, required: true },
  qty: { type: Number, required: true, default: 0 },
});

// Define the item type schema
const itemTypeSchema = new Schema({
  itemType: { type: String, required: true, unique: true },
  items: [itemSchema],
});

// Create the ItemType model
const ItemType = mongoose.model('ItemType', itemTypeSchema);

module.exports = ItemType;
