/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';

// Note: This is currently on hold
// Note: This control does not accept changed to it's style in VS
const TreeGrid = (props) => {
  // Vars
  const { control } = props;

  // Tree Grid Props
  // Label, width, Form Cell Position (whatever that means)
  const returnStrAsTable = (str) => {
    const tableBuff = str.split('\n');
    for (let i = 0; i < tableBuff.length - 1; i) {
      tableBuff[i] = tableBuff[i].split(',');
      i += 1;
    }
    return tableBuff;
  };
  const TGP = () => returnStrAsTable(control.properties.reservedString1);
  TGP();

  // States ------------------------------------------------------------------------------------
  const [style, setStyle] = useState(props.style);
  const [data, setData] = useState([
    ['one', 'two', 'three', 'four', 'five'],
    [':one', 'two', 'three', 'four'],
  ]);
  const { disabled } = style;

  // Format TGP into usuable components
  const GetHeader = () => {
    const list = [];

    let i = 0;
    Columns.splice(0, Columns.length);
    const buffer = TGP().map(function cull(val) {
      if (val.length === 0) {
        i += 1;
        return <div key={`Col_${i - 1}`} />;
      }
      i += 1;
      Columns.push([`${val[1]}px`, val[2]]);
      return (
        <div
          key={`Col_${i - 1}`}
          style={{
            width: `${val[1]}px`,
            height: '20px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            margin: 'none',
            padding: '4px',
            background: '#ffffff',
            borderRight: '1px solid #e5e5e5',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          {val[0]}
        </div>
      );
    });
    return (
      <div
        key={`Col_${i - 1}`}
        style={{
          display: 'flex',
        }}
      >
        {buffer}
      </div>
    );
  }; // end of GetHeader
  const Columns = [];
  const Header = GetHeader();
  const [value, setValue] = useState(new Array(data.length));

  // Control Function Links
  control.setStyle = setStyle;
  control.setData = (newData) => {
    control.data = newData;
    setData(newData);
  };
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = (val) => {
    setValue(val);
    control.value = val;
  };
  control.clear = () => {
    control.handleChange('');
  };
  const handleChange = (val) => {
    control.handleChange(val);
  };

  const getItem = (itemData) => {
    // Validate
    if (!Array.isArray(itemData.value)) return <div />;

    // Create Row
    const buffer = [new Array(Columns.length)];
    // Add Cells
    let i = 0;
    for (i; i < Columns.length; i) {
      buffer[i] = (
        <div
          key={`cell_${itemData.index},${i}`}
          style={{
            width: Columns[i][0],
            height: '20px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            margin: 'none',
            padding: '4px',
            background: '#ffffff',
            borderRight: '1px solid #a0a0a0',
            borderBottom: '1px solid #a0a0a0',
          }}
        >
          {i < itemData.value.length ? itemData.value[i] : ''}
        </div>
      );
      i += 1;
    }
    // Additional columns is data exceeds them
    for (i; i < itemData.value.length; i) {
      buffer[i] = (
        <div
          key={`cell_${itemData.index},${i}`}
          style={{
            width: '48px',
            height: '20px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            margin: 'none',
            padding: '4px',
            background: '#ffffff',
            borderRight: '1px solid #a0a0a0',
            borderBottom: '1px solid #a0a0a0',
          }}
        >
          {itemData.value[i]}
        </div>
      );
      i += 1;
    }

    return (
      <div
        key={`cell_${itemData.index},${i}`}
        style={{
          display: 'flex',
        }}
      >
        {itemData.checkbox}
        {buffer}
      </div>
    );
  }; // End of getItem

  return (
    <div
      style={{
        ...style,
        position: style.position ? style.position : 'absolute',
        // ...disabled,
      }}
    >
      {control.label}
    </div>
  );
};

export { TreeGrid };
