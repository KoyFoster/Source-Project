import React from 'react';
import DropDown from './DropDown.js';

const ComboBox = (props) => {
  const { value } = props;
  const { checked } = props;
  const { setChecked } = props;
  const { onChange } = props;
  const style = props.style ? props.style : {};
  const { list } = props;
  const { type } = props;

  const hList = () => {
    let i = -1;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #808080',
          background: style.background,
        }}
      >
        {' '}
        {list
          ? list.map((item) => {
              i += 1;
              return (
                <button
                  type="push"
                  key={i}
                  className="listitem"
                  style={{ border: 'none', width: '100%' }}
                  value={item}
                  onClick={(e) => handleSelection(e)}
                >
                  {item}
                </button>
              );
            })
          : []}
      </div>
    );
  };

  const handleSelection = (e) => {
    onChange(e);
    setChecked(false);
  };

  const input = (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      style={{ width: '100%', border: 'none', background: 'transparent' }}
    />
  );
  const CheckBox = (props) => {
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

  return (
    <div
      style={{
        ...style,
        background:
          type === 'droplist' ? '#cccccc' /* LighterGrey */ : style.background,
        border:
          type === 'droplist' && style.border
            ? '1px solid #bfbfbf' /* LightGrey */
            : style.border,
      }}
    >
      <DropDown
        checked={type === 'simple' ? true : checked}
        setChecked={type === 'simple' ? undefined : setChecked}
        field={input}
        content={hList()}
        CBL="right"
        CB={CheckBox}
      ></DropDown>
    </div>
  );
};

export default ComboBox;
