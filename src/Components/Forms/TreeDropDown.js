/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { DDCB, DropDown } from './DropDown';
import Tree from './Tree';
// Note: This is currently a shell
const TreeDropDown = (props) => {
  // Vars
  const { data } = props;
  const { style } = props;
  const { disabled } = style;
  // This is the string representation of the selected items
  const value = props.value ? props.value : '';
  const { setValue } = props;
  const [dataValue, setDataValue] = useState('');
  const [checked, setChecked] = useState(false);

  // should expect a string bnut gets an array
  const handleChange = (val, arr) => {
    if (setValue) setValue(val);
    setDataValue(arr);
  };

  return (
    <div
      style={{
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'row',
        }}
      >
        {/* TextAreas must be hard coded */}
        <textarea
          value={value}
          style={{
            // hard code
            display: 'block',

            position: 'relative',
            width: '100%',
            resize: 'none',
            fontFamily: style.fontFamily,
            fontStyle: style.fontStyle,
            background: style.background,
            color: style.color,
            border: style.border,
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <DDCB
          style={{ position: 'relative' }}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
      </div>
      <DropDown
        bVisible={checked}
        style={{
          position: 'absolute',
          width: style.width,
          top: style.height,
          maxHeight: `${300 + style.border ? 2 : 0}px'`,
          border: style.border,
          zIndex: props.tabOrder,
        }}
      >
        <Tree
          listProps={props.listProps}
          treeProps={props.treeProps}
          style={{
            position: 'relative',
            maxHeight: '300px',
            ...disabled,
          }}
          {...props.events}
          data={data}
          value={dataValue}
          setValue={handleChange}
          // getItem={getItem} // has been made the default item format of Tree
        />
      </DropDown>
    </div>
  ); // control, style, disabled, value, data
};

export default TreeDropDown;
