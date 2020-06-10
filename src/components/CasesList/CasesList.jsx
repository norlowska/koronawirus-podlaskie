import React, { useState } from 'react';
import Moment from 'moment';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import MediaQuery from 'react-responsive';
import { CasesSummary, Counter } from '../index';
import { useData } from '../../contexts/DataContext';
import compareValues from '../../helpers/compareValues';
import Colors from '../../styles/_colors.scss';
import './CasesList.css';

const CasesList = () => {
  const [clicked, setClicked] = useState(false);
  const { counties, updatedAt, setSelectedCounty } = useData();

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
    <Col md={6} lg={5} xl={4} className='cases-list'>
      <MediaQuery maxWidth={768}>
        <CasesSummary />
      </MediaQuery>
      <div className='cases-update'>
        <p>
          Ostatnia aktualizacja: {updatedAt ? Moment(updatedAt).format('DD.MM.YYYY HH:mm') : null}
        </p>
      </div>
      <MediaQuery minWidth={768}>
        <div className='list'>
          {counties &&
            counties.length &&
            counties.sort(compareValues('total cases', 'desc')).map(county => (
              <div
                className='list-item d-flex justify-content-between'
                key={county.code}
                onMouseEnter={() => handleMouseEnter(county)}
                onMouseLeave={() => handleMouseLeave(county)}
                onClick={() => handleOnClick(county)}
              >
                <div className='list-item-title'>{county.name}</div>
                <div className='counters'>
                  <Counter data={county['total cases']} color={Colors.primaryLight} />
                  <Counter data={county['total deaths']} color={Colors.negative} />
                  <Counter data={county['total cures']} color={Colors.positive} />
                </div>
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
