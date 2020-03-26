import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CasesList, CasesMap, Header } from './components';
import CasesJSON from './przypadki.json';
import Counties from './powiaty-podlasie.json';
import './App.css';

function App() {
  const [cases, setCases] = useState([]);
  const [countyLayer, setCountyLayer] = useState();

  useEffect(() => {
    setCases(CasesJSON);
    setCountyLayer(Counties);
  }, []);

  return (
    <>
      <Header></Header>
      <Container fluid className='App'>
        <Row className='content'>
        <CasesList cases={cases}></CasesList>
        <CasesMap cases={cases} county={countyLayer}></CasesMap>
        </Row>
      </Container>
    </>
  );
}

export default App;
