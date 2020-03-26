import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
