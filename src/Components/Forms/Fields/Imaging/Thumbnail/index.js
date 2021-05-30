/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

// TODO: fails to apply the font effects(bold, italic, etc) from props
// Notes: images, text, and labels are not centered
const Thumbnail = (props) => {
  const { icon } = props;
  const { label } = props;
  const { height } = props;
  const { width } = props;
  const { style } = props;

  const border = 3;

  return (
    <div
      style={{
        ...style,
        display: 'flexBox',
        width,
        height,
        border: props.selected
          ? `${border}px solid gold`
          : `${border}px solid grey`,
      }}
    >
      <div
        style={{
          borderLeft: '2px solid #c0c0c0',
          borderRight: '2px solid #c0c0c0',
          borderTop: '2px solid #000000',
          borderBottom: '2px solid #FFFFFF',
        }}
      >
        <svg
          style={{
            width: width - border * 2,
            height: height - 24 - border * 2,
            visibility: 'visible',
            backgroundColor: 'transparent',
          }}
        >
          {props.children && !icon ? (
            <text x="50%" y="50%" textAnchor="middle">
              {props.children}
            </text>
          ) : null}
          <image
            {...(props.dataset ? props.dataset : undefined)} // used for indexing
            style={{
              ...style,
              position: 'relative',
              width: 'calc(100% - 4px)',
              height: '100%',
              visibility: 'visible', // Overridden as the base code always sets this control to hidden
            }}
            {...props.events}
            href={icon}
          />
        </svg>
      </div>
      <div
        style={{
          height: 20, // was 24, but taking the diff of the borders
          alignContent: 'center',
          borderLeft: '2px solid #c0c0c0',
          borderRight: '2px solid #c0c0c0',
          borderTop: '2px solid #000000',
          borderBottom: '2px solid #FFFFFF',
          overflow: 'hidden',
        }}
      >
        <label
          {...(props.dataset ? props.dataset : undefined)} // used for indexing
          style={{
            fontSize: '11px',
            fontFamily: 'Calibri',
          }}
          {...props.events}
        >
          {label}
          {/* {label} was originally {model.text} with the note below */}
          {/* NOTE not sure what this will be called */}
        </label>
      </div>
    </div>
  );
};

export { Thumbnail };
