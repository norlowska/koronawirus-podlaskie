import React, { useContext, useEffect } from 'react';
import Moment from 'moment';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { DataContext } from '../../contexts/DataContext';
import './CasesList.css';

const CasesList = () => {
  const data = useContext(DataContext);

  return data.counties ? (
    <Col md={4} className='cases-list'>
      <div className='counter'>
        <h3>
          <div className='circle-marker counter-value'>{data.sum}</div>
          zakażeń
        </h3>
      </div>
      <div className='cases-update'>
        <p>
          Ostatnia aktualizacja:{' '}
          {data.update ? Moment(data.update).format('DD.MM.YYYY HH:mm') : null}
        </p>
      </div>
      <div className='list'>
        {data.counties &&
          data.counties.length &&
          data.counties.map(county => (
            <div className='list-item d-flex justify-content-between' key={county.code}>
              <div className='list-item-title'>{county.name}</div>
              <div className='list-item-value circle-marker'>{county.confirmedCases}</div>
            </div>
          ))}
      </div>
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
