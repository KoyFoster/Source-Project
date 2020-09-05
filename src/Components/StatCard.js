import React, { useState } from 'react';
// import TemplateSelector from './TemplateSelector';
// import { MenuItem } from '@material-ui/core';
// import StatForm from './StatForm.js';
// import Diagram from './Diagram.js';
// import { Row, Col } from './DivGrid';
// import StatCode from './StatCode';
// import Tree from './Forms/Tree';
import ProfileCard from './Forms/Card';
import TogglePopup from './TogglePopup';
// import Grid from './Forms/Grid';

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
    Values: {
      'Page One': {
        Value: 'Page One',
        Values: {
          'Visible Player Stats': {
            Value: 'Visible Player Stats',
            Type: 'Calc',
            Total: 18864,
            Min: 732,
            Max: 61440,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              Health: {
                Value: 'Health',
                Num: {
                  result: 2172,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  result: 36,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  result: 30720,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },
                Unit: '',
              },
              Mana: {
                Value: 'Mana',
                Num: {
                  result: 16692,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  result: 696,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  result: 30720,
                  expression: '12 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },
                Unit: '',
              },
            },
          },

          'Primary Stats': {
            Value: 'Primary Stats',
            Type: 'Static',
            Total: 1922,
            Min: 82,
            Max: 12800,
            Level: 2560,
            Points: [
              2560,
              [
                'a * 1',
                '{"a":["Values","Page One","Values","Primary Stats","Level"],"b":["Values","Page One","Values","Primary Stats","Level"]}',
              ],
            ],
            Values: {
              Strength: {
                Value: 'Strength',
                Num: { result: 15, expression: '15', vars: '{}' },
                Min: { result: 15, expression: '15', vars: '{}' },
                Max: { result: 2560, expression: '2560', vars: '{}' },
                Unit: '',
              },
              Agility: {
                Value: 'Agility',
                Num: { result: 119, expression: '119', vars: '{}' },
                Min: { result: 3, expression: '3', vars: '{}' },
                Max: { result: 2560, expression: '2560', vars: '{}' },
                Unit: '',
              },
              Stamina: {
                Value: 'Stamina',
                Num: { result: 181, expression: '181', vars: '{}' },
                Min: { result: 3, expression: '3', vars: '{}' },
                Max: { result: 2560, expression: '2560', vars: '{}' },

                Unit: '',
              },
              Spirit: {
                Value: 'Spirit',
                Num: { result: 216, expression: '216', vars: '{}' },
                Min: { result: 3, expression: '3', vars: '{}' },
                Max: { result: 2560, expression: '2560', vars: '{}' },
                Unit: '',
              },
              Intelligence: {
                Value: 'Intelligence',
                Num: { result: 1391, expression: '1391', vars: '{}' },
                Min: { result: 58, expression: '58', vars: '{}' },
                Max: { result: 2560, expression: '2560', vars: '{}' },
                Unit: '',
              },
            },
          },

          'Secondary Stats': {
            Value: 'Secondary Stats',
            Type: 'Calc',
            Num: { result: 0, expression: '0', vars: '{}' },
            Min: 19.4,
            Max: 7168,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Melee Attack': {
                Value: 'Melee Attack',
                Num: {
                  result: 20.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Num"]}',
                },
                Min: {
                  result: 0.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Min"]}',
                },
                Max: {
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Max"]}',
                },
                Unit: '',
              },
              'Range Attack': {
                Value: 'Range Attack',
                Num: {
                  result: 23.8,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Num"]}',
                },
                Min: {
                  result: 0.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Min"]}',
                },
                Max: {
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Max"]}',
                },
                Unit: '',
              },
              'Magic Attack': {
                Value: 'Magic Attack',
                Num: {
                  result: 278.2,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  result: 11.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },

                Unit: '',
              },
              'Healing Power': {
                Value: 'Healing Power',
                Num: {
                  result: 43.2,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"]}',
                },
                Min: {
                  result: 11.6,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"]}',
                },
                Max: {
                  result: 512,
                  expression: '0.2 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"]}',
                },

                Unit: '',
              },
              'Physical Defense': {
                Value: 'Physical Defense',
                Value: 'Healing Power',
                Num: {
                  result: 181,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  result: 3,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  result: 2560,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },

                Unit: '',
              },
              'Magic Defense': {
                Value: 'Magic Defense',
                Num: {
                  result: 181,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  result: 3,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  result: 2560,
                  expression: '1 * a',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },

                Unit: '',
              },
            },
          },

          'Misc Stats': {
            Value: 'Misc Stats',
            Type: 'Calc',
            Num: 0,
            Min: 104.56,
            Max: 1278.54,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Move Speed': {
                Value: 'Move Speed',
                Num: { result: 5.4, expression: '5.4', vars: '{}' },
                Min: { result: 5.4, expression: '5.4', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: 'm/s',
              },
              'Cast Time': {
                Value: 'Cast Time',

                Num: {
                  result: 82.83,
                  expression:
                    '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  result: 99.16,
                  expression:
                    '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  result: 68.54,
                  expression:
                    '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                  vars:
                    '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },

                Unit: '%',
              },
              'Attack Speed': {
                Value: 'Attack Speed',
                Num: { result: 190, expression: '190', vars: '{}' },
                Min: { result: 0, expression: '0', vars: '{}' },
                Max: { result: 1200, expression: '1200', vars: '{}' },

                Unit: '%',
              },
            },
          },
        },
      },

      'Page Two: Attack Details': {
        Value: 'Page Two: Attack Details',
        Values: {
          'Melee Attack': {
            Value: 'Melee Attack',
            Type: 'Calc',
            Total: 7,
            Min: 7,
            Max: 70,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Melee Attack Speed': {
                Value: 'Melee Attack Speed',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Melee Accuracy': {
                Value: 'Melee Accuracy',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Melee Critical Status': {
                Value: 'Melee Critical Status',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Melee Critical Damage': {
                Value: 'Melee Critical Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Backstab Melee Damage': {
                Value: 'Backstab Melee Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Melee Skill Damage': {
                Value: 'Melee Skill Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'PvE Melee Skills': {
                Value: 'PvE Melee Skills',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          'Ranged Attack': {
            Value: 'Ranged Attack',
            Type: 'Calc',
            Total: 6,
            Min: 6,
            Max: 60,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Ranged Accuracy': {
                Value: 'Ranged Accuracy',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Ranged Critical Status': {
                Value: 'Ranged Critical Status',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Ranged Critical Damage': {
                Value: 'Ranged Critical Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Backstab Ranged Damage': {
                Value: 'Backstab Ranged Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Ranged Skill Damage': {
                Value: 'Ranged Skill Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'PvE Ranged Skills': {
                Value: 'PvE Ranged Skills',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          'Magic Attack': {
            Value: 'Magic Attack',
            Type: 'Calc',
            Total: 6,
            Min: 6,
            Max: 60,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Magic Accuracy': {
                Value: 'Magic Accuracy',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Magic Critical Status': {
                Value: 'Magic Critical Status',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Magic Critical Damage': {
                Value: 'Magic Critical Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Backstab Magic Damage': {
                Value: 'Backstab Magic Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Magic Skill Damage': {
                Value: 'Magic Skill Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'PvE Magic Skills': {
                Value: 'PvE Magic Skills',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          Misc: {
            Value: 'Misc',
            Type: 'Calc',
            Total: 5,
            Min: 5,
            Max: 50,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              Focus: {
                Value: 'Focus',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Shield Defense Penetration Rate': {
                Value: 'Shield Defense Penetration Rate',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Shield Defense Penetration': {
                Value: 'Shield Defense Penetration',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Defense Penetration': {
                Value: 'Defense Penetration',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Magic Defense Penetration': {
                Value: 'Magic Defense Penetration',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },
        },
      },

      'Page Three: Defense Details': {
        Value: 'Page Three: Defense Details',
        Values: {
          Defense: {
            Value: 'Defense',
            Type: 'Calc',
            Total: 7,
            Min: 7,
            Max: 70,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Parry Rate': {
                Value: 'Parry Rate',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Shield Block Rate': {
                Value: 'Shield Block Rate',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              Evasion: {
                Value: 'Evasion',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              Resiliance: {
                Value: 'Resiliance',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              Toughness: {
                Value: 'Toughness',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Siege Damage Reduction': {
                Value: 'Siege Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'PvE Damage Reduction': {
                Value: 'PvE Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          'Melee Defense': {
            Value: 'Melee Defense',
            Type: 'Calc',
            Total: 3,
            Min: 3,
            Max: 30,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Melee Damage Reduction': {
                Value: 'Melee Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Fixed Melee Damage Reduction': {
                Value: 'Fixed Melee Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'PvE Melee Damage Reduction': {
                Value: 'PvE Melee Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          'Ranged Defense': {
            Value: 'Ranged Defense',
            Type: 'Calc',
            Total: 3,
            Min: 3,
            Max: 30,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Ranged Damage Reduction': {
                Value: 'Ranged Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Fixed Ranged Damage Reduction': {
                Value: 'Fixed Ranged Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'PvE Ranged Damage Reduction': {
                Value: 'PvE Ranged Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          'Magic Defense': {
            Value: 'Magic Defense',
            Type: 'Calc',
            Total: 3,
            Min: 3,
            Max: 30,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Magic Damage Reduction': {
                Value: 'Magic Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Fixed Magic Damage Reduction': {
                Value: 'Fixed Magic Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'PvE Magic Damage Reduction': {
                Value: 'PvE Magic Damage Reduction',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },
        },
      },

      'Regen/Misc': {
        Value: 'Regen/Misc',
        Values: {
          Heal: {
            Value: 'Heal',
            Type: 'Calc',
            Total: 4,
            Min: 4,
            Max: 40,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Critical Heal Rate': {
                Value: 'Critical Heal Rate',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Critical Heal Bonus': {
                Value: 'Critical Heal Bonus',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              Healing: {
                Value: 'Healing',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Healing Skill Damage': {
                Value: 'Healing Skill Damage',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          Regeneration: {
            Value: 'Regeneration',
            Type: 'Calc',
            Total: 4,
            Min: 4,
            Max: 40,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Heal Regen': {
                Value: 'Heal Regen',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Continuous Heal Regen': {
                Value: 'Continuous Heal Regen',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Mana Regen': {
                Value: 'Mana Regen',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Post-Cast Mana Regen': {
                Value: 'Post-Cast Mana Regen',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },

          Misc: {
            Value: 'Misc',
            Type: 'Calc',
            Total: 5,
            Min: 5,
            Max: 50,
            Level: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: {
              'Received Healing': {
                Value: 'Received Healing',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Increased experience gain': {
                Value: 'Increased experience gain',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Loot Drop Rate': {
                Value: 'Loot Drop Rate',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Gold earned from hunting': {
                Value: 'Gold earned from hunting',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              'Stealth Detection': {
                Value: 'Stealth Detection',
                Num: { result: 1, expression: '1', vars: '{}' },
                Min: { result: 1, expression: '1', vars: '{}' },
                Max: { result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            },
          },
        },
      },
    },
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

const SaveStatCard = (props) => {
  let { value } = props;
  const regex1 = /}}},/gi;
  const regex2 = /:{/gi;
  value = JSON.stringify(value)
    .replace(regex1, '}}},\n\n')
    .replace(regex2, '\n:{');

  return (
    <TogglePopup
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

// Stat Card
function Stats(props) {
  // member variables
  const [value, setValue] = useState(
    // defaultTemplates['Final Fantasy 7 Remake'],
    defaultTemplates['ArcheAge'],
  );
  const Update = () => {
    const buffer = { ...value };
    setValue(buffer);
  };

  const handleChange = (e, skipState) => {
    // if (!skipState) console.log('ValueChange:', e, skipState);
    // iterate through key string
    const newValue =
      e.target.checked !== undefined ? e.target.checked : e.target.value;
    const keys = e.target.dataset.key.split('~');

    if (!keys.length) return;

    // depth check
    const buffer = !skipState ? { ...value } : value;
    let index = [buffer];
    let i = 1;
    keys.forEach((key) => {
      // validate
      if (index[index.length - 1][key] === undefined) return;

      // iterate
      if (i !== keys.length) {
        index.push(index[index.length - 1][key]);
      } else {
        // Check for key value
        // if key Value, update it
        if (key === 'Value') {
          // 1. update value
          index[index.length - 1][key] = newValue;

          // 2. update key
          // currently inserts new object at the end
          // will need to redeclare the entire object to fix this
          const newOrder = {};
          const currKeys = Object.keys(index[index.length - 2]);
          currKeys.forEach((k) => {
            newOrder[k !== keys[i - 2] ? k : newValue] =
              index[index.length - 2][k];
          });

          index[index.length - 3]['Values'] = newOrder;
        } else {
          index[index.length - 1][key] = newValue;
        }
      }

      i += 1;
    });

    if (!skipState) setValue(buffer);
  };

  console.log('Card:', value);
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
      <SaveStatCard value={value}></SaveStatCard>
      <LoadStatCard setValue={setValue}></LoadStatCard>
      <ProfileCard
        key="profile"
        value={value}
        onChange={handleChange}
        Update={Update}
      ></ProfileCard>
    </div>
  );
}

export default Stats;
