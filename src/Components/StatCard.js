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
  const baseInputStyle = { width: '100%', border: 'none', padding: '0px' };
  const cellStyle = {
    borderRadius: '8px',
    borderLeft: '2px solid black',
    borderTop: '2px solid black',
    borderBottom: '2px solid grey',
    borderRight: '2px solid grey',
  };
  return (
    <div>
      {value.map((card) => {
        console.log('card:', card);
        return (
          <Grid
            value={card.children}
            style={{
              maxwidth: '512px',
              overflow: 'scroll',
              background: '#faf8e8',
              color: '#6e5735',
              fontFamily: 'NotoSansKR',
              border: '4px solid #6e5735',
              padding: '16px',
              margin: '4px',
            }}
            cellStyle={cellStyle}
            childrenAsRow
            columnWidths={['128px', '64px', '64px', '64px', '32px', '64px']}
            headerRows
            hHeader={['Stat', 'Value', 'Max', 'Max', 'Limit', 'Difference']}
            hRow={[
              <input type="text" value={''} style={baseInputStyle} />,
              <input type="number" value={''} style={baseInputStyle} />,
              <input type="number" value={''} style={baseInputStyle} />,
              <input type="number" value={''} style={baseInputStyle} />,
              <input type="number" value={''} style={baseInputStyle} />,
              <input type="checkbox" checked={''} style={baseInputStyle} />,
              <Grid
                value={true}
                columnWidths={['128px', '64px', '64px', '64px', '32px', '64px']}
                style={{
                  // border: '2px dotted red',
                  width: '512px',
                  overflow: 'hidden',
                }}
                cellStyle={cellStyle}
                header
                hHeader={['Name', 'Value', 'Min', 'Max', 'Unit', 'Math']}
                hRow={[
                  <input
                    type="text"
                    value={''}
                    style={{ width: '100%', border: 'none', padding: '0px' }}
                  />,
                  <input type="number" value={''} style={baseInputStyle} />,
                  <input type="number" value={''} style={baseInputStyle} />,
                  <input type="number" value={''} style={baseInputStyle} />,
                  <input type="text" value={''} style={baseInputStyle} />,
                  <input type="text" value={''} style={baseInputStyle} />,
                ]}
              />,
            ]}
            onChange={handleChange}
          ></Grid>
        );
      })}
    </div>
  );
}

export default Stats;
