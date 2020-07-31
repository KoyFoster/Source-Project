import React from 'react';
import '../../App.css';

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
    <label
      className="toggleButton"
      style={{
        background: 'inherit',
        borderColor: 'inherit',
        borderWidth: '3px',
        borderStyle: 'solid',
        textAlign: 'center',
        ...style,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        value={getLabel(checked)}
        style={{ width: '0px', height: '0px', display: 'none' }}
        {...event}
        onChange={(e) => {
          e.target.value = getLabel(e.target.checked);
          onChange(e);
        }}
      />
      {getLabel(checked)}
    </label>
  );
};

export default ToggleButton;
