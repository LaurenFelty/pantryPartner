import React, { useState } from 'react';
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

const PantryContainer = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemData, setItemData] = useState(null); // State to store fetched data

  const handleClick = async (item, event) => {
    setSelectedItem(item);
    try {
      const response = await fetch(`/api/item/${item}`); // Adjust the API endpoint
      if (response.ok) {
        const data = await response.json();
        setItemData(data);

        // Calculate position of the popup relative to the click event
        setPopupPosition({ x: event.clientX, y: event.clientY });
      } else {
        console.error('Failed to fetch item data');
      }
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const handleClose = () => {
    setSelectedItem(null);
    setItemData(null);
  };

  return (
    <div id='pantryContainer'>
      <div id='sign'>
        <h3>Your Inventory</h3>
      </div>
      <div id='groceryContainer'>
        {groceryItems.map((item, index) => (
          <div
            key={index}
            className='groceryItem'
            onClick={(event) => handleClick(item, event)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Conditionally render the popup */}
      {selectedItem && (
        <div className='popupContainer'>
          <div className='popup-content'>
            <span className='close' onClick={handleClose}>
              X
            </span>
            <h2>{selectedItem}</h2>
            {itemData && (
              <div>
                {/* Render fetched data here */}
                {/* Example: <p>{itemData.description}</p> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PantryContainer;
