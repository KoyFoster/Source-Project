/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useRef, useState } from 'react';
import './RE.css';
import { Editor } from '@tinymce/tinymce-react';

const RichEdit = (props) => {
  return <Editor></Editor>;
};

// Int to hex
const IntToHex = (int) => {
  let hex = Number(int).toString(16);
  if (hex.length < 2) {
    hex = `0${hex}`;
  }
  return hex;
};

const RGBToHex = (rbg) => {
  const nums = rbg
    .slice(4, rbg.length - 1)
    .replace(/\s/g, '')
    .split(',');
  console.log('RGBToHex:', nums);
  let result = '#';

  nums.forEach((num) => {
    result += IntToHex(parseInt(num, 10));
  });

  return result.length > 6 ? result : '#000000';
};

const RichEditOld = () => {
  const [value, setValue] = useState([]);
  const [raw, setRaw] = useState('');
  const [curColor, setCurColor] = useState('#000000');
  const [curBGColor, setCurBGColor] = useState('#00000000');
  const [edit, setEdit] = useState(false);
  const ref = useRef();
  const [selection, setSelection] = useState([]);

  console.warn('Rerender:', { raw, curColor, value, edit, selection });

  const Caption = (props) => {
    return (
      <div className="caption">
        <button
          disabled={!edit}
          onClick={() => {
            if (edit) {
              setEdit(false);
              if (ref.current) {
                setRaw(ref.current.innerText);
                setValue(Array.from(ref.current.children));
              } else console.error(`Error: Editor failed to create reference`);
            }
          }}
        >
          Save
        </button>
        <span>
          <span> Color: </span>
          <input
            type="color"
            value={curColor}
            onChange={(e) => {
              setCurColor(e.target.value);

              const ends = [];
              const {
                anchorOffset,
                extentOffset,
                anchorNode,
                extentNode,
              } = selection;

              // get ends
              if (anchorOffset < extentOffset) {
                ends.push({
                  value: anchorNode.data.slice(0, anchorOffset),
                  parent: anchorNode,
                });
                ends.push({
                  value: extentNode.data.slice(
                    extentOffset,
                    extentNode.data.length,
                  ),
                  parent: extentNode,
                });
              } else {
                ends.push({
                  value: extentNode.data.slice(0, extentOffset),
                  parent: extentNode,
                });
                ends.push({
                  value: anchorNode.data.slice(
                    anchorOffset,
                    anchorNode.data.length,
                  ),
                  parent: anchorNode,
                });
              }

              // get core and place it in a span

              console.log('collection:', ends, selection, {
                anchorOffset,
                extentOffset,
                anchorNode,
                extentNode,
              });
              // not the way to do this
              // if (selection.parentNode) {
              //   if (selection.parentNode.style) {
              //     selection.parentNode.style.color = e.target.value;
              //   }
              // }
              // if (selection.extentNode) {
              //   if (selection.extentNode.style) {
              //     selection.extentNode.style.color = e.target.value;
              //   }
              // }
              // if (selection.focusNode) {
              //   if (selection.focusNode.style) {
              //     selection.focusNode.style.color = e.target.value;
              //   }
              // }
            }}
          />
        </span>
        <span>
          <span> BG/HL: </span>
          <input
            type="color"
            value={curBGColor}
            onChange={(e) => {
              setCurBGColor(e.target.value);

              // when a selection is modified it needs to be converted to a span, if it's not already one
            }}
          />
        </span>
      </div>
    );
  };

  return (
    <div className="rich-editor">
      <Caption />
      <div
        ref={ref}
        className="rich-edit-box"
        contentEditable={true}
        value={value}
        tabIndex="0" // requires for onkey events
        onKeyDown={(e) => {
          setEdit(true);
        }}
        onMouseUp={() => {
          const { type } = window.getSelection();
          // Selection Types: Caret, Range
          if (type !== 'Range') {
            // console.error(`Not a valid selection type:`, type);
            return;
          }
          const { style } = window.getSelection().focusNode.parentNode;
          const { color } = style;

          console.log(
            `window.getSelection():`,
            color.search('#'),
            window.getSelection().focusNode.parentNode.style.color,
          );

          // set color picker
          setCurColor(color.search('#') === -1 ? RGBToHex(color) : color);

          setSelection(window.getSelection());
        }}
      />
    </div>
  );
};

export default RichEdit;
