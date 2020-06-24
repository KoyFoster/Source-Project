import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import { MenuItem } from '@material-ui/core';
import StatForm from './StatForm.js';
import Diagram from './Diagram.js';
import StatData from './StatData.js';
import { Row, Col } from './DivGrid';
import StatCode from './StatCode';
import Tree from './Forms/Tree';

// test data
const newDefaultData = {
  value: 'Default Data',
  children: [
    // Start of Container Card
    {
      value: 'Page One',
      children: [
        // Start of stat table
        {
          value: '+Visible Player Stats-',
          minMax: [0, 0, 0],
          pointLimit: 0,
          pointDiff: false,
          children: [
            {
              value: 'Health',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 3]}', 'a * 12'],
            },
            {
              value: 'Mana',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 5]}', 'a * 12'],
            },
          ],
        },
        // End of stat table

        {
          value: '-Primary Stats-',
          type: 'Fixed',
          minMax: [2358, 70, 12800],
          pointLimit: 2560,
          pointDiff: false,
          children: [
            { value: 'Strength', minMax: [103, 3, 2560], unit: '' },
            { value: 'Agility', minMax: [119, 3, 2560], unit: '' },
            { value: 'Stamina', minMax: [181, 3, 2560], unit: '' },
            { value: 'Spirit', minMax: [216, 3, 2560], unit: '' },
            { value: 'Intelligence', minMax: [1391, 58, 2560], unit: '' },
          ],
        },

        {
          value: '-Secondary Stats+',
          type: 'Calculated',
          minMax: [0, 0, 0],
          pointTotal: 2560,
          pointDiff: false,
          children: [
            {
              value: 'Melee Attack',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 1]}', 'a * 0.2'],
            },
            {
              value: 'Range Attack',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 2]}', 'a * 0.2'],
            },
            {
              value: 'Magic Attack',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 5]}', 'a * 0.2'],
            },
            {
              value: 'Healing Power',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 4]}', 'a * 0.2'],
            },
            {
              value: 'Physical Defense',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 3]}', 'a * 1'],
            },
            {
              value: 'Magic Defense',
              minMax: [0, 0, 0],
              unit: '',
              math: ['{"a": [2, 3]}', 'a * 1'],
            },
          ],
        },

        {
          value: '-Misc Stats+',
          type: 'Calculated',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            {
              value: 'Move Speed',
              minMax: [5.4, 5.4, 10],
              unit: 'm/s',
              math: ['{}', ''],
            },
            {
              value: 'Cast Time',
              minMax: [0, 0, 100],
              unit: '%',
              math: [
                '{"a": [2, 4], "b": [2, 5]}',
                '(a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013))',
              ],
            },
            {
              value: 'Attack Speed',
              minMax: [190, 0, 1200],
              unit: '%',
              math: ['{}', ''],
            },
          ],
        },
      ], // end of Page One Children
    },
    {
      value: '-Page Two: Attack Details-',
      children: [
        {
          value: '-Melee Attack-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Melee Attack Speed', minMax: [1, 1, 10], unit: '' },
            { value: 'Melee Accuracy', minMax: [1, 1, 10], unit: '' },
            {
              value: 'Melee Critical Status',
              minMax: [1, 1, 10],
              unit: '',
            },
            {
              value: 'Melee Critical Damage',
              minMax: [1, 1, 10],
              unit: '',
            },
            {
              value: 'Backstab Melee Damage',
              minMax: [1, 1, 10],
              unit: '',
            },
            { value: 'Melee Skill Damage', minMax: [1, 1, 10], unit: '' },
            { value: 'PvE Melee Skills', minMax: [1, 1, 10], unit: '' },
          ],
        },
      ],
    },

    {
      value: '-Ranged Attack-',
      type: 'Fixed',
      minMax: [-1, -1, -1],
      pointLimit: -1,
      pointDiff: false,
      children: [
        { value: 'Ranged Accuracy', minMax: [1, 1, 10], unit: '' },
        { value: 'Ranged Critical Status', minMax: [1, 1, 10], unit: '' },
        { value: 'Ranged Critical Damage', minMax: [1, 1, 10], unit: '' },
        { value: 'Backstab Ranged Damage', minMax: [1, 1, 10], unit: '' },
        { value: 'Ranged Skill Damage', minMax: [1, 1, 10], unit: '' },
        { value: 'PvE Ranged Skills', minMax: [1, 1, 10], unit: '' },
      ],
    },

    {
      value: '-Magic Attack-',
      type: 'Fixed',
      minMax: [-1, -1, -1],
      pointLimit: -1,
      pointDiff: false,
      children: [
        { value: 'Magic Accuracy', minMax: [1, 1, 10], unit: '' },
        { value: 'Magic Critical Status', minMax: [1, 1, 10], unit: '' },
        { value: 'Magic Critical Damage', minMax: [1, 1, 10], unit: '' },
        { value: 'Backstab Magic Damage', minMax: [1, 1, 10], unit: '' },
        { value: 'Magic Skill Damage', minMax: [1, 1, 10], unit: '' },
        { value: 'PvE Magic Skills', minMax: [1, 1, 10], unit: '' },
      ],
    },

    {
      value: '-Misc-',
      type: 'Fixed',
      minMax: [-1, -1, -1],
      pointLimit: -1,
      pointDiff: false,
      children: [
        { value: 'Focus', minMax: [1, 1, 10], unit: '' },
        {
          value: 'Shield Defense Penetration Rate',
          minMax: [1, 1, 10],
          unit: '',
        },
        { value: 'Shield Defense Penetration', minMax: [1, 1, 10], unit: '' },
        { value: 'Defense Penetration', minMax: [1, 1, 10], unit: '' },
        { value: 'Magic Defense Penetration', minMax: [1, 1, 10], unit: '' },
      ],
    },
    {
      value: '-Page Three: Defense Details-',
      children: [
        {
          value: '-Defense-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Parry Rate', minMax: [1, 1, 10], unit: '' },
            { value: 'Shield Block Rate', minMax: [1, 1, 10], unit: '' },
            { value: 'Evasion', minMax: [1, 1, 10], unit: '' },
            { value: 'Resiliance', minMax: [1, 1, 10], unit: '' },
            { value: 'Toughness', minMax: [1, 1, 10], unit: '' },
            { value: 'Siege Damage Reduction', minMax: [1, 1, 10], unit: '' },
            { value: 'PvE Damage Reduction', minMax: [1, 1, 10], unit: '' },
          ],
        },
        {
          value: '-Melee Defense-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Melee Damage Reduction', minMax: [1, 1, 10], unit: '' },
            {
              value: 'Fixed Melee Damage Reduction',
              minMax: [1, 1, 10],
              unit: '',
            },
            {
              value: 'PvE Melee Damage Reduction',
              minMax: [1, 1, 10],
              unit: '',
            },
          ],
        },
        {
          value: '-Ranged Defense-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Ranged Damage Reduction', minMax: [1, 1, 10], unit: '' },
            {
              value: 'Fixed Ranged Damage Reduction',
              minMax: [1, 1, 10],
              unit: '',
            },
            {
              value: 'PvE Ranged Damage Reduction',
              minMax: [1, 1, 10],
              unit: '',
            },
          ],
        },
        {
          value: '-Magic Defense-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Magic Damage Reduction', minMax: [1, 1, 10], unit: '' },
            {
              value: 'Fixed Magic Damage Reduction',
              minMax: [1, 1, 10],
              unit: '',
            },
            {
              value: 'PvE Magic Damage Reduction',
              minMax: [1, 1, 10],
              unit: '',
            },
          ],
        },
      ],
    },

    {
      children: [
        {
          value: '-Heal-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Critical Heal Rate', minMax: [1, 1, 10], unit: '' },
            { value: 'Critical Heal Bonus', minMax: [1, 1, 10], unit: '' },
            { value: 'Healing', minMax: [1, 1, 10], unit: '' },
            { value: 'Healing Skill Damage', minMax: [1, 1, 10], unit: '' },
          ],
        },
        {
          value: '-Regeneration-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Heal Regen', minMax: [1, 1, 10], unit: '' },
            { value: 'Continuous Heal Regen', minMax: [1, 1, 10], unit: '' },
            { value: 'Mana Regen', minMax: [1, 1, 10], unit: '' },
            { value: 'Post-Cast Mana Regen', minMax: [1, 1, 10], unit: '' },
          ],
        },
        {
          value: '-Misc-',
          type: 'Fixed',
          minMax: [-1, -1, -1],
          pointLimit: -1,
          pointDiff: false,
          children: [
            { value: 'Received Healing', minMax: [1, 1, 10], unit: '' },
            {
              value: 'Increased experience gain',
              minMax: [1, 1, 10],
              unit: '',
            },
            { value: 'Loot Drop Rate', minMax: [1, 1, 10], unit: '' },
            { value: 'Gold earned from hunting', minMax: [1, 1, 10], unit: '' },
            { value: 'Stealth Detection', minMax: [1, 1, 10], unit: '' },
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
  // Render and Logic
  return <div>{renderStats(newDefaultData.children)}</div>;
}

export default Stats;
