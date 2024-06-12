import React from 'react';
import ProfileContainer from './ProfileContainer';
import './styles/Header.css';
import SortByContainer from './SortByContainer';

function Header() {
  return (
    <div id='headerStyle'>
      <h3 id='titleBlock'>Pantry Partner</h3>
      <ProfileContainer />
    </div>
  );
}

export default Header;
