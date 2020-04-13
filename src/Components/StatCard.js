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
  Name: '',
  Values: {
    value: [],
    size: 0,
  },
};

// function reducer(data, newData) {
//   return { ...data, ...newData };
// }

// Stat Card
function StatCard(props) {
  // const [data, setData] = useState(reducer, defaultData);
  // const [data, setData] = useReducer(reducer, defaultData);

  const [Name, setName] = useState(defaultData.Name);
  const [Size, setSize] = useState(defaultData.Size);
  const [Values, setValues] = useState(defaultData.Values);

  const [PointMin, setPointMin] = useState(defaultData.PointMin);
  const [PointMax, setPointMax] = useState(defaultData.PointMax);
  const [PointTotal, setPointTotal] = useState(defaultData.PointTotal);

  const [PointLimit, setPointLimit] = useState(defaultData.PointLimit);
  const [PointDiff, setPointDiff] = useState(defaultData.PointDiff);

  const data = {
    Name,
    Size,
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
    setSize,
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

  let userDefined = props.location.pathname.replace('/', '');
  console.log('userDefined:', userDefined);

  // Needs to find a way to properly handling '%' and '?'
  const GetURLCode = () => {
    let sResult = '';
    for (let x = 0; x < Values.size; x++) {
      let xBuffer = '';
      for (let y = 0; y < 5; y++) {
        let yBuffer = Values.value[x][y];
        xBuffer += yBuffer + ',';
      }
      sResult += '[' + xBuffer.slice(0, xBuffer.length - 1) + ']';
    }
    console.log('data.Values:', Values, 'Name:', Name);

    return String(
      //'koyfoster.github.io/#/StatCard/' +
      'localhost:3000/#/StatCard/' +
        Name +
        sResult +
        (PointDiff ? 'Min=true' : '') +
        '/',
    ).replace('//', '/');
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
          <StatData
            name={'StatData'}
            key={'StatData'}
            {...props}
            data={getData}
            setData={dataFuncs}
            funcs={funcs}
          />
          {
            <TemplateSelector
              Name={data.Name}
              setData={dataFuncs}
              funcs={funcs}
              // defaultValue={defaultTemplates[iDefTmpl]}
              MenuItems={tmplMenuItems}
            />
          }
          <Paper
            style={{
              width: '320px',
              margin: 4,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <StatInputForm
              key="StatDataForm1"
              name="StatDataForm"
              data={getData}
              setData={dataFuncs}
              UpdateStates={funcs.update}
              RandomizeStats={funcs.randomize}
              UpdatePointLimit={funcs.updateLimit}
            />
          </Paper>
          <StatCode GetURLCode={GetURLCode} />
        </Col>
        <Paper
          style={{
            width: '768px',
            margin: 4,
            padding: 4,
            display: 'flexbox',
            flexDirection: 'row',
          }}
        >
          <Diagram
            name={'StatDataDiagram'}
            key={'StatDataDiagram'}
            data={data}
            funcs={funcs}
          />
        </Paper>
      </Row>
    </Box>
  );
}

export default StatCard;
