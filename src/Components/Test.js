import React, { useState, useEffect } from 'react';
import ComboBox from './Forms/ComboBox';

const Test = (props) => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div
      style={
        {
          // position: 'absolute',
          // top: '100px',
          // left: '100px',
        }
      }
    >
      <ComboBox
        style={{ border: '2px dotted red', background: '#125346' }}
        list={['1', '2', '3', '4']}
        value={value}
        checked={checked}
        setChecked={setChecked}
        onChange={handleChange}
        CBL="right"
      ></ComboBox>
    </div>
  );
};

export default Test;
