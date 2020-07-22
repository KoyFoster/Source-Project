import React, { useState, useEffect } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

const Canvas = (props) => {
  const { style } = props;

  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved
  const [nodes, setNodes] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [color, setColor] = useState('white');

  // menu
  const menu = () => [
    <MenuItem
      onClick={() => {
        setColor('red');
      }}
    >
      Red
    </MenuItem>,
    <MenuItem
      onClick={() => {
        setColor('blue');
      }}
    >
      Blue
    </MenuItem>,
    <MenuItem
      onClick={() => {
        setColor('white');
      }}
    >
      Blue
    </MenuItem>,
    <MenuItem
      onClick={() => {
        setNodes([]);
      }}
    >
      Clear
    </MenuItem>,
    <MenuItem>{`Nodes:${nodes.length}`}</MenuItem>,
  ];

  // element types that will be used
  // circles: <circle cx={x} cy={y} r={3} onClick={(e) => e.stopPropagation()} />
  //

  // misc examples:
  // 1.
  // <defs>
  //   <linearGradient gradientTransform="rotate(90)" id="greyGrad">
  //     <stop offset="0" stopColor={pallete.outer[0]} />
  //     <stop offset="1" stopColor={pallete.outer[1]} />
  //   </linearGradient>
  // </defs>;
  // 2.
  // <text
  //   key={'Type' + i + '_1'}
  //   textAnchor={'middle'}
  //   dominantBaseline="central"
  //   style={{
  //     fontSize: typeSize,
  //     strokeWidth: 0,
  //     fill: pallete.typeText[1],
  //   }}
  //   x={typeCenter[0] + 1}
  //   y={typeCenter[1] + 1}
  //   transform={transform}
  // >
  //   {Values[i + getStart()][0]}
  // </text>;
  // 3.
  // <line
  //   key={`L_${i}_${iT}_1`}
  //   x1={iCenter + (!bFlip ? 0.5 : 0.5)}
  //   y1={y + (!bFlip ? 0.5 : -0.5)}
  //   x2={x2 + (!bFlip ? 0.5 : 0.5)}
  //   y2={y2 + (!bFlip ? 0.5 : -0.5)}
  //   style={{ strokeWidth: iStrokeWidth * 2, stroke: pallete.grid[1] }}
  //   transform={transform}
  // />;
  // 4.
  // <polygon
  //   key={`${props.name}_bv_${i}`}
  //   points={vector}
  //   transform={transform}
  //   style={{
  //     fill: 'transparent',
  //     strokeWidth: iLineWidth,
  //     fillRule: 'evenodd',
  //   }}
  // />;

  // add node
  const addNode = (x, y) => {
    const node = { key: nodes.length, x, y, color };

    const buffer = [...nodes];
    buffer.push(node);

    // console.log('nodes:', buffer, x, y);
    setNodes(buffer);
  };

  const renderNodes = () => {
    const lineCoords = [];

    nodes.forEach((node) => {
      lineCoords.push([node.x, node.y]);
    });

    // console.log(`lineCoords: ${lineCoords.join(' ')}`);

    // return nodes.map((node) => (
    //   <circle
    //     cx={node.x}
    //     cy={node.y}
    //     r={3}
    //     style={{
    //       // fill: 'transparent',
    //       fill: node.color,
    //       stroke: node.color,
    //       strokeWidth: '2px',
    //     }}
    //     onClick={(e) => e.stopPropagation()}
    //     onMouseMove={(e) => e.stopPropagation()}
    //     // onMouseUp={(e) => e.stopPropagation()}
    //     onMouseDown={(e) => e.stopPropagation()}
    //   />
    // ));

    return (
      <polyline
        points={lineCoords}
        style={{
          // fill: 'transparent',
          fill: 'none',
          stroke: color,
          strokeWidth: 6,
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        // onMouseUp={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      />
    );
  };

  const getCM = () => {
    return [<ContextMenu id="same_unique_identifier">{menu()}</ContextMenu>];
  };

  return (
    <ContextMenuTrigger id="same_unique_identifier" holdToDisplay={-1}>
      {getCM()}
      <svg
        style={{ ...style }}
        viewBox={props.viewBox}
        onMouseMove={(e) => {
          if (mouseDown)
            addNode(
              e.pageX - e.target.getBoundingClientRect().left,
              e.pageY - e.target.getBoundingClientRect().top,
            );
        }}
        onMouseUp={(e) => {
          setMouseDown(false);
        }}
        onMouseDown={(e) => {
          addNode(
            e.pageX - e.target.getBoundingClientRect().left,
            e.pageY - e.target.getBoundingClientRect().top,
          );
          setMouseDown(true);
        }}
      >
        <rect
          style={{
            stroke: 'red',
            strokeWidth: '3px',
            width: '100%',
            height: '100%',
          }}
        />
        <image
          href="https://steamcommunity-a.akamaihd.net/public/shared/images/header/globalheader_logo.png?t=962016"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        {renderNodes()}
      </svg>
    </ContextMenuTrigger>
  );
};

export default Canvas;
