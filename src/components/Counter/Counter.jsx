import React from 'react';
import Badge from 'react-bootstrap/Badge';
import './Counter.css';

const Counter = ({ data, label, color }) => {
  // TODO: today's growth

  return (
    <div className='counter'>
      <Badge variant='secondary' className='counter-badge' style={{ backgroundColor: color }}>
        {data}
      </Badge>
      <span className='counter-label'>{label}</span>
    </div>
  );
};

export default Counter;
