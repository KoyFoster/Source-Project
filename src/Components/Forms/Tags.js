import '../../App.css';
import React from 'react';

const Tags = (props) => {
  const { onClick } = props;
  const { Key } = props;
  const { children } = props;
  return (
    <button
      key={Key}
      data-key={Key}
      value={children}
      type="push"
      onClick={(e) => onClick(e)}
    >
      {children} x
    </button>
  );
};
const TagList = (props) => {
  const { tags } = props;
  const { style } = props;
  const { onClick } = props;
  return (
    <div
      style={{
        ...style,
        border: '1px solid black',
        overflowY: 'scroll',
        maxHeight: '28px',
      }}
    >
      {tags
        ? Object.keys(tags).map((key) => {
            return (
              <Tags
                key={key}
                Key={key}
                onClick={(e) => {
                  const value = { ...tags };
                  delete value[e.target.dataset.key];
                  onClick({ target: { value } });
                }}
              >
                {`{${key}: ${tags[key][tags[key].length - 1]}}`}
              </Tags>
            );
          })
        : null}
    </div>
  );
};

export { Tags, TagList };
