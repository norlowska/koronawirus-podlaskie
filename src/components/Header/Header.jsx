import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar variant='dark'>
        <Navbar.Brand>Koronawirus w woj. podlaskim</Navbar.Brand>
        <Nav className='nav-right ml-auto'>
          <Nav.Link href='https://www.gov.pl/web/koronawirus'>Informacje i zalecenia</Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
