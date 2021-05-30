/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import { Slider as MUSlider } from '@material-ui/core';
import React, { useState } from 'react';
// import PropTypes from 'prop-types'

// TODO: = Auto Ticks
// TODO: = Flip Tick Direction
// TODO: = Orientation
// Triggers: Thumb Position
const Slider = (props) => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;

  const min =
    Number.isNaN(control.properties.reservedString1) ||
    control.properties.reservedString1.length <= 0
      ? 0
      : parseInt(control.properties.reservedString1, 10);
  const max =
    control.properties.reservedUInt1 < 1 ? 1 : control.properties.reservedUInt1;
  const step =
    Number.isNaN(control.properties.reservedString2) ||
    control.properties.reservedString2.length <= 0
      ? 0
      : parseInt(control.properties.reservedString2, 10);

  const [value, setValue] = useState(min);

  // MACRO DEFINITIONS
  // provide macro access to state functions
  control.setStyle = setStyle;
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = (val) => {
    // Validate value
    const buffer = val ? val : 0;
    val = parseInt(buffer, 10); // Done to prevent strings of numbers from being passed and causing warnings

    setValue(val);
    control.value = val;
  };
  control.clear = () => {
    control.handleChange(min);
  };
  const handleChange = (event, newValue) => {
    control.handleChange(newValue);
  };

  /* console.log('(min, max, steps):', min, max, step,
    '(reservedString1, reservedString2, reservedUInt1):',
    control.properties.reservedString1, control.properties.reservedString2, control.properties.reservedUInt1); */

  // Control Info
  // reservedString1 = From
  // reservedUInt1 = Steps
  // reservedString2 = To; Note: This is used to create a range (From - To)

  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        ...disabled,
      }}
    >
      <MUSlider
        // padding='2px 0 2px 0'
        orientation="horizontal"
        // defaultValue={min}
        value={value}
        min={min}
        max={max}
        marks
        // step={step}
        valueLabelDisplay="auto"
        onChange={handleChange}
        onChangeCommitted={() => {
          if (control.EditChange) control.EditChange();
        }}
      />
    </div>
  );
};

export { Slider };
