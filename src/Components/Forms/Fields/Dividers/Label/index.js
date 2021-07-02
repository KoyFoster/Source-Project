import './index.css';
import React, { useState } from 'react';

const Label = (props) => {
  const { label, labelPos, children } = props;

  // Generate class names
  const orientation = ['', '', ''];
  if (label)
    switch (labelPos) {
      case 'left':
        orientation[0] = ' horizontal';
        orientation[1] = ' left';
        orientation[2] = ' right';
        break;
      case 'right':
        orientation[0] = ' horizontal';
        orientation[1] = ' right';
        orientation[2] = ' left';
        break;
      case 'top':
        orientation[0] = ' vertical';
        orientation[1] = ' top';
        orientation[2] = ' bottom';
        break;
      case 'bottom':
        orientation[0] = ' vertical';
        orientation[1] = ' bottom';
        orientation[2] = ' top';
        break;
    }

  console.error({ label, labelPos, children, orientation });
  return (
    <div className={`Label container${orientation[0]}`}>
      <label className={`Label${orientation[1]}`}>{label}</label>
      <div className={`Label${orientation[2]}`}>{children}</div>
    </div>
  );
};

export { Label };
