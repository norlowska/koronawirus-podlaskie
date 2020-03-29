import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CasesList, CasesMap, Header, ButtonsGroup } from './components';
import { DataProvider } from './contexts/DataContext';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Header />
      <Container fluid className='App'>
        <Row className='content'>
          <CasesList />
          <CasesMap />
          <ButtonsGroup />
        </Row>
      </Container>
    </DataProvider>
  );
}

export default App;
