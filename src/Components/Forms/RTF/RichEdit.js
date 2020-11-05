/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import './RE.css';

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

  const onElemSel = (e) => {
    console.warn(`Sel Elm id:`, e.target.id);
  };

  const renderElements = () => {
    let i = 0;
    return elements.map((l) => {
      return (
        <div
          tabIndex="0"
          id={i}
          key={i++}
          style={{ ...l.style }}
          onClick={(e) => onElemSel(e)}
        >
          {l.value}
        </div>
      );
    });
  };

  // const renderSelection = () => {
  //   return <div style={elements[sel].style}>{elements[sel].value}</div>;
  // };

  const handleKey = (key) => {
    // console.warn('handleKey:', key);

    elements[sel].value = elements[sel].value + key;
    Update([...elements]);
  };

  const removeCurElement = () => {
    elements.splice(sel, 1);

    return sel - 1;
  };

  const addNewElement = () => {
    const newElem = { style: { ...elements[sel].style }, value: '' };

    // add element
    elements.push(newElem);

    return newElem;
  };

  const handleSpecialKeyCombo = (key) => {
    // console.warn('handleSpecialKeyCombo:', key);

    if (ctrl) {
      if (key === 'b') {
        // add element
        const elem = addNewElement();
        const newSel = sel + 1;

        // style new element
        const { style } = elem;
        style.fontWeight = style.fontWeight === 'bold' ? 'normal' : 'bold';

        setSel(newSel);
        Update([...elements]);
      }
    }
  };

  const handleSpecialKeyDown = (key) => {
    if (key == 'Backspace') {
      if (elements[sel].value !== '') {
        elements[sel].value = elements[sel].value.slice(
          0,
          elements[sel].value.length - 1,
        );
      } else {
        const newSel = removeCurElement();

        if (newSel > -1) {
          elements[newSel].value = elements[newSel].value.slice(
            0,
            elements[newSel].value.length - 1,
          );
          setSel(newSel);
        }
      }
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
  console.warn('getSelection:', window.getSelection());
  // anchorNode to extendNode
  // anchorNode.parentElement.id to extendNode.parentElement.id
  // The above should get the the range of elements to work with

  // More details:
  // selection {anchorNode: text, anchorOffset: 0, focusNode: text, focusOffset: 3, isCollapsed: false, …}
  // anchorNode: text
  // anchorOffset: 0
  // baseNode: text
  // baseOffset: 0
  // extentNode: text
  // extentOffset: 3
  // focusNode: text
  // focusOffset: 3
  // isCollapsed: false
  // rangeCount: 1
  // type: "Range"

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
