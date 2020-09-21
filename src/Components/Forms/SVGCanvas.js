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
  const [mode /* , setMode*/] = useState(props.mode);
  const [nodes, setNodes] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);
  const [curColor, setCurColor] = useState('#000000');
  const [curStrokeWidth, setCurStrokeWidth] = useState(1);
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

  // Image Border Canvas
  const ImageBorderBG = () => {
    const grid = [];

    for (let x = 0; x < 3; x) {
      for (let y = 0; y < 3; y) {
        grid.push(
          <rect
            key={`${x},${y}`}
            width="33%"
            height="33%"
            x={`${x * 33}%`}
            y={`${y * 33}%`}
            stroke="gold"
            strokeWidth="1px"
            fill="transparent"
            style={{
              strokeDasharray: '2 2',
            }}
            {...stopDrawPropagation}
          ></rect>,
        );
        y += 1;
      }

      x += 1;
    }

    const buffer = (
      <g width="100%" height="100%">
        {grid}
      </g>
    );

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

      const node = {
        key,
        x,
        y,
        color: curColor,
        strokeWidth: curStrokeWidth,
        ...item,
      };
      buffer.push([node]);
    }

    setNodes(buffer);
  };

  const deleteNode = (index) => {
    // validate
    if (index === undefined) return;

    // check if the start of a new node
    let arr = [...nodes];
    arr.splice(index, 1);

    setNodes(arr);
  };

  const moveNode = (index, pos) => {
    // validate
    if (index === undefined || index === pos || pos === undefined) return;

    // check if the start of a new node
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
      const strokeWidth =
        parentNode.length > 0 ? parentNode[0].strokeWidth : curStrokeWidth;
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
                strokeWidth: strokeWidth,
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
        style={{ ...style, fill: 'white' }}
        // Canvas
        width={mode === 'ImageBorder' ? '256px' : '100%'}
        height={mode === 'ImageBorder' ? '256px' : '100%'}
        onMouseMove={(e) => {
          if (mouseDown) {
            addNode(
              e.pageX - e.target.getBoundingClientRect().left - window.scrollX,
              e.pageY - e.target.getBoundingClientRect().top - window.scrollY,
            );
          }
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
        onMouseDown={(e) => {
          // skip of not left mouse-click. left-click being 0;
          if (e.button !== 0) return;

          addNode(
            e.pageX - e.target.getBoundingClientRect().left - window.scrollX,
            e.pageY - e.target.getBoundingClientRect().top - window.scrollY,
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
        {mode === 'ImageBorder' ? ImageBorderBG() : null}
        {mode === 'ImageBorder' ? (
          <svg width="256px" height="256px">
            <rect // expands to the parent
              style={{
                fill: 'transparent',
                width: '100%',
                height: '100%',
              }}
            />
          </svg>
        ) : null}
        {renderNodes()}
      </svg>
    );
    return rendered;
  };

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
  ];

  return (
    <ContextMenuTrigger id="same_unique_identifier" holdToDisplay={-1}>
      <div style={{ display: 'flex', height: '24px' }}>
        <input
          style={{ height: '100%' }}
          type="color"
          value={curColor}
          onChange={(e) => {
            setCurColor(e.target.value);
          }}
        />

        <div>
          Stroke Width:
          <input
            style={{ height: '100%', width: '32px' }}
            type="number"
            value={curStrokeWidth}
            onChange={(e) => {
              if (e.target.value && !Number.isNaN(e.target.value))
                setCurStrokeWidth(e.target.value);
            }}
          />
          px
        </div>
      </div>
      {getCM()}
      {renderSVG()}
    </ContextMenuTrigger>
  );
};

export default SVGCanvas;
