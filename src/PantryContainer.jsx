import React from 'react';
import './styles/PantryContainer.scss';

function PantryContainer() {
  return (
    <div id='pantryContainer'>
      <div id='sign'>
        <h3>Your Inventory</h3>
      </div>

      <div id='groceryContainer'>
        <div className='groceryItem'>Dariy & Eggs</div>
        <div className='groceryItem'>Meats & Seafood</div>
        <div className='groceryItem'>Produce</div>
        <div className='groceryItem'>Frozen Items</div>
        <div className='groceryItem'>Bread & Baked Items</div>
        <div className='groceryItem'>Beverages</div>
        <div className='groceryItem'>Spices</div>
        <div className='groceryItem'>Cat Treats</div>
        <div className='groceryItem'>Snacks</div>
        <div className='groceryItem'>Others</div>
      </div>
    </div>
  );
}

export default PantryContainer;
