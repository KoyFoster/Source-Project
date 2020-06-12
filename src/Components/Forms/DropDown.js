/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

// TODO: Triggers: Drop Down, Close Up, Select OK, Select Cancel
// Note: I didn't notice that on the windows side that the currently selected list item is highlighted.  -
// This checks if the edit value has the same string as any list items and nothing else.
// TODO: The user needs to be able to edit the simple ComboBox
const DDCB = props => {
  const [checked, setChecked] = useState(false);
  const { style } = props;
  const { disabled } = props;
  const { onChange } = props;
  const onCheck = val => {
    setChecked(val);
  };

  return (
    <label
      className="pushlike"
      style={{
        position: 'relative',
        width: '20px',
        height: /* style.position === 'relative' ? 'auto' : */ '100%',
        cursor: 'pointer',

        background: checked ? '#a5a39d' : 'linear-gradient(#f7f2f6,#b2ac9e)',
      }}
    >
      <input
        {...(props.dataset ? props.dataset : undefined)} // used for grid indexing
        type="checkbox"
        style={{
          visibility: 'hidden',
          ...disabled,
        }}
        onChange={e => {
          onCheck(e.target.checked);
          if (onChange) onChange(e);
        }}
      />
    </label>
  );
};

const DropDown = props => {
  const { style } = props;
  const { bVisible } = props;
  const zIndex = style.zIndex ? style.zIndex : 1;

  // return
  return (
    <div
      style={{
        ...style,
        zIndex: bVisible ? '10000' : zIndex,
        height: bVisible ? style.height : 0,
        width: style.width ? style.width : '100%',
        display: bVisible ? 'flex' : 'none',
        flexDirection: 'column',
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </div>
  );
};

export { DDCB, DropDown };
