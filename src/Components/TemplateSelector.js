import React, { useEffect, useState } from 'react';
import ComboBox from './Forms/ComboBox';
import { Paper } from '@material-ui/core';

function TemplateSelector(props) {
  // props
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState();
  const { data } = props;
  const setTemplate = (val) => {
    setValue(val);
    props.setTemplate(data[val]);
  };

  // compile menu items
  const menuList = () =>
    Object.keys(data).map((k) => {
      return k;
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
      <ComboBox
        checked={checked}
        setChecked={setChecked}
        value={value}
        setValue={setValue}
        onChange={(e) => {
          setTemplate(e.target.value);
        }}
        list={menuList()}
        ddStyle={{ background: '#cfcfcf' }}
      ></ComboBox>
    </Paper>
  );
}

export default TemplateSelector;
