/* eslint-disable react/no-unused-prop-types */
/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Triggers: Select, Get Focus, Lose Focus
const RadioButton = props => {
  const { control } = props;
  const { pushLike } = control.properties.propStyles;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(''); // When working with this control, the text value is passed around
  const [index, setIndex] = useState(0); // The index of the control is what is actually save to the DB
  const hButton = [];

  // radioButton Currenly not functional for RadioButton, but is for RadioPushButton
  // MACRO DEFINITIONS
  // provide macro access to state functions
  control.setStyle = setStyle;
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.getRadioIndex = () => ({ type: 4, value: control.index });
  // Assume all incoming values +1 the intended value
  control.setValue = val => {
    if (Number.isNaN(val)) return; // sometimes numbers come in as strings
    const iVal = parseInt(val, 10);
    const sVal = iVal === 0 ? '' : control.data[iVal - 1] ? control.data[iVal - 1][0] : '';

    // eslint-disable-next-line prefer-destructuring
    setValue(sVal);
    control.value = sVal;
    setIndex(iVal);
    control.index = iVal;
  };
  control.clear = () => {
    control.handleChange('');
    control.index = 0;
    setIndex(0);
  };
  // eslint-disable-next-line no-unused-vars

  // this is for use within this control only
  const GetIndex = () => index - 1;
  const handleChange = val => {
    // eslint-disable-next-line prefer-destructuring
    control.handleChange(val + 1);
  };

  const rbProps = control.properties.radioButtonProperties;

  const buttonHeight = `${rbProps.buttonHeight}px`;
  const buttonWidth = `${rbProps.buttonWidth}px`;
  const buttonMarginRight = `${rbProps.horizontalSeparator}px`;
  const buttonMarginBottom = `${rbProps.verticalSeparator}px`;

  const rowHeight = rbProps.buttonHeight + rbProps.verticalSeparator;
  const colWidth = rbProps.buttonWidth + rbProps.horizontalSeparator;

  const rows = rbProps.numberOfRows;
  const cols = rbProps.numberOfColumns;
  const nBtns = rbProps.numberOfButtons;

  const radioStyle = pushLike
    ? {
        visibility: 'hidden',
        display: 'none',
        opacity: '0',
        width: '0',
        height: '0',
      }
    : {
        display: 'inline-block',
        margin: '0 3px 0 0',
        cursor: 'pointer',
      };

  const disabledStyle = selected => {
    if (!disabled) return {};
    let buffer = { pointerEvents: disabled.pointerEvents };

    if (disabled.border && pushLike && !selected)
      buffer = { ...buffer, border: disabled.border };

    if (disabled.background && pushLike && !selected && disabled)
      buffer = { ...buffer, background: disabled.background };

    if (disabled.color && !selected)
      buffer = { ...buffer, color: disabled.color };

    return buffer;
  };

  const radioButton = (row, col, i) => {
    const keyString = props.id + (i + 1);
    return (
      <label
        key={keyString}
        style={{
          ...style,
          top: `${row * rowHeight}px`,
          left: `${col * colWidth}px`,
          height: buttonHeight,
          width: buttonWidth,
          marginRight: buttonMarginRight,
          marginBottom: buttonMarginBottom,
          position: 'absolute',
          display: 'flex',

          alignContent: 'left',
          alignItems: 'center',

          ...(pushLike
            ? {
                // eslint-disable-next-line indent
                border:
                  i === GetIndex() ? '1px solid #005499' : '1px solid #AAAAAA',
                background: i === GetIndex() ? '#cce4f7' : '#e1e1e1',
              }
            : {
                background: 'transparent',
              }),
          ...disabledStyle(i === GetIndex()),
        }}
      >
        <input
          style={{ ...radioStyle }}
          type="radio"
          name={`[${control.component.id}:${control.controlId}]_radio`}
          checked={i === GetIndex()}
          {...props.events}
          onClick={() => {
            handleChange(i);
            if (props.events.onClick) props.events.onClick();
          }}
          onChange={() => {}} // Done to clear warnings
        />
        {control.data[i][0] || ''}
      </label>
    );
  };

  let row;
  for (row = 0; row < rows; row += 1) {
    let col;
    for (col = 0; col < cols; col += 1) {
      if (hButton.length < nBtns) {
        hButton.push(radioButton(row, col, hButton.length));
      }
    }
  }
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        background: 'transparent',
      }}
    >
      {hButton}
    </div>
  );
};

RadioButton.propTypes = {
  control: PropTypes.object,
  style: PropTypes.object,
  id: PropTypes.any,
  events: PropTypes.any,
};

export {RadioButton};
