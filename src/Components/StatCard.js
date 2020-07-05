import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import { MenuItem } from '@material-ui/core';
import StatForm from './StatForm.js';
import Diagram from './Diagram.js';
import StatData from './StatData.js';
import { Row, Col } from './DivGrid';
import StatCode from './StatCode';
import Tree from './Forms/Tree';
import Grid from './Forms/Grid';

// test data
const newDefaultData = {
  value: 'Default Data',
  children: [
    // page one
    {
      value: 'Page One',
      children: [
        // Start of stat table
        {
          value: '+Visible Player Stats-',
          type: 'Fixed',
          num: 0,
          min: 0,
          max: 0,
          pointLimit: 0,
          pointDiff: false,

          children: [
            {
              value: 'Health',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 3]}', 'a * 12'],
            },
            {
              value: 'Mana',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 5]}', 'a * 12'],
            },
          ],
        },
        // End of stat table

        {
          value: '-Primary Stats-',
          type: 'Fixed',

          num: 2358,
          min: 70,
          max: 12800,
          pointLimit: 2560,
          pointDiff: false,
          children: [
            {
              value: 'Strength',

              num: 103,
              min: 3,
              max: 2560,
              unit: '',
            },
            {
              value: 'Agility',
              num: 119,
              min: 3,
              max: 2560,
              unit: '',
            },
            { value: 'Stamina', num: 181, min: 3, max: 2560, unit: '' },
            { value: 'Spirit', num: 216, min: 3, max: 2560, unit: '' },
            { value: 'Intelligence', num: 1391, min: 58, max: 2560, unit: '' },
          ],
        },

        {
          value: '-Secondary Stats+',
          type: 'Calculated',
          num: 0,
          min: 0,
          max: 0,
          pointTotal: 2560,
          pointDiff: false,
          children: [
            {
              value: 'Melee Attack',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 1]}', 'a * 0.2'],
            },
            {
              value: 'Range Attack',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 2]}', 'a * 0.2'],
            },
            {
              value: 'Magic Attack',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 5]}', 'a * 0.2'],
            },
            {
              value: 'Healing Power',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 4]}', 'a * 0.2'],
            },
            {
              value: 'Physical Defense',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 3]}', 'a * 1'],
            },
            {
              value: 'Magic Defense',
              num: 0,
              min: 0,
              max: 0,
              unit: '',
              math: ['{"a": [2, 3]}', 'a * 1'],
            },
          ],
        },

        {
          value: '-Misc Stats+',
          type: 'Calculated',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            {
              value: 'Move Speed',
              num: 5.4,
              min: 5.4,
              max: 10,
              unit: 'm/s',
              math: ['{}', ''],
            },
            {
              value: 'Cast Time',

              num: 0,
              min: 0,
              max: 100,
              unit: '%',
              math: [
                '{"a": [2, 4], "b": [2, 5]}',
                '(a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013))',
              ],
            },
            {
              value: 'Attack Speed',
              num: 190,
              min: 0,
              max: 1200,
              unit: '%',
              math: ['{}', ''],
            },
          ],
        },
      ], // end of Page One Children
    },
    // page two
    {
      value: '-Page Two: Attack Details-',
      children: [
        {
          value: '-Melee Attack-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Melee Attack Speed', num: 1, min: 1, max: 10, unit: '' },
            { value: 'Melee Accuracy', num: 1, min: 1, max: 10, unit: '' },
            {
              value: 'Melee Critical Status',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Melee Critical Damage',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Backstab Melee Damage',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            { value: 'Melee Skill Damage', num: 1, min: 1, max: 10, unit: '' },
            { value: 'PvE Melee Skills', num: 1, min: 1, max: 10, unit: '' },
          ],
        },
        {
          value: '-Ranged Attack-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Ranged Accuracy', num: 1, min: 1, max: 10, unit: '' },
            {
              value: 'Ranged Critical Status',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Ranged Critical Damage',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Backstab Ranged Damage',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            { value: 'Ranged Skill Damage', num: 1, min: 1, max: 10, unit: '' },
            { value: 'PvE Ranged Skills', num: 1, min: 1, max: 10, unit: '' },
          ],
        },

        {
          value: '-Magic Attack-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Magic Accuracy', num: 1, min: 1, max: 10, unit: '' },
            {
              value: 'Magic Critical Status',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Magic Critical Damage',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Backstab Magic Damage',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            { value: 'Magic Skill Damage', num: 1, min: 1, max: 10, unit: '' },
            { value: 'PvE Magic Skills', num: 1, min: 1, max: 10, unit: '' },
          ],
        },

        {
          value: '-Misc-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Focus', num: 1, min: 1, max: 10, unit: '' },
            {
              value: 'Shield Defense Penetration Rate',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Shield Defense Penetration',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            { value: 'Defense Penetration', num: 1, min: 1, max: 10, unit: '' },
            {
              value: 'Magic Defense Penetration',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
          ],
        },
      ],
    },
    // page three
    {
      value: '-Page Three: Defense Details-',
      children: [
        {
          value: '-Defense-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Parry Rate', num: 1, min: 1, max: 10, unit: '' },
            { value: 'Shield Block Rate', num: 1, min: 1, max: 10, unit: '' },
            { value: 'Evasion', num: 1, min: 1, max: 10, unit: '' },
            { value: 'Resiliance', num: 1, min: 1, max: 10, unit: '' },
            { value: 'Toughness', num: 1, min: 1, max: 10, unit: '' },
            {
              value: 'Siege Damage Reduction',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'PvE Damage Reduction',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
          ],
        },
        {
          value: '-Melee Defense-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            {
              value: 'Melee Damage Reduction',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Fixed Melee Damage Reduction',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'PvE Melee Damage Reduction',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
          ],
        },
        {
          value: '-Ranged Defense-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            {
              value: 'Ranged Damage Reduction',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Fixed Ranged Damage Reduction',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'PvE Ranged Damage Reduction',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
          ],
        },
        {
          value: '-Magic Defense-',
          type: 'Fixed',

          num: -1,
          min: -1,
          max: -1,
          pointLimit: -1,
          pointDiff: false,
          children: [
            {
              value: 'Magic Damage Reduction',
              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'Fixed Magic Damage Reduction',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
            {
              value: 'PvE Magic Damage Reduction',

              num: 1,
              min: 1,
              max: 10,
              unit: '',
            },
          ],
        },
        {
          children: [
            {
              value: '-Heal-',
              type: 'Fixed',

              num: -1,
              min: -1,
              max: -1,
              pointLimit: -1,
              pointDiff: false,
              children: [
                {
                  value: 'Critical Heal Rate',
                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
                {
                  value: 'Critical Heal Bonus',
                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
                { value: 'Healing', num: 1, min: 1, max: 10, unit: '' },
                {
                  value: 'Healing Skill Damage',
                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
              ],
            },
            {
              value: '-Regeneration-',
              type: 'Fixed',

              num: -1,
              min: -1,
              max: -1,
              pointLimit: -1,
              pointDiff: false,
              children: [
                { value: 'Heal Regen', num: 1, min: 1, max: 10, unit: '' },
                {
                  value: 'Continuous Heal Regen',

                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
                { value: 'Mana Regen', num: 1, min: 1, max: 10, unit: '' },
                {
                  value: 'Post-Cast Mana Regen',
                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
              ],
            },
            {
              value: '-Misc-',
              type: 'Fixed',

              num: -1,
              min: -1,
              max: -1,
              pointLimit: -1,
              pointDiff: false,
              children: [
                {
                  value: 'Received Healing',
                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
                {
                  value: 'Increased experience gain',

                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
                { value: 'Loot Drop Rate', num: 1, min: 1, max: 10, unit: '' },
                {
                  value: 'Gold earned from hunting',
                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
                {
                  value: 'Stealth Detection',
                  num: 1,
                  min: 1,
                  max: 10,
                  unit: '',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// render
const renderStats = (data) => {
  const result = [];

  // iterate
  for (let i = 0; i < data.length; i) {
    // check for children
    let children = null;
    if (data[i].children) {
      if (data[i].children.length) {
        children = renderStats(data[i].children);
      }
    }
    result.push(
      <div key={i}>
        {data[i].value}
        {children}
      </div>,
    );

    i += 1;
  }

  return result;
};

// Stat Card
function Stats(props) {
  // member variables
  const [value, setValue] = useState([...newDefaultData.children]);
  const handleChange = (e) => {
    console.log('Grid handleChange:', e);

    setValue(e.target.value);
  };

  // Render and Logic
  // return <div>{renderStats()}</div>;
  console.log('---------------------------------------------------');
  console.log('Grid Value:', value);
  console.log('---------------------------------------------------');
  return (
    <div>
      <button
        onClick={(e) => {
          setValue([['', '', '', '', '', '']]);
        }}
      >
        Change
      </button>
      <Grid
        value={value}
        // value={value}
        onChange={handleChange}
        hRow={[
          <input type="text" value={''} />,
          <Grid
            value={true}
            hRow={[
              <input type="text" value={''} />,
              <input type="checkbox" checked={''} />,
              <input type="number" value={''} />,
              <input type="number" value={''} />,
              <input type="number" value={''} />,
              <input type="number" value={''} />,
              <input type="checkbox" checked={''} />,
              <Grid
                value={true}
                hRow={[
                  <input type="text" value={''} />,
                  <input type="number" value={''} />,
                  <input type="number" value={''} />,
                  <input type="number" value={''} />,
                  <input type="text" value={''} />,
                  <input type="text" value={''} />,
                ]}
                header
                hHeader={['Value', 'Num', 'Min', 'Max', 'Unit', 'Math']}
                style={{
                  background: 'grey',
                }}
              />,
            ]}
            header
            hHeader={{
              value: ' ',
              type: '',
              num: '',
              min: '',
              max: '',
              pointLimit: 0,
              pointDiff: false,
              children: [],
            }}
            style={{
              background: 'limegreen',
            }}
            rowStyle={{
              borderBottom: '2px solid white',
            }}
            cellStyle={{
              border: '1px solid black',
            }}
            rowHeaderStyle={{
              border: '1px solid purple',
            }}
          />,
        ]}
        header
        hHeader={{
          value: ' ',
          children: [],
        }}
        rowHeader
        style={{
          background: 'green',
        }}
        rowStyle={{
          borderBottom: '2px solid white',
        }}
        cellStyle={{
          border: '1px solid black',
        }}
        rowHeaderStyle={{
          border: '1px solid purple',
        }}
      ></Grid>
    </div>
  );
}

export default Stats;
