import React from 'react';
// import { ArrowUp } from 'react-bootstrap-icons';
import { useData } from '../../contexts/DataContext';
import { Counter } from '../index';
import './CasesSummary.css';
import Colors from '../../styles/_colors.scss';
import GrowthIndicator from '../GrowthIndicator/GrowthIndicator';

const CasesSummary = () => {
  const { cases, deaths, cures } = useData();

  return (
    <div className='cases-summary'>
      <div className='active-cases'>
        <Counter data={cases.total} label={'zakażeń'} color={Colors.primaryLight} />
        {cases.today > 0 && <GrowthIndicator count={cases.today} />}
      </div>
      <div className='deaths'>
        <Counter data={deaths.total} label={'zgonów'} color={Colors.negative} />
        {deaths.today > 0 && <GrowthIndicator count={deaths.today} />}
      </div>
      <div className='cures'>
        <Counter data={cures.total} label={'wyleczeń'} color={Colors.positive} />
        {cures.today > 0 && <GrowthIndicator count={cures.today} />}
      </div>
    </div>
  );
};

export default CasesSummary;
