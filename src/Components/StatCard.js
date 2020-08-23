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
    Points: 1000,
    PointCalc: ['{"a": "Level"}', 'a * 12'],
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
            Total: 0,
            Min: 0,
            Max: 0,
            Level: 0,
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              Health: {
                Value: 'Health',
                Num: [0, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [0, ['', '{}']],
                Unit: '',
              },
              Mana: {
                Value: 'Mana',
                Num: [0, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [0, ['', '{}']],
                Unit: '',
              },
            },
          },

          'Primary Stats': {
            Value: 'Primary Stats',
            Type: 'Static',
            Total: 2010,
            Min: 70,
            Max: 12800,

            Level: 2560,
            Points: 1000,
            PointCalc: [
              'a * 12',
              '{"a":["Values","Page One","Values","Primary Stats","Level"],"b":["Values","Page One","Values","Primary Stats","Level"]}',
            ],
            Values: {
              Strength: {
                Value: 'Strength',
                Num: [103, ['', '{}']],
                Min: [3, ['', '{}']],
                Max: [2560, ['', '{}']],
                Unit: '',
              },
              Agility: {
                Value: 'Agility',
                Num: [119, ['', '{}']],
                Min: [3, ['', '{}']],
                Max: [2560, ['', '{}']],
                Unit: '',
              },
              Stamina: {
                Value: 'Stamina',
                Num: [181, ['', '{}']],
                Min: [3, ['', '{}']],
                Max: [2560, ['', '{}']],
                Unit: '',
              },
              Spirit: {
                Value: 'Spirit',
                Num: [216, ['', '{}']],
                Min: [3, ['', '{}']],
                Max: [2560, ['', '{}']],
                Unit: '',
              },
              Intelligence: {
                Value: 'Intelligence',
                Num: [1391, ['', '{}']],
                Min: [58, ['', '{}']],
                Max: [2560, ['', '{}']],
                Unit: '',
              },
            },
          },

          'Secondary Stats': {
            Value: 'Secondary Stats',
            Type: 'Calc',
            Num: [0, ['', '{}']],
            Min: [0, ['', '{}']],
            Max: [0, ['', '{}']],

            Level: 0,
            Points: 0,
            PointCalc: ['', '{}'],

            Values: {
              'Melee Attack': {
                Value: 'Melee Attack',
                Num: [0, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [0, ['', '{}']],
                Unit: '',
              },
              'Range Attack': {
                Value: 'Range Attack',
                Num: [1, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [0, ['', '{}']],

                Unit: '',
              },

              'Magic Attack': {
                Value: 'Magic Attack',
                Num: [
                  0,
                  [
                    'a * 12',
                    '{"a":["Values","Page One","Values","Primary Stats","Level"],"b":["Values","Page One","Values","Primary Stats","Level"]}',
                  ],
                ],
                Min: [
                  0,
                  [
                    'a * 12',
                    '{"a":["Values","Page One","Values","Primary Stats","Level"],"b":["Values","Page One","Values","Primary Stats","Level"]}',
                  ],
                ],
                Max: [
                  0,
                  [
                    'a * 12',
                    '{"a":["Values","Page One","Values","Primary Stats","Level"],"b":["Values","Page One","Values","Primary Stats","Level"]}',
                  ],
                ],
                Unit: '',
              },
              'Healing Power': {
                Value: 'Healing Power',
                Num: [0, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [0, ['', '{}']],
                Unit: '',
              },

              'Physical Defense': {
                Value: 'Physical Defense',
                Num: [0, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [0, ['', '{}']],

                Unit: '',
              },

              'Magic Defense': {
                Value: 'Magic Defense',
                Num: [0, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [0, ['', '{}']],

                Unit: '',
              },
            },
          },

          'Misc Stats': {
            Value: 'Misc Stats',
            Type: 'Calc',
            Num: 0,
            Min: 5.4,
            Max: 1310,

            Level: 0,
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Move Speed': {
                Value: 'Move Speed',
                Num: [5.4, ['', '{}']],
                Min: [5.4, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: 'm/s',
              },
              'Cast Time': {
                Value: 'Cast Time',
                Num: [0, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '%',
              },
              'Attack Speed': {
                Value: 'Attack Speed',
                Num: [190, ['', '{}']],
                Min: [0, ['', '{}']],
                Max: [1200, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Melee Attack Speed': {
                Value: 'Melee Attack Speed',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Melee Accuracy': {
                Value: 'Melee Accuracy',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Melee Critical Status': {
                Value: 'Melee Critical Status',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Melee Critical Damage': {
                Value: 'Melee Critical Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Backstab Melee Damage': {
                Value: 'Backstab Melee Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Melee Skill Damage': {
                Value: 'Melee Skill Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'PvE Melee Skills': {
                Value: 'PvE Melee Skills',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Ranged Accuracy': {
                Value: 'Ranged Accuracy',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Ranged Critical Status': {
                Value: 'Ranged Critical Status',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Ranged Critical Damage': {
                Value: 'Ranged Critical Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Backstab Ranged Damage': {
                Value: 'Backstab Ranged Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Ranged Skill Damage': {
                Value: 'Ranged Skill Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'PvE Ranged Skills': {
                Value: 'PvE Ranged Skills',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Magic Accuracy': {
                Value: 'Magic Accuracy',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Magic Critical Status': {
                Value: 'Magic Critical Status',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Magic Critical Damage': {
                Value: 'Magic Critical Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Backstab Magic Damage': {
                Value: 'Backstab Magic Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Magic Skill Damage': {
                Value: 'Magic Skill Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'PvE Magic Skills': {
                Value: 'PvE Magic Skills',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              Focus: {
                Value: 'Focus',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Shield Defense Penetration Rate': {
                Value: 'Shield Defense Penetration Rate',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Shield Defense Penetration': {
                Value: 'Shield Defense Penetration',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Defense Penetration': {
                Value: 'Defense Penetration',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Magic Defense Penetration': {
                Value: 'Magic Defense Penetration',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Parry Rate': {
                Value: 'Parry Rate',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Shield Block Rate': {
                Value: 'Shield Block Rate',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              Evasion: {
                Value: 'Evasion',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              Resiliance: {
                Value: 'Resiliance',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              Toughness: {
                Value: 'Toughness',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Siege Damage Reduction': {
                Value: 'Siege Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'PvE Damage Reduction': {
                Value: 'PvE Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Melee Damage Reduction': {
                Value: 'Melee Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Fixed Melee Damage Reduction': {
                Value: 'Fixed Melee Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'PvE Melee Damage Reduction': {
                Value: 'PvE Melee Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Ranged Damage Reduction': {
                Value: 'Ranged Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Fixed Ranged Damage Reduction': {
                Value: 'Fixed Ranged Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'PvE Ranged Damage Reduction': {
                Value: 'PvE Ranged Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Magic Damage Reduction': {
                Value: 'Magic Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Fixed Magic Damage Reduction': {
                Value: 'Fixed Magic Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'PvE Magic Damage Reduction': {
                Value: 'PvE Magic Damage Reduction',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Critical Heal Rate': {
                Value: 'Critical Heal Rate',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Critical Heal Bonus': {
                Value: 'Critical Heal Bonus',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              Healing: {
                Value: 'Healing',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Healing Skill Damage': {
                Value: 'Healing Skill Damage',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Heal Regen': {
                Value: 'Heal Regen',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Continuous Heal Regen': {
                Value: 'Continuous Heal Regen',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Mana Regen': {
                Value: 'Mana Regen',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Post-Cast Mana Regen': {
                Value: 'Post-Cast Mana Regen',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
            Points: 0,
            PointCalc: ['', '{}'],
            Values: {
              'Received Healing': {
                Value: 'Received Healing',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Increased experience gain': {
                Value: 'Increased experience gain',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Loot Drop Rate': {
                Value: 'Loot Drop Rate',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Gold earned from hunting': {
                Value: 'Gold earned from hunting',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
                Unit: '',
              },
              'Stealth Detection': {
                Value: 'Stealth Detection',
                Num: [1, ['', '{}']],
                Min: [1, ['', '{}']],
                Max: [10, ['', '{}']],
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
  const [newVal, setNewValue] = useState('');
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
              setNewValue(e.target.value);

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

  const handleChange = (e, skipState) => {
    if (!skipState) console.log('ValueChange:', e, skipState);
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

  // console.log('Card:', value);
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
      ></ProfileCard>
    </div>

    // Value.map((card) => {
    // return (
    // <Grid
    //   value={card.Values}
    //   onChange={handleChange}
    //   style={{
    //     maxwidth: '512px',
    //     overflow: 'scroll',
    //     background: '#faf8e8',
    //     color: '#6e5735',
    //     fontFamily: 'NotoSansKR',
    //     border: '4px solid #6e5735',
    //     padding: '16px',
    //     margin: '4px',
    //   }}
    //   cellStyle={cellStyle}
    //   // childrenAsRow
    //   columnWidths={['128px', '64px', '64px', '64px', '32px', '64px']}
    //   headerRows
    //   hHeader={[
    //     'Stat',
    //     'Value',
    //     'Max',
    //     'Max',
    //     'Limit',
    //     'Difference',
    //     'Stats',
    //   ]}
    //   hRow={[
    //     <input type="text" value={''} style={baseInputStyle} />,
    //     <input type="number" value={''} style={baseInputStyle} />,
    //     <input type="number" value={''} style={baseInputStyle} />,
    //     <input type="number" value={''} style={baseInputStyle} />,
    //     <input type="number" value={''} style={baseInputStyle} />,
    //     <input type="checkbox" checked={''} style={baseInputStyle} />,
    //     <Grid
    //       value={true}
    //       columnWidths={['128px', '64px', '64px', '64px', '32px', '64px']}
    //       style={{
    //         // border: '2px dotted red',
    //         width: '512px',
    //         overflow: 'hidden',
    //       }}
    //       cellStyle={cellStyle}
    //       header
    //       hHeader={['Name', 'Value', 'Min', 'Max', 'Unit', 'Math']}
    //       hRow={[
    //         <input
    //           type="text"
    //           value={''}
    //           style={{ width: '100%', border: 'none', padding: '0px' }}
    //         />,
    //         <input type="number" value={''} style={baseInputStyle} />,
    //         <input type="number" value={''} style={baseInputStyle} />,
    //         <input type="number" value={''} style={baseInputStyle} />,
    //         <input type="text" value={''} style={baseInputStyle} />,
    //         <input type="text" value={''} style={baseInputStyle} />,
    //       ]}
    //     />,
    //   ]}
    // ></Grid>
    // );
    // })
  );
}

export default Stats;
