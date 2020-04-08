import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { IoMdHelp } from 'react-icons/io';
import { useData } from '../../contexts/DataContext';
import { Counter } from '../index';
import './CasesSummary.css';
import Colors from '../../styles/_colors.scss';
import GrowthIndicator from '../GrowthIndicator/GrowthIndicator';

const CasesSummary = () => {
  const { cases, deaths, cures } = useData();
  const showTooltip = props => <Tooltip {...props}>Dzisiejsza zmiana</Tooltip>;

  return (
    <div
      className='cases-summary'
      style={cases.today || deaths.today || cures.today ? { width: 218 } : { width: 165 }}
    >
      <div className='active-cases'>
        <Counter data={cases.total} label={'zakażeń'} color={Colors.primaryLight} />
        {cases.today > 0 && (
          <OverlayTrigger overlay={showTooltip} trigger={'click'}>
            <div className='daily-growth-wrapper'>
              <GrowthIndicator count={cases.today} />
              <IoMdHelp className='info' />
            </div>
          </OverlayTrigger>
        )}
      </div>
      <div className='deaths'>
        <Counter data={deaths.total} label={'zgonów'} color={Colors.negative} />
        {deaths.today > 0 && (
          <OverlayTrigger overlay={showTooltip}>
            <div className='daily-growth-wrapper'>
              <GrowthIndicator count={deaths.today} />
            </div>
          </OverlayTrigger>
        )}
      </div>
      <div className='cures'>
        <Counter data={cures.total} label={'wyleczeń'} color={Colors.positive} />
        {cures.today > 0 && (
          <OverlayTrigger overlay={showTooltip}>
            <div className='daily-growth-wrapper'>
              <GrowthIndicator count={cures.today} />
            </div>
          </OverlayTrigger>
        )}
      </div>
    </div>
  );
};

export default CasesSummary;
