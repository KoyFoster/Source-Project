import React from 'react';
import SVGCanvas from './Forms/SVGCanvas';

const CanvasCard = (props) => {
  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved

  return (
    <SVGCanvas
      // width={'100%'}
      style={{
        overflow: 'scroll',
        width: '128px',
        height: '256px',
      }}
      // height={props.height}
      // viewBox={props.viewBox}
    ></SVGCanvas>
  );
};

export default CanvasCard;
