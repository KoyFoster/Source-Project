/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';

// TODO: Triggers: Drop Down, Close Up, Select OK, Select Cancel
// Note: I didn't notice that on the windows side that the currently selected list item is highlighted.  -
// This checks if the edit value has the same string as any list items and nothing else.
// TODO: The user needs to be able to edit the simple ComboBox

// drop down class
const DropDown = props => {
  const { fieldStyle } = props;
  const { ddStyle } = props;
  const { field } = props;
  const { content } = props;
  const { checked } = props;
  const { setChecked } = props;
  const [DDDim, setDim] = useState({
    top: undefined,
    left: undefined,
    width: undefined,
  });
  const [Fref, setFRef] = useState(React.createRef);
  const [DDref, setRef] = useState(React.createRef);
  const { CBL } = props;

  // Checkbox that will be used
  const CB =
    props.CB !== undefined ? (
      <props.CB
        checked={checked}
        onChange={() => {
          if (!checked && setChecked) setChecked(!checked);
        }}
      />
    ) : (
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          if (!checked && setChecked) setChecked(!checked);
        }}
      />
    );

  const updateDDPosition = () => {
    if (Fref) {
      const BCR = Fref.getBoundingClientRect();
      const iTop = BCR.height + BCR.y; /* + Fref.offsetTop */
      // console.log('BCR:', BCR, Fref.offsetTop);

      const dim = {
        top: `${iTop}px`,
        left: `${BCR.left}px`,
        width: BCR.width,
      };
      setDim(dim);
    }
    // console.log({
    //   top: DDDim.top,
    //   left: DDDim.left,
    //   width: DDDim.width,
    // });
  };

  // useEffect
  useEffect(() => {
    if (checked && DDref.current !== null) {
      DDref.focus();
      updateDDPosition();
    }
  }, [checked, DDref]);

  return (
    <div
      style={{
        display: 'block',
        height: '100%',
      }}
    >
      <div
        ref={elem => setFRef(elem)}
        style={{
          display: 'flex',
          ...fieldStyle,
          height: '100%',
        }}
      >
        {CBL === 'left' ? CB : null}
        {field}
        {CBL === 'left' ? null : CB}
      </div>
      <div
        ref={elem => setRef(elem)}
        tabIndex="-1"
        style={{
          maxHeight: '144px', // default
          overflow: 'auto', // default
          zIndex: 1,
          ...ddStyle,

          display: checked ? 'inline' : 'none',
          position: 'fixed',

          top: DDDim.top,
          left: DDDim.left,
          width: DDDim.width,
        }}
        onBlur={e => {
          if (checked && !e.currentTarget.contains(e.relatedTarget)) {
            if (setChecked) setChecked(false);
          }
        }}
      >
        {content}
      </div>
    </div>
  );
};

export {DropDown};
