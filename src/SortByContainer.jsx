import React, { useState } from 'react';
import './styles/SortByContainer.scss';
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

function SortByContainer() {
  //Set State to handle state change in data for out of stock items
  //Initailly it is set to null because there is no data
  //The setter funciton will be updated once the data is fetched from the server
  const [itemData, setItemData] = useState(null);
  //Declare a function to handle the onClick of the Out of Stock button
  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/outOfStock`);
      if (response.ok) {
        const data = await response.json();
        console.log('Data', data);
        //Update setter function with the fetched data
        setItemData(data);
      } else {
        console.error('Failed to fetch item data');
      }
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  //When the popup is closed the setItemData should be reset to null
  const handleClose = () => {
    setItemData(null);
  };

  return (
    <div id='SortByContainer'>
      <nav id='sortByBar'>
        <h1>Sort By: </h1>
        <div id='options'>
          <div id='recipe' className='groceryItem'>
            Recipes
          </div>
          <div className='groceryItem' onClick={handleClick}>
            Out of Stock
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SortByContainer;
