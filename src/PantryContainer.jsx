import React, { useState } from 'react';
import './styles/PantryContainer.scss';

const itemTypes = [
  { value: 'recipe', label: 'Recipe' },
  { value: 'dairyAndEggs', label: 'Dairy & Eggs' },
  { value: 'produce', label: 'Produce' },
  { value: 'bread', label: 'Bread & Baked Items' },
  { value: 'spices', label: 'Spices' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'meat', label: 'Meat & Seafood' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'catTreats', label: 'Cat Treats' },
  { value: 'others', label: 'Others' },
];

const PantryContainer = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [itemData, setItemData] = useState(null);

  const handleClick = async (itemType) => {
    setSelectedType(itemType.label); // Set selectedType to the label
    try {
      const response = await fetch(
        `http://localhost:8080/getInventory?itemType=${itemType.value}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Data', data);
        setItemData(data);
      } else {
        console.error('Failed to fetch item data');
      }
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const handleClose = () => {
    setSelectedType(null);
    setItemData(null);
  };

  return (
    <div id='pantryContainer'>
      <div id='sign'>
        <h3>Your Inventory</h3>
      </div>
      <div id='groceryContainer'>
        {itemTypes.map((itemType, index) => (
          <div
            key={index}
            className='groceryItem'
            onClick={() => handleClick(itemType)}
          >
            {itemType.label}
          </div>
        ))}
      </div>

      {/* Conditionally render the popup */}
      {selectedType && (
        <div className='popupContainer'>
          <div className='popup-content'>
            <span className='close' onClick={handleClose}>
              Exit
            </span>
            <h2>{selectedType}</h2>
            {itemData && Array.isArray(itemData) && (
              <div>
                {/* Render fetched data here */}
                {itemData.map((data, index) => (
                  <div key={index}>
                    <p>Item: {data.items}</p>
                    <p>Quantity: {data.qty}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PantryContainer;
