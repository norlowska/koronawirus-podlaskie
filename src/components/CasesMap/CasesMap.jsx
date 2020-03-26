import React from 'react';
import Col from 'react-bootstrap/Col';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './CasesMap.css';

const CasesMap = () => {
  const position = [53.128, 23.114];
  const zoom = 8;

  return (
    <Col md={8} className='cases-map px-0'>
      <LeafletMap center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      </LeafletMap>
    </Col>
  );
};

export default CasesMap;
