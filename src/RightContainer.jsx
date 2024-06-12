import React from 'react';
import SortByContainer from './SortByContainer.jsx';
import AddItemsContainer from './AddItemsContainer.jsx';
import './styles/rightContainer.scss';

function RightContainer() {
  return (
    <div id='rightContainer'>
      <SortByContainer />
      <AddItemsContainer />
    </div>
  );
}

export default RightContainer;
