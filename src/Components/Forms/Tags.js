import '../../App.css';
import React from 'react';

const Tags = (props) => {
  const { onChange } = props;
  const { Key } = props;
  const { children } = props;
  return (
    <button key={Key} data-key={Key} type="push" onChange={(e) => onChange(e)}>
      {children} x
    </button>
  );
};
const TagList = (props) => {
  const { tags } = props;
  const { style } = props;
  const { onChange } = props;
  return (
    <div style={{ ...style, border: '1px solid black', overflowX: 'auto' }}>
      {tags
        ? Object.keys(tags).map((key) => {
            return (
              <Tags key={key} onChange={onChange}>
                {`{${key}: ${tags[key][tags[key].length - 1]}}`}
              </Tags>
            );
          })
        : null}
    </div>
  );
};

export { Tags, TagList };
