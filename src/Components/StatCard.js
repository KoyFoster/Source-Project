import React, { useState } from 'react';
// import TemplateSelector from './TemplateSelector';
// import { MenuItem } from '@material-ui/core';
// import StatForm from './StatForm.js';
// import Diagram from './Diagram.js';
// import { Row, Col } from './DivGrid';
// import StatCode from './StatCode';
// import Tree from './Forms/Tree';
import ProfileCard from './Forms/Card';
// import TogglePopup from './TogglePopup';
// import Grid from './Forms/Grid';
import { makeStyles } from '@material-ui/core/styles';

const defaultTemplates = {
  Jojo: {
    label: 'Jojo',
    Values: [
      ['POWER', 3.0, 1, 10, ''],
      ['SPEED', 4.0, 1, 10, ''],
      ['RANGE', 4.0, 1, 10, ''],
      ['DURABILITY', 8.0, 1, 10, ''],
      ['PRECISION', 4.0, 1, 10, ''],
      ['POTENTIAL', 2.0, 1, 10, ''],
    ],
    Level: 60,
    Points: [1000, ['{"a": "Level"}', 'a * 12']],
  },
  'Dark Souls III': {
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
    Level: 802,
    Points: true,
  },
  'Kono Subarashii': {
    Game: 'Kono Subarashii',
    Values: [
      ['Strength', 79, 79, 99, ''],
      ['Health', 21, 21, 99, ''],
      ['Magic Power', 92, 92, 99, ''],
      ['Dexterity', 3, 3, 99, ''],
      ['Agility', 42, 42, 99, ''],
      ['Luck', 1, 1, 99, ''],
    ],
    Level: 238,
    Points: true,
  },
  'Final Fantasy 7 Remake': {
    Game: 'Final Fantasy 7 Remake',
    Title: '',
    Values: {
      'Page One': {
        Value: 'Page One',
        Values: {
          Stats: {
            Value: 'Stats',
            Num: 0,
            Min: 0,
            Max: 0,
            Level: 10000,

            Points: 1000,
            PointCalc: ['{"a": "Level"}', 'a * 12'],
            Values: {
              Attack: { Value: 'Attack', Num: 105, Min: 1, Max: 200, Unit: '' },
              'Magic Attack': {
                Value: 'Magic Attack',
                Num: 97,
                Min: 1,
                Max: 200,
                Unit: '',
                Calc: ['', '{}'],
              },
              Defense: {
                Value: 'Defense',
                Num: 34,
                Min: 1,
                Max: 200,
                Unit: '',
                Calc: ['', '{}'],
              },
              'Magic Defense': {
                Value: 'Magic Defense',
                Num: 26,
                Min: 1,
                Max: 200,
                Unit: '',
                Calc: ['', '{}'],
              },
              Strength: {
                Value: 'Strength',
                Num: 35,
                Min: 1,
                Max: 200,
                Unit: '',
                Calc: ['', '{}'],
              },
              Magic: { Value: 'Magic', Num: 31, Min: 1, Max: 200, Unit: '' },
              Vitality: {
                Value: 'Vitality',
                Num: 26,
                Min: 1,
                Max: 200,
                Unit: '',
                Calc: ['', '{}'],
              },
              Spirit: { Value: 'Spirit', Num: 23, Min: 1, Max: 200, Unit: '' },
              Luck: { Value: 'Luck', Num: 27, Min: 1, Max: 200, Unit: '' },
              Speed: { Value: 'Speed', Num: 19, Min: 1, Max: 200, Unit: '' },
            },
          },
        },
      },
    },
  },
  ArcheAge: {
    Game: 'ArcheAge',
    Title: "Koy's Stats",
    Values: [
      {
        Value: 'Page One',
        Values: [
          {
            Value: 'Visible Player Stats',
            Type: 'Calc',
            Level: '',
            Total: 18864,
            Min: 732,
            Max: 61440,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Health',
                Num: {
                  Value: 'Num',
                  result: 2172,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 36,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 30720,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Mana',
                Num: {
                  Value: 'Num',
                  result: 16692,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 696,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 30720,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Primary Stats',
            Type: 'Static',
            Level: 2560,
            Total: 2356,
            Min: 82,
            Max: 12800,
            Points: {
              result: 2560,
              expression: 'a * 1',
              vars:
                '{"a":["Values","Page One","Values","Primary Stats","Level"],"b":["Values","Page One","Values","Primary Stats","Level"]}',
            },
            Values: [
              {
                Value: 'Strength',
                Num: { Value: 'Num', result: 83, expression: '15', vars: '{}' },
                Min: { Value: 'Min', result: 15, expression: '15', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '2560',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Agility',
                Num: {
                  Value: 'Num',
                  result: 83,
                  expression: '119',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 3, expression: '3', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '2560',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Stamina',
                Num: {
                  Value: 'Num',
                  result: 229,
                  expression: '181',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 3, expression: '3', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '2560',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Spirit',
                Num: {
                  Value: 'Num',
                  result: 390,
                  expression: '216',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 3, expression: '3', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '2560',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Intelligence',
                Num: {
                  Value: 'Num',
                  result: 1571,
                  expression: '1391',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 58, expression: '58', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '2560',
                  vars: '{}',
                },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Secondary Stats',
            Type: 'Calc',
            Level: '',
            Total: 727.8,
            Min: 30.4,
            Max: 7168,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Melee Attack',
                Num: {
                  Value: 'Num',
                  result: 20.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 0.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Range Attack',
                Num: {
                  Value: 'Num',
                  result: 23.8,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 0.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Magic Attack',
                Num: {
                  Value: 'Num',
                  result: 278.2,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 11.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Healing Power',
                Num: {
                  Value: 'Num',
                  result: 43.2,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 11.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Physical Defense',
                Num: {
                  Value: 'Num',
                  result: 181,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 3,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Magic Defense',
                Num: {
                  Value: 'Num',
                  result: 181,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 3,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Misc Stats',
            Type: 'Calc',
            Level: '',
            Total: 109.1,
            Min: 104.56,
            Max: 1278.54,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Move Speed',
                Num: { result: 6.1, expression: '6.1', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 5.4,
                  expression: '5.4',
                  vars: '{}',
                },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: 'm/s',
              },
              {
                Value: 'Cast Time',
                Num: {
                  result: 40,
                  expression:
                    '(z = (100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013))) - 42.1) ) < 40 ? 40 : z',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 99.16,
                  expression:
                    '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 68.54,
                  expression:
                    '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },
                Unit: '%',
              },
              {
                Value: 'Attack Speed',
                Num: { result: 63, expression: '63', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 1200,
                  expression: '1200',
                  vars: '{}',
                },
                Unit: '%',
              },
            ],
          },
        ],
      },
      {
        Value: 'Attack',
        Values: [
          {
            Value: 'Melee Attack',
            Type: 'Calc',
            Level: '',
            Total: 155.4,
            Min: 7,
            Max: 70,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Melee Attack Speed',
                Num: { result: 1.2, expression: '1.2', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: 'sec',
              },
              {
                Value: 'Melee Accuracy',
                Num: { result: 87.9, expression: '87.9', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Melee Critical Status',
                Num: { result: 2.3, expression: '2.3', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Melee Critical Damage',
                Num: { result: 50, expression: '50', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Backstab Melee Damage',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Melee Skill Damage',
                Num: { result: 6, expression: '6', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'PvE Melee Skills',
                Num: { result: 8, expression: '8', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Ranged Attack',
            Type: 'Calc',
            Level: '',
            Total: 156.2,
            Min: 6,
            Max: 60,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Ranged Accuracy',
                Num: { result: 87.9, expression: '87.9', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Ranged Critical Status',
                Num: { result: 2.3, expression: '2.3', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Ranged Critical Damage',
                Num: { result: 50, expression: '50', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Backstab Ranged Damage',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Ranged Skill Damage',
                Num: { result: 8, expression: '8', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'PvE Ranged Skills',
                Num: { result: 8, expression: '8', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Magic Attack',
            Type: 'Calc',
            Level: '',
            Total: 315,
            Min: 6,
            Max: 60,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Magic Accuracy',
                Num: { result: 100, expression: '100', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Magic Critical Status',
                Num: { result: 72.1, expression: '72.1', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Magic Critical Damage',
                Num: { result: 122.2, expression: '122.2', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Backstab Magic Damage',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Magic Skill Damage',
                Num: { result: 12.7, expression: '12.7', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'PvE Magic Skills',
                Num: { result: 8, expression: '8', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Misc',
            Type: 'Calc',
            Level: '',
            Total: 590,
            Min: 5,
            Max: 50,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Focus',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Shield Defense Penetration Rate',
                Num: { result: 50, expression: '50', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Shield Defense Penetration',
                Num: { result: 50, expression: '50', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%(0)',
              },
              {
                Value: 'Defense Penetration',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Magic Defense Penetration',
                Num: { result: 490, expression: '490', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
            ],
          },
        ],
      },
      {
        Value: 'Defense',
        Values: [
          {
            Value: 'Defense',
            Type: 'Calc',
            Level: '',
            Total: 10019.8,
            Min: 7,
            Max: 70,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Parry Rate',
                Num: { result: 9.7, expression: '9.7', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Shield Block Rate',
                Num: {
                  Value: 'Num',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Evasion',
                Num: { result: 23.7, expression: '23.7', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Resiliance',
                Num: { result: 7465, expression: '7465', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Toughness',
                Num: { result: 2507, expression: '2507', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Siege Damage Reduction',
                Num: { result: 6.6, expression: '6.6', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'PvE Damage Reduction',
                Num: { result: 6.8, expression: '6.8', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Melee Defense',
            Type: 'Calc',
            Level: '',
            Total: 74.7,
            Min: 0,
            Max: 100,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Melee Damage Reduction',
                Num: { result: 13.7, expression: '13.7', vars: '{}' },
                Min: { result: 0, expression: '0', vars: '{}' },
                Max: { result: 100, expression: '100', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Fixed Melee Damage Reduction',
                Num: { result: 61, expression: '61', vars: '{}' },
                Min: { result: 0, expression: '0', vars: '{}' },
                Max: { result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'PvE Melee Damage Reduction',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: { result: 0, expression: '0', vars: '{}' },
                Max: { result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Ranged Defense',
            Type: 'Calc',
            Level: '',
            Total: 73.6,
            Min: 1,
            Max: 10,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Ranged Damage Reduction',
                Num: { result: 12.6, expression: '12.6', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Fixed Ranged Damage Reduction',
                Num: { result: 61, expression: '61', vars: '{}' },
                Min: { result: 0, expression: '0', vars: '{}' },
                Max: { result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'PvE Ranged Damage Reduction',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: { result: 0, expression: '0', vars: '{}' },
                Max: { result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Magic Defense',
            Type: 'Calc',
            Level: '',
            Total: 70.1,
            Min: 3,
            Max: 30,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Magic Damage Reduction',
                Num: { result: 21.1, expression: '21.1', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Fixed Magic Damage Reduction',
                Num: { result: 49, expression: '49', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'PvE Magic Damage Reduction',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
            ],
          },
        ],
      },
      {
        Value: 'Regen/Misc',
        Values: [
          {
            Value: 'Heal',
            Type: 'Calc',
            Level: '',
            Total: 66.7,
            Min: 4,
            Max: 40,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Critical Heal Rate',
                Num: { result: 10.7, expression: '10.7', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Critical Heal Bonus',
                Num: { result: 50, expression: '50', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Healing',
                Num: { result: 6, expression: '6.0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Healing Skill Damage',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Regeneration',
            Type: 'Calc',
            Level: '',
            Total: 211,
            Min: 4,
            Max: 40,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Heal Regen',
                Num: { result: 79, expression: '79', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Continuous Heal Regen',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Mana Regen',
                Num: { result: 132, expression: '132', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Post-Cast Mana Regen',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Misc',
            Type: 'Calc',
            Level: '',
            Total: 22,
            Min: 5,
            Max: 50,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Received Healing',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Increased experience gain',
                Num: { result: 11, expression: '11', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Loot Drop Rate',
                Num: { result: 11, expression: '11', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Gold earned from hunting',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Stealth Detection',
                Num: { result: 0, expression: '0', vars: '{}' },
                Min: {
                  Value: 'Min',
                  result: 1,
                  expression: '1',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 10,
                  expression: '10',
                  vars: '{}',
                },
                Unit: '%',
              },
            ],
          },
        ],
      },
    ],
  },
};

// function compileMenuItems() {
//   let result = [];

//   for (let i = 0; i < defaultTemplates.length; i++) {
//     result.push(
//       <MenuItem key={defaultTemplates[i].label} value={defaultTemplates[i]}>
//         {defaultTemplates[i].label}
//       </MenuItem>,
//     );
//   }
//   return result;
// }
// const tmplMenuItems = compileMenuItems();

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
  const [Mode, setMode] = useState('View');
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
    }
  };

  // member variables
  const [value, setValue] = useState(
    // defaultTemplates['Final Fantasy 7 Remake'],
    defaultTemplates['ArcheAge'],
  );

  const Update = (val) => {
    const buffer = { ...val };
    // console.log('buffer:', buffer);
    setValue(buffer);
  };

  // console.log('Card:', value);

  /* Material-UI CSS Styles */
  const useStyles = makeStyles({
    root: (props) => ({
      // default
      font: 'inherit',
      fontSize: 'inherit',
      fontFamily: 'inherit',

      color: 'inherit',
      background: 'inherit',
      backgroundColor: 'inherit',

      justifyContent: 'inherit',
      textAlignLast: 'inherit',

      '& button': {
        width: '64px',
        borderRadius: '8px',
        filter: 'brightness(88%)',
      },
      '& input': {},
      '& hr': {
        color: '#6e573588',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '10px',
      },
      // Profile
      '& h0': {
        backgroundColor: '#999999',
      },
      '& h1': {
        font: 'Serif',
        fontSize: 12,
        fontFamily: 'NotoSansKR',

        color: '#6e5735',
        background: 'inherit',
        backgroundColor: 'inherit',

        justifyContent: 'top',
        textAlignLast: 'center',
      },
      // Card
      '& h2': {
        font: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',

        color: 'inherit',
        background: 'inherit',
        backgroundColor: '#faf8e8',

        justifyContent: 'inherit',
        textAlignLast: 'inherit',

        border: '4px solid #6e5735',
        borderRadius: '5px',

        padding: '16px',
        margin: '4px',

        minWidth: '328px',

        // Level
        "& input[type='number']": {
          width: '64px',
        },
      },
      // Card Title
      '& h3': {},
      // Stat Block Title
      '& h4': {
        display: Mode === 'Edit' ? undefined : 'none',

        // Level
        "& input[type='text']": {
          width: '100%',
        },
      },
      '& tbody': {},
      '& thead': {},
      '& tfoot': {},
      '& table': {
        // borderCollapse: 'collapse',
        '& tr': {
          '& td': {
            '& button': {
              width: '48px',
            },
            "& input[type='number']": {
              width: '48px',
            },
            "& input[type='text']": {
              width: '64px',
            },
          },
          '& td:nth-child(1)': {
            textAlignLast: 'left',
            width: Mode !== 'Edit' ? '176px' : undefined,
          },
          '& td:nth-child(2)': {
            textAlignLast: 'left',
            width: Mode !== 'Edit' ? '140px' : undefined,
            '& input': {
              // borderRadius: props.Type === 'Static' ? '8px' : undefined,
            },
            '& button': {},
          },
          '& td:nth-child(3)': {
            textAlignLast: 'left',
          },
          '& td:nth-child(4)': {
            textAlignLast: 'left',
          },
          '& td:nth-child(5)': {
            textAlignLast: 'left',
          },
        },
        '& colgroup': {
          '& col:nth-child(1)': {
            /* border: '1px solid green' */
          },
          '& col:nth-child(2)': {},
          '& col:nth-child(3)': {},
          '& col:nth-child(4)': {},
          '& col:nth-child(5)': {},
        },
      },
    }),
  });

  const classes = useStyles({});

  return (
    <div>
      {/* <TemplateSelector
        // Name={defaultData.Name}
        // setData={dataFuncs}
        // funcs={funcs}
        // defaultValue={defaultData.Name ? undefined : defaultTemplates[iDefTmpl]}
        MenuItems={tmplMenuItems}
        // style={{
        //   marginBottom: 0,
        //   padding: padding,
        //   flexGrow: 1,
        // }}
      /> */}
      {/* <SaveStatCard value={value}></SaveStatCard>
      <LoadStatCard setValue={setValue}></LoadStatCard> */}

      <div className={classes.root}>
        <h0>
          <button type="push" onClick={() => handleModeChange()}>
            {Mode}
          </button>
          <ProfileCard
            key="profile"
            Mode={Mode}
            value={value}
            Update={Update}
          ></ProfileCard>
        </h0>
      </div>
    </div>
  );
}

export default Stats;
