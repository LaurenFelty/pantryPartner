const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemTypeSchema = new Schema({
  itemType: { type: String, required: true, unique: true },
  items: [
    {
      item: { type: String, required: true },
      qty: { type: Number, required: true, default: 0 },
    },
  ],
});

const ItemType = mongoose.model('ItemType', itemTypeSchema);

module.exports = ItemType;
