// controllers/inventoryController.js
const Item = require('../models/itemModel');

const inventoryController = {};

inventoryController.changeInventory = async (req, res, next) => {
  try {
    const { actionType, type, itemType, qty } = req.body;

    const update = { type, itemType };
    if (actionType === 'add') {
      update.$inc = { qty: qty }; // increment the quantity
    } else if (actionType === 'delete') {
      update.$inc = { qty: -qty }; // decrement the quantity
    } else {
      return res.status(400).json({ error: 'Invalid action type' });
    }

    const updatedItem = await Item.findOneAndUpdate(
      { itemType: itemType },
      update,
      { new: true, upsert: true }
    );

    res.locals.item = updatedItem;
    return next();
  } catch (error) {
    console.error('Error updating inventory:', error);
    return res.status(500).json({ error: 'Error updating inventory' });
  }
};

module.exports = inventoryController;
