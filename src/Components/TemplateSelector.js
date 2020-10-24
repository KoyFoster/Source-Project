import React, { useEffect, useState } from 'react';
import { Paper, Select, MenuItem } from '@material-ui/core';

function TemplateSelector(props) {
  // props
  const { data } = props;
  const [value, setValue] = useState(props.defaultValue);
  const setTemplate = (val) => {
    setValue(val);
    props.setTemplate(data[val]);
  };

  // compile menu items
  const menuList = () =>
    Object.keys(data).map((k) => {
      return (
        <MenuItem key={k} value={k}>
          {k}
        </MenuItem>
      );
    });

  useEffect(() => {
    setTemplate(props.defaultValue);
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
      Template
      <Select
        value={value}
        onChange={(e) => {
          setTemplate(e.target.value);
        }}
      >
        {menuList()}
      </Select>
    </Paper>
  );
}

export default TemplateSelector;
