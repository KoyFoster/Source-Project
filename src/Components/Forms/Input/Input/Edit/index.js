/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';

// TODO: Max Text
const Edit = props => {
  // props
  const { value } = props;
  const { style } = props;

  const handleChangeCapture = e => {
    // If not number SKIP
    if (!props.isNumber) {
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

  // subtract non text area props or duplicated refernces
  const subtract = ({
    isNumber,
    password,
    textInput,
    zIndex,
    setChildren,
    pushLike,
    hasBorder,
    classNames,
    ...rest
  }) => rest;
  const inputProps = subtract(props);

  // Note: Using input form for password and using textarea for multiple line content
  // Input does not do text alignment or justify, but does have PASSWORD functionality
  // Additional Notes: Scroll bars are  always auto. See not reason to have them always show or
  // have additonal props for defining them.
  return props.password ? (
    <input
      // eslint-disable-next-line react/prop-types
      {...inputProps}
      id="align"
      type="password"
      ref={elem =>
        props.textInput ? (props.textInput.elem = elem) : undefined
      }
      onChangeCapture={e => handleChangeCapture(e)}
    />
  ) : (
    <textarea
      // eslint-disable-next-line react/prop-types
      {...inputProps}
      /*
       *  Warning: `value` prop on `textarea` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.
       *    in textarea (created by Edit)
       *    in Edit (created by EditControl)
       *    in div (created by EditControl)
       *    in EditControl (created by Component)
       */
      value={inputProps.value || ''}
      id="align"
      style={{
        ...style,
        display: 'block',
      }}
      ref={elem =>
        props.textInput ? (props.textInput.elem = elem) : undefined
      }
      onChangeCapture={e => handleChangeCapture(e)}
    />
  );
};

export { Edit, Edit as Number };
