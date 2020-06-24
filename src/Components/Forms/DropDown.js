/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';

// TODO: Triggers: Drop Down, Close Up, Select OK, Select Cancel
// Note: I didn't notice that on the windows side that the currently selected list item is highlighted.  -
// This checks if the edit value has the same string as any list items and nothing else.
// TODO: The user needs to be able to edit the simple ComboBox
const DDCB = (props) => {
  const [checked, setChecked] = useState(false);
  const { disabled } = props;
  const { onChange } = props;
  const onCheck = (val) => {
    setChecked(val);
  };

  return (
    <label
      className="pushlike"
      style={{
        position: 'relative',
        width: '20px',
        // height: /* style.position === 'relative' ? 'auto' : */ '100%',
        cursor: 'pointer',

        background: checked ? '#a5a39d' : 'linear-gradient(#f7f2f6,#b2ac9e)',
      }}
    >
      <input
        {...(props.dataset ? props.dataset : undefined)} // used for grid indexing
        type="checkbox"
        style={{
          visibility: 'hidden',
          ...disabled,
        }}
        onChange={(e) => {
          onCheck(e.target.checked);
          if (onChange) onChange(e);
        }}
      />
    </label>
  );
};

const DropDown = (props) => {
  // return
  const { style } = props;
  const { bVisible } = props;
  const zIndex = style.zIndex ? style.zIndex : 1;

  // get info from parent ref
  let top;
  let left;
  let width;

  if (props.parentRef && bVisible) {
    const BCR = props.parentRef.current.getBoundingClientRect();
    if (props.position === 'absolute') {
      top = `${BCR.height}px`;
      width = BCR.width;
    } else {
      const iTop = BCR.height + props.parentRef.current.offsetTop;
      top = `${iTop}px`;
      width = BCR.width;
    }
  }

  return (
    <div
      name="DropDown"
      style={{
        ...style,
        // position: 'fixed',
        position: 'absolute',
        zIndex: bVisible ? '10000' : zIndex,
        display: bVisible ? 'block' : 'none',
        flexDirection: 'column',
        background: 'white',
        border: '1px solid black',
        overflow: 'auto',

        top,
        left,
        width,
      }}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </div>
  );
};

export { DDCB, DropDown };
