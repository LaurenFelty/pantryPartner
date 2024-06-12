const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newItemSchema = new Schema({
  actionType: { type: String, required: true },
  type: { type: String, required: true },
  itemType: { type: String, unique: true, required: true },
  qty: { type: Number, required: true },
});

module.exports = mongoose.model('Item', newItemSchema);
