import React, { useState } from 'react';
import Drag from './Forms/Drag';
import TreeDropDown from './Forms/TreeDropDown';

const Test2 = (props) => {
  const TDD = (props) => {
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    return (
      <TreeDropDown
        // {...dataset}
        style={{
          border: '1px solid red',
          background: 'white',
        }}
        ddStyle={{ maxHeight: '128px', overflow: 'auto', background: 'white' }}
        // vertical scroll
        string={value}
        id={props.id}
        nodes={[
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
          {
            label: '123',
            value: `123`,
            children: undefined,
          },
        ]}
        checked={checked}
        setChecked={setChecked}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    );
  };

  const getDDs = () => {
    const buffer = [];
    const size = 6;
    for (let i = 0; i < size; i) {
      buffer.push(<TDD key={i} id={i} />);
      i += 1;
    }
    return buffer;
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
      {getDDs()}
    </div>
  );
};

export default Test2;
