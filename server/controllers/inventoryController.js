const ItemType = require('../models/itemTypeModel');

const inventoryController = {};

nventoryController.changeInventory = async (req, res, next) => {
  try {
    // Destructure the parameters being sent from the front end
    const { actionType, item, itemType, qty } = req.body;

    // Check if all required fields are present
    if (!actionType || !item || !itemType || !qty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if itemType exists, create if not
    let itemTypeRecord = await ItemType.findOne({ itemType: itemType });
    if (!itemTypeRecord) {
      itemTypeRecord = new ItemType({ itemType: itemType, items: [] });
    }

    // Find the item in the items array
    let itemIndex = itemTypeRecord.items.findIndex((i) => i.item === item);

    // Update or create item in the items array based on actionType
    if (itemIndex !== -1) {
      // Item exists, update qty based on actionType
      if (actionType === 'add') {
        itemTypeRecord.items[itemIndex].qty += parseInt(qty);
      } else if (actionType === 'delete') {
        itemTypeRecord.items[itemIndex].qty -= parseInt(qty);
        if (itemTypeRecord.items[itemIndex].qty < 0) {
          itemTypeRecord.items[itemIndex].qty = 0; // Ensure qty doesn't go negative
        }
      } else {
        return res.status(400).json({ error: 'Invalid action type' });
      }
    } else {
      // Item does not exist, add new item
      if (actionType === 'add') {
        itemTypeRecord.items.push({ item: item, qty: parseInt(qty) });
      } else {
        return res.status(400).json({ error: 'Item not found for deletion' });
      }
    }

    // Save the updated itemType record
    await itemTypeRecord.save();

    res.locals.item = itemTypeRecord; // Return the updated itemType record
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

    // Query the database for the itemType
    const itemTypeRecord = await ItemType.findOne({ itemType: itemType });

    // If itemType not found, return a 404 status
    if (!itemTypeRecord) {
      return res
        .status(404)
        .json({ error: 'No items found for the specified type' });
    }

    // Attach the items to res.locals and proceed to the next middleware
    res.locals.items = itemTypeRecord.items;

    return next();
  } catch (error) {
    console.error('Error retrieving inventory:', error);
    return res.status(500).json({ error: 'Error retrieving inventory' });
  }
};

module.exports = inventoryController;
