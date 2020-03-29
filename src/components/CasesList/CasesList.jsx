import React, { useContext } from 'react';
import Moment from 'moment';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import { DataContext } from '../../contexts/DataContext';
import './CasesList.css';

const CasesList = () => {
  const data = useContext(DataContext);

  return data.counties ? (
    <Col md={4} className='cases-list'>
      <div className='counter'>
        <h3>
          <Badge variant='secondary' className='count-badge'>
            {data.sum}
          </Badge>
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
              <Badge variant='secondary' className='count-badge'>
                {county.confirmedCases}
              </Badge>
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
