import React, { useState, useEffect } from 'react';
import Tree from './Forms/Tree';

// drop down class
const DropDown = (props) => {
  const { field } = props;
  const { DDContent } = props;
  const [DDref, setRef] = useState(React.createRef);
  const { CBL } = props;

  const [checked, setChecked] = useState(false);
  const [update, Update] = useState(false);
  const CB = (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => {
        setChecked(!checked);
        // console.log('DDref:', DDref);
      }}
    ></input>
  );

  // useEffect
  useEffect(() => {
    if (checked) DDref.focus();
  }, [checked]);

  return (
    <div>
      <div style={{ display: 'inline' }}>
        {CBL === 'left' ? CB : null}
        {field}
        {CBL === 'left' ? null : CB}
      </div>
      <div
        ref={(elem) => setRef(elem)}
        tabIndex="-1"
        style={{
          visibility: checked ? 'visible' : 'hidden',
          border: '1px dashed red',
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
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
  const input = <input type="text"></input>;
  const DD = (
    <div style={{ display: 'inline' }}>
      <input id={1} type="text"></input>
      <input id={2} type="text"></input>
      <input id={3} type="text"></input>
      <input id={4} type="text"></input>
    </div>
  );
  return (
    <div>
      <DropDown field={input} DDContent={DD} CBL="right"></DropDown>
    </div>
  );
};

export default Test;
