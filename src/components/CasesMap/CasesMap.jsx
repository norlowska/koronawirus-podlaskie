import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import { divIcon } from 'leaflet';
import { Map as LeafletMap, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { DataContext } from '../../contexts/DataContext';
import CountiesLayer from '../../powiaty-podlasie.json';
import './CasesMap.css';

const createMarkerIcon = confirmedCases => {
  return divIcon({
    html: `<div>${confirmedCases}</div>`,
    className: 'circle-marker',
    iconSize: [26, 26],
  });
};

const CasesMap = () => {
  const position = [53.275, 23.114];
  const zoom = 8;

  const countiesData = useContext(DataContext).counties;

  const hasConfirmedCases = code => {
    if (!countiesData) {
      return false;
    }
    const county = countiesData.find(countyData => countyData.code === code.toString());
    return county.confirmedCases > 0;
  };

  const handleClick = e => {
    const { lat, lng } = e.latlng;
    console.log(lat + ', ' + lng);
  };

  return (
    <Col md={8} className='cases-map px-0'>
      <LeafletMap center={position} zoom={zoom} maxZoom={11} minZoom={7} onclick={handleClick}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON
          data={CountiesLayer}
          style={feature => ({
            color: '#333',
            fillColor: hasConfirmedCases(feature.properties.JPT_KOD_JE) ? '#ed1c24' : 'transparent',
            weight: 2,
            fillOpacity: 0.4,
          })}
        />

        <MarkerClusterGroup maxClusterRadius={25}>
          {countiesData &&
            countiesData.map(({ name, code, location, confirmedCases }) =>
              confirmedCases > 0 ? (
                <Marker
                  key={`marker-${code}`}
                  position={location}
                  icon={createMarkerIcon(confirmedCases)}
                />
              ) : (
                undefined
              )
            )}
        </MarkerClusterGroup>
      </LeafletMap>
    </Col>
  );
};

export default CasesMap;
