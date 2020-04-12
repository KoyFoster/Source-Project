import React from 'react';
import ComboBox from './Forms/ComboBox';
import { Paper } from '@material-ui/core';

function TemplateSelector(props) {
  return (
    <Paper
      style={{
        margin: 4,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
      display="flex"
    >
      Name
      <ComboBox
        value={props.Name}
        defaultValue={props.defaultValue}
        onChange={(e) => {
          if (props.OnChange) props.OnChange(e.target.value);
          if (props.setData) {
            props.setData.setValues({
              value: new Array(...e.target.value.Values),
              size: e.target.value.Values.length,
            });
            props.setData.setName(String(e.target.value.label));
            props.setData.setPointLimit(Number(e.target.value.PointLimit));
            props.setData.setPointDiff(Boolean(e.target.value.PointDiff));
            props.setData.setSize(Number(e.target.value.Values.length));
          }
        }}
      >
        {props.MenuItems}
      </ComboBox>
    </Paper>
  );
}

export default TemplateSelector;
