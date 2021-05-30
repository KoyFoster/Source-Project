/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// TODO: fails to apply the font effects(bold, italic, etc) from props
// Triggers: none
const Label = props => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;
  const [value, setValue] = useState(() => {
    let val = props.value ? props.value : '';
    if (val === '') val = control.label ? control.label : '';
    control.value = val;
    return val;
  });

  // MACRO DEFINITIONS
  // provide macro access to state functions
  const getColor = () => {
    const color = disabled ? disabled.color : style.color;
    if (!color) return style.color;
    return color;
  };
  control.setStyle = setStyle;
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = val => {
    setValue(val);
    control.value = val;
  };
  control.clear = () => {}; // Clearctrls never worked on Labels. Leave it as so
  const handleChange = e => {
    control.value = e.target.value;
    setValue(e.target.value);
  };

  return (
    <label
      {...(props.dataset ? props.dataset : undefined)} // used for grid indexing
      style={{
        ...style,
        position: style.position ? style.position : 'absolute',
        display: 'flex',
        overflow: 'hidden',
        color: getColor(),
      }}
    >
      {value}
      {/* {label} was originally {model.text} with the note below */}
      {/* NOTE not sure what this will be called */}
    </label>
  );
};

// Label.propTypes = {
//   tabOrder: PropTypes.number,
//   label: PropTypes.string,
//   dataId: PropTypes.number,
//   dataControlId: PropTypes.number,
//   style: PropTypes.object,
//   dataFieldId: PropTypes.number,
//   fieldType: PropTypes.number,
//   controlType: PropTypes.number,
//   // comEntryId: PropTypes.number,
//   pageEntryId: PropTypes.number,
// };

export {Label};
