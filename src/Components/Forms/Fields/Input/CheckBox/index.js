/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import './index.css';
import React, { useState } from 'react';

// TODO: Vertical and Horizontal Text Alignment properties
// Note/TODO: Currently the font props is taken and set, however, text is always "black" in VersaSuite,
// also it fails to apply the font effects(bold, italic, etc) from props
// TODO: Triggers: Double Clicked
const CheckBox = (props) => {
  // split properties
  const cbProps = { ...props };
  const { checked } = cbProps;
  const { children } = cbProps;
  const { pushlike } = props;

  // delete undesired props from cbProps
  delete cbProps.pushlike;
  delete cbProps.style;
  delete cbProps.classNames;
  delete cbProps.hasBorder;
  delete cbProps.children;

  const cbStyle = pushlike === true ? { width: 0, visibility: 'hidden' } : {};

  const events = {
    onClick: props.onClick,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  };

  let className = '';

  // check for passed classNames
  // this expects 2 classNames: 1 for a checked state (1), and 1 for everything else (0)
  if (props.classNames)
    if (props.classNames.length > 1) {
      className = pushlike
        ? checked
          ? props.classNames[1]
          : props.classNames[0]
        : 'nonpushlike';
    }
  if (className === '') {
    className = pushlike ? (checked ? 'pl_pushed' : 'pushlike') : 'nonpushlike';
  }

  // return
  return (
    <label className={className} style={props.style}>
      <input
        className="checkbox"
        type="checkbox"
        {...cbProps}
        style={{ ...cbStyle }}
        {...events}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
        }}
      />
      {children}
    </label>
  );
};

export { CheckBox };
