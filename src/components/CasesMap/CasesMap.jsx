import React from 'react';
import Col from 'react-bootstrap/Col';
import MediaQuery from 'react-responsive';
import { divIcon } from 'leaflet';
import { Map as LeafletMap, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
// import { ArrowUp } from 'react-bootstrap-icons';
import { CasesSummary } from '../index';
import { useData } from '../../contexts/DataContext';
import CountiesLayer from '../../powiaty-podlasie.json';
import Colors from '../../styles/_colors.scss';
import './CasesMap.scss';
import GrowthIndicator from '../GrowthIndicator/GrowthIndicator';

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
  const { counties: countiesData, selectedCounty, setSelectedCounty } = useData();

  const hasConfirmedCases = code => {
    if (!countiesData) {
      return false;
    }
    const county = countiesData.find(countyData => countyData.code === code.toString());
    return county.cases.total > 0;
  };

  const handleClick = e => {
    const { lat, lng } = e.latlng;
    console.log(lat + ', ' + lng);
  };

  const setActiveCounty = county => {
    setSelectedCounty(county);
  };

  return countiesData ? (
    <Col md={6} lg={7} xl={8} className='cases-map px-0'>
      <MediaQuery minWidth={768}>
        <CasesSummary />
      </MediaQuery>
      <LeafletMap center={position} zoom={zoom} maxZoom={11} minZoom={7} onclick={handleClick}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON
          data={CountiesLayer}
          style={feature => ({
            color: '#333',
            fillColor: hasConfirmedCases(feature.properties.JPT_KOD_JE)
              ? Colors.primary
              : 'transparent',
            weight: 2,
            fillOpacity: 0.4,
          })}
        />

        <MarkerClusterGroup maxClusterRadius={25}>
          {countiesData &&
            countiesData.map(county =>
              county.cases.total > 0 ? (
                <Marker
                  key={`marker-${county.code}`}
                  position={county.location}
                  icon={createMarkerIcon(county.cases.total)}
                  onMouseOver={() => setActiveCounty(county)}
                  onMouseOut={() => setActiveCounty(null)}
                  onClick={() => setActiveCounty(county)}
                ></Marker>
              ) : undefined
            )}

          {selectedCounty && (
            <Popup
              className='county-info-popup'
              position={selectedCounty.location}
              onClose={() => setActiveCounty(null)}
            >
              <div>
                <h4>{selectedCounty.name}</h4>
                <div className='cases-info'>
                  Potwierdzone przypadki:
                  <span className='count'>{selectedCounty.cases.total}</span>
                  {selectedCounty.cases.today > 0 && (
                    <GrowthIndicator count={selectedCounty.cases.today} />
                  )}
                </div>
                {selectedCounty.deaths.total > 0 && (
                  <div className='deaths-info'>
                    Przypadki śmiertelne:
                    <span className='count'>{selectedCounty.deaths.total}</span>
                    {selectedCounty.cures.today > 0 && (
                      <GrowthIndicator count={selectedCounty.deaths.today} />
                    )}
                  </div>
                )}
                {selectedCounty.cures.total > 0 && (
                  <div className='cures-info'>
                    Wyleczeni: <span className='count'>{selectedCounty.cures.total}</span>
                    {selectedCounty.cures.today > 0 && (
                      <GrowthIndicator count={selectedCounty.cures.today} />
                    )}
                  </div>
                )}
              </div>
            </Popup>
          )}
        </MarkerClusterGroup>
      </LeafletMap>
    </Col>
  ) : null;
};

export default CasesMap;
