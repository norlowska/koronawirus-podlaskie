import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useData } from '../../contexts/DataContext';
import { Counter } from '../index';
import './CasesSummary.css';
import Colors from '../../styles/_colors.scss';
import GrowthIndicator from '../GrowthIndicator/GrowthIndicator';

const CasesSummary = () => {
  const { cases, deaths, cures, activeCases } = useData();
  const showTooltip = props => <Tooltip {...props}>Dzisiejsza zmiana</Tooltip>;

  return (
    <div className='cases-summary'>
      <div className='cases'>
        <Counter data={cases.total} label={'zakażeń'} color={Colors.primaryLight} />
        {cases.today > 0 && (
          <OverlayTrigger overlay={showTooltip} trigger={'click'}>
            <div className='daily-growth-wrapper'>
              <GrowthIndicator count={cases.today} />
            </div>
          </OverlayTrigger>
        )}
      </div>
      <div className='cures'>
        <Counter data={cures.total} label={'wyzdrowień'} color={Colors.positive} />
        {cures.today > 0 && (
          <OverlayTrigger overlay={showTooltip}>
            <div className='daily-growth-wrapper'>
              <GrowthIndicator count={cures.today} />
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
      <div className='active-cases'>
        <Counter data={activeCases.total} label={'aktywnych przypadków'} color={Colors.active} />
        {activeCases.today > 0 && (
          <OverlayTrigger overlay={showTooltip}>
            <div className='daily-growth-wrapper'>
              <GrowthIndicator count={activeCases.today} />
            </div>
          </OverlayTrigger>
        )}
      </div>
    </div>
  );
};

export default CasesSummary;
