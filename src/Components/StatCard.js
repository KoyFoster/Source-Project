import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import { Box, Paper, MenuItem } from '@material-ui/core';
import StatInputForm from './StatInputForm.js';
import Diagram from './Diagram.js';
import StatData from './StatData.js';
import { Row, Col } from './DivGrid';
import StatCode from './StatCode';

// defaultTemplates
const iDefTmpl = 0;
const defaultTemplates = [
  {
    label: 'Jojo',
    Values: [
      ['POWER', 3.0, 1, 10, ''],
      ['SPEED', 4.0, 1, 10, ''],
      ['RANGE', 4.0, 1, 10, ''],
      ['DURABILITY', 8.0, 1, 10, ''],
      ['PRECISION', 4.0, 1, 10, ''],
      ['POTENTIAL', 2.0, 1, 10, ''],
    ],
    PointLimit: 60,
    PointDiff: false,
  },
  {
    label: 'Dark Souls III',
    Values: [
      ['Vigor', 15, 1, 99, ''],
      ['Attunement', 10, 1, 99, ''],
      ['Endurance', 15, 1, 99, ''],
      ['Vitality', 15, 1, 99, ''],
      ['Strength', 20, 1, 99, ''],
      ['Dexterity', 18, 1, 99, ''],
      ['Intelligence', 10, 1, 99, ''],
      ['Faith', 10, 1, 99, ''],
      ['Luck', 10, 1, 99, ''],
      ['Hollowing', 99, 1, 99, 'X'],
    ],
    PointLimit: 802,
    PointDiff: true,
  },
  {
    label: 'Kono Subarashii',
    Values: [
      ['Strength', 79, 79, 99, ''],
      ['Health', 21, 21, 99, ''],
      ['Magic Power', 92, 92, 99, ''],
      ['Dexterity', 3, 3, 99, ''],
      ['Agility', 42, 42, 99, ''],
      ['Luck', 1, 1, 99, ''],
    ],
    PointLimit: 238,
    PointDiff: true,
  },
  {
    label: 'Final Fantasy 7 Remake',
    Values: [
      ['Attack', 105, 1, 200, ''],
      ['Magic Attack', 97, 1, 200, ''],
      ['Defense', 34, 1, 200, ''],
      ['Magic Defense', 26, 1, 200, ''],
      ['Strength', 35, 1, 200, ''],
      ['Magic', 31, 1, 200, ''],
      ['Vitality', 26, 1, 200, ''],
      ['Spirit', 23, 1, 200, ''],
      ['Luck', 27, 1, 200, ''],
      ['Speed', 19, 1, 200, ''],
    ],
    PointLimit: 10000,
    PointDiff: false,
  },
  {
    label: 'ArcheAge',
    Values: [
      ['Strength', 1380, 3, 2560, ''],
      ['Agility', 58, 3, 2560, ''],
      ['Stamina', 158, 3, 2560, ''],
      ['Spirit', 58, 3, 2560, ''],
      ['Intelligence', 158, 58, 2560, ''],
      ['Cast Time', 100, 0, 100, '%'],
      ['Attack Speed', 50, 0, 100, '%'],
      ['Move Speed', 5.4, 5.4, 10, 'm/s'],
    ],
    PointLimit: 2560,
    PointDiff: false,
  },
  {
    label: 'ArcheAge 2.0',
    Values: [
      [
        ['Primary Stats', 'Fixed', '#4ab8c5'],
        ['Strength', 1882, 3, 2560, ''],
        ['Agility', 22, 3, 2560, ''],
        ['Stamina', 260, 3, 2560, ''],
        ['Spirit', 172, 3, 2560, ''],
        ['Intelligence', 22, 58, 2560, ''],
      ],

      [
        ['Secondary Stats', 'Calculated', '#c0f311'],
        ['Health', 2064 /* ([0][2] * 12) */, 264, 2560, ''],
        ['Mana', 264 /* ([5][2] * 12) */, 264, 2560, ''],
        ['Melee Attack', 376.4 /* ([1][1] * 0.2) */, 4.4, 2560, ''],
        ['Range Attack', 4.4 /* ([3][2] * 0.2) */, 4.4, 2560, ''],
        ['Magic Attack', 4.4 /* ([5][3] * 0.2) */, 4.4, 2560, ''],
        ['Healing Power', 34.4 /* ([0][4] * 0.2) */, 4.4, 2560, ''],
        ['Physical Defense', 260 /* ([0][2] * 1) */, 44, 2560, ''], // 71.35%
        ['Magic Defense', 260 /* ([0][2] * 1) */, 44, 2560, ''], // 23.81%
      ],

      [
        ['Misc Stats', 'Fixed', '#1d6614'],
        ['Move Speed', 5.4, 5.4, 10, 'm/s'],
        ['Cast Time', 93, 0, 100, '%'],
        ['Attack Speed', 190, 0, 100, ''], // (84.0%)
      ],
    ],
    PointLimit: 2560,
    PointDiff: false,
  },
];

function compileMenuItems() {
  let result = [];

  for (let i = 0; i < defaultTemplates.length; i++) {
    result.push(
      <MenuItem key={defaultTemplates[i].label} value={defaultTemplates[i]}>
        {defaultTemplates[i].label}
      </MenuItem>,
    );
  }
  return result;
}
const tmplMenuItems = compileMenuItems();

const defaultData = {
  Name: 'Default Data',

  Values: [
    [
      ['Primary Stats', 'Fixed', '#4ab8c5'],
      ['Strength', 1882, 3, 2560, ''],
      ['Agility', 22, 3, 2560, ''],
      ['Stamina', 260, 3, 2560, ''],
      ['Spirit', 172, 3, 2560, ''],
      ['Intelligence', 22, 58, 2560, ''],
    ],

    [
      ['Secondary Stats', 'Calculated', '#c03311'],
      ['Health', 1735.47 /* ([0][2] * 12) */, 264, 2560, ''],
      ['Mana', 264 /* ([5][2] * 12) */, 264, 2560, ''],
      ['Melee Attack', 376.4 /* ([0][1] * 0.2) */, 4.4, 2560, ''],
      ['Range Attack', 4.4 /* ([0][2] * 0.2) */, 4.4, 2560, ''],
      ['Magic Attack', 4.4 /* ([0][3] * 0.2) */, 4.4, 2560, ''],
      ['Healing Power', 34.4 /* ([0][4] * 0.2) */, 4.4, 2560, ''],
      ['Physical Defense', 260 /* ([0][2] * 1) */, 44, 2560, ''], // 71.35%
      ['Magic Defense', 260 /* ([0][2] * 1) */, 44, 2560, ''], // 23.81%
    ],

    [
      ['Misc Stats', 'Fixed', '#1d3314'],
      ['Move Speed', 5.4, 5.4, 10, 'm/s'],
      ['Cast Time', 93, 0, 100, '%'],
      ['Attack Speed', 190, 0, 100, ''], // (84.0%)
    ],
  ],
  PointLimit: 2560,
  PointDiff: false,
};

// Stat Card
function StatCard(props) {
  const [Name, setName] = useState(() => {
    let val = props.location.pathname
      .replace('/', '')
      .replace('StatCard', '')
      .replace('/', '');
    let iEnd = val.search(`\\[`);
    if (iEnd === -1) iEnd = undefined;

    return val.slice(0, iEnd);
  });
  const [Values, setValues] = useState(defaultData.Values);

  const [PointMin, setPointMin] = useState(defaultData.PointMin);
  const [PointMax, setPointMax] = useState(defaultData.PointMax);
  const [PointTotal, setPointTotal] = useState(defaultData.PointTotal);

  const [PointLimit, setPointLimit] = useState(defaultData.PointLimit);
  const [PointDiff, setPointDiff] = useState(defaultData.PointDiff);

  const data = {
    Name,
    Values,
    PointMin,
    PointMax,
    PointTotal,
    PointLimit,
    PointDiff,
  };
  const getData = () => {
    return data;
  };

  // Used for init load state to prevent the template template selecter from overriding the user defined URL. Probably another way of doing this.
  const dataFuncs = {
    setName,
    setValues,
    setPointMin,
    setPointMax,
    setPointTotal,
    setPointLimit,
    setPointDiff,
  };
  const [funcs] = useState({
    update: undefined,
    randomize: undefined,
    randAnim: undefined,
    updateLimit: undefined,
    getPointTotal: undefined,
  });

  // Needs to find a way to properly handling '%' and '?'
  // console.log('data.Name:', data.Name);
  // const GetURLCode = () => {
  //   let sResult = '';
  //   for (let x = 0; x < Values.length; x++) {
  //     let xBuffer = '';
  //     for (let y = 0; y < 5; y++) {
  //       let yBuffer = Values.value[x][y];
  //       /* Check for UnitType column and encode and '%' that appear fdor the URL*/
  //       if (y === 4 && yBuffer) {
  //         console.log('yBuffer:', x, y, yBuffer);
  //         yBuffer = yBuffer.replace('%', '%25');
  //       }
  //       xBuffer += yBuffer + ',';
  //     }
  //     sResult += '[' + xBuffer.slice(0, xBuffer.length - 1) + ']';
  //   }
  //   //console.log('data.Values:', Values, 'Name:', Name);

  //   return String(
  //     // 'koyfoster.github.io/#/StatCard/' +
  //     'localhost:3000/#/StatCard/' +
  //       Name +
  //       sResult +
  //       (PointDiff ? 'Min=true' : '') +
  //       '/',
  //   ).replace('//', '/');
  // };

  const hForms = () => {
    const hBuffer = [];
    for (let i = 0; i < data.Values.length; i) {
      hBuffer.push(
        <Paper
          style={{
            width: '320px',
            margin: 4,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: getData().Values[i][0][2],
            // fontColor: getData().Values[i][0][2],
          }}
        >
          <StatInputForm
            key={`StatDataForm_${i}`}
            name={`StatDataForm_${i}`}
            bCalc={getData().Values[i][0][1] === 'Calculated'}
            Values={getData().Values[i]}
            data={getData}
            setData={dataFuncs}
            UpdateStates={funcs.update}
            RandomizeStats={funcs.randomize}
            UpdatePointLimit={funcs.updateLimit}
          />
        </Paper>,
      );
      i += 1;
    }
    return hBuffer;
  };

  const hDiagrams = () => {
    const hBuffer = [];

    for (let i = 0; i < data.Values.length; i) {
      hBuffer.push(
        <Paper
          style={{
            // width: '768px',
            width: '564px',
            margin: 4,
            padding: 4,
            display: 'flexbox',
            flexDirection: 'row',
            backgroundColor: getData().Values[i][0][2],
            // fontColor: getData().Values[i][0][2],
          }}
        >
          <Diagram
            name={'StatDataDiagram'}
            key={'StatDataDiagram'}
            data={{ Values: Values[i] }}
            funcs={funcs}
          />
        </Paper>,
      );
      i += 1;
    }
    return hBuffer;
  };

  // Render and Logic
  return (
    <Box
      name="body"
      style={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}
      bgcolor="darkGrey"
    >
      <Row alignItems="top">
        <Col alignSelf="top">
          {
            //   <StatData
            //   name={'StatData'}
            //   key={'StatData'}
            //   {...props}
            //   data={getData}
            //   setData={dataFuncs}
            //   funcs={funcs}
            // />
            //   <TemplateSelector
            //   Name={data.Name}
            //   setData={dataFuncs}
            //   funcs={funcs}
            //   defaultValue={data.Name ? undefined : defaultTemplates[iDefTmpl]}
            //   MenuItems={tmplMenuItems}
            // />
          }

          {hForms()}
          {/* {<StatCode GetURLCode={GetURLCode} />} */}
        </Col>
        {hDiagrams()}
      </Row>
    </Box>
  );
}

export default StatCard;
