import React, { useState, useEffect } from 'react';
import MathDialogue from './MathDialogue';
import './Math.css';
import StatData from '../../../Projects/Stat Calculator Generator/StatData';
import { Popup } from '../Input/Helper';

const MathInput = (props) => {
  const { children } = props;
  const { data } = props;
  const Key = props.Key ? props.Key : props['data-key'];
  // get math property
  const { value } = props;
  const result = value ? value.result : 0;
  const expression = value ? value.expression : undefined;
  const vars = value ? value.vars : undefined;

  // console.log('MathInput:', { result, expression, vars });

  const { style } = props;
  const { onChange } = props;
  const { onClick } = props;
  const { onBlur } = props;
  const { onFocus } = props;
  const events = { onChange, onClick, onBlur, onFocus };

  // data sets
  let dataset = {};
  Object.keys(props).forEach((key) => {
    if (key.slice(0, 5) === 'data-') dataset[key] = props[key];
  });

  const [seen, setSeen] = useState(false);

  const togglePopup = () => {
    setSeen(!seen);
  };

  const component = (
    <MathDialogue
      {...dataset}
      key={Key}
      Key={Key}
      result={result}
      expression={expression}
      vars={vars}
      data={data}
      onAccept={(e) => {
        if (onChange) onChange(e);
        togglePopup();
      }}
      onCancel={() => {
        togglePopup();
      }}
    ></MathDialogue>
  );

  useEffect(() => {}, []);

  const calcValue =
    value && data ? StatData.GetCellValue(expression, vars, data) : undefined;
  return seen ? (
    // eslint-disable-next-line react/prop-types
    <Popup bToggle={togglePopup} component={component} />
  ) : (
    <button
      {...dataset}
      type="button"
      style={style}
      {...events}
      onClick={(e) => {
        if (onClick) onClick(e);
        togglePopup();
      }}
    >
      {value
        ? !Number.isNaN(calcValue) && calcValue !== undefined
          ? calcValue
          : 'Invalid'
        : children}
    </button>
  );
};

export default MathInput;
