/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import './index.css';
import React from 'react';
import ObjUtil from '../../../../../Utilities/ObjUtil';

// TODO: Vertical and Horizontal Text Alignment properties
// Note/TODO: Currently the font props is taken and set, however, text is always "black" in VersaSuite,
// also it fails to apply the font effects(bold, italic, etc) from props
// TODO: Triggers: Double Clicked
const CheckBox = (props) => {
  // split properties
  const { checked } = props;
  const { children } = props;
  const { pushlike } = props;
  const cbProps = ObjUtil.getRemainingObj(props, {
    checked: 0,
    pushLike: 0,
    classNames: 0,
    hasBorder: 0,
    children: 0,
  });

  const cbStyle = pushlike === true ? { display: 'none' } : {};

  let className = 'cb_label';

  // check for passed classNames
  // this expects 2 classNames: 1 for a checked state (1), and 1 for everything else (0)
  if (props.classNames)
    if (props.classNames.length > 1) {
      className += pushlike
        ? checked
          ? props.classNames[1]
          : props.classNames[0]
        : ' nonpushlike';
    }
  if (className === 'cb_label') {
    className += pushlike
      ? checked
        ? ' pl_pushed'
        : ' pushlike'
      : ' nonpushlike';
  }

  // return
  return (
    <label className={className} style={props.style}>
      <input
        className="checkbox"
        type="checkbox"
        {...cbProps}
        style={{ ...cbStyle }}
      />
      {children}
    </label>
  );
};

export { CheckBox };
