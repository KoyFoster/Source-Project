/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
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
  const { pushLike } = props;

  // delete undesired props from cbProps
  delete cbProps.pushLike;
  delete cbProps.style;
  delete cbProps.classNames;
  delete cbProps.hasBorder;
  delete cbProps.children;

  const cbStyle = pushLike === true ? { width: 0, visibility: 'hidden' } : {};

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
      className = pushLike
        ? checked
          ? props.classNames[1]
          : props.classNames[0]
        : 'nonpushlike';
    }
  if (className === '') {
    className = pushLike ? (checked ? 'pl_pushed' : 'pushlike') : 'nonpushlike';
  }

  // return
  return (
    <label className={className} style={props.style}>
      <input
        className="checkbox"
        type="checkbox"
        {...cbProps}
        style={{ ...cbStyle, alignSelf: 'center' }}
        {...events}
        onChange={(e) => {
          if (props.onChange) props.onChange(e);
        }}
      />
      {children}
    </label>
  );
};

const CheckBoxControl = (props) => {
  // handle incoming props: control, style
  const { control } = props;
  // In VersaSuite onClick is the onChange event. This needs to be handled this way for conistent behavior.
  const events = { ...props.events };
  const { onClick } = events;
  delete events.onClick;

  const { pushLike } = control.properties.propStyles;
  // eslint-disable-next-line no-unused-vars
  const [style, setStyle] = useState(props.style);
  // done so that the css overrides the default border style. This is handled differently as checkbox borders are always false
  const border = props.hasBorder === false ? { border: 'none' } : {};
  const { disabled } = style;
  const [checked, setChecked] = useState(() => {
    // eslint-disable-next-line react/prop-types
    let val = props.value ? 1 : 0;
    if (val === '') val = control.data ? 1 : 0;
    control.value = val;
    return val;
  });

  // MACRO DEFINITIONS
  // provide macro access to state functions
  control.setStyle = setStyle;
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = (val) => {
    setChecked(val);
    control.value = val;
  };
  const handleChange = () => {
    control.handleChange(checked ? 0 : 1);
  };
  control.clear = () => {
    control.handleChange(0);
  };
  control.getSelIndex = () => ({ type: 4, value: control.value + 1 });

  const disabledStyle = (selected) => {
    if (!disabled) return {};
    let buffer = { pointerEvents: disabled.pointerEvents };

    if (disabled.border && pushLike && !selected)
      buffer = { ...buffer, border: disabled.border };

    if (disabled.background && pushLike && !selected && disabled)
      buffer = { ...buffer, background: disabled.background };

    if (disabled.color && !selected)
      buffer = { ...buffer, color: disabled.color };

    return buffer;
  };

  // delete undesired keys from style object
  delete style.border;
  delete style.background;

  // return
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        display: 'flex',
        border: 'none',
      }}
    >
      <CheckBox
        checked={checked}
        pushLike={pushLike}
        style={{
          width: style.width,
          height: style.height,
          ...border,
          ...disabledStyle(checked),
        }}
        {...events}
        onChange={(e) => {
          handleChange(e);
          if (onClick) onClick(e);
        }}
      >
        {control.label}
      </CheckBox>
    </div>
  );
};

export { CheckBox, CheckBoxControl };
