import React from 'react';
import SortByContainer from './SortByContainer';
import AddItemsContainer from './AddItemsContainer';
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
