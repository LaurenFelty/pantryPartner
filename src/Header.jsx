import React from 'react';
import ProfileContainer from './ProfileContainer.jsx';
import './styles/Header.css';

function Header() {
  return (
    <div id='headerStyle'>
      <h3 id='titleBlock'>Pantry Partner</h3>
      <ProfileContainer />
    </div>
  );
}

export default Header;
