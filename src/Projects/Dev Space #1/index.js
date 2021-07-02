/* eslint-disable no-unused-vars */
import './index.css';
import React, { useState } from 'react';
import { CheckListBoxDropDown, Edit } from '../../Components/Forms/Fields';
import {
  CheckBox,
  TextInputValidator,
} from '../../Components/Forms/Fields/Input';

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
      <div className="div2">
        <CheckBox pushlike style={{ width: '24px', height: '24px' }}>
          CB
        </CheckBox>
        <CheckBox style={{ width: '64px', height: '48px' }}>CB</CheckBox>
        <Edit label="Label" labelPos="bottom"></Edit>
        <TextInputValidator
          multiline={false}
          labelPos="right"
          label="Label"
          blacklist={['Apples']}
        ></TextInputValidator>
      </div>
      {/* <CheckListBoxDropDown
        pushlike
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
      ></CheckListBoxDropDown> */}
    </div>
  );
};

export default DevSpaceOne;
