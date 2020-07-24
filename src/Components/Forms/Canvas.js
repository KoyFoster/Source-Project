import React, { useState, useEffect } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

const Canvas = (props) => {
  const { style } = props;

  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved
  const [nodes, setNodes] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [curColor, setCurColor] = useState('white');

  // element types that will be used
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
    // check if the start of a new node
    const key = nodes.length + (nodes.length > 0 ? nodes[0].length : 0);
    const buffer = [...nodes];
    if (mouseDown) {
      const node = { key, x, y };
      buffer[buffer.length - 1].push(node);
    } else {
      const node = { key, x, y, color: curColor };
      buffer.push([node]);
    }

    setNodes(buffer);
  };

  const renderNodes = () => {
    let key = -1;
    return nodes.map((parentNode) => {
      const lineCoords = [];

      const color = parentNode.length > 0 ? parentNode[0].color : curColor;

      parentNode.forEach((node) => {
        lineCoords.push([node.x, node.y]);
      });

      if (lineCoords.length > 1) {
        key += 1;
        return (
          <polyline
            key={`p_${key}`}
            points={lineCoords}
            style={{
              // fill: 'transparent',
              fill: 'none',
              stroke: color,
              strokeWidth: 6,
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        ); // end of nodes return
      } else {
        key += 1;
        return (
          <circle
            key={`c_${key}`}
            cx={lineCoords[0][0]}
            cy={lineCoords[0][1]}
            r={3}
            style={{
              // fill: 'transparent',
              fill: color,
              stroke: color,
              strokeWidth: '2px',
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        );
      }
    }); // end of nodes map
  };

  const getCM = () => {
    return <ContextMenu id="same_unique_identifier">{menu()}</ContextMenu>;
  };

  // buffer svg
  let rendered = undefined;

  // Test dataURL
  const test =
    'data:image/jpeg;base64,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';

  const renderSVG = () => {
    rendered = (
      <svg
        id="svgCanvas"
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
            strokeWidth: '3px',
            width: '100%',
            height: '100%',
          }}
        />
        <image
          href={test}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        {renderNodes()}
      </svg>
    );
    return rendered;
  };

  const saveAsSVG = async (svg) => {
    const svgCanvas = document.getElementById('svgCanvas');
    const buffer =
      'data:image/svg+xml,' + encodeURIComponent(svgCanvas.outerHTML);
    console.log('save:', buffer);
  };

  // var svgElement = document.getElementById('svgCanvas');
  // let blobURL;
  // if (svgElement) {
  //   let { width, height } = svgElement.getBBox();
  //   let clonedSvgElement = svgElement.cloneNode(true);
  //   let outerHTML = clonedSvgElement.outerHTML,
  //     blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  //   let URL = window.URL || window.webkitURL || window;
  //   blobURL = URL.createObjectURL(blob);
  // }
  var svg = document.querySelector('svg');
  var svgData;
  if (svg) {
    svgData = new XMLSerializer().serializeToString(svg);
  }

  // thumbnail size 80x80.
  const saveAsJPEG = (svg, canvas = document.getElementById('myCanvas')) => {
    if (!svgData) return;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var img = document.createElement('img');
    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));

    ctx.drawImage(img, 0, 0);
    console.log('img', img);
  };

  // menu
  const menu = () => [
    <MenuItem
      key="1"
      onClick={() => {
        setCurColor('red');
      }}
    >
      Red
    </MenuItem>,
    <MenuItem
      key="2"
      onClick={() => {
        setCurColor('blue');
      }}
    >
      Blue
    </MenuItem>,
    <MenuItem
      key="3"
      onClick={() => {
        setCurColor('white');
      }}
    >
      White
    </MenuItem>,
    <MenuItem
      key="4"
      onClick={() => {
        setNodes([]);
      }}
    >
      Clear
    </MenuItem>,
    <MenuItem key="5">{`Nodes:${nodes.length}`}</MenuItem>,
    <MenuItem
      key="6"
      onClick={() => {
        saveAsJPEG(rendered);
      }}
    >
      {'Save'}
    </MenuItem>,
  ];

  return (
    <ContextMenuTrigger id="same_unique_identifier" holdToDisplay={-1}>
      {getCM()}
      {renderSVG()}
      <div style={{ border: '2px solid green' }}>
        <canvas
          id="myCanvas"
          style={{ ...style }}
          width={style.width}
          height={style.height}
        ></canvas>
        <script>{saveAsJPEG(rendered)}</script>
      </div>
      <div style={{ border: '2px solid green' }}>
        <canvas
          id="thumbnail"
          style={{
            /* width: '80px', height: '80px',  */ border: '2px solid red',
          }}
          width={style.width}
          height={style.height}
        ></canvas>
        <script>
          {saveAsJPEG(rendered, document.getElementById('thumbnail'))}
        </script>
      </div>
    </ContextMenuTrigger>
  );
};

export default Canvas;
