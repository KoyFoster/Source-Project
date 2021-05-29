import React from 'react';
import SVGCanvas from '../Components/Forms/SVGCanvas';

const CanvasCard = (props) => {
  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved

  return (
    <SVGCanvas
      mode="ImageBorder"
      selStyle={{
        outline: '1px dashed gold',
        outlineColor: 'invert difference gold' /* fitler: 'invert(50%)' */,
      }}
      style={{
        overflow: 'scroll',
      }}
    ></SVGCanvas>
  );
};

export default CanvasCard;
