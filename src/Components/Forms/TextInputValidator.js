import React, { useState } from 'react';

const TextInputValidator = (props) => {
  const { events } = props;
  const { defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  let invalid = false;
  const { blacklist } = props;

  const getStateStyle = () => {
    const style = {
      background: undefined,
      color: undefined,
      filter: undefined,
    };

    // console.warn('TIV blacklist:', blacklist);

    if (defaultValue !== value) {
      if (blacklist ? blacklist.search(`~${value}~`) > -1 : false) {
        invalid = false;
        style.background = 'red';
        style.color = 'white';
      } else {
        invalid = true;
        style.background = 'yellow';
        style.color = 'black';
      }
    } else {
      invalid = false;
    }

    return style;
  };

  return (
    <input
      type="text"
      value={value}
      style={getStateStyle()}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyDown={(e) => {
        // Revert to original value
        if (e.key === 'Escape') {
          setValue(defaultValue);
        }
      }}
      {...(invalid ? events : {})}
    />
  );
};

export default TextInputValidator;
