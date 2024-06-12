import React from 'react';
import './styles/ProfileContainer.css';
import toastImage from './assets/toast-2.png';

function ProfileContainer() {
  return (
    <div id='profileContainer'>
      <img src={toastImage} alt='User Image' />
      <a href='#'>Username: Lauren Felty</a>
    </div>
  );
}

export default ProfileContainer;
