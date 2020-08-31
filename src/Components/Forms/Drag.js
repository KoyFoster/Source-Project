import React, { useState } from 'react';

const Draggable = (props) => {
  const [pos, setPos] = useState();
  const [dragging, setDragging] = useState(false);
  const { setDragged } = props;

  const element = (
    <div
      id={props.id}
      style={{
        cursor: 'move',
        display: 'flexBox',
        position: pos !== undefined && dragging ? 'absolute' : 'relative',
        left: pos !== undefined && dragging ? pos.x : undefined,
        top: pos !== undefined && dragging ? pos.y : undefined,
        width: '24px',
        height: '24px',
        // border: '2px dotted black',
        background: props.color,
      }}
      //
      onMouseUp={(e) => {
        setDragged(null);
        setDragging(false);
      }}
      //
      onMouseDown={(e) => {
        // e = e || window.event;
        e.preventDefault();

        drag(e);
        console.log('element:', element);
        setDragged(element);
        // setDragging(true);
      }}
      //
      onMouseMove={(e) => {
        e.preventDefault();

        // check if mouse is up
        if (e.buttons === 0) {
          setDragged(null);
          setDragging(false);
          return;
        }

        if (dragging) {
          drag(e);
        }
      }}
    ></div>
  );

  const drag = (e) => {
    // console.log('e:', e.movementX, e.movementY);
    const mousePos = { x: e.clientX, y: e.clientY };
    const offset = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    const move = { x: e.movementX, y: e.movementY };

    // get the mouse cursor position at startup:
    const newPos = {
      x: mousePos.x - offset.x + move.x,
      y: mousePos.y - offset.y + move.y,
      // x: offset.x,
      // y: offset.y,
      // x: mousePos.x - 2,
      // y: mousePos.y - 2,
    };

    // console.log('Drag:', offset, mousePos, newPos, move);
    setPos(newPos);
  };

  return element;
};

const Drag = (props) => {
  const { id } = props;
  const [dragged, setDragged] = useState(null);

  const [draggables, setDraggables] = useState([
    <Draggable id={id} color="red" setDragged={setDragged}></Draggable>,
    <Draggable id={id} color="green" setDragged={setDragged}></Draggable>,
    <Draggable id={id} color="blue" setDragged={setDragged}></Draggable>,
    <Draggable id={id} color="pink" setDragged={setDragged}></Draggable>,
  ]);

  const getDivs = () => {
    const buffer1 = [];
    let length = draggables.length + 1;
    for (let i = 0; i < length; i) {
      const buffer2 = (
        <div
          key={i}
          name={i}
          id={i}
          style={{
            border: '1px dashed red',
            background: 'black',
            minHeight: '10px',
          }}
        ></div>
      );
      buffer1.push(buffer2);

      i += 1;
    }
    return buffer1;
  };

  const [divs, setDivs] = useState(getDivs());

  const result = () => {
    let i = 0; // element iterator
    let buffer = [];
    divs.forEach((div) => {
      // if even

      buffer.push(divs[i]);
      if (i < draggables.length) buffer.push(draggables[i]);

      i += 1;
    });

    return buffer;
  };

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          display: 'inline',
          flexWrap: 'wrap',
          width: '512px',
          height: '512px',
          border: '2px dotted black',
          background: 'gold',
        }}
      >
        {result()}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '512px',
          height: '512px',
          border: '2px dotted black',
          background: 'lime',
        }}
      >
        Dragged Element: {dragged ? dragged : null}
      </div>
    </div>
  );
};

export default Drag;
