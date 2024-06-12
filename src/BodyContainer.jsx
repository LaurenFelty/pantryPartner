import React from 'react';
import LeftContainer from './LeftContainer.jsx';
import RightContainer from './RightContainer.jsx';
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
