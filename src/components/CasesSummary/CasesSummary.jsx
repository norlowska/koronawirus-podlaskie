import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Counter } from '../index';
import './CasesSummary.css';
import Colors from '../../styles/_colors.scss';

const CasesSummary = () => {
  const { cases, deaths, cures } = useData();

  return (
    <div className='cases-summary'>
      <Counter data={cases.total} label={'zakażeń'} color={Colors.primaryLight} />
        <Badge variant='secondary' className='count-badge'>
          {sum}
        </Badge>
        zakażeń
      </div>
    </div>
  );
};

export default CasesSummary;
