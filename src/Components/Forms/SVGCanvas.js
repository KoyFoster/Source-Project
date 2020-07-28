import React, { useState } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

const SVGCanvas = (props) => {
  const { style } = props;
  const { items } = props;
  const { imgAsCanvas } = props;
  const { itemLabel } = props;
  const { selStyle } = props;

  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved
  const [nodes, setNodes] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [curColor, setCurColor] = useState('white');
  const [curItem, setCurItem] = useState(undefined);
  const [selection, setSelection] = useState(undefined);
  const getItemByID = (id) => {
    let buffer = 0;

    if (items)
      items.forEach((item) => {
        if (item.id === id) buffer = item;
      });

    return buffer;
  };

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

  // <cursor>	Defines a platform-independent custom cursor	x="the x-axis top-left corner of the cursor (default is 0)"
  // y="the y-axis top-left corner of the cursor (default is 0)"
  // xlink:href="the URI of the image to use as the cursor

  // <g>	Used to group together elements	id="the name of the group"
  // fill="the fill color for the group"
  // opacity="the opacity for the group"
  // + presentation attributes:
  // All

  // add node
  const addNode = (x, y) => {
    // check if the start of a new node
    const key = nodes.length + (nodes.length > 0 ? nodes[0].length : 0);
    const buffer = [...nodes];
    if (mouseDown) {
      const node = { key, x, y };
      buffer[buffer.length - 1].push(node);
    } else {
      // set only first node to current item
      const item = {};
      if (curItem !== undefined) item.itemID = curItem.id;
      // unset current item
      setCurItem(undefined);

      const node = { key, x, y, color: curColor, ...item };
      buffer.push([node]);
    }

    setNodes(buffer);
  };

  const deleteNode = (index) => {
    // validate
    if (index === undefined) return;

    // check if the start of a new node
    const key = nodes.length + (nodes.length > 0 ? nodes[0].length : 0);
    let arr = [...nodes];
    arr.splice(index, 1);

    setNodes(arr);
  };

  const moveNode = (index, pos) => {
    // validate
    if (index === undefined || index === pos || pos === undefined) return;

    // check if the start of a new node
    const key = nodes.length + (nodes.length > 0 ? nodes[0].length : 0);
    let arr = [...nodes];
    let buffer = arr.splice(index, 1);
    arr.splice(pos, 0, buffer[0]);

    setNodes(arr);
  };

  const stopDrawPropagation = {
    onClick: (e) => e.stopPropagation(),
    onMouseMove: (e) => e.stopPropagation(),
    onMouseDown: (e) => e.stopPropagation(),
  };

  const onSelection = (e) => {
    const index = parseInt(e.target.dataset.key, 10);
    setSelection(index);
  };

  const renderNodes = () => {
    let key = -1;
    return nodes.map((parentNode) => {
      const lineCoords = [];

      const color = parentNode.length > 0 ? parentNode[0].color : curColor;
      const itemID = parentNode.length > 0 ? parentNode[0].itemID : undefined;
      const item = itemID ? getItemByID(itemID) : undefined;

      parentNode.forEach((node) => {
        lineCoords.push([node.x, node.y]);
      });

      const label =
        item && lineCoords.length && itemLabel
          ? {
              ...itemLabel,
              key: `label_${key}`,
              props: {
                ...itemLabel.props,
                x: lineCoords[0][0],
                y: lineCoords[0][1] - 16, // hardcoded offset for now
                // style: {
                //   ...itemLabel.props.style,
                // },
                children: item.name,
              },
            }
          : null;

      if (lineCoords.length > 1) {
        key += 1;
        return (
          <g
            key={`g_${key}`}
            data-key={key}
            style={selection === key ? selStyle : undefined}
            onClick={(e) => onSelection(e)}
          >
            {label}
            <polyline
              key={`p_${key}`}
              data-key={key}
              points={lineCoords}
              style={{
                fill: 'none',
                stroke: color,
                strokeWidth: '1px',
              }}
              {...stopDrawPropagation}
              onClick={(e) => {
                onSelection(e);
              }}
            />
          </g>
        ); // end of nodes return
      }
      key += 1;
      if (item !== undefined)
        return (
          <g
            key={`g_${key}`}
            data-key={key}
            style={selection === key ? selStyle : undefined}
            onClick={(e) => onSelection(e)}
          >
            {label}
            {props.bgImage ? (
              <image
                key={`p_${key}`}
                data-key={key}
                x={lineCoords[0][0] - 11}
                y={lineCoords[0][1] - 11}
                href={item.data}
                {...stopDrawPropagation}
                onClick={(e) => {
                  onSelection(e);
                }}
              />
            ) : null}
          </g>
        );
      return (
        <g
          key={`g_${key}`}
          data-key={key}
          style={selection === key ? selStyle : undefined}
          onClick={(e) => onSelection(e)}
        >
          {label}
          <circle
            key={`c_${key}`}
            data-key={key}
            cx={lineCoords[0][0]}
            cy={lineCoords[0][1]}
            r={3}
            style={{
              fill: color,
              stroke: color,
              strokeWidth: '1px',
            }}
            {...stopDrawPropagation}
            onClick={(e) => {
              onSelection(e);
            }}
          />
        </g>
      );
    }); // end of nodes map
  };

  const getCM = () => (
    <ContextMenu id="same_unique_identifier">{mainMenu()}</ContextMenu>
  );

  // buffer svg
  let rendered;

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
        onMouseUp={() => {
          setMouseDown(false);
        }}
        onMouseDown={(e) => {
          // skip of not left mouse-click. left-click being 0;
          if (e.button !== 0) return;

          addNode(
            e.pageX - e.target.getBoundingClientRect().left,
            e.pageY - e.target.getBoundingClientRect().top,
          );
          setMouseDown(true);
        }}
      >
        <rect // expands to the parent
          style={{
            strokeWidth: '1px',
            width: '100%',
            height: '100%',
          }}
          {...(!imgAsCanvas ? {} : stopDrawPropagation)}
        />
        {props.bgImage ? (
          <image
            // Note: Not touching the size of the image will default it to it's original size -
            // Not sure if this will change
            href={props.bgImage}
          />
        ) : null}
        {renderNodes()}
      </svg>
    );
    return rendered;
  };

  // const saveAsSVG = async (svg) => {
  //   const svgCanvas = document.getElementById('svgCanvas');
  //   const buffer =
  //     'data:image/svg+xml,' + encodeURIComponent(svgCanvas.outerHTML);
  //   console.log('save:', buffer);
  // };

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
  //   const SVG = document.querySelector('svg');
  //   let svgData;
  //   if (SVG) {
  //     svgData = new XMLSerializer().serializeToString(SVG);
  //   }

  // thumbnail size 80x80.
  //   const saveAsJPEG = (svg, canvas = document.getElementById('myCanvas')) => {
  //     if (!svgData) return;
  //     if (!canvas) return;
  //     const ctx = canvas.getContext('2d');
  //     if (!ctx) return;

  //     const img = document.createElement('img');
  //     img.setAttribute('src', `data:image/svg+xml;base64,${btoa(svgData)}`);

  //     ctx.drawImage(img, 0, 0);
  //   };

  const getItems = () => {
    let i = -1;
    if (!items) return [];
    const menuItems = items.map((item) => {
      i += 1;
      return (
        <MenuItem
          key={`item_${i}`}
          onClick={() => {
            setCurItem(item);
          }}
        >
          {item.name}
        </MenuItem>
      );
    });
    return menuItems;
  };

  // selection
  const selectionMenu = () => [
    <MenuItem
      key="deselect"
      onClick={() => {
        setSelection(undefined);
      }}
    >
      Deselect
    </MenuItem>,
    <MenuItem
      key="delete"
      onClick={() => {
        deleteNode(selection);
        setSelection(undefined);
      }}
    >
      Delete
    </MenuItem>,
    nodes.length > 1 ? (
      <MenuItem
        key="moveTop"
        onClick={() => {
          moveNode(selection, nodes.length - 1);
          setSelection(undefined);
        }}
      >
        Move on top
      </MenuItem>
    ) : null,
    nodes.length > 1 ? (
      <MenuItem
        key="moveBottom"
        onClick={() => {
          moveNode(selection, 0);
          setSelection(undefined);
        }}
      >
        Move to bottom
      </MenuItem>
    ) : null,
    <MenuItem key="div_0" divider />,
  ];

  // menu
  const mainMenu = () => [
    selection !== undefined ? selectionMenu() : null,

    <MenuItem
      key="black"
      onClick={() => {
        setCurColor('black');
      }}
    >
      Black
    </MenuItem>,
    <MenuItem
      key="red"
      onClick={() => {
        setCurColor('red');
      }}
    >
      Red
    </MenuItem>,
    <MenuItem
      key="blue"
      onClick={() => {
        setCurColor('blue');
      }}
    >
      Blue
    </MenuItem>,
    <MenuItem
      key="green"
      onClick={() => {
        setCurColor('green');
      }}
    >
      Green
    </MenuItem>,
    <MenuItem
      key="yellow"
      onClick={() => {
        setCurColor('yellow');
      }}
    >
      Yellow
    </MenuItem>,
    <MenuItem
      key="pink"
      onClick={() => {
        setCurColor('pink');
      }}
    >
      Pink
    </MenuItem>,
    <MenuItem
      key="white"
      onClick={() => {
        setCurColor('white');
      }}
    >
      White
    </MenuItem>,
    <MenuItem key="div_1" divider />,
    <MenuItem
      key="Clear"
      onClick={() => {
        setNodes([]);
      }}
    >
      Clear
    </MenuItem>,
    <MenuItem key="div_2" divider />,
    ...getItems(),
    // <MenuItem key="5">{`Nodes:${nodes.length}`}</MenuItem>,
    // <MenuItem
    //   key="6"
    //   onClick={() => {
    //     saveAsJPEG(rendered);
    //   }}
    // >
    //   {'Save'}
    // </MenuItem>,
  ];

  return (
    <ContextMenuTrigger id="same_unique_identifier" holdToDisplay={-1}>
      {getCM()}
      {renderSVG()}
      {/* <div style={{ border: '2px solid green' }}>
        <canvas
          id="myCanvas"
          style={{ ...style }}
          width={style.width}
          height={style.height}
        />
        <script>{saveAsJPEG(rendered)}</script>
      </div> */}
      {/* 
      <div style={{ border: '2px solid green' }}>
        <canvas
          id="thumbnail"
          style={{
            border: '2px solid red',
          }}
          width={style.width}
          height={style.height}
        />
        <script>
          {saveAsJPEG(rendered, document.getElementById('thumbnail'))}
        </script>
      </div> */}
    </ContextMenuTrigger>
  );
};

export default SVGCanvas;
