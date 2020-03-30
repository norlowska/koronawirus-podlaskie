import React, { useState } from 'react';
import Moment from 'moment';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import MediaQuery from 'react-responsive';
import { CasesSummary } from '../index';
import { useData } from '../../contexts/DataContext';
import './CasesList.css';

const CasesList = () => {
  const [clicked, setClicked] = useState(false);
  const { counties, update, setSelectedCounty } = useData();

  const handleMouseEnter = county => {
    setSelectedCounty(county);
    setClicked(false);
  };

  const handleMouseLeave = county => {
    if (clicked) return;
    setSelectedCounty(null);
  };

  const handleOnClick = county => {
    setSelectedCounty(county);
    setClicked(true);
  };

  return counties ? (
    <Col md={4} className='cases-list'>
      <MediaQuery maxDeviceWidth={768}>
        <CasesSummary />
      </MediaQuery>
      <div className='cases-update'>
        <p>Ostatnia aktualizacja: {update ? Moment(update).format('DD.MM.YYYY HH:mm') : null}</p>
      </div>
      <MediaQuery minDeviceWidth={768}>
        <div className='list'>
          {counties &&
            counties.length &&
            counties.map(county => (
              <div
                className='list-item d-flex justify-content-between'
                key={county.code}
                onMouseEnter={() => handleMouseEnter(county)}
                onMouseLeave={() => handleMouseLeave(county)}
                onClick={() => handleOnClick(county)}
              >
                <div className='list-item-title'>{county.name}</div>
                <Badge variant='secondary' className='count-badge'>
                  {county.confirmedCases}
                </Badge>
              </div>
            ))}
        </div>
      </MediaQuery>
    </Col>
  ) : (
    <Col className='d-flex justify-content-center align-items-center'>
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </Col>
  );
};

export default CasesList;
