/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// Line Styles are formatted 'Line Space Line Space...'
// TODO: Currently copy pasted into the 4 shape controls. Probably should find a single place to reference this from
const lineStyles = [
  '' /* Solid */,
  '5 4 2 4' /* Dash Dot */,
  '5 2 2 2 2 2' /* Dash Dot Dot */,
  '10 4' /* Dashed */,
  '2' /* Dot */,
  '' /* Solid */,
];

const Ellipse = (props) => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);

  // Link
  control.setStyle = setStyle;

  const strokeWidth =
    control.properties.shapeProperties.strokeWidth === 0
      ? 1
      : control.properties.shapeProperties.strokeWidth;
  const fill =
    control.properties.shapeProperties.bgTrans === 1
      ? 'transparent'
      : control.properties.background;

  return (
    <svg
      style={{
        ...style,
        left: control.properties.positionX - strokeWidth * 0.5,
        top: control.properties.positionY - strokeWidth * 0.5,
        width: control.properties.width + strokeWidth,
        height: control.properties.height + strokeWidth,

        position: 'absolute',
        background: 'transparent',
      }}
    >
      <ellipse
        style={{
          ...style,
          position: 'absolute',
          strokeAlignment: 'inside',

          fill,
          strokeWidth,
          stroke: control.properties.shapeProperties.strokeColor,
          strokeDasharray:
            lineStyles[control.properties.shapeProperties.strokeStyle],
        }}
        cx={(control.properties.width + strokeWidth) * 0.5}
        cy={(control.properties.height + strokeWidth) * 0.5}
        rx={control.properties.width * 0.5}
        ry={control.properties.height * 0.5}
      />
    </svg>
  );
};

function GetLine(control, strokeWidth) {
  // Placeholder stroke-width value until can be acquired
  const d = {
    top: 0,
    left: 0,

    w: 0,
    h: 0,

    x1: 0,
    y1: 0,

    x2: 0,
    y2: 0,
  };

  /* Determine Left and Width as well as x point values */
  if (control.properties.positionX < control.properties.width) {
    d.left = control.properties.positionX;
    d.w =
      control.properties.width - control.properties.positionX + strokeWidth * 2;

    d.x2 = d.w;
    d.x1 = 0;
  } else {
    d.left = control.properties.width;
    d.w =
      control.properties.positionX - control.properties.width + strokeWidth * 2;

    d.x1 = d.w;
    d.x2 = 0;
  }

  /* Determine Top and Height as well as y point values */
  if (control.properties.positionY < control.properties.height) {
    d.top = control.properties.positionY;
    d.h =
      control.properties.height -
      control.properties.positionY +
      strokeWidth * 2;

    d.y2 = d.h - strokeWidth;
    d.y1 = strokeWidth;
  } else {
    d.top = control.properties.height;
    d.h =
      control.properties.positionY -
      control.properties.height +
      strokeWidth * 2;

    d.y1 = d.h - strokeWidth;
    d.y2 = strokeWidth;
  }

  return d;
}

const Line = (props) => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);

  // Link
  control.setStyle = setStyle;

  const StrokeTrans =
    control.properties.shapeProperties.strokeTrans === 1 ? 'hidden' : 'visible';
  const strokeWidth =
    control.properties.shapeProperties.strokeWidth === 0
      ? 1
      : control.properties.shapeProperties.strokeWidth;
  const theLine = GetLine(control, strokeWidth);

  return (
    <svg
      style={{
        ...style,
        // Note: The dimension fields for a Line are a point that needs to be converted to dimensions.
        width: theLine.w,
        height: theLine.h,
        top: theLine.top,
        left: theLine.left,

        // Note: forced visibility as the base code makes these hidden by default
        visibility: StrokeTrans,
        position: 'absolute',
        backgroundColor: 'transparent',
      }}
    >
      <line
        style={{
          visibility: StrokeTrans, // Overridden as the base code always sets this control to hidden
          position: 'absolute',
          strokeAlignment: 'inside',
          strokeWidth,
          stroke: control.properties.shapeProperties.strokeColor,
          strokeDasharray:
            lineStyles[control.properties.shapeProperties.strokeStyle],
        }}
        x1={theLine.x1}
        y1={theLine.y1}
        x2={theLine.x2}
        y2={theLine.y2}
      />
    </svg>
  );
};

const Triangle = (props) => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);

  // Link
  control.setStyle = setStyle;

  const strokeWidth =
    control.properties.shapeProperties.strokeWidth === 0
      ? 1
      : control.properties.shapeProperties.strokeWidth;
  const fill =
    control.properties.shapeProperties.bgTrans === 1
      ? 'transparent'
      : control.properties.background;

  return (
    <svg
      style={{
        ...style,
        left: control.properties.positionX - strokeWidth * 0.5,
        top: control.properties.positionY - strokeWidth * 0.5,
        width: control.properties.width + strokeWidth,
        height: control.properties.height + strokeWidth,

        strokeWidth: '1px', // should be replaced with style or properties
        position: 'absolute',
        background: 'transparent',
      }}
    >
      <polygon
        style={{
          position: 'absolute',
          strokeAlignment: 'inside',

          fill,
          strokeWidth,
          stroke: control.properties.shapeProperties.strokeColor,
          strokeDasharray:
            lineStyles[control.properties.shapeProperties.strokeStyle],
        }}
        points={[
          [strokeWidth, control.properties.height + strokeWidth * 0.5],
          [(control.properties.width + strokeWidth) * 0.5, strokeWidth * 0.5],
          [
            control.properties.width - strokeWidth * 0.5,
            control.properties.height + strokeWidth * 0.5,
          ],
        ]}
      />
    </svg>
  );
};

// Specially handled shapes
const Rectangle = (props) => {
  const { value } = props;
  const { children } = props;
  const { style } = props;
  const { rectStyle } = props;
  const [brokenImage, setBrokenImage] = useState(false);

  // used for intialization
  useEffect(() => {
    // eslint-disable-next-line
    setBrokenImage(false);
  }, [value]);

  return (
    <svg style={style || { width: '100%', height: '100%' }}>
      <rect
        stroke-alignment="inside"
        style={rectStyle || { width: '100%', height: '100%' }}
      />
      {props.children || !value ? (
        <text x="50%" y="50%" textAnchor="middle">
          {children}
        </text>
      ) : null}
      <image
        style={{
          width: '100%',
          height: '100%',
        }}
        href={brokenImage ? undefined : value} // can accept image value directly if desired
        onError={() => {
          setBrokenImage(true);
        }}
      />
    </svg>
  );
};

export { Ellipse, Line, Rectangle, Triangle, lineStyles };
