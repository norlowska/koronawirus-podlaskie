import React from 'react';
import Moment from 'moment';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import './CasesList.css';

const CasesList = ({ cases }) => {
  return (
    <Col md={4} className='cases-list'>
      <div className='counter'>
        <h3>
          <div className='circle-marker counter-value'>{cases.sum}</div>
          zakażeń
        </h3>
      </div>
      <div className='cases-update'>
        <p>Ostatnia aktualizacja: {Moment(cases.update).format('DD.MM.YYYY HH:mm')}</p>
      </div>
      <div className='list'>
        {cases.counties &&
          cases.counties.length &&
          cases.counties.map((county, index) => (
            <div className='list-item d-flex justify-content-between' key={county.code}>
              <div className='list-item-title'>{county.name}</div>
              <div className='list-item-value circle-marker'>{county.confirmedCases}</div>
            </div>
          ))}
      </div>
    </Col>
  );
};

export default CasesList;
