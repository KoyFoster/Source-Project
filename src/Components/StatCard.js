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
  Name: 'Default Data',

  Values: [
    [
      [
        'Primary Stats',
        'Fixed',
        '{ "background": "#4ab8c5"}',
        [2358, 70, 12800] /* Totals(val, min, max) */,
        2560 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Strength', 1882, 3, 2560, ''],
      ['Agility', 22, 3, 2560, ''],
      ['Stamina', 260, 3, 2560, ''],
      ['Spirit', 172, 3, 2560, ''],
      ['Intelligence', 22, 58, 2560, ''],
    ],

    [
      [
        'Secondary Stats',
        'Calculated',
        '{ "background": "#c03311", "doNotGraph": true }',
        [0, 0, 0] /* Totals(val, min, max) */,
        2560 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Health', 3120, 264, 30720, '', [0, 3], 'a * 12'],
      ['Mana', 4.4, 264, 30720, '', [0, 5], 'a * 0.2'],
      ['Melee Attack', 376.40000000000003, 4.4, 2560, '', [0, 1], 'a * 0.2'],
      ['Range Attack', 4.4, 4.4, 2560, '', [0, 2], 'a * 0.2'],
      ['Magic Attack', 4.4, 4.4, 2560, '', [0, 5], 'a * 0.2'],
      ['Healing Power', 34.4, 4.4, 2560, '', [0, 4], 'a * 0.2'],
      ['Physical Defense', 260, 44, 2560, '', [0, 3], 'a * 1'], // 71.35%
      ['Magic Defense', 260, 44, 2560, '', [0, 3], 'a * 1'], // 23.81%
    ],

    [
      [
        'Misc Stats',
        'Fixed',
        '{ "background": "#1d3314" }' /* , "width": 480 , "height": 480 */,
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Move Speed', 5.4, 5.4, 10, 'm/s'],
      ['Cast Time', 93, 0, 100, '%'],
      ['Attack Speed', 190, 0, 1200, ''], // (84.0%)
    ],
  ],
};

// Stat Card
function StatCard(props) {
  const [Values, setValues] = useState(defaultData.Values);
  const [update, setUpdate] = useState(false);

  const data = {
    update,
    Name: (index) => {
      return Values[index][0][0];
    },
    Values,
    vTableHeader: (index) => {
      return Values[index][0];
    },
    vTable: (index) => {
      return Values[index].slice(1, Values[index].length);
    },
    PointTotal: (index) => {
      return Values[index][0][3][0];
    },
    PointMin: (index) => {
      return Values[index][0][3][1];
    },
    PointMax: (index) => {
      return Values[index][0][3][2];
    },
    PointLimit: (index) => {
      return Values[index][0][4];
    },
    PointDiff: (index) => {
      return Values[index][0][5];
    },
  };
  const getData = () => {
    return data;
  };

  // Used for init load state to prevent the template template selecter from overriding the user defined URL. Probably another way of doing this.
  const dataFuncs = {
    setValues,
    setTable: (index, val) => {
      Values[index] = val;
    },
    setUpdate,
    setName: (index, val) => {
      Values[index][0][0] = val;
    },
    setPointTotal: (index, val) => {
      Values[index][0][3][0] = val;
    },
    setPointMin: (index, val) => {
      Values[index][0][3][1] = val;
    },
    setPointMax: (index, val) => {
      Values[index][0][3][2] = val;
    },
    setPointLimit: (index, val) => {
      Values[index][0][4] = val;
    },
    setPointDiff: (index, val) => {
      Values[index][0][5] = val;
    },
  };
  const [funcs] = useState({
    update: undefined,
    randomize: undefined,
    randAnim: undefined,
    updateLimit: undefined,
    getPointTotal: undefined,
  });

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

  // Temp Styles
  const padding = 3;
  const margin = 3;

  const hForms = () => {
    const hBuffer = [];
    for (let i = 0; i < data.Values.length * 2; i) {
      const iI = i / 2;
      if (i % 2 === 0)
        hBuffer.push(
          <div
            key={`FormDiv2_${iI}`}
            style={{
              flexShrink: 0,
              flex: 0,

              display: 'flex',
            }}
          >
            <Col
              style={{
                alignSelf: 'flex-start', //'flex-start'
              }}
            >
              <Paper
                key={`PaperForm_${iI}`}
                name={`PaperForm_${iI}`}
                style={{
                  margin: margin,
                  padding: padding,

                  backgroundColor: JSON.parse(getData().Values[iI][0][2])
                    .background,
                }}
              >
                <StatInputForm
                  iD={iI}
                  doNotGraph={JSON.parse(getData().Values[iI][0][2]).doNotGraph}
                  key={`StatDataForm_${iI}`}
                  name={`StatDataForm_${iI}`}
                  bCalc={getData().Values[iI][0][1] === 'Calculated'}
                  Values={getData().Values[iI]}
                  data={getData}
                  setData={dataFuncs}
                  Update={funcs.update}
                  RandomizeStats={funcs.randomize}
                  UpdatePointLimit={funcs.updateLimit}
                />
              </Paper>
            </Col>
          </div>,
        );
      else hBuffer.push(<div key={`FormDivSpacer_${i}`} style={{}}></div>);
      i += 1;
    }

    return (
      <div
        key={`FormDiv`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',

          // border: '3px solid cyan',
        }}
      >
        {hBuffer}
      </div>
    );
  };

  const hDiagrams = () => {
    const hBuffer = [];

    for (let i = 0; i < data.Values.length; i) {
      hBuffer.push(
        <div
          key={`GiagDiv2_${i}`}
          style={{
            flexShrink: 1,
            alignSelf: 'flex-start', //'flex-start'

            display: 'flex',
          }}
        >
          <Col
            style={{
              alignSelf: 'flex-start', //'flex-start'
            }}
          >
            <Paper
              key={`PaperDiagram_${i}`}
              name={`PaperDiagram_${i}`}
              style={{
                width: `${564}px`,
                height: `${564}px`,
                margin: margin,
                padding: padding,

                ...JSON.parse(getData().Values[i][0][2]),
                // fontColor: getData().Values[i][0][2],
              }}
            >
              <Diagram
                key={`StatDataDiagram_${i}`}
                name={`StatDataDiagram_${i}`}
                iStrt={1}
                data={{ Values: Values[i] }}
                funcs={funcs}
              />
            </Paper>
          </Col>
        </div>,
      );
      i += 1;
    }
    return (
      <div
        key={`DiagDiv`}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {hBuffer}
      </div>
    );
  };

  // Render and Logic
  return (
    <Box
      name="body"
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      bgcolor="darkGrey"
    >
      <StatData
        name={'StatData'}
        key={'StatData'}
        {...props}
        data={getData}
        setData={dataFuncs}
        funcs={funcs}
      />
      <Col name="mainColumn">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TemplateSelector
            Name={defaultData.Name}
            setData={dataFuncs}
            funcs={funcs}
            defaultValue={
              defaultData.Name ? undefined : defaultTemplates[iDefTmpl]
            }
            MenuItems={tmplMenuItems}
            style={{
              flexGrow: 1,
              margin: margin,
              marginBottom: 0,
              padding: padding,
            }}
          />
          <StatCode /* GetURLCode={GetURLCode} */ />
        </div>
        <Row name="mainRow">
          <Paper
            alignItems="top"
            style={{
              margin: margin,
              marginRight: 0,
              padding: padding,

              flex: 1,
            }}
          >
            <Row style={{}}>{hForms()}</Row>
          </Paper>

          <Paper
            alignItems="top"
            style={{
              margin: margin,
              marginLeft: 0,
              padding: padding,

              flex: 1.62,
            }}
          >
            <Row style={{}}>{hDiagrams()}</Row>
          </Paper>
        </Row>
      </Col>
    </Box>
  );
}

export default StatCard;
