import React from 'react';

const InputControls = (props) => {
  const { size } = props;
  const { selection } = props;
  const { Add } = props;
  const { Move } = props;
  const { Tag } = props;

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
            Add {Tag}
          </button>
          <button
            type="submit"
            disabled={selection ? false : true}
            onClick={(e) => {
              Add(selection, -1, 0);
            }}
          >
            Remove{' '}
            <span style={{ color: 'red' }}>{selection ? selection : ''}</span>
          </button>
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', maxHeight: '24px' }}>
        <Arrows />
      </div>
    );
  };
  const Nav = (props) => {
    const { selection } = props;

    const Arrows = (props) => {
      return (
        <div>
          <button
            type="submit"
            disabled={selection ? false : true}
            onClick={(e) => {
              Move(selection, -1, 0);
            }}
          >
            Move {Tag} Up
          </button>
          <button
            type="submit"
            disabled={selection ? false : true}
            onClick={(e) => {
              Move(selection, 1, 0);
            }}
          >
            Move {Tag} Down
          </button>
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', maxHeight: '24px' }}>
        <Arrows />
        {/* <Selected value={selection} /> */}
      </div>
    );
  };

  return (
    <div
      className="Controls"
      style={{ display: 'flex', maxHeight: '24px', whiteSpace: 'pre' }}
    >
      <Nav selection={selection} /> - <Size size={size} selection={selection} />
    </div>
  );
};

export default InputControls;
