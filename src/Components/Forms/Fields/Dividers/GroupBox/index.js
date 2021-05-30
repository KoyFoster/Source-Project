/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// A Rectangle that is 12 pixels short with label on top
// Triggers: none
const GroupBox = props => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);
  control.setStyle = setStyle;
  const strokeWidth = 1;

  return (
    <label
      style={{
        position: 'absolute',
        ...style,
        zIndex: undefined,
        background: 'transparent',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          height: style.height,
          width: style.width,
          background: 'transparent',
        }}
      >
        <rect
          style={{
            ...style,
            y: 12, // should be calulated by 1/2 font size
            height: `${style.height - 12}px`, // should be calulated by font size
            position: 'absolute',

            strokeWidth,
            stroke: 'lightgray', // TODO: Pull from the style or properties
            fill: 'none',
          }}
        />
      </svg>
      <label
        style={{
          position: 'absolute',
          ...style,
          top: 0,
          left: 12,
          width: 'auto',
          height: 'auto',
        }}
      >
        {control.label}
      </label>
    </label>
  );
};

export {GroupBox};
