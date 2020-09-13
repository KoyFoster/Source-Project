import React, { useState, useEffect } from 'react';
import TemplateSelector from './TemplateSelector';
import { MenuItem } from '@material-ui/core';
// import StatForm from './StatForm.js';
// import Diagram from './Diagram.js';
// import { Row, Col } from './DivGrid';
// import StatCode from './StatCode';
// import Tree from './Forms/Tree';
import ProfileCard from './Forms/Card';
import { defaultTemplates as Templates } from './Templates';
import TogglePopup from './TogglePopup';
// import Grid from './Forms/Grid';
import { makeStyles } from '@material-ui/core/styles';

function compileMenuItems() {
  let result = [];

  for (let i = 0; i < Templates.length; i++) {
    result.push(
      <MenuItem key={Templates[i].label} value={Templates[i]}>
        {Templates[i].label}
      </MenuItem>,
    );
  }
  return result;
}
const tmplMenuItems = compileMenuItems();

const SaveStatCard = (props) => {
  let { value } = props;
  const regex1 = /}}},/gi;
  const regex2 = /:{/gi;

  // Pull data object without circular keys
  var cache = [];

  value = JSON.stringify(value, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  })
    .replace(regex1, '}}},\n\n')
    .replace(regex2, '\n:{');

  return (
    <TogglePopup
      component={
        <div>
          Save Code
          <textarea
            type="text"
            // readOnly
            value={value}
            style={{
              display: 'block',
              width: '100%',
              height: '512px',
              whiteSpace: 'nowrap',
              resize: 'none',
            }}
          />
        </div>
      }
    >
      Save Code
    </TogglePopup>
  );
};

const LoadStatCard = (props) => {
  // states
  let { setValue } = props;
  // const [newVal, setNewValue] = useState('');
  const [jsonValue, setJSONValue] = useState();

  return (
    <TogglePopup
      component={
        <div>
          Load Code
          <textarea
            type="text"
            style={{
              display: 'block',
              width: '100%',
              height: '512px',
              whiteSpace: 'nowrap',
              resize: 'none',
            }}
            onChange={(e) => {
              // setNewValue(e.target.value);

              let buffer = undefined;
              try {
                buffer = JSON.parse(e.target.value);
              } catch {}
              setJSONValue(buffer);
            }}
          />
          <button
            type="button"
            disabled={jsonValue ? false : true}
            onClick={(e) => {
              setValue(jsonValue);
            }}
          >
            Load
          </button>
        </div>
      }
    >
      Load Code
    </TogglePopup>
  );
};

const useStyles = makeStyles((props) => ({
  root: (props) => props.Style,
}));
// Stat Card
const Stats = (props) => {
  // member variables
  const [value, setValue] = useState(Templates['Blank']);
  // const useStyles = makeStyles((props) => ({
  //   root: (props) => value.Style,
  // }));

  const Modes = ['View', 'Calculator', 'Edit'];
  const [Mode, setMode] = useState('Calculator');
  const handleModeChange = () => {
    switch (Mode) {
      case Modes[0]:
        setMode(Modes[1]);
        break;
      case Modes[1]:
        setMode(Modes[2]);
        break;
      case Modes[2]:
        setMode(Modes[0]);
        break;
      default:
        break;
    }
  };

  const Update = (val) => {
    const buffer = { ...val };
    setValue(buffer);
  };

  /* Material-UI CSS Styles */
  const classes = useStyles({ props: { Mode }, Style: value.Style });

  // useEffect(() => {}, [value.Style]);

  return (
    <div>
      <TemplateSelector
        setTemplate={Update}
        data={Templates}
        defaultValue={'Dark Souls III'}
      />
      <SaveStatCard value={value}></SaveStatCard>
      <LoadStatCard setValue={setValue}></LoadStatCard>

      <div className={classes.root}>
        <button type="push" onClick={() => handleModeChange()}>
          {Mode}
        </button>
        <ProfileCard
          key="profile"
          Mode={Mode}
          value={value}
          Update={Update}
        ></ProfileCard>
      </div>
    </div>
  );
};

export default Stats;
