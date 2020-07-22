import React, { useState, useEffect } from 'react';
import Canvas from './Forms/Canvas';

const CanvasCard = (props) => {
  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved

  return (
    <Canvas
      // width={'100%'}
      style={{
        border: '1px solid purple',
        overflow: 'scroll',
      }}
      width={'128px'}
      height={'128px'}
      // height={props.height}
      // viewBox={props.viewBox}
    ></Canvas>
  );
};

export default CanvasCard;
