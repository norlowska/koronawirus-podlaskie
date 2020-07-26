import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import MediaQuery from 'react-responsive';
import { divIcon } from 'leaflet';
import { FaAsterisk } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Moment from 'moment';
import { Map as LeafletMap, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { CasesSummary, GrowthIndicator } from '../index';
import { useData } from '../../contexts/DataContext';
import CountiesLayer from '../../powiaty-podlasie.json';
import Colors from '../../styles/_colors.scss';
import './CasesMap.scss';

const createMarkerIcon = (confirmedCases, activeCasesTodayChange) => {
  return divIcon({
    html:
      '<div>' +
      confirmedCases +
      (activeCasesTodayChange > 0
        ? renderToString(<IoIosArrowUp className='arrow' />)
        : activeCasesTodayChange < 0
        ? renderToString(<IoIosArrowDown className='arrow' />)
        : '') +
      '</div>',
    className: 'circle-marker',
    iconSize: [58, 30],
  });
};

const CasesMap = () => {
  const position = [53.275, 23.114];
  const zoom = 8;
  const { counties: countiesData, selectedCounty, setSelectedCounty } = useData();
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  const hasConfirmedCases = code => {
    if (!countiesData) {
      return false;
    }
    const county = countiesData.find(countyData => countyData.code === code.toString());
    return county['total cases'] > 0;
  };

  const setActiveCounty = county => {
    setSelectedCounty(county);
  };

  return countiesData ? (
    <>
      <Col md={6} lg={7} xl={8} className='cases-map px-0'>
        <MediaQuery minWidth={768}>
          <CasesSummary />
        </MediaQuery>
        <LeafletMap center={position} zoom={zoom} maxZoom={11} minZoom={7}>
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
                hasConfirmedCases(county.code) ? (
                  <Marker
                    key={`marker-${county.code}`}
                    position={[county.lat, county.lon]}
                    icon={createMarkerIcon(
                      county['total cases'],
                      county['active cases today change']
                    )}
                    onMouseOver={() => setActiveCounty(county)}
                    onMouseLeave={() => setActiveCounty(null)}
                  ></Marker>
                ) : undefined
              )}

            {selectedCounty && (
              <Popup
                className='county-info-popup'
                position={[selectedCounty.lat, selectedCounty.lon]}
                onClose={() => setActiveCounty(null)}
              >
                <div>
                  <h4>{selectedCounty.name}</h4>
                  <div className='cases-info'>
                    Potwierdzone przypadki:
                    <span className='count'>{selectedCounty['total cases']}</span>
                    {selectedCounty['today cases'] > 0 && (
                      <GrowthIndicator count={selectedCounty['today cases']} />
                    )}
                  </div>
                  {selectedCounty['total cures'] > 0 && (
                    <div className='cures-info'>
                      Wyleczeni: <span className='count'>{selectedCounty['total cures']}</span>
                      {selectedCounty['today cures'] > 0 && (
                        <GrowthIndicator count={selectedCounty['today cures']} />
                      )}
                    </div>
                  )}
                  {selectedCounty['total deaths'] > 0 && (
                    <div className='deaths-info'>
                      Przypadki śmiertelne:
                      <span className='count'>{selectedCounty['total deaths']}</span>
                      {selectedCounty['today deaths'] > 0 && (
                        <GrowthIndicator count={selectedCounty['today deaths']} />
                      )}
                    </div>
                  )}
                  <div className='active-info'>
                    Aktywne przypadki:
                    <span className='count'>
                      {selectedCounty['active cases']}
                      {selectedCounty['others'].length > 0 && (
                        <FaAsterisk
                          className='notes-indicator'
                          onClick={() => setNotesModalOpen(true)}
                        />
                      )}
                    </span>
                    {selectedCounty['active cases today change'] !== 0 && (
                      <GrowthIndicator count={selectedCounty['active cases today change']} />
                    )}
                  </div>
                </div>
              </Popup>
            )}
          </MarkerClusterGroup>
        </LeafletMap>
      </Col>
      <Modal
        size='lg'
        show={notesModalOpen}
        onHide={() => setNotesModalOpen(false)}
        className='info-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Dodatkowe informacje o aktywnych przypadkach
            <div className='notes-county-name'>{selectedCounty && selectedCounty.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCounty &&
            selectedCounty.others.length &&
            selectedCounty.others.map((item, idx) => (
              <div className='notes-item' key={`${selectedCounty.code}_others_${idx}`}>
                <div className='notes-date'>{Moment(item.date).format('DD.MM.YYYY')}</div>
                <div className='notes-content'>
                  {item.notes}
                  <br />
                  <a href={item.source} target='_blank' rel='noopener noreferrer'>
                    Źródło
                  </a>
                </div>
              </div>
            ))}
        </Modal.Body>
      </Modal>
    </>
  ) : null;
};

export default CasesMap;
