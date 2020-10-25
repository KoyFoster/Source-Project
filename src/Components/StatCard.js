import React, { useState, useEffect } from 'react';
import TemplateSelector from './TemplateSelector';
// import { MenuItem } from '@material-ui/core';
// import StatForm from './StatForm.js';
// import { Row, Col } from './DivGrid';
// import StatCode from './StatCode';
// import Tree from './Forms/Tree';
import ProfileCard from './Forms/Card';
import { defaultTemplates as Templates } from './Templates';
import TogglePopup from './TogglePopup';
// import Grid from './Forms/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

// function compileMenuItems() {
//   let result = [];

//   for (let i = 0; i < Templates.length; i++) {
//     result.push(
//       <MenuItem key={Templates[i].label} value={Templates[i]}>
//         {Templates[i].label}
//       </MenuItem>,
//     );
//   }
//   return result;
// }
// const tmplMenuItems = compileMenuItems();

// placeholder code for writing Style functions to js files
// {
//   FileTools.writeTextFile(
//     'Style.js',
//     `const Style = ${Templates[
//       'Dark Souls III'
//     ].Style.toString()}\r\n\r\nexport default Style;`,
//   );
// }

const SaveStatCard = (props) => {
  let { value } = props;
  const regex1 = /}}},/gi;
  const regex2 = /:{/gi;

  // Pull data object without circular keys
  var cache = [];

  value = JSON.stringify(value, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1 || key === 'P') {
        // Circular reference found, discard key
        return;
      }
      cache.push(value);
    }
    return value;
  })
    .replace(regex1, '}}},\n\n')
    .replace(regex2, '\n:{');

  return (
    <TogglePopup
      style={{ borderRadius: '4px' }}
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
      style={{ borderRadius: '4px' }}
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

const useStyles = makeStyles((msProps) => {
  return {
    root: (props) => {
      return props.Style ? props.Style({ Mode: props.Mode }) : {};
    },
  };
});

// Stat Card
const Stats = (props) => {
  // member variables
  const [value, setValue] = useState(Templates['Blank']);

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
  /* Hard coding useStyles for eadch templates style */
  const classes1 = useStyles({ Mode, Style: Templates['Blank'].Style });
  const classes2 = useStyles({
    Mode,
    Style: Templates["Jojo's Bizarre Adventure"].Style,
  });
  const classes3 = useStyles({
    Mode,
    Style: Templates['Dark Souls III'].Style,
  });
  const classes4 = useStyles({
    Mode,
    Style: Templates['ArcheAge (V2020.10.13)'].Style,
  });

  /* Get useStyle of template */
  const getClass = () => {
    switch (value.Game) {
      case 'Blank':
        return classes1.root;
      case "Jojo's Bizarre Adventure":
        return classes2.root;
      case 'Dark Souls III':
        return classes3.root;
      case 'ArcheAge':
        return classes4.root;
      default:
        return classes1.root;
    }
  };

  useEffect(() => {}, [value.Style]);
  // console.log(`Data:`, value);
  return (
    <div style={{ display: 'flex' }}>
      <Paper style={{ margin: '4px', padding: '4px' }}>
        <TemplateSelector
          // style={{ filter: 'invert(88%)' }}
          setTemplate={Update}
          data={Templates}
          defaultValue={"Jojo's Bizarre Adventure"}
        />
        <Paper style={{ display: 'flex', padding: '2px' }}>
          <SaveStatCard value={value}></SaveStatCard>
          <LoadStatCard setValue={setValue}></LoadStatCard>
        </Paper>
        <Paper
          style={{
            display: 'flex',
            whiteSpace: 'pre',
            padding: '2px',
            // filter: 'invert(88%)',
          }}
        >
          Mode Change:{' '}
          <button
            type="push"
            style={{ width: '80px' }}
            onClick={() => handleModeChange()}
          >
            {Mode}
          </button>
        </Paper>
      </Paper>

      <Paper className={getClass()} style={{ margin: '4px', padding: '4px' }}>
        <ProfileCard
          key="profile"
          Mode={Mode}
          value={value}
          Update={Update}
        ></ProfileCard>
      </Paper>
    </div>
  );
};

export default Stats;
