import React from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import './GrowthIndicator.css';

const GrowthIndicator = ({ count, ...props }) => {
  return (
    <div className='growth-indicator' {...props}>
      {count > 0 ? <BsArrowUp /> : <BsArrowDown />}
      {Math.abs(count)}
    </div>
  );
};

export default GrowthIndicator;
