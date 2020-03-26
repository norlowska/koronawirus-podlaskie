import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CasesList, CasesMap, Header } from './components';
import compareValues from './helpers/compareValues';
import CasesJSON from './przypadki.json';
import Counties from './powiaty-podlasie.json';
import './App.css';

function App() {
  const [cases, setCases] = useState({});
  const [countyLayer, setCountyLayer] = useState();

  useEffect(() => {
    CasesJSON.counties.sort(compareValues('confirmedCases', 'desc'));
    setCases(CasesJSON);
    setCountyLayer(Counties);
  }, [cases]);

  return (
    <>
      <Header></Header>
      <Container fluid className='App'>
        <Row className='content'>
          <CasesList cases={cases}></CasesList>
          <CasesMap data={cases.counties} counties={countyLayer}></CasesMap>
        </Row>
      </Container>
    </>
  );
}

export default App;
