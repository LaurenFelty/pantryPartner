const Item = require('../models/itemModel');

const inventoryController = {};

inventoryController.changeInventory = async (req, res, next) => {
  try {
    //deconstruct the parameters being sent from the front end
    const { actionType, item, itemType, qty } = req.body;

    // check to make sure that all the required fields have been entered
    if (!actionType || !item || !itemType || !qty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Apply functionality to the item
    const update = { item };
    if (actionType === 'add') {
      //add to the qty
      update.$inc = { qty: parseInt(qty) };
    } else if (actionType === 'delete') {
      //delete the passed qty
      update.$inc = { qty: -parseInt(qty) };
    } else {
      return res.status(400).json({ error: 'Invalid action type' });
    }

    // Find and update the item in the database
    const updatedItem = await Item.findOneAndUpdate(
      { item: item }, // Search for the item by its name
      update,
      { new: true, upsert: true } // Return the updated document and create if not exists
    );

    res.locals.item = updatedItem;
    return next();
  } catch (error) {
    console.error('Error updating inventory:', error);
    return res.status(500).json({ error: 'Error updating inventory' });
  }
};

inventoryController.getInventory = async (req, res, next) => {
  try {
    const { itemType } = req.query;

    // Basic validation
    if (!itemType) {
      return res.status(400).json({ error: 'Item Type parameter is required' });
    }

    // Query the database for all items of the specified type
    const items = await Item.find({ itemType: itemType });

    // If no items found, return a 404 status
    if (items.length === 0) {
      return res
        .status(404)
        .json({ error: 'No items found for the specified type' });
    }

    // Attach the items to res.locals and proceed to the next middleware
    res.locals.items = items;

    return next();
  } catch (error) {
    console.error('Error retrieving inventory:', error);
    return res.status(500).json({ error: 'Error retrieving inventory' });
  }
};

module.exports = inventoryController;
