import React from 'react';
import Col from 'react-bootstrap/Col';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet';
import './CasesMap.css';

const CasesMap = ({ data, counties }) => {
  const position = [53.128, 23.114];
  const zoom = 8;

  const hasConfirmedCases = code => {
    const county = data.find(county => county.kod === code.toString());
    return county.potwierdzone > 0;
  };

  return (
    <Col md={8} className='cases-map px-0'>
      <LeafletMap center={position} zoom={zoom} maxZoom={11} minZoom={8}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON
          data={counties}
          style={feature => ({
            color: '#333',
            fillColor: hasConfirmedCases(feature.properties.JPT_KOD_JE) ? '#ed1c24' : 'transparent',
            weight: 2,
            fillOpacity: 0.4,
          })}
        />
      </LeafletMap>
    </Col>
  );
};

export default CasesMap;
