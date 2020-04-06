import React from 'react';
import { MdArrowUpward } from 'react-icons/md';
import './GrowthIndicator.css';

const GrowthIndicator = ({ count }) => {
  return (
    <div className='growth-indicator'>
      <MdArrowUpward />
      <span>{count}</span>
    </div>
  );
};

export default GrowthIndicator;
