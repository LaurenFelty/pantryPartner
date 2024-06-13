// import the itemTypeSchema
const ItemType = require('../models/itemTypeSchema');
//declare a object literal to hold the controller methods
const inventoryController = {};

// Change Inventory controllers: this controller check to see if an item is currently in inventory. If it is in inventory, then it will update the qty according to the req.body. If the item is not in inventory, then it will add the new item and qty. This controller is called when a post request is made to /newItem

inventoryController.changeInventory = async (req, res, next) => {
  try {
    //deconstruct the form information from the body
    const { actionType, item, itemType, qty } = req.body;

    //If any of the fields are missing then return an error
    if (!actionType || !item || !itemType || !qty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    //Decalre a variable called itemTypeRecorded. This variable looks in the ItemType collection to find an itemType (aka meat, dairyAndEggs, produce) that matches the provided itemType; .exec() executes the query and await makes the code wait until exec is resolved
    let itemTypeRecord = await ItemType.findOne({ itemType: itemType }).exec();

    //If the itemTypeRecorded is not found in our inventory then create a new ItemType Schema and add the provided information that we desconstructed from the body
    if (!itemTypeRecord) {
      itemTypeRecord = new ItemType({
        itemType: itemType,
        items: [{ item: item, qty: parseInt(qty) }],
      });
    }
    //Otherwise, the itemType is found and already in our database. Therefore, we need to search the items array associated with the itemType and see if the item (eggs, steak, apples) is listed in our database.
    else {
      let itemRecord = itemTypeRecord.items.find((i) => i.item === item);
      //If the item is found then we will update the item's qty accordingly
      if (itemRecord) {
        //Add the provided qty if the actionType === add
        if (actionType === 'add') {
          itemRecord.qty += parseInt(qty);
        }
        //Delete the provided qty if the actionType is === to delete
        else if (actionType === 'delete') {
          itemRecord.qty -= parseInt(qty);
          if (itemRecord.qty < 0) itemRecord.qty = 0;
        }
      }
      //Otherwise, the item is not found in the items array and we need to add the item to the items array along with the provided qty
      else {
        if (actionType === 'add') {
          itemTypeRecord.items.push({ item: item, qty: parseInt(qty) });
        } else {
          return res.status(400).json({ error: 'Item not found for deletion' });
        }
      }
    }

    //Finally... declare a constant called savedItemType. .save() will update the new itemTypeRecorded is it already exists in the database. Otherwise, it will create a new document
    const savedItemType = await itemTypeRecord.save();
    res.locals.items = savedItemType.items;
    //Return next() to move on to the next funciton in the chain
    return next();

    // Catch if there is an error
  } catch (error) {
    // Pass the error to the global error handler
    return next(error);
  }
};

// Get Inventory method. This methos is used when a get request is sent to the server to the address '/getInventory'. It will also include an itemType in the req
inventoryController.getInventory = async (req, res, next) => {
  try {
    //deconstruct the itemType from the req.query
    const { itemType } = req.query;

    //If the itemType is not provided thenn return an error
    if (!itemType) {
      return res
        .status(400)
        .json({ error: 'Item Type parameter is not found and is required' });
    }

    //Declare a constant called itemTypeRecord and find one in the database
    const itemTypeRecord = await ItemType.findOne({
      itemType: itemType,
    }).exec();

    //If the itemTpe (meat, produce, dairyAndEggs) is not found then return an error
    if (!itemTypeRecord) {
      return res
        .status(404)
        .json({ error: 'No items found for the specified type' });
    }
    //Assign the items array to the res.locals to be returned to the front end
    res.locals.items = itemTypeRecord.items;
    return next();
  } catch (error) {
    // Pass the global error handling
    console.error('Error retrieving inventory:', error);
    return next(error);
  }
};

module.exports = inventoryController;
