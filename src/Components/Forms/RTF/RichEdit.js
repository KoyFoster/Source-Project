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
  const [elements, Update] = useState([
    { style: { fontWeight: 'initial' }, value: 'One' },
    { style: { fontWeight: 'bold' }, value: 'Two' },
    { style: { fontWeight: 'initial' }, value: 'Three' },
  ]);
  const [elemRange, setElemRange] = useState({
    type: 'Caret',
    min: { id: 0, extent: 0 },
    max: { id: 0, extent: 0 },
  });
  const [selection, setSelection] = useState([
    { style: { fontWeight: 'initial' }, value: 'One' },
  ]);

  const [caret] = useState(
    <div
      className="cursor-caret"
      key="cursor-caret"
      id="cursor-caret"
      style={{
        width: '2px',
        // height: `100%`,
      }}
    />,
  );

  const handleNewValueInsert = (value) => {
    // if Caret apply selected
    if (elemRange.type === 'Caret') {
      applySelected();
    }
    // if Range delete selected
    else if (elemRange.type === 'Range') {
      deleteSelected();
    }

    elements[elemRange.min.id].value = elements[elemRange.min.id].value + value;
  };

  const handleKey = (key) => {
    handleNewValueInsert(key);

    Update([...elements]);
  };

  const addNewElement = () => {
    const newElem = {
      style: { ...elements[elemRange.min.id].style },
      value: '',
    };

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
        // const newSel = elemRange.min.id + 1;

        // style new element
        const { style } = elem;
        style.fontWeight = style.fontWeight === 'bold' ? 'normal' : 'bold';

        // TODO: Set Selection
        Update([...elements]);
      }
    }
  };

  const handleSpecialKeyDown = (key) => {
    console.warn(`handleSpecialKeyDown:`, key);
    if (key === 'Backspace') {
      if (elements[elemRange.min.id].value !== '') {
        elements[elemRange.min.id].value = elements[
          elemRange.min.id
        ].value.slice(0, elements[elemRange.min.id].value.length - 1);
      }
      Update([...elements]);
    } else if (key === 'Escape') {
      clearSelection();
    }
  };

  const handleSpecialStates = (key, down = false) => {
    // console.warn('handleSpecialStates:', { key, down });
    if (key === 'Control') {
      setCtrl(down);
    }
  };

  const CaptionBar = (prop) => {
    return (
      <div style={{ display: 'flex' }}>
        <button>{ctrl ? 'CTRL' : 'ctrl'}</button>
      </div>
    );
  };

  const splitByMinMax = (value, min, max) => {
    // console.warn('splitByMinMax:', { value, min, max });
    if (!value) return [];

    // if (min == max) max++;

    const results = [
      value.substring(0, min),
      value.substring(min, max),
      value.substring(max, value.length),
    ];
    return results;
  };

  const generateSelected = (range = elemRange) => {
    // 1. build new elements to replace selected elements
    //   z. This can be done by taking the elements objects and splitting them
    //   a. There can only be 2 maximum modified elements with tradition selection
    //    i.  Maybe in the future I will allow vertical selections
    // 2.

    // for loop
    let { min, max } = range;
    // flip minmax if needed
    if (min.id > max.id) {
      min = range.max;
      max = range.min;
    }

    // console.warn({ min, max });
    let minID = min.id;
    let i = minID;
    const maxID = max.id;
    const list = [];

    // Get Range of elements
    for (i; i <= maxID; i++) {
      // check if element needs to be split
      let elem = elements[i];
      list.push(elem);
    }

    // now handle first and last elements
    if (list.length > 0) {
      // if mutiple elements
      if (list.length > 1) {
        const first = list.splice(0, 1)[0];
        const last = list.splice(list.length - 1, 1)[0];

        // 1. handle min
        let split = splitByMinMax(first.value, min.extent, first.value.length);
        // console.warn('1. split:', split);

        // iterate through split results
        let buffer = [];
        split.forEach((val) => {
          if (val) {
            buffer.push({ ...first, value: val });
          }
        });

        list.splice(0, 0, ...buffer);

        // 2. handle max
        split = splitByMinMax(last.value, 0, max.extent);
        // console.warn('2. split:', split);

        // iterate through split results
        buffer = [];
        split.forEach((val) => {
          if (val) {
            buffer.push({ ...last, value: val });
          }
        });

        list.splice(list.length, 0, ...buffer);
      }
      // if only 1 element
      else {
        // handle only element
        const first = list.splice(0, 1)[0];

        const split = splitByMinMax(first.value, min.extent, max.extent);

        // iterate through split results
        const buffer = [];
        split.forEach((val) => {
          if (val) {
            buffer.push({ ...first, value: val });
          }
        });

        list.splice(0, 0, ...buffer);
      }
    }

    // minID = range.min.id;

    // set Selection
    setSelection(list);

    // console.warn(`RenderSelected: ${JSON.stringify(list)}`);
    // return (
    //   <RenderElements elems={list} tag="Sel" index={minID}></RenderElements>
    // );
  };

  const applySelected = () => {
    const start = elemRange.min.id;
    const size = elemRange.max.id + 1 - elemRange.min.id;
    // console.log('applySelected', { selection, start, size });

    elements.splice(start, size, ...selection);
    clearSelection();
  };

  const deleteSelected = () => {
    const remainder = [selection[0], selection[selection.length - 1]];
    const start = elemRange.min.id;
    const size = elemRange.max.id + 1 - elemRange.min.id;
    console.log('deleteSelected', { remainder, start, size });

    // in this case, deleting simply means replacing the orginal with the first and last elements
    elements.splice(start, size, ...remainder);

    clearSelection();
  };

  const rejoinLastElements = () => {
    if (elemRange.min.id <= 0) return;

    const left = elements[elemRange.min.id];
    const right = elements[elemRange.min.id - 1];

    console.log(`rejoinLastElements:`, { left, right });

    // if styles are the same, merge
    if (JSON.stringify(left.style) === JSON.stringify(right.style)) {
      elements.splice(elemRange.min.id - 1, elemRange.min.id, {
        style: left.style,
        value: left.value + right.value,
      });
    }
  };

  const clearSelection = (now = false) => {
    // console.warn(`clearSelection`);

    if (now) {
      selection.splice(0, selection.length);
      elemRange.type = 'Caret';
      elemRange.min = { id: -1, extent: 0 };
      elemRange.max = { id: -1, extent: 0 };
    } else {
      setSelection([]);
      setElemRange({
        type: 'Caret',
        min: { id: -1, extent: 0 },
        max: { id: -1, extent: 0 },
      });
    }
  };

  const RenderElement = ({ elem, index, events, className }) => {
    return (
      <div
        className={className}
        tabIndex="0"
        id={index}
        style={{ ...elem.style }}
        {...events}
      >
        {elem.value}
      </div>
    );
  };

  const RenderSelection = ({ id, tag }) => {
    let i = id;
    let iI = -1;
    const size = selection.length;
    return selection.map((l) => {
      iI++;
      console.log(`${iI} === ${0} || ${iI} === ${size - 1} `);
      return [
        i - 1 === id ? caret : null,
        <RenderElement
          className={iI === 0 || iI === size - 1 ? 'words' : 'highlight'}
          tabIndex="0"
          key={`${tag}_${i++}`}
          elem={l}
          tag={tag}
          events={{
            onMouseDownCapture: () => {
              clearSelection();
            },
          }}
        />,
      ];
    });
  };

  const RenderElements = ({ elems, index, tag, events }) => {
    let id = index ? index : 0;

    // if selection, render selection
    const min = elemRange.min;
    // <RenderSelected />
    const max = elemRange.max;

    return elems.map((l) => {
      if (
        min.id === undefined ||
        max.id === undefined ||
        id < min.id ||
        id > max.id
      ) {
        // console.warn(`${id === min.id} : (${id} === ${min.id})`);
        return [
          id === min.id ? caret : null,
          <RenderElement
            className="words"
            key={`${tag}_${id}`}
            elem={l}
            tag={tag}
            index={id++}
            events={{
              onMouseDownCapture: () => {
                rejoinLastElements();
                clearSelection(true);
              },
              ...events,
            }}
            {...inputEvents()}
          />,
        ];
      } else {
        // console.warn(`2. '${id}' !== '${min.id}' :`, !(min.id === id), min.id === id);
        if (min.id !== id++) {
          return null;
        } else {
          return (
            <RenderSelection
              className="selected"
              key={`Selection_${id}`}
              id={id}
              tag={'Sel'}
            />
          );
        }
      }
    });
  };

  const inputEvents = () => {
    return {
      onKeyPress: (e) => {
        handleKey(e.key);
      },
      onKeyDownCapture: (e) => {
        handleSpecialStates(e.key, true);
        handleSpecialKeyCombo(e.key);
        handleSpecialKeyDown(e.key);
      },
      onKeyUpCapture: (e) => {
        handleSpecialStates(e.key, false);
      },
    };
  };

  console.log('data:', { elements, elemRange, selection });
  return (
    <div
      tabIndex="0" // requires for onkey events
      style={{
        border: '2px dashed green',
        width: '512px',
        height: '256px',
        background: '#BBBBBB',
      }}
      {...inputEvents()}
    >
      <CaptionBar />
      <div
        style={{
          display: 'flex',
          overflow: overflow,
          border: '2px dashed grey',
        }}
      >
        <RenderElements
          elems={elements}
          tag={'text'}
          events={{
            onMouseUp: () => {
              // console.warn('Context', selection, elemRange);

              const { type } = window.getSelection();
              // Selection Types: Caret, Range
              if (type !== 'Range' && type !== 'Caret') {
                console.error(`Not a valid selection type:`, type);
                return;
              }

              const min = {
                // elem: window.getSelection().anchorNode.parentElement,
                id: Number(window.getSelection().anchorNode.parentElement.id),
                extent: window.getSelection().anchorOffset,
              };

              // const startChar
              const max = {
                // elem: window.getSelection().extentNode.parentElement,
                id: Number(window.getSelection().extentNode.parentElement.id),
                extent: window.getSelection().extentOffset,
              };

              // console.warn('Range: \n', min, '\n', max);
              console.warn(
                'Range:',
                type,
                window.getSelection().anchorNode.parentElement,
                window.getSelection().extentNode.parentElement,
              );

              if (selection.length > 0) return;

              setElemRange({ type: type, min, max });
              generateSelected({ min, max });
            },
          }}
        ></RenderElements>
      </div>
      {/* Debugger */}
      <div
        style={{
          display: 'flex',
          overflow: overflow,
          border: '2px dotted red',
          whiteSpace: 'pre',
        }}
      >
        Debugger: {'\n'} caret position: {elemRange.min.id} {'\n'}
        elemRange:{' '}
        {elemRange.length > 0
          ? `(${elemRange.min.id},${elemRange.max.id}) (${elemRange.max.extent},${elemRange.max.extent})`
          : 'No Selection'}
        {/* <RenderSelected /> */}
      </div>
    </div>
  );
};

export default RichEdit;
