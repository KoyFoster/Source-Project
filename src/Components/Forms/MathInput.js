import React, { useState } from 'react';
import '../../App.css';
import Popup from './Popup';
import MathDialogue from './MathDialogue';
import StatData from '../StatData';

const MathInput = (props) => {
  const { children } = props;
  const { data } = props;
  const { rootKey } = props;
  const Key = props.Key ? props.Key : props['data-key'];
  // get math property
  let { math } = props;
  // if math null, then get math from root
  if (math === undefined) {
    if (rootKey && Key) {
      const path = `${rootKey}~Values~${Key}`.split('~');
      const pathArr = path.slice(0, path.length - 1);
      pathArr.push('math');
      math = StatData.GetValue(pathArr, data);
    }
  }
  const expression = math ? math[0] : undefined;
  const vars = math ? math[1] : undefined;

  const { style } = props;
  const { onChange } = props;
  const { onClick } = props;
  const { onBlur } = props;
  const { onFocus } = props;
  const events = { onChange, onClick, onBlur, onFocus };
  // console.log('math:', math, 'vars:', vars, 'expression:', expression);

  const togglePopup = () => {
    setSeen(!seen);
  };

  const component = (
    <MathDialogue
      key={Key}
      Key={Key}
      expression={expression}
      vars={vars}
      onCancel={() => {
        togglePopup();
      }}
      onAccept={(e) => {
        if (onChange) onChange(e, Key);
        togglePopup();
      }}
    ></MathDialogue>
  );

  const [seen, setSeen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="Button"
        style={{
          background: 'inherit',
          borderColor: 'inherit',
          borderWidth: '3px',
          borderStyle: 'solid',
          textAlign: 'center',
          ...style,
        }}
        {...events}
        onClick={(e) => {
          if (onClick) onClick(e);
          togglePopup();
        }}
      >
        {children}
      </button>
      {seen ? (
        // eslint-disable-next-line react/prop-types
        <Popup bToggle={togglePopup} component={component} />
      ) : null}
    </div>
  );
};

export default MathInput;
