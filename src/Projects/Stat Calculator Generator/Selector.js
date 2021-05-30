import React, { useEffect } from 'react';
import { Paper, Select, MenuItem } from '@material-ui/core';

function TemplateSelector(props) {
  // props
  const { value } = props;
  const { list } = props;
  const { label } = props;
  const { setter } = props;

  // compile menu items
  const menuList = () => {
    // console.log('list:', list);
    if (list)
      return list.map((k) => {
        return (
          <MenuItem key={k} value={k}>
            {k}
          </MenuItem>
        );
      });
    return [];
  };

  useEffect(() => {
    // setter(props.defaultValue);
    // eslint-disable-next-line
  }, []);

  return (
    <Paper
      style={{
        ...props.style,
        display: 'flex',
        flexDirection: 'column',
      }}
      display="flex"
    >
      {label ? label : 'Template'}
      <Select
        value={props.getter(value)}
        onChange={(e) => {
          setter(e.target.value);
        }}
      >
        {menuList()}
      </Select>
    </Paper>
  );
}

export default TemplateSelector;
