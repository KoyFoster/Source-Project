import React, { useState, useEffect } from 'react';
import '../../App.css';
import Popup from './Popup';
import MathDialogue from './MathDialogue';
import StatData from '../StatData';

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
      onCancel={() => {
        togglePopup();
      }}
      onAccept={(e) => {
        if (onChange) onChange(e);
        togglePopup();
      }}
    ></MathDialogue>
  );

  useEffect(() => {}, []);

  const calcValue = value
    ? StatData.GetCellValue(expression, vars, data)
    : undefined;
  return (
    <div>
      <button
        {...dataset}
        type="button"
        className="Button"
        style={{
          background: 'inherit',
          borderColor: 'inherit',
          borderWidth: '3px',
          borderStyle: 'solid',
          textAlign: 'center',
          ...style,
        }}
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
      {seen ? (
        // eslint-disable-next-line react/prop-types
        <Popup bToggle={togglePopup} component={component} />
      ) : null}
    </div>
  );
};

export default MathInput;
