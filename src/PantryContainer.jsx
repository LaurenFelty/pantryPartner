import React from 'react';
import './styles/PantryContainer.scss';

const groceryItems = [
  'Dariy & Eggs',
  'Meats & Seafood',
  'Produce',
  'Frozen Items',
  'Bread & Baked Items',
  'Beverages',
  'Spices',
  'Cat Treats',
  'Snacks',
  'Others',
];

const PantryContainer = () => (
  <div id='pantryContainer'>
    <div id='sign'>
      <h3>Your Inventory</h3>
    </div>

    <div id='groceryContainer'>
      {groceryItems.map((item, index) => (
        <div key={index} className='groceryItem'>
          {item}
        </div>
      ))}
    </div>
  </div>
);

export default PantryContainer;
