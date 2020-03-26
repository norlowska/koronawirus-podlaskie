import React from 'react';
import Moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import './CasesList.css';

const CasesList = ({ cases }) => {
  return (
    <Col lg={4} className='cases-list'>
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
      <Col className='list'>
        {cases.powiaty &&
          cases.powiaty.length &&
          cases.powiaty.map((powiat, index) => (
            <Row className='list-item' key={powiat.kod}>
              <Col md={10} className='list-item-title'>
                {powiat.nazwa}
              </Col>
              <Col md={2} className='list-item-value'>
                {powiat.potwierdzone}
              </Col>
            </Row>
          ))}
      </Col>
    </Col>
  );
};

export default CasesList;
