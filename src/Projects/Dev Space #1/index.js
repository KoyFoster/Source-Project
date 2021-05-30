/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CheckListBoxDropDown, Edit } from '../../Components/Forms/Fields';
import { TextInputValidator } from '../../Components/Forms/Fields/Input';

const DevSpaceOne = (props) => {
  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  // const [strValue, setStrValue] = useState('23453');
  const [value, setValue] = useState([]);

  const [list] = useState([
    { value: 'one', id: 1 },
    { value: 'two', id: 2 },
    { value: 'three', id: 3 },
  ]);

  const handleChange = (e) => {
    setValue(e.target.data);
  };

  return (
    <div>
      <Edit></Edit>
      <TextInputValidator
        defaultValue={'stop'}
        blacklist={['Apples']}
      ></TextInputValidator>
      <CheckListBoxDropDown
        checked={checked}
        setChecked={setChecked}
        value={value}
        list={list}
        separator={','}
        onChange={(e) => {
          handleChange(e);
        }}
        style={{
          background: 'white',
          color: 'black',
          whiteSpace: 'wrap',
          border: '1px solid #505050',
          zIndex: 1,
        }}
      ></CheckListBoxDropDown>
    </div>
  );
};

export default DevSpaceOne;
