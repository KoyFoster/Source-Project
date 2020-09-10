import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import { MenuItem } from '@material-ui/core';
// import StatForm from './StatForm.js';
// import Diagram from './Diagram.js';
// import { Row, Col } from './DivGrid';
// import StatCode from './StatCode';
// import Tree from './Forms/Tree';
import ProfileCard from './Forms/Card';
import { defaultTemplates as Templates } from './Templates';
// import TogglePopup from './TogglePopup';
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

// const SaveStatCard = (props) => {
//   let { value } = props;
//   const regex1 = /}}},/gi;
//   const regex2 = /:{/gi;
//   value = JSON.stringify(value)
//     .replace(regex1, '}}},\n\n')
//     .replace(regex2, '\n:{');

//   return (
//     <TogglePopup
//       component={
//         <div>
//           Save Code
//           <textarea
//             type="text"
//             // readOnly
//             value={value}
//             style={{
//               display: 'block',
//               width: '100%',
//               height: '512px',
//               whiteSpace: 'nowrap',
//               resize: 'none',
//             }}
//           />
//         </div>
//       }
//     >
//       Save Code
//     </TogglePopup>
//   );
// };

// const LoadStatCard = (props) => {
//   // states
//   let { setValue } = props;
//   // const [newVal, setNewValue] = useState('');
//   const [jsonValue, setJSONValue] = useState();

//   return (
//     <TogglePopup
//       component={
//         <div>
//           Load Code
//           <textarea
//             type="text"
//             style={{
//               display: 'block',
//               width: '100%',
//               height: '512px',
//               whiteSpace: 'nowrap',
//               resize: 'none',
//             }}
//             onChange={(e) => {
//               // setNewValue(e.target.value);

//               let buffer = undefined;
//               try {
//                 buffer = JSON.parse(e.target.value);
//               } catch {}
//               setJSONValue(buffer);
//             }}
//           />
//           <button
//             type="button"
//             disabled={jsonValue ? false : true}
//             onClick={(e) => {
//               setValue(jsonValue);
//             }}
//           >
//             Load
//           </button>
//         </div>
//       }
//     >
//       Load Code
//     </TogglePopup>
//   );
// };

// Stat Card
function Stats(props) {
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

  // member variables
  const [value, setValue] = useState(Templates['Blank']);

  const Update = (val) => {
    const buffer = { ...val };
    setValue(buffer);
  };

  /* Material-UI CSS Styles */
  const useStyles = makeStyles(value.Style);

  const classes = useStyles({ Mode });

  return (
    <div>
      <TemplateSelector
        setTemplate={Update}
        data={Templates}
        defaultValue={'Dark Souls III'}
      />
      {/* <SaveStatCard value={value}></SaveStatCard>
      <LoadStatCard setValue={setValue}></LoadStatCard> */}

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
}

export default Stats;
