import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Counter } from '../index';
import './CasesSummary.css';
import Colors from '../../styles/_colors.scss';

const CasesSummary = () => {
  const { sum } = useData();

  return (
    <div className='cases-summary'>
      <Counter data={sum} label={'zakażeń'} color={Colors.primaryLight} />
        <Badge variant='secondary' className='count-badge'>
          {sum}
        </Badge>
        zakażeń
      </div>
    </div>
  );
};

export default CasesSummary;
