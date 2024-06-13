// import the itemTypeSchema
const ItemType = require('../models/itemTypeSchema');
//declare a object literal to hold the controller methods
const inventoryController = {};

// Change Inventory
inventoryController.changeInventory = async (req, res, next) => {
  try {
    //deconstruct the form information from the body
    const { actionType, item, itemType, qty } = req.body;

    //If any of the fields are missing then return an erro
    if (!actionType || !item || !itemType || !qty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    //
    let itemTypeRecord = await ItemType.findOne({ itemType: itemType }).exec();

    if (!itemTypeRecord) {
      itemTypeRecord = new ItemType({
        itemType: itemType,
        items: [{ item: item, qty: parseInt(qty) }],
      });
    } else {
      let itemRecord = itemTypeRecord.items.find((i) => i.item === item);

      if (itemRecord) {
        if (actionType === 'add') {
          itemRecord.qty += parseInt(qty);
        } else if (actionType === 'delete') {
          itemRecord.qty -= parseInt(qty);
          if (itemRecord.qty < 0) itemRecord.qty = 0;
        }
      } else {
        if (actionType === 'add') {
          itemTypeRecord.items.push({ item: item, qty: parseInt(qty) });
        } else {
          return res.status(400).json({ error: 'Item not found for deletion' });
        }
      }
    }

    const savedItemType = await itemTypeRecord.save();
    res.locals.items = savedItemType.items;
    return next();
  } catch (error) {
    return next(error); // Pass the error to the global error handler
  }
};

// Get Inventory
inventoryController.getInventory = async (req, res, next) => {
  try {
    const { itemType } = req.query;

    if (!itemType) {
      return res.status(400).json({ error: 'Item Type parameter is required' });
    }

    const itemTypeRecord = await ItemType.findOne({
      itemType: itemType,
    }).exec();

    if (!itemTypeRecord) {
      return res
        .status(404)
        .json({ error: 'No items found for the specified type' });
    }

    res.locals.items = itemTypeRecord.items; // Only the items array
    return next();
  } catch (error) {
    console.error('Error retrieving inventory:', error);
    return next(error); // Pass the error to the global error handler
  }
};

module.exports = inventoryController;
