import React from 'react';
import DropDown from './DropDown.js';

const Expand = (props) => {
  const { checked } = props;
  const { onChange } = props;

  return (
    <label
      style={{
        display: 'inline-block',
        width: '14px',

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

const ComboBox = (props) => {
  const { value } = props;
  const { checked } = props;
  const { setChecked } = props;
  const { onChange } = props;
  const style = props.style ? style : {};
  const { fieldStyle } = props;
  const { ddStyle } = props;
  const { list } = props;
  const { type } = props;

  const background =
    type === 'droplist' ? '#cccccc' /* LighterGrey */ : style.background;
  const border =
    type === 'droplist' && style.border
      ? '1px solid #bfbfbf' /* LightGrey */
      : style.border;

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
                  type="button"
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

  const input =
    type === 'droplist' ? (
      <label
        style={{
          display: 'inline-block',
          whiteSpace: props.wordWrap ? 'wrap' : 'nowrap',
          resize: 'none',
          width: '100%',
          ...style,
          background,
          border: 'none',
        }}
        onClick={() => {
          setChecked(true);
        }}
      >
        {value}
      </label>
    ) : (
      <textarea
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
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
        background,
        border,
      }}
    >
      <DropDown
        checked={type === 'simple' ? true : checked}
        setChecked={type === 'simple' ? undefined : setChecked}
        field={input}
        content={hList()}
        fieldStyle={fieldStyle}
        ddStyle={ddStyle}
        CBL="right"
        CB={type === 'simple' ? () => null : Expand}
      />
    </div>
  );
};

export default ComboBox;
