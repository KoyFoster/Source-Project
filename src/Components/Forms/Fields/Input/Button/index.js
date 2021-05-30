/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';

const Button = (props) => {
  const className = props.className ? props.className : 'pushlike';
  return <button {...props} className={className} type="button" />;
};

const ToggleButton = (props) => {
  const { checked } = props;
  const style = checked === true ? props.toggledStyle : props.style;
  const { onChange } = props;
  const { onClick } = props;
  const { onBlur } = props;
  const { onFocus } = props;
  const event = { onChange, onClick, onBlur, onFocus };

  const getLabel = (check) => {
    return Array.isArray(props.children)
      ? props.children[check ? 0 : 1]
      : props.children;
  };

  return (
    <button
      className="toggleButton"
      style={style}
      {...event}
      onClick={(e) => {
        e.target.value = getLabel(checked ? 0 : 1);
        onClick(e);
      }}
    >
      {getLabel(checked)}
    </button>
  );
};

export { Button, ToggleButton };
