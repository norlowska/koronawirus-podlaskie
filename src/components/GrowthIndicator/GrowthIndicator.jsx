import React from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import './GrowthIndicator.css';

const GrowthIndicator = ({ count, ...props }) => {
  return (
    <div className='growth-indicator' {...props}>
      {count > 0 ? <BsArrowUp /> : count < 0 ? <BsArrowDown /> : null}
      {count !== 0 ? Math.abs(count) : 0}
    </div>
  );
};

export default GrowthIndicator;
