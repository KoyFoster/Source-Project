import React, { useEffect } from 'react';
import ComboBox from './Forms/ComboBox';
import { Paper } from '@material-ui/core';

function TemplateSelector(props) {
  function setTemplate(value) {
    // validation
    if (props.setData === undefined) return;
    if (value === undefined) return;

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
    if (props.funcs.randAnim) props.funcs.randAnim();
  }

  useEffect(() => {
    setTemplate(props.defaultValue);
    // eslint-disable-next-line
  }, []);

  const value = () => {
    let val = props.Name ? props.Name : '';

    if (val === '') val = props.defaultValue ? props.defaultValue.label : '';
    console.log('Name:', props.Name, 'val:', val);
    return val;
  };

  return (
    <Paper
      style={{
        ...props.style,
        display: 'flex',
        flexDirection: 'column',
      }}
      display="flex"
    >
      Name
      <ComboBox
        value={value}
        onChange={(e) => {
          if (props.OnChange) props.OnChange(e.target.value);
          setTemplate(e.target.value);
        }}
        onEdit={(e) => {
          props.setData.setName(String(e.target.value));
        }}
      >
        {props.MenuItems}
      </ComboBox>
    </Paper>
  );
}

export default TemplateSelector;
