import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CasesList, CasesMap, Header } from './components';
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
        </Row>
      </Container>
    </DataProvider>
  );
}

export default App;
