/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { RTF } from './RTF';
import './RE.css';
import { setSyntheticLeadingComments } from 'typescript';

// Steps to accomplishing this
// tracking caret positions
// Tracking current context
// 1. This context could be as simple as track element is focused,
// which would mean you would be editing that element
//  a. Adding text only add to that element
//  b. subtracting from the current element would involve an index check
//   i. if at the begginning, then affect the previous element or do nothing if at the start of editor
//  c. modifying the style of the currently element would either mod the current character or
//  mod the current sel
//   i. modifying the current select would or could involve several selected elements.
//   ii. Might be worth creating sel logic before this step.

// TODO: Max Text
const RichEdit = (props) => {
  // key states: ctrl, etc
  const [ctrl, setCtrl] = useState(false);

  const { overflow } = props;
  const { disabled } = props;
  // eslint-disable-next-line no-unused-vars
  let temp = [];
  const [elements, Update] = useState([
    { style: { fontWeight: 'initial' }, value: '' },
  ]);
  const [sel, setSel] = useState(0);
  const [caretPos] = useState(
    <div
      className="cursor-caret"
      id="cursor-caret"
      style={{
        width: '2px',
        // height: `100%`,
      }}
    />,
  );

  const renderElements = () => {
    let i = 0;
    return elements.map((l) => {
      return (
        <div key={i++} style={{ ...l.style }}>
          {l.value}
        </div>
      );
    });
  };

  const renderSelection = () => {
    return <div style={elements[sel].style}>{elements[sel].value}</div>;
  };

  const handleKey = (key) => {
    console.warn('handleKey:', key);

    elements[sel].value = elements[sel].value + key;
    Update([...elements]);
  };

  const handleSpecialKeyCombo = (key) => {
    console.warn('handleSpecialKeyCombo:', key);

    if (ctrl) {
      if (key === 'b') {
        const { style } = elements[sel];
        style.fontWeight = style.fontWeight === 'bold' ? 'normal' : 'bold';
        Update([...elements]);
      }
    }
  };

  const handleSpecialKeyDown = (key) => {
    if (key == 'Backspace') {
      elements[sel].value = elements[sel].value.slice(
        0,
        elements[sel].value.length - 1,
      );
      Update([...elements]);
    }
  };

  const handleSpecialStates = (key, down = false) => {
    // console.warn('handleSpecialStates:', { key, down });
    if (key === 'Control') {
      setCtrl(down);
    }
  };

  console.warn('sel:', elements[sel]);
  return (
    <div
      tabIndex="0" // requires for onkey events
      style={{
        border: '2px dashed green',
        width: '512px',
        height: '256px',
        background: '#BBBBBB',
      }}
      onKeyPress={(e) => {
        handleKey(e.key);
      }}
      onKeyDownCapture={(e) => {
        handleSpecialStates(e.key, true);
        handleSpecialKeyCombo(e.key);
        handleSpecialKeyDown(e.key);
      }}
      onKeyUpCapture={(e) => {
        handleSpecialStates(e.key, false);
      }}
      // onKeyPress

      // onHighlight
    >
      <div style={{ display: 'flex' }}>
        <button>{ctrl ? 'CTRL' : 'ctrl'}</button>
      </div>
      <div
        style={{
          display: 'flex',
          overflow: overflow,
        }}
      >
        {renderElements()}
        {caretPos}
      </div>
      {/* {renderSelection()} */}
    </div>
  );
};

export default RichEdit;
