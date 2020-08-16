import React, { useState, useEffect } from 'react';
import Tree from './Forms/Tree';

// drop down class
const DropDown = (props) => {
  const { field } = props;
  const { DDContent } = props;
  const { checked } = props;
  const { setChecked } = props;
  const [DDref, setRef] = useState(React.createRef);
  const [DDDim, setDim] = useState({
    top: undefined,
    left: undefined,
    width: undefined,
  });
  const [Fref, setFRef] = useState(React.createRef);
  const { CBL } = props;

  // Checkbox that will be used
  const CB = props.CB ? (
    <props.CB
      checked={checked}
      onChange={() => {
        if (!checked) setChecked(!checked);
      }}
    ></props.CB>
  ) : (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => {
        setChecked(!checked);
      }}
    />
  );

  const updateDDPosition = () => {
    if (Fref) {
      const BCR = Fref.getBoundingClientRect();

      const iTop = BCR.height + Fref.offsetTop;

      const dim = {
        top: `${iTop}px`,
        left: `${BCR.left}px`,
        width: BCR.width,
      };
      setDim(dim);
    }
    console.log({
      top: DDDim.top,
      left: DDDim.left,
      width: DDDim.width,
    });
  };

  // useEffect
  useEffect(() => {
    if (checked) {
      DDref.focus();
      updateDDPosition();
    }
  }, [checked]);

  return (
    <div>
      <div ref={(elem) => setFRef(elem)} style={{ display: 'inline' }}>
        {CBL === 'left' ? CB : null}
        {field}
        {CBL === 'left' ? null : CB}
      </div>
      <div
        ref={(elem) => setRef(elem)}
        tabIndex="-1"
        style={{
          display: checked ? 'flex' : 'none',
          position: 'fixed',

          top: DDDim.top,
          left: DDDim.left,
          // height: '100%',
          width: DDDim.width,
        }}
        onBlur={(e) => {
          if (checked && !e.currentTarget.contains(e.relatedTarget)) {
            setChecked(false);
          }
        }}
      >
        {DDContent}
      </div>
    </div>
  );
};

const Test = (props) => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelection = (e) => {
    setValue(e.target.value);
    setChecked(false);
  };

  const input = (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        handleChange(e);
      }}
      style={{ borderRight: 'none' }}
    />
  );
  const DD = (
    <div
      style={{
        display: 'inline',
        borderTop: '2px solid black',
        borderLeft: '2px solid black',
        borderBottom: '2px solid #767676',
        borderRight: '2px solid #767676',
      }}
    >
      <button
        id={1}
        type="push"
        value={'One'}
        onClick={(e) => handleSelection(e)}
      >
        One
      </button>
      <button
        id={2}
        type="push"
        value={'Two'}
        onClick={(e) => handleSelection(e)}
      >
        Two
      </button>
      <button
        id={3}
        type="push"
        value={'Three'}
        onClick={(e) => handleSelection(e)}
      >
        Three
      </button>
      <button
        id={4}
        type="push"
        value={'Four'}
        onClick={(e) => handleSelection(e)}
      >
        Four
      </button>
    </div>
  );
  const CheckBox = (props) => {
    const { checked } = props;
    const { children } = props;
    const { onChange } = props;

    return (
      <label
        style={{
          display: 'inline-block',
          width: '14px',

          borderTop: '2px solid black',
          borderLeft: 'none',
          borderBottom: '2px solid #767676',
          borderRight: '2px solid #767676',
          padding: '1px',
          textAlign: 'center',
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          style={{ display: 'none' }}
          onChange={onChange}
        />
        {checked ? '-' : '+'}
      </label>
    );
  };

  return (
    <div>
      <DropDown
        checked={checked}
        setChecked={setChecked}
        field={input}
        DDContent={DD}
        CBL="right"
        CB={CheckBox}
      ></DropDown>
    </div>
  );
};

export default Test;
