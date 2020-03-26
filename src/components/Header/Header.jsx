import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar variant='dark'>
        <Container fluid>
          <Navbar.Brand>Koronawirus w woj. podlaskim</Navbar.Brand>
          <Nav className='nav-right'>
            <Nav.Link href='https://www.gov.pl/web/koronawirus'>Informacje i zalecenia</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
