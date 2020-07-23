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
          href="https://steamcommunity-a.akamaihd.net/public/shared/images/header/globalheader_logo.png?t=962016"
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

  const image = new Image();
  // const saveAsJPEG = (svg) => {
  //   // now generate
  //   let canvas = document.getElementById('myCanvas');
  //   if (!canvas) return;
  //   let width = canvas.width;
  //   let height = canvas.height;
  //   let context = canvas.getContext('2d');

  //   // const buffer =
  //   // 'data:image/jpeg;base64,' + encodeURIComponent(svgCanvas.outerHTML);
  //   context.drawImage(image, 0, 0, width, height);
  //   console.log('save:', width, height, canvas.toDataURL());
  //   // console.log('image:', image);
  // };
  // // set image
  // image.src = blobURL;

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

    // ctx.scale(0.99, 0.99);
    // width = img.width / img.height;
    ctx.drawImage(img, 0, 0 /* , 80, 80 */);
    // Now is done
    // console.log(canvas.toDataURL('image/png'));
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
          // style={{ width: '80px', height: '80px' }}
          width={'80px'}
          height={'80px'}
        ></canvas>
        <script>
          {saveAsJPEG(rendered, document.getElementById('thumbnail'))}
        </script>
      </div>
    </ContextMenuTrigger>
  );
};

export default Canvas;
