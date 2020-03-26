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
    <div className='App'>
      <Header></Header>
      <Container fluid className='content'>
        <CasesList cases={cases}></CasesList>
        <CasesMap cases={cases} county={countyLayer}></CasesMap>
      </Container>
    </div>
  );
}

export default App;
