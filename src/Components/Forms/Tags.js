import '../../App.css';
import React from 'react';

const Tags = (props) => {
  const { onChange } = props;
  const { key } = props;
  const { children } = props;
  return (
    <button key={key} data-key={key} type="push" onChange={(e) => onChange(e)}>
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
        ? tags.map((tag) => {
            return (
              <Tags key={tag.key} onChange={onChange}>
                {tag.label}
              </Tags>
            );
          })
        : null}
    </div>
  );
};

export { Tags, TagList };
