import React from 'react';
import '../../App.css';

const MathInput = (props) => {
  const { checked } = props;
  const style = checked === true ? props.toggledStyle : props.style;
  const { onChange } = props;
  const { onClick } = props;
  const { onBlur } = props;
  const { onFocus } = props;
  const event = { onChange, onClick, onBlur, onFocus };

  const getLabel = () => {
    return Array.isArray(props.children)
      ? props.children[checked ? 0 : 1]
      : props.children;
  };

  return (
    <label
      className="Button"
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
        style={{ width: '0px', height: '0px', display: 'none' }}
        {...event}
      />
      {getLabel()}
    </label>
  );
};

export default MathInput;
