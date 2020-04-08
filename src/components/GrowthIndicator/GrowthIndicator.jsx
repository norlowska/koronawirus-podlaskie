import React from 'react';
import './GrowthIndicator.css';

const GrowthIndicator = ({ count, ...props }) => {
  return (
    <div className='growth-indicator' {...props}>
      <span>+</span>
      {count}
    </div>
  );
};

export default GrowthIndicator;
