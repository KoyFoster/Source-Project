import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import { CheckListBox } from './CheckListBox';

// import PropTypes from 'prop-types';

// Triggers: Select Change, Clicked, Double Clicked, Get Focuse, Lose Focus, Edit Change, Edit Update, Max Text, Edit Get Focus, Edit Lose Focus
// Note: This control's events need to be added to the API.
// Note: SetCtrl behaves differently here. In VS, SetCtrl will only allow that 1 items gets set at a time. It will set the edit box with the text as is,
// but will not update the items. Additionally, if set to nothing, the items checked states will clear.

const Expand = (props) => {
  const { checked } = props;
  const { onChange } = props;

  return (
    <label
      style={{
        display: 'inline-block',
        width: '14px',

        // borderTop: '2px solid black',
        // borderLeft: 'none',
        // borderBottom: '2px solid #767676',
        // borderRight: '2px solid #767676',
        // padding: '1px',

        textAlign: 'center',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        style={{ display: 'none' }}
        onChange={onChange}
      />
      {checked ? '-' : '+'}
    </label>
  );
};

const CheckListBoxDropDown = (props) => {
  const { sortText } = props;
  const { value } = props;
  const { checked } = props;
  const { setChecked } = props;
  const { style } = props;
  const { fieldStyle } = props;
  const { ddStyle } = props;
  const { list } = props;
  const { pushLike } = props;

  const { onChange } = props;
  const { onClick } = props;
  const { onBlur } = props;
  const { onFocus } = props;

  const dataset = { 'data-x': props['data-x'], 'data-y': props['data-y'] };

  const getArrayAsString = () => {
    // Order data by listing
    let buffer = [];
    if (sortText || true) {
      list.every((val) => {
        value.every((l) => {
          if (val.id === l.id) {
            buffer.push(val);
            return false;
          }
          return true;
        });
        return true;
      });
    } else {
      buffer = value;
    }

    // convert to string
    let result = '';
    buffer.forEach((val) => {
      if (result === '') result = val.value;
      else result += props.separator + val.value;
    });
    return result;
  };
  // To allow the edit field be updated independently
  const [text, setText] = useState(getArrayAsString());
  useEffect(() => {
    setText(getArrayAsString());
  }, [value]);

  const handleSelection = (e) => {
    onChange(e);
  };

  const hList = () => (
    <CheckListBox
      {...dataset}
      classNames={props.classNames}
      pushLike={pushLike}
      list={list}
      value={value}
      separator={props.separator}
      singleSelect={props.singleSelect}
      style={style}
      onChange={(e) => {
        handleSelection(e);
      }}
      onClick={(e) => {
        onClick(e);
      }}
      onBlur={(e) => {
        onBlur(e);
      }}
      onFocus={(e) => {
        onFocus(e);
      }}
    />
  );

  const input = (
    <textarea
      type="text"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
      // style={{ width: '100%', background: 'transparent', ...style, border: 'none', }}
      style={{
        whiteSpace: props.wordWrap ? 'wrap' : 'nowrap',
        resize: 'none',
        width: '100%',
        background: 'transparent',
        ...style,
        border: 'none',
      }}
    />
  );

  return (
    <div
      style={{
        ...style,
        height: '100%',
      }}
    >
      <DropDown
        checked={checked}
        setChecked={setChecked}
        field={input}
        content={hList()}
        fieldStyle={fieldStyle}
        ddStyle={ddStyle}
        CBL="right"
        CB={Expand}
      />
    </div>
  );
};

const CheckListBoxDropDownControl = (props) => {
  const { control } = props;
  const { properties } = control;
  const { listProperties } = properties;
  const { pushLike } = listProperties;
  const { sort } = listProperties;
  const { separator } = listProperties;
  const singleSelect =
    // not multi-selection and is ListBox
    listProperties.selection !== 1 && control.controlType === 14;
  const { events } = props;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;
  // convert control data into single dimension
  const dataFormat = (d) => {
    if (d.length === 1 && d[0][0].length === 0) return [];
    const buffer = d.map(function cull(val) {
      return val.slice(0, 1)[0]; // subtract unecessary rows
    });
    return buffer.length ? buffer : undefined;
  };
  const [data, setData] = useState(() => {
    const d = dataFormat(control.data);
    return sort ? d.sort() : d;
  });
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line react/prop-types
    const val = props.value ? props.value : '';
    control.value = String(val);
    return val;
  });

  // Function Links
  control.setStyle = setStyle;
  control.setData = (newData) => {
    control.data = newData;
    setData(newData);
  };
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = (val) => {
    setValue(val);
    control.value = val;
  };
  control.clear = () => {
    control.handleChange('');
  };
  const handleChange = (e) => {
    control.handleChange(e.target.value);
  };

  return (
    <div
      style={{
        ...style,
        border: 'none',
        position: 'absolute',
        zIndex: checked ? 1000 : style.zIndex,
        ...disabled,
      }}
    >
      <CheckListBoxDropDown
        pushLike={pushLike}
        separator={separator}
        singleSelect={singleSelect}
        value={value}
        checked={checked}
        setChecked={setChecked}
        list={data}
        style={{
          background: style.background,
          border: style.border,
          color: style.color,
          font: style.font,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
        }}
        {...events}
        onChange={(e) => {
          handleChange(e);
          if (events.onChange) events.onChange(e);
        }}
      />
    </div>
  );
};

// Basic example
// const CheckListCCEnt = props => {
//   const [checked, setChecked] = useState(false);
//   const [value, setValue] = useState('');

//   const handleChange = e => {
//     setValue(e.target.value);
//   };

//   return (
//     <CheckListBoxDropDown
//       separator={','}

//       value={value}
//       checked={checked}
//       setChecked={setChecked}
//       list={['1', '2']}

//       onChange={e => {
//         handleChange(e);
//       }}
//     />
//   );
// };

export { CheckListBoxDropDown, CheckListBoxDropDownControl };
