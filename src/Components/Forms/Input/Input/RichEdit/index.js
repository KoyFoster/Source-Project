/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { RTF } from './RTF';

// TODO: Max Text
const RichEdit = props => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;
  // eslint-disable-next-line no-unused-vars
  let temp = [];
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line react/prop-types
    let val = props.value ? props.value : '';
    if (val === '') {
      // join data
      let data = control.data ? control.data[0][0] : '';
      for (let i = 1; i < control.data.length; i) {
        data += ` ${control.data[i][0]}`;
        i += 1;
      }

      val = data;
    }
    control.value = val;
    const buffer = RTF.ToHTML(val, control.controlId);
    temp = buffer.html;
    // return val;
    return buffer.plainText;
  });
  const [htmlValue, setHtmlValue] = useState(temp);
  const [insertPos, setInsertPos] = useState([0, 0, 17.6]);
  const getHTML = () => RTF.getHTML(htmlValue);
  const textInput = null;

  // provide macro access to state functions
  control.setStyle = setStyle;

  // NOTE DO NOT USE OBJECT SHORTHAND IN THE NEXT LINE
  // eslint-disable-next-line object-shorthand
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = val => {
    const buffer = RTF.ToHTML(val, control.controlId);

    setHtmlValue(buffer.html);
    setValue(buffer.plainText);
    control.value = buffer.plainText;
  };
  const handleChange = e => {
    control.handleChange(e.target.value);
  };

  control.setFocus = () => textInput.focus();
  control.clear = () => {
    control.handleChange('');
  };
  const overflow = () => {
    let result = 'hidden';

    result =
      !control.properties.editProperties.hasWordWrap ||
      !control.properties.editProperties.hasLineLimit
        ? 'auto'
        : 'hidden';

    result = style.overFlow ? style.overFlow : result;
    return result;
  };

  const handleChangeCapture = e => {
    // If not number SKIP
    if (!control.properties.editProperties.isNumber) {
      return;
    }

    const ctrl = e.target;

    const stripped = ctrl.value.replace(/[^\d.-]/g, '');
    const periods = ctrl.value.match(/\./g);
    const dashes = ctrl.value.match(/-/g);

    const notNum = stripped !== ctrl.value;
    const perBad = periods ? periods.length > 1 : false;
    const dshBad = dashes ? dashes.length > 1 || ctrl.value[0] !== '-' : false;

    if (notNum || perBad || dshBad) {
      const pos = ctrl.selectionStart;

      e.stopPropagation();
      e.preventDefault();
      if (value !== undefined) {
        ctrl.value = value;
      } else {
        ctrl.value = '';
      }

      ctrl.selectionStart = pos - 1;
      ctrl.selectionEnd = pos - 1;
    }
  };

  // eslint-disable-next-line no-unused-vars
  const events = {
    ...props.events,
    onChangeCapture: e => handleChangeCapture(e),
    onChange: e => {
      handleChange(e);
      if (props.events.onChange) props.events.onChange();
    },
  };

  // used for intialization
  useEffect(() => {
    // eslint-disable-next-line
    // renderer does not updated if the array size does not change
    // setHtmlValue(RTF.CalculateWrap({ data: htmlValue }, style.width).data);
    // setValue('');
  }, []);

  // Note: Using input form for password and using textarea for multiple line content
  // Input does not do text alignment or justify, but does have PASSWORD functionality
  // Additional Notes: Scroll bars are  always auto. See not reason to have them always show or
  // have additonal props for defining them.
  const pId = `div_${control.controlId}`;

  return (
    <div
      id={pId}
      style={{
        ...style,
        display: 'inline',
        // hard code border to emulate VS
        border: '1px solid #808080',
        position: style.position ? style.position : 'absolute',
        ...disabled,
      }}
      onClick={e => {
        const { i } = e.target.dataset;
        if (i === undefined) return;
        const pElem = document.getElementById(pId);
        const x =
          e.target.getBoundingClientRect().x - pElem.getBoundingClientRect().x;
        const y =
          e.target.getBoundingClientRect().y - pElem.getBoundingClientRect().y;
        const { height } = e.target.getBoundingClientRect();

        setInsertPos([x, y, height]);
      }}
    >
      <div
        style={{
          display: 'inline',
          position: 'absolute',
          overflow: overflow(),
        }}
      >
        {getHTML()}
      </div>
      <div
        className="cursor-caret"
        id="cursor-caret"
        style={{
          left: `${insertPos[0]}px`,
          top: `${insertPos[1]}px`,
          height: `${insertPos[2]}px`,
        }}
      />
    </div>
  );
};

export {RichEdit};
