import React, { useState } from 'react';
import { Select } from '@material-ui/core';

function ComboBox(props) {
  const [value, setValue] = useState(props.value);

  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <Select
        style={{ width: '24px', height: 'auto', color: 'transparent' }}
        defaultValue={props.defaultValue}
        onChange={(e) => {
          setValue(e.target.value.label);
          if (props.onChange) props.onChange(e);
        }}
      >
        {props.children}
      </Select>
      <input
        style={{
          height: 'auto',
          textAlign: 'center',
          color: 'white',
          flexGrow: 1,
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: '1px solid #c7c7c7',
          margin: 'none',
          padding: 'none',
        }}
        type="text"
        value={value}
        // This needs to be fixed as it becomes readonly when applying templates
        onChange={(e) => {
          setValue(e.target.value);
          if (props.setValue) props.setValue(e.target.value);
          if (props.onEdit) props.onEdit(e);
        }}
      />
    </div>
  );
}

export default ComboBox;
