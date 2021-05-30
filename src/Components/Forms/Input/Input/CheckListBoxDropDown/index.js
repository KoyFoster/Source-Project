import React, { useEffect, useState } from 'react';
import { ListUtil } from '../List';
import { CheckListBox } from '../CheckListBox';
import { DropDown } from '../../Helper';

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
  const { list } = props;
  const { separator } = props;
  const { checked } = props;
  const { setChecked } = props;
  const { style } = props;
  const { fieldStyle } = props;
  const { ddStyle } = props;
  const { pushLike } = props;

  const { onChange } = props;
  const { onClick } = props;
  const { onBlur } = props;
  const { onFocus } = props;

  const dataset = { 'data-x': props['data-x'], 'data-y': props['data-y'] };
  
  // To allow the edit field be updated independently
  const [text, setText] = useState(ListUtil.getStrFromValue(value, separator, list));
  useEffect(() => {
    setText(ListUtil.getStrFromValue(value, separator, list));
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
      separator={separator}
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

export { CheckListBoxDropDown };
