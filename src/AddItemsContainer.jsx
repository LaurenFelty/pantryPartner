import React, { useState } from 'react';
import './styles/AddItemsContainer.scss';

function AddItemsContainer() {
  // State to hold form input values
  const [form, setForm] = useState({
    item: '',
    actionType: '',
    itemType: '',
    qty: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);

    if (form.actionType === 'add') {
      console.log('Adding item:', form);
      // Add item logic here
    } else if (form.actionType === 'delete') {
      console.log('Deleting item:', form);
      // Delete item logic here
    }
  };

  return (
    <div id='addItemsContainer'>
      <h1>Change Your Inventory: </h1>

      <form id='changeForm' onSubmit={handleSubmit}>
        <div className='entryElement'>
          <label htmlFor='actionType'>Action:</label>
          <select
            id='actionType'
            name='actionType'
            value={form.actionType}
            onChange={handleChange}
          >
            <option value='' disabled>
              Select an action
            </option>
            <option value='add'>Add</option>
            <option value='delete'>Delete</option>
          </select>
        </div>

        <div className='entryElement'>
          <label htmlFor='type'>Type:</label>
          <select
            id='itemType'
            name='itemType'
            value={form.itemType}
            onChange={handleChange}
          >
            <option value='' disabled>
              Select a type
            </option>
            <option value='recipe'>Recipe</option>
            <option value='dairyAndEggs'>Dairy & Eggs</option>
            <option value='produce'>Produce</option>
            <option value='bread'>Bread & Baked Items</option>
            <option value='spices'>Spices</option>
            <option value='snacks'>Snacks</option>
            <option value='meat'>Meat & Seafood</option>
            <option value='frozen'>Frozen</option>
            <option value='beverages'>Beverages</option>
            <option value='catTreats'>Cat Treats</option>
            <option value='others'>Others</option>
          </select>
        </div>

        <div className='entryElement'>
          <label htmlFor='item'>Item:</label>
          <input
            type='text'
            id='item'
            name='item'
            value={form.item}
            onChange={handleChange}
          />
        </div>

        <div className='entryElement'>
          <label htmlFor='qty'>Quantity:</label>
          <input
            type='number'
            id='qty'
            name='qty'
            value={form.qty}
            onChange={handleChange}
          />
        </div>
        <div id='buttonContainer'>
          <button id='submitButton' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItemsContainer;
