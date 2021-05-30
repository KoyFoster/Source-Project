import React from 'react';

const CaptionBar = (
  label,
  buttons,
  bHide,
  style = {
    fontFamily: 'calibri',
    fontSize: 12,
    fontStyle: false,
    bold: false,
    underlined: false,
    color: 'black',
  },
) =>
  bHide ? (
    ''
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '20px',
        background: '#f0f0f0',
        borderBottom: 'none',
        padding: 0,
        margin: 0,
        ...style,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          marginLeft: '2px',
          textJustify: 'left',
          verticalAlign: 'middle',
          padding: '4px 0',
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex' }}>{buttons}</div>
    </div>
  );

export { CaptionBar };
