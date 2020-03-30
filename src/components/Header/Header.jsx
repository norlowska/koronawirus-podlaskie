import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='app-bar d-flex justify-content-between'>
      <div className='logo-container'>
        <a href='/'>
          <h3>Koronawirus w woj. podlaskim</h3>
        </a>
      </div>
    </div>
  );
};

export default Header;
