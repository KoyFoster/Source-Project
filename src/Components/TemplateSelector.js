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
            const Size = e.target.value.Values.length;
            const newValues = () => {
              const val = [];
              for (let i = 0; i < Size; i) {
                val.push([...e.target.value.Values[i]]);
                i += 1;
              }
              return val;
            };
            const Values = newValues();

            props.setData.setValues({
              value: Values,
              size: Size,
            });

            props.setData.setName(String(e.target.value.label));
            const Points = props.funcs.getPointTotal(
              Size,
              Values,
              e.target.value.PointDiff,
              e.target.value.PointLimit,
            );
            props.setData.setPointLimit(Number(e.target.value.PointLimit));
            props.setData.setPointDiff(Boolean(e.target.value.PointDiff));
            props.setData.setSize(Size);

            props.setData.setPointTotal(Number(Points[0]));
            props.setData.setPointMin(Number(Points[1]));
            props.setData.setPointMax(Number(Points[2]));
            props.funcs.randAnim();
          }
        }}
      >
        {props.MenuItems}
      </ComboBox>
    </Paper>
  );
}

export default TemplateSelector;
