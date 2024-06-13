import React, { useState } from 'react';
import './styles/SortByContainer.scss';
import './styles/PantryContainer.scss';

function SortByContainer() {
  //Declare a function to handle the onClick of the Out of Stock button

  return (
    <div id='SortByContainer'>
      <nav id='sortByBar'>
        <h1>Sort By: </h1>
        <div id='options'>
          <div id = 'recipe' className='groceryItem'>Recipes</div>
          <div className='groceryItem'>Out of Stock</div>
        </div>
      </nav>
    </div>
  );
}

export default SortByContainer;
