import React from 'react';

function Col(props) {
  return (
    <div
      style={{
        ...props.style,
        display: props.display || 'inline',
        justifyContent: props.justifyContent || 'center',
      }}
    >
      {props.children}
    </div>
  );
}

function Row(props) {
  return (
    <div
      style={{
        ...props.style,
        display: 'flex',
        justifyContent: props.justifyContent || 'center',
        alignItems: props.alignItems || 'top',
      }}
    >
      {props.children}
    </div>
  );
}

export { Col, Row };
