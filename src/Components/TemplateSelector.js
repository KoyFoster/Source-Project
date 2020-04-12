import React from 'react';
import ComboBox from './Forms/ComboBox';
import { Paper } from '@material-ui/core';

function TemplateSelector(props) {
  function setTemplate(value) {
    const Size = value.Values.length;
    const newValues = () => {
      const val = [];
      for (let i = 0; i < Size; i) {
        val.push([...value.Values[i]]);
        i += 1;
      }
      return val;
    };
    const Values = newValues();
    props.setData.setValues({
      value: Values,
      size: Size,
    });

    props.setData.setName(String(value.label));
    props.setData.setPointLimit(Number(value.PointLimit));
    props.setData.setPointDiff(Boolean(value.PointDiff));
    props.setData.setSize(Size);

    const Points = props.funcs.getPointTotal(
      Size,
      Values,
      value.PointDiff,
      value.PointLimit,
    );
    props.setData.setPointTotal(Number(Points[0]));
    props.setData.setPointMin(Number(Points[1]));
    props.setData.setPointMax(Number(Points[2]));
    props.funcs.randAnim();
  }

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
            setTemplate(e.target.value);
          }
        }}
      >
        {props.MenuItems}
      </ComboBox>
    </Paper>
  );
}

export default TemplateSelector;
