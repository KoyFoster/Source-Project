import React from 'react';

const Controls = (props) => {
  const { size } = props;
  const { selection } = props;
  const { Add } = props;

  const Size = (props) => {
    const { selection } = props;
    const Arrows = (props) => {
      return (
        <div>
          <button
            type="submit"
            onClick={(e) => {
              Add(selection, 1, 0);
            }}
          >
            Add
          </button>
          <button
            type="submit"
            onClick={(e) => {
              Add(selection, -1, 0);
            }}
          >
            Remove
          </button>
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', maxHeight: '24px' }}>
        <Arrows />
        <label style={{ display: 'block' }}>{size}</label>
      </div>
    );
  };
  const Nav = (props) => {
    const { selection } = props;

    const Arrows = (props) => {
      return (
        <div>
          <button type="submit">Move Up</button>
          <button type="submit">Move Down</button>
        </div>
      );
    };
    const Selected = (props) => {
      return <label style={{ display: 'block' }}>{selection}</label>;
    };

    return (
      <div style={{ display: 'flex', maxHeight: '24px' }}>
        <Arrows />
        <Selected value={selection} />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', maxHeight: '24px' }}>
      <Size size={size} selection={selection} />
      <Nav selection={selection} />
    </div>
  );
};

export default Controls;
