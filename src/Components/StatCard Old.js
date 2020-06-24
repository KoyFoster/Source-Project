import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import { MenuItem } from '@material-ui/core';
import StatInputForm from './StatInputForm Old.js';
import Diagram from './Diagram.js';
import StatData from './StatData.js';
import { Row, Col } from './DivGrid';
import StatCode from './StatCode';
import Tree from './Forms/Tree';

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

// User Define Style Enum
// const UDS = { 1: 'style', 2: 'tStyle', 2: 'vStyle' };
// parse style func
const UDSObj = (obj, styleData, bMerge) => {
  if (!styleData) return [{}, {}, {}, {}];
  const buffer = [];
  for (let i = 0; i < styleData.length; i) {
    let buffer2;

    try {
      buffer2 = JSON.parse(styleData[i]);
      // console.log('SUCCESS:Parsed style object(', buffer2, ')');
    } catch {
      console.error('ERROR: Failed to parse style object(', styleData[i], ')');
      return [{}, {}, {}, {}];
    }

    buffer.push(bMerge && obj ? { ...obj[i], ...buffer2 } : buffer2);
    // console.log(`buffer${i}:`, buffer);

    i += 1;
  } // End of for loop

  // console.log('buffer:', buffer);
  return buffer;
};

const defaultData = {
  Name: 'Default Data',

  Values: [
    // Start of Container Card
    [
      '-Details-',
      'Container',
      [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
    ],
    [
      // Start of stat table
      [
        '+Visible Player Stats-',
        'Calculated',
        [
          '{ }',
          '{ "fontWeight": "bold" }',
          '{ }', // '{ "color": "red" }',
          '{ }', // '{ "color": "#21a536" }',
        ],
        [0, 0, 0] /* Totals(val, min, max) */,
        0 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Health', 0, 0, 0, '', '{"a": [2, 3]}', 'a * 12'],
      ['Mana', 0, 0, 0, '', '{"a": [2, 5]}', 'a * 12'],
    ], // End of stat table
    [
      [
        '-Primary Stats-',
        'Fixed',
        [
          '{ "borderTop": "none", "borderTopLeftRadius": "0px", "borderTopRightRadius": "0px" }',
          '{ "fontWeight": "undefined" }',
          '{ "color": "undefined" }',
          '{}',
        ],
        [2358, 70, 12800] /* Totals(val, min, max) */,
        2560 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Strength', 103, 3, 2560, ''],
      ['Agility', 119, 3, 2560, ''],
      ['Stamina', 181, 3, 2560, ''],
      ['Spirit', 216, 3, 2560, ''],
      ['Intelligence', 1391, 58, 2560, ''],
    ],

    [
      [
        '-Secondary Stats+',
        'Calculated',
        ['{}', '{}', '{}', '{}'],
        [0, 0, 0] /* Totals(val, min, max) */,
        2560 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Melee Attack', 0, 0, 0, '', '{"a": [2, 1]}', 'a * 0.2'],
      ['Range Attack', 0, 0, 0, '', '{"a": [2, 2]}', 'a * 0.2'],
      ['Magic Attack', 0, 0, 0, '', '{"a": [2, 5]}', 'a * 0.2'],
      ['Healing Power', 0, 0, 0, '', '{"a": [2, 4]}', 'a * 0.2'],
      ['Physical Defense', 0, 0, 0, '', '{"a": [2, 3]}', 'a * 1'], // 71.35%
      ['Magic Defense', 0, 0, 0, '', '{"a": [2, 3]}', 'a * 1'], // 23.81%
    ],

    [
      [
        '-Misc Stats+',
        'Calculated',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Move Speed', 5.4, 5.4, 10, 'm/s', '{}', ''],
      [
        'Cast Time',
        0,
        0,
        100,
        '%',
        '{"a": [2, 4], "b": [2, 5]}',
        '(a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013))',
      ],
      ['Attack Speed', 190, 0, 1200, '', '{}', ''], // (84.0%)
    ],

    ['-Details-', 'End', ['{}', '{}', '{}', '{}'], [], [], []],
    [
      '-Details-',
      'Container',
      [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
    ],
    [
      [
        '-Melee Attack-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Melee Attack Speed', 1, 1, 10, ''],
      ['Melee Accuracy', 1, 1, 10, ''],
      ['Melee Critical Status', 1, 1, 10, ''],
      ['Melee Critical Damage', 1, 1, 10, ''],
      ['Backstab Melee Damage', 1, 1, 10, ''],
      ['Melee Skill Damage', 1, 1, 10, ''],
      ['PvE Melee Skills', 1, 1, 10, ''],
    ],
    [
      [
        '-Ranged Attack-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Ranged Attack Speed', 1, 1, 10, ''],
      ['Ranged Accuracy', 1, 1, 10, ''],
      ['Ranged Critical Status', 1, 1, 10, ''],
      ['Ranged Critical Damage', 1, 1, 10, ''],
      ['Backstab Ranged Damage', 1, 1, 10, ''],
      ['Ranged Skill Damage', 1, 1, 10, ''],
      ['PvE Melee Skills', 1, 1, 10, ''],
    ],
    [
      [
        '-Magic Attack-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Magic Attack Speed', 1, 1, 10, ''],
      ['Magic Accuracy', 1, 1, 10, ''],
      ['Magic Critical Status', 1, 1, 10, ''],
      ['Magic Critical Damage', 1, 1, 10, ''],
      ['Backstab Magic Damage', 1, 1, 10, ''],
      ['Magic Skill Damage', 1, 1, 10, ''],
      ['PvE Magic Skills', 1, 1, 10, ''],
    ],
    [
      [
        '-Misc-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Focus Attack Speed', 1, 1, 10, ''],
      ['Shield Defense Penetration Rate', 1, 1, 10, ''],
      ['Shield Defense Penetration', 1, 1, 10, ''],
      ['Defense Penetration', 1, 1, 10, ''],
      ['Magic Defense Penetration', 1, 1, 10, ''],
    ],
    ['-Details-', 'End', ['{}', '{}', '{}', '{}'], [], [], []],
    [
      '-Details-',
      'Container',
      [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
    ],
    [
      [
        '-Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Parry Rate', 1, 1, 10, ''],
      ['Shield Block Rate', 1, 1, 10, ''],
      ['Evasion', 1, 1, 10, ''],
      ['Resiliance', 1, 1, 10, ''],
      ['Toughness', 1, 1, 10, ''],
      ['Siege Damage Reduction', 1, 1, 10, ''],
      ['PvE Damage Reduction', 1, 1, 10, ''],
    ],
    [
      [
        '-Melee Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Melee Damage Reduction', 1, 1, 10, ''],
      ['Fixed Melee Damage Reduction', 1, 1, 10, ''],
      ['PvE Melee Damage Reduction', 1, 1, 10, ''],
    ],
    [
      [
        '-Ranged Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Ranged Damage Reduction', 1, 1, 10, ''],
      ['Fixed Ranged Damage Reduction', 1, 1, 10, ''],
      ['PvE Ranged Damage Reduction', 1, 1, 10, ''],
    ],
    [
      [
        '-Magic Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Magic Damage Reduction', 1, 1, 10, ''],
      ['Fixed Magic Damage Reduction', 1, 1, 10, ''],
      ['PvE Magic Damage Reduction', 1, 1, 10, ''],
    ],

    ['-Details-', 'End', ['{}', '{}', '{}', '{}'], [], [], []],
    [
      '-Details-',
      'Container',
      [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
    ],
    [
      [
        '-Heal-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Critical Heal Rate', 1, 1, 10, ''],
      ['Critical Heal Bonus', 1, 1, 10, ''],
      ['Healing', 1, 1, 10, ''],
      ['Healing Skill Damage', 1, 1, 10, ''],
    ],
    [
      [
        '-Regeneration-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Heal Regen', 1, 1, 10, ''],
      ['Continuous Heal Regen', 1, 1, 10, ''],
      ['Mana Regen', 1, 1, 10, ''],
      ['Post-Cast Mana Regen', 1, 1, 10, ''],
    ],
    [
      [
        '-Misc-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Received Healing', 1, 1, 10, ''],
      ['Increased experience gain', 1, 1, 10, ''],
      ['Loot Drop Rate', 1, 1, 10, ''],
      ['Gold earned from hunting', 1, 1, 10, ''],
      ['Stealth Detection', 1, 1, 10, ''],
    ],
  ],
};

const newDefaultData = {
  label: 'Default Data',
  value: [
    // Start of Container Card
    {
      label: 'Details',
      styles: [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
      children: [
        [
          // Start of stat table
          {
            label: '+Visible Player Stats-',
            type: 'Calculated',
            style: [
              '{ }',
              '{ "fontWeight": "bold" }',
              '{ }', // '{ "color": "red" }',
              '{ }', // '{ "color": "#21a536" }',
            ],
            minMax: [0, 0, 0] /* Totals(val, min, max) */,
            pintLimit: 0 /* PointLimit */,
            pointDiff: false /* PointDiff */,
          },
          ['Health', 0, 0, 0, '', '{"a": [2, 3]}', 'a * 12'],
          ['Mana', 0, 0, 0, '', '{"a": [2, 5]}', 'a * 12'],
        ], // End of stat table
        [
          [
            '-Primary Stats-',
            'Fixed',
            [
              '{ "borderTop": "none", "borderTopLeftRadius": "0px", "borderTopRightRadius": "0px" }',
              '{ "fontWeight": "undefined" }',
              '{ "color": "undefined" }',
              '{}',
            ],
            [2358, 70, 12800] /* Totals(val, min, max) */,
            2560 /* PointLimit */,
            false /* PointDiff */,
          ],
          ['Strength', 103, 3, 2560, ''],
          ['Agility', 119, 3, 2560, ''],
          ['Stamina', 181, 3, 2560, ''],
          ['Spirit', 216, 3, 2560, ''],
          ['Intelligence', 1391, 58, 2560, ''],
        ],

        [
          [
            '-Secondary Stats+',
            'Calculated',
            ['{}', '{}', '{}', '{}'],
            [0, 0, 0] /* Totals(val, min, max) */,
            2560 /* PointLimit */,
            false /* PointDiff */,
          ],
          ['Melee Attack', 0, 0, 0, '', '{"a": [2, 1]}', 'a * 0.2'],
          ['Range Attack', 0, 0, 0, '', '{"a": [2, 2]}', 'a * 0.2'],
          ['Magic Attack', 0, 0, 0, '', '{"a": [2, 5]}', 'a * 0.2'],
          ['Healing Power', 0, 0, 0, '', '{"a": [2, 4]}', 'a * 0.2'],
          ['Physical Defense', 0, 0, 0, '', '{"a": [2, 3]}', 'a * 1'], // 71.35%
          ['Magic Defense', 0, 0, 0, '', '{"a": [2, 3]}', 'a * 1'], // 23.81%
        ],

        [
          [
            '-Misc Stats+',
            'Calculated',
            ['{}', '{}', '{}', '{}'],
            [-1, -1, -1] /* Totals(val, min, max) */,
            -1 /* PointLimit */,
            false /* PointDiff */,
          ],
          ['Move Speed', 5.4, 5.4, 10, 'm/s', '{}', ''],
          [
            'Cast Time',
            0,
            0,
            100,
            '%',
            '{"a": [2, 4], "b": [2, 5]}',
            '(a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013))',
          ],
          ['Attack Speed', 190, 0, 1200, '', '{}', ''], // (84.0%)
        ],
      ],
    },
    [
      '-Details-',
      'Container',
      [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
    ],
    [
      [
        '-Melee Attack-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Melee Attack Speed', 1, 1, 10, ''],
      ['Melee Accuracy', 1, 1, 10, ''],
      ['Melee Critical Status', 1, 1, 10, ''],
      ['Melee Critical Damage', 1, 1, 10, ''],
      ['Backstab Melee Damage', 1, 1, 10, ''],
      ['Melee Skill Damage', 1, 1, 10, ''],
      ['PvE Melee Skills', 1, 1, 10, ''],
    ],
    [
      [
        '-Ranged Attack-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Ranged Attack Speed', 1, 1, 10, ''],
      ['Ranged Accuracy', 1, 1, 10, ''],
      ['Ranged Critical Status', 1, 1, 10, ''],
      ['Ranged Critical Damage', 1, 1, 10, ''],
      ['Backstab Ranged Damage', 1, 1, 10, ''],
      ['Ranged Skill Damage', 1, 1, 10, ''],
      ['PvE Melee Skills', 1, 1, 10, ''],
    ],
    [
      [
        '-Magic Attack-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Magic Attack Speed', 1, 1, 10, ''],
      ['Magic Accuracy', 1, 1, 10, ''],
      ['Magic Critical Status', 1, 1, 10, ''],
      ['Magic Critical Damage', 1, 1, 10, ''],
      ['Backstab Magic Damage', 1, 1, 10, ''],
      ['Magic Skill Damage', 1, 1, 10, ''],
      ['PvE Magic Skills', 1, 1, 10, ''],
    ],
    [
      [
        '-Misc-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Focus Attack Speed', 1, 1, 10, ''],
      ['Shield Defense Penetration Rate', 1, 1, 10, ''],
      ['Shield Defense Penetration', 1, 1, 10, ''],
      ['Defense Penetration', 1, 1, 10, ''],
      ['Magic Defense Penetration', 1, 1, 10, ''],
    ],
    ['-Details-', 'End', ['{}', '{}', '{}', '{}'], [], [], []],
    [
      '-Details-',
      'Container',
      [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
    ],
    [
      [
        '-Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Parry Rate', 1, 1, 10, ''],
      ['Shield Block Rate', 1, 1, 10, ''],
      ['Evasion', 1, 1, 10, ''],
      ['Resiliance', 1, 1, 10, ''],
      ['Toughness', 1, 1, 10, ''],
      ['Siege Damage Reduction', 1, 1, 10, ''],
      ['PvE Damage Reduction', 1, 1, 10, ''],
    ],
    [
      [
        '-Melee Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Melee Damage Reduction', 1, 1, 10, ''],
      ['Fixed Melee Damage Reduction', 1, 1, 10, ''],
      ['PvE Melee Damage Reduction', 1, 1, 10, ''],
    ],
    [
      [
        '-Ranged Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Ranged Damage Reduction', 1, 1, 10, ''],
      ['Fixed Ranged Damage Reduction', 1, 1, 10, ''],
      ['PvE Ranged Damage Reduction', 1, 1, 10, ''],
    ],
    [
      [
        '-Magic Defense-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Magic Damage Reduction', 1, 1, 10, ''],
      ['Fixed Magic Damage Reduction', 1, 1, 10, ''],
      ['PvE Magic Damage Reduction', 1, 1, 10, ''],
    ],

    ['-Details-', 'End', ['{}', '{}', '{}', '{}'], [], [], []],
    [
      '-Details-',
      'Container',
      [
        '{"background": "#faf8e8", "color": "#6e5735", "fontFamily": "NotoSansKR", "border": "4px solid #6e5735", "padding": "16px", "margin": "4px"}',
        '{}',
        '{}',
        '{}',
      ],
    ],
    [
      [
        '-Heal-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Critical Heal Rate', 1, 1, 10, ''],
      ['Critical Heal Bonus', 1, 1, 10, ''],
      ['Healing', 1, 1, 10, ''],
      ['Healing Skill Damage', 1, 1, 10, ''],
    ],
    [
      [
        '-Regeneration-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Heal Regen', 1, 1, 10, ''],
      ['Continuous Heal Regen', 1, 1, 10, ''],
      ['Mana Regen', 1, 1, 10, ''],
      ['Post-Cast Mana Regen', 1, 1, 10, ''],
    ],
    [
      [
        '-Misc-',
        'Fixed',
        ['{}', '{}', '{}', '{}'],
        [-1, -1, -1] /* Totals(val, min, max) */,
        -1 /* PointLimit */,
        false /* PointDiff */,
      ],
      ['Received Healing', 1, 1, 10, ''],
      ['Increased experience gain', 1, 1, 10, ''],
      ['Loot Drop Rate', 1, 1, 10, ''],
      ['Gold earned from hunting', 1, 1, 10, ''],
      ['Stealth Detection', 1, 1, 10, ''],
    ],
  ],
};

// Stat Card
function StatCard(props) {
  const initValues = (values = defaultData.Values) => {
    return values;
  };

  const [Values, setValues] = useState(initValues());
  const [update, setUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const data = {
    update,
    Values,
    ShowName: (index) => {
      return Values[index][0][0] ? Values[index][0][0][0] : '-';
    },
    ShowGraph: (index) => {
      return Values[index][0][0]
        ? Values[index][0][0][Values[index][0][0].length - 1]
        : '-';
    },
    Name: (index) => {
      return Values[index][0][0];
    },
    vTableHeader: (index) => {
      return Values[index][0];
    },
    vTableType: (index) => {
      return Values[index][0][1];
    },
    vTable: (index, bAll = false) => {
      if (!bAll) {
        return Values[index].slice(1, Values[index].length);
      } else return Values[index];
    },
    vSetTable: (index, val) => {
      return (Values[index] = val);
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
    setValue: (index, x, val) => {
      Values[index][x][1] = val;
    },
    setTable: (index, val) => {
      console.log(`Values[${index}]:`, val);
      Values[index] = val;
    },
    Update: () => {
      setUpdate(!update);
    },
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
    updateCalcs: undefined,
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
  //   //console.log('ValuesValues:', Values, 'Name:', Name);

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

  const hForm = (cardData, index, styleObj) => {
    const length = styleObj ? styleObj.length : 0;
    return (
      <StatInputForm
        iD={index}
        key={`StatDataForm_${index}`}
        name={`StatDataForm_${index}`}
        bCalc={cardData[index][0][1] === 'Calculated'}
        Values={cardData[index]}
        data={getData}
        setData={dataFuncs}
        Update={funcs.update}
        RandomizeStats={funcs.randomize}
        UpdatePointLimit={funcs.updateLimit}
        UpdateCalcs={funcs.updateCalcs}
        editMode={editMode}
        lStyle={length > 0 ? styleObj[1] : undefined}
        tStyle={length > 1 ? styleObj[2] : undefined}
        vStyle={length > 2 ? styleObj[3] : undefined}
      />
    );
  };

  // This uses recursion
  const hCards = (
    cardData = null,
    depth = 0,
    index = 0,
    parentStyle = undefined,
  ) => {
    let hFormList = undefined;
    let hContainerList = [];
    let styleObj = undefined;
    let hFormBuffer = undefined;

    // Interate through Card Data
    for (let i = index; i < cardData.length * 2; i) {
      const iI = i / 2;
      hFormBuffer = [];
      if (i % 2 === 0) {
        /* Check for sub data */
        if (cardData[iI][1] === 'End') {
          i += 1;
          break;
        } else if (cardData[iI][1] === 'Container') {
          styleObj = [...UDSObj(styleObj, cardData[iI][2], true)];
          const statCard = cardData;

          const buffer = hCards(statCard, depth + 1, i + 2, styleObj);
          if (buffer) {
            index = buffer.index;
            i = index;
            hFormBuffer = buffer.card;
          }
        } else {
          styleObj = [...UDSObj(styleObj, cardData[iI][0][2], true)];
          hFormBuffer = hForm(cardData, iI, styleObj);
        }
      } // Push Spacer

      /* Push New Card */
      if (hFormBuffer) {
        hFormList ? hFormList.push(hFormBuffer) : (hFormList = [hFormBuffer]);
      }
      i += 1;
      index = i;
    } // end of for loop

    // Check if hFormList still have contents and add it to hContainerlist if so
    if (hFormList !== undefined) {
      hContainerList.push(
        depth ? (
          <div
            key={`ContainedTable${depth}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 1,
            }}
          >
            {hFormList}
          </div>
        ) : (
          hFormList
        ),
      );
      /* Clear FormList */
      hFormList = undefined;
    } // End of FormList Push

    return {
      depth: depth - 1,
      index: index,
      card: (
        <div key={`ContainedCard${index}`}>
          <div
            style={{
              ...(parentStyle ? parentStyle[0] : undefined),

              display: 'inline-flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {hContainerList}
          </div>
        </div>
      ),
    };
  };

  const hDiagrams = () => {
    const hBuffer = [];

    // let styleObj = undefined;
    for (let i = 0; i < data.Values.length; i) {
      const noGraph = getData().ShowGraph(i) !== '+';
      if (!noGraph)
        hBuffer.push(
          <div
            key={`PaperDiagram_${i}`}
            name={`PaperDiagram_${i}`}
            style={{
              width: `${504}px`,
              height: `${504}px`,
              padding: padding,
            }}
          >
            <Diagram
              key={`StatDataDiagram_${i}`}
              name={`StatDataDiagram_${i}`}
              iStrt={1}
              data={{ Values: Values[i] }}
              funcs={funcs}
            />
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
          alignContent: 'flex-start',
        }}
      >
        {hBuffer}
      </div>
    );
  };

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  // Render and Logic
  return (
    <div
      name="body"
      style={{
        display: 'flex',
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
      <Col style={{ flexGrow: 1 }}>
        <Row>
          <Tree
            nodes={[
              { value: 'one', label: 'one', children: [] },
              {
                value: 'two',
                label: 'two',
                children: [
                  {
                    value: 'three',
                    label: 'three',
                    children: [
                      {
                        value: 'four',
                        label: 'four',
                      },
                    ],
                  },
                  {
                    value: 'five',
                    label: 'five',
                    children: [],
                  },
                ],
              },
              { value: 'six', label: 'six', children: [] },
            ]}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}

            // value={[]}
            // setValue={undefined}

            // style={{
            //   display: 'flexBox',
            //   border: '2px solid red',
            //   width: '256px',
            //   height: '256px',
            // }}
          ></Tree>
          <div style={{ margin: 4, padding: 4 }}>
            <button
              style={{ width: '128px' }}
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              Edit
            </button>
          </div>
          <TemplateSelector
            Name={defaultData.Name}
            setData={dataFuncs}
            funcs={funcs}
            defaultValue={
              defaultData.Name ? undefined : defaultTemplates[iDefTmpl]
            }
            MenuItems={tmplMenuItems}
            style={{
              marginBottom: 0,
              padding: padding,
              flexGrow: 1,
            }}
          />
          <StatCode /* GetURLCode={GetURLCode} */ />
        </Row>
        <Row>
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              flex: 1,
              margin: '1px',
              marginLeft: 0,
              padding: padding,
            }}
          >
            {hCards(getData().Values).card}
          </div>

          {editMode ? (
            ''
          ) : (
            <div
              style={{
                display: 'flex',
                flexGrow: 1,
                flex: 1.2,
                margin: '1px',
                marginLeft: 0,
                padding: padding,
              }}
            >
              {hDiagrams()}
            </div>
          )}
        </Row>
      </Col>
    </div>
  );
}

export default StatCard;
