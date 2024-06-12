const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemTypeSchema = new Schema({
  itemType: { type: String, required: true, unique: true },
  items: [
    {
      item: { type: String, required: true },
      qty: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('ItemType', itemTypeSchema);
