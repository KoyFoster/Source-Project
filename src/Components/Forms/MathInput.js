import React, { useState } from 'react';
import '../../App.css';
import Popup from './Popup';
import MathDialogue from './MathDialogue';
import StatData from '../StatData';

const MathInput = (props) => {
  const { children } = props;
  const { data } = props;
  const { rootKey } = props;
  const key = props['data-key'];
  // get math property
  let { math } = props;
  // if math null, then get math from root
  if (math === undefined) {
    if (rootKey && key) {
      const path = `${rootKey}~Values~${key}`.split('~');
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
  const component = (
    <MathDialogue expression={expression} vars={vars}></MathDialogue>
  );

  const [seen, setSeen] = useState(false);

  const togglePopup = () => {
    setSeen(!seen);
  };
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
