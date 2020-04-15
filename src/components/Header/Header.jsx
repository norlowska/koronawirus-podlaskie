import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <div className='app-bar d-flex justify-content-between align-items-center'>
      <div className='logo-container'>
        <a href='/'>
          <h3>Koronawirus w woj. podlaskim</h3>
        </a>
      </div>
      <div className='sheets-link text-right'>
        <a
          href='https://docs.google.com/spreadsheets/d/1FACdElXTlOqp50giqxfXmfzPz8l_0_hrR0Xzy-TZiDk/edit?usp=sharing'
          target='_blank'
          rel='noopener noreferrer'
        >
          Wykresy i dane z raportów
        </a>
      </div>
    </div>
  );
};

export default Header;
