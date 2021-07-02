/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import ObjUtil from '../../../../../Utilities/ObjUtil';
import { Label } from '../../Dividers';
import './index.css';

const Edit = (props) => {
  // props that need handling
  const defaultProps = { multiline: true, labelPos: 'left' };
  // Edit props
  const { className, multiline, type, value, label, labelPos } = {
    ...defaultProps,
    ...props,
  };
  // Orderlapping events
  const { onChangeCapture } = props;

  // Get remaining props so that they can be passed to the Input element
  const remainingInputProps = ObjUtil.getRemainingObj(props, {
    className: 0,
    value: 0,
    type: 0,
    multiline: 0,
    label: 0,
    labelPos: 0,
    onChangeCapture: 0,
  });

  // Handle Number Mode
  const NumberHandler = (e) => {
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

      // Update field value
      if (value !== undefined) {
        ctrl.value = value;
      } else {
        ctrl.value = '';
      }

      ctrl.selectionStart = pos - 1;
      ctrl.selectionEnd = pos - 1;
    }
  };

  // number type handling
  const handleChangeCapture = (e) => {
    // newline prevention
    if (multiline === false) {
      if (e.target.value.search('\n') > -1) {
        // revert
        e.target.value = value;
      }
    }

    // If not number SKIP
    if (type === 'number' || type === 'Number') {
      NumberHandler(e);
    }

    // Run Pass Event second
    if (onChangeCapture) onChangeCapture(e);
  };

  const input = () =>
    remainingInputProps.password ? (
      <input
        {...remainingInputProps}
        className="Edit"
        value={value}
        id="align"
        type="password"
        ref={(elem) =>
          remainingInputProps.textInput
            ? (remainingInputProps.textInput.elem = elem)
            : undefined
        }
        onChangeCapture={(e) => handleChangeCapture(e)}
      />
    ) : (
      <textarea
        {...remainingInputProps}
        className="Edit"
        value={value}
        rows="1" // causes to size to one row like the input field
        id="align"
        ref={(elem) =>
          remainingInputProps.textInput
            ? (remainingInputProps.textInput.elem = elem)
            : undefined
        }
        onChangeCapture={(e) => handleChangeCapture(e)}
      />
    );

  // Note: Using input form for password and using textarea for multiple line content
  // Input does not do text alignment or justify, but does have PASSWORD functionality
  // Additional Notes: Scroll bars are always auto. See no reason to have them always show or
  // have additonal props for defining them.
  return label ? (
    <Label className={className} label={label} labelPos={labelPos}>
      {input()}
    </Label>
  ) : (
    input()
  );
};

const TextInputValidator = (props) => {
  const { defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  const [states] = useState({ unchanged: 0, changed: 1, invalid: 2 });
  const [state, setState] = useState(states.unchanged);
  const { events } = props;
  let invalid = false;
  const { blacklist } = props;

  const updateState = (val) => {
    if (defaultValue !== val) {
      if (blacklist !== undefined && Array.isArray(blacklist)) {
        const results = blacklist.filter((element) => element === val);
        if (results.length > 0) {
          setState(states.invalid);
        } else {
          setState(states.changed);
        }
      }
    } else {
      setState(states.unchanged);
    }
  };

  const getClassName = () => {
    switch (state) {
      case 0:
        return 'Edit unchanged';
      case 1:
        return 'Edit changed';
      case 2:
        return 'Edit invalid';
      default:
        return 'Edit unchanged';
    }
  };

  return (
    <Edit
      {...props}
      className={getClassName()}
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        updateState(e.target.value);
      }}
      onKeyDown={(e) => {
        // Revert to original value
        if (e.key === 'Escape') {
          setValue(defaultValue);
          setState(states.unchanged);
        }
      }}
      {...(invalid ? events : {})}
    />
  );
};

export { Edit, Edit as Number, TextInputValidator };
