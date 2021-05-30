/* es lint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { getApiResource } from 'api/request';
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

const Ellipse = props => {
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

const Line = props => {
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

const Triangle = props => {
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
const Rectangle = props => {
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
// Koy (2020-02-10): Currently TopLeft cut off half the strokeWidth. This seems be how rect is handled. Don't have a work around for this right now.
// Note: Link/value can be acquired form this control however my tests show that a new value needs to be applied to it
// multiple times before getting acquried.
const RectangleControl = props => {
    const { control } = props;
    const [style, setStyle] = useState(props.style);
  
    const initValue = () => {
      const path = control.imageKey;
  
      // eslint-disable-next-line prettier/prettier
      // Koy Note (2021-02-5): It seems that images will be getting a rework
      const val = path ? getApiResource(`exam/images/${path}`) : undefined
      // const val = path ? `${process.env.API_URL}/exam/images/${path}` : undefined;
      // console.log('Rect path:', path);
      // const val = path ? GET(`exam/images/${path}`) : undefined;
      control.value = val;
      // console.log('Rect Val:', control.val);
      return val;
    };
  
    const [value, setValue] = useState(initValue());
    const [brokenImage, setBrokenImage] = useState(false);
    // used for setting value to null if it fails to load
    control.clear = () => {
      setValue('');
      control.value = '';
    };
  
    // MACRO DEFINITIONS
    // provide macro access to state functions
    control.setStyle = setStyle;
    // GET AND SET
    control.getValue = () => ({ type: 6, value: control.value });
    control.setValue = val => {
      setValue(val);
      control.value = val;
    };
  
    let strokeWidth = '1px';
    let fill = 'transparent';
    if (control.properties.shapeProperties) {
      strokeWidth = control.properties.shapeProperties.strokeWidth;
      fill =
        control.properties.shapeProperties.bgTrans === 1 || brokenImage
          ? 'transparent'
          : control.properties.backgroundColor;
    }
  
    const width =
      // eslint-disable-next-line no-nested-ternary
      style.position === 'relative'
        ? style.width
          ? style.width
          : '100%'
        : control.properties.width + strokeWidth * 0.5;
    const height =
      // eslint-disable-next-line no-nested-ternary
      style.position === 'relative'
        ? style.height
          ? style.height
          : '100%'
        : control.properties.height + strokeWidth * 0.5;
  
    // used for intialization
    useEffect(() => {
      // eslint-disable-next-line
    }, []);
  
    return (
      <Rectangle
        value={value}
        style={{
          ...style,
          zIndex: undefined,
          position: style.position ? style.position : 'absolute',
          width,
          height,
          backgroundColor: 'transparent',
        }}
        rectStyle={{
          // ...style,
          zIndex: style.zIndex,
          width,
          height,
  
          position: 'relative',
  
          fill,
          strokeWidth,
          stroke: control.properties.shapeProperties
            ? control.properties.shapeProperties.strokeColor
            : '5px solid red',
          strokeDasharray:
            lineStyles[
              control.properties.shapeProperties
                ? control.properties.shapeProperties.strokeStyle
                : 'solid'
            ],
        }}
      >
        {props.children}
      </Rectangle>
    );
  };

export { Ellipse, Line, Rectangle, RectangleControl, Triangle, lineStyles };