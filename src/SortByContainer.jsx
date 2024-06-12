import React from 'react';
import './styles/SortByContainer.scss';

function SortByContainer() {
  return (
    <div id='SortByContainer'>
      <nav id='sortByBar'>
        <h1>Sort By: </h1>
        <ul id='options'>
          <li className='item'>
            <a href='#'>Recipes</a>
          </li>
          <li className='item'>
            <a href='#'>Out of Stock</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SortByContainer;

// {/* <select id='options'>
//         <option value=''>--Please choose an option--</option>
//         <option value='Recipes'>Recipes</option>
//         <option value='outOfStock'>Out Of Stock</option>
//         {/* <option value='option3'>Option 3</option> */}
//       </select> */}
