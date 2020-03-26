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
          <Badge pill variant='dark' className='cases-pill'>
            {cases.suma}
          </Badge>
          zakażeń
        </h3>
      </div>
      <div className='cases-update'>
        <p>Ostatnia aktualizacja: {Moment(cases.aktualizacja).format('DD.MM.YYYY HH:mm')}</p>
      </div>
      <div className='list'>
        {cases.powiaty &&
          cases.powiaty.length &&
          cases.powiaty.map((powiat, index) => (
            <div className='list-item d-flex justify-content-between' key={powiat.kod}>
              <div className='list-item-title'>{powiat.nazwa}</div>
              <div className='list-item-value'>{powiat.potwierdzone}</div>
            </div>
          ))}
      </div>
    </Col>
  );
};

export default CasesList;
