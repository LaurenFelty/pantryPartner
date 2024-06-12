import React from 'react';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import './styles/bodyContainer.scss';

function BodyContainer() {
  return (
    <div id='bodyContainer'>
      <LeftContainer />
      <RightContainer />
    </div>
  );
}

export default BodyContainer;
