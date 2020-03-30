import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { useData } from '../../contexts/DataContext';
import './CasesSummary.css';

const CasesSummary = () => {
  const { sum } = useData();

  return (
    <div className='cases-summary'>
      <div className='active-cases'>
        <Badge variant='secondary' className='count-badge'>
          {sum}
        </Badge>
        zakażeń
      </div>
    </div>
  );
};

export default CasesSummary;
