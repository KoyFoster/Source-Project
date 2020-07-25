import React, { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import { MenuItem } from '@material-ui/core';
import StatForm from './StatForm.js';
import Diagram from './Diagram.js';
import StatData from './StatData.js';
import { Row, Col } from './DivGrid';
import StatCode from './StatCode';
import Tree from './Forms/Tree';
import ProfileCard from './Forms/Card';
import Grid from './Forms/Grid';

// test data
const defaultData = {
  Game: 'ArcheAge',
  Title: "Koy's Stats",
  'Page One':
    // page one
    {
      Value: 'Page One',
      Stats: {
        // Start of stat table
        'Visible Player Stats': {
          Value: 'Visible Player Stats',
          Num: 0,
          Min: 0,
          Max: 0,
          PointLimit: 0,
          PointDiff: false,

          Values: {
            Health: {
              Value: 'Health',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 3]}', 'a * 12'],
            },
            Mana: {
              Value: 'Mana',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 5]}', 'a * 12'],
            },
          },
        },
        // End of stat table
        'Primary Stats': {
          Value: 'Primary Stats',
          Num: 2358,
          Min: 70,
          Max: 12800,
          PointLimit: 2560,
          PointDiff: false,
          Values: {
            Strength: {
              Value: 'Strength',

              Num: 103,
              Min: 3,
              Max: 2560,
              Unit: '',
            },
            Agility: {
              Value: 'Agility',
              Num: 119,
              Min: 3,
              Max: 2560,
              Unit: '',
            },
            Stamina: {
              Value: 'Stamina',
              Num: 181,
              Min: 3,
              Max: 2560,
              Unit: '',
            },
            Spirit: { Value: 'Spirit', Num: 216, Min: 3, Max: 2560, Unit: '' },
            Intelligence: {
              Value: 'Intelligence',
              Num: 1391,
              Min: 58,
              Max: 2560,
              Unit: '',
            },
          },
        },
        'Secondary Stats': {
          Value: 'Secondary Stats',
          Num: 0,
          Min: 0,
          Max: 0,
          pointTotal: 2560,
          PointDiff: false,
          Values: {
            'Melee Attack': {
              Value: 'Melee Attack',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 1]}', 'a * 0.2'],
            },
            'Range Attack': {
              Value: 'Range Attack',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 2]}', 'a * 0.2'],
            },
            'Magic Attack': {
              Value: 'Magic Attack',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 5]}', 'a * 0.2'],
            },
            'Healing Power': {
              Value: 'Healing Power',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 4]}', 'a * 0.2'],
            },
            'Physical Defense': {
              Value: 'Physical Defense',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 3]}', 'a * 1'],
            },
            'Magic Defense': {
              Value: 'Magic Defense',
              Num: 0,
              Min: 0,
              Max: 0,
              Unit: '',
              math: ['{"a": [2, 3]}', 'a * 1'],
            },
          },
        },
        'Misc Stats': {
          Value: 'Misc Stats',
          Num: -1,
          Min: -1,
          Max: -1,
          PointLimit: -1,
          PointDiff: false,
          Values: {
            'Move Speed': {
              Value: 'Move Speed',
              Num: 5.4,
              Min: 5.4,
              Max: 10,
              Unit: 'm/s',
              math: ['{}', ''],
            },
            'Cast Time': {
              Value: 'Cast Time',

              Num: 0,
              Min: 0,
              Max: 100,
              Unit: '%',
              math: [
                '{"a": [2, 4], "b": [2, 5]}',
                '(a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013))',
              ],
            },
            'Attack Speed': {
              Value: 'Attack Speed',
              Num: 190,
              Min: 0,
              Max: 1200,
              Unit: '%',
              math: ['{}', ''],
            }, // end of attack speed
          }, // end of stat values
        }, // end of misc stats
      }, // end of stats
    }, // end of page one
  // page two
  'Page Two: Attack Details':
    // page two
    {
      Value: 'Page Two: Attack Details',
      Stats: {
        'Melee Attack': {
          Value: 'Melee Attack',
          Num: -1,
          Min: -1,
          Max: -1,
          PointLimit: -1,
          PointDiff: false,
          Values: {
            'Melee Attack Speed': {
              Value: 'Melee Attack Speed',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Melee Accuracy': {
              Value: 'Melee Accuracy',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Melee Critical Status': {
              Value: 'Melee Critical Status',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Melee Critical Damage': {
              Value: 'Melee Critical Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Backstab Melee Damage': {
              Value: 'Backstab Melee Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Melee Skill Damage': {
              Value: 'Melee Skill Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'PvE Melee Skills': {
              Value: 'PvE Melee Skills',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
          },
        },
        'Ranged Attack': {
          Value: 'Ranged Attack',
          Num: -1,
          Min: -1,
          Max: -1,
          PointLimit: -1,
          PointDiff: false,
          Values: {
            'Ranged Accuracy': {
              Value: 'Ranged Accuracy',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Ranged Critical Status': {
              Value: 'Ranged Critical Status',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Ranged Critical Damage': {
              Value: 'Ranged Critical Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Backstab Ranged Damage': {
              Value: 'Backstab Ranged Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Ranged Skill Damage': {
              Value: 'Ranged Skill Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'PvE Ranged Skills': {
              Value: 'PvE Ranged Skills',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
          },
        },
        'Magic Attack': {
          Value: 'Magic Attack',

          Num: -1,
          Min: -1,
          Max: -1,
          PointLimit: -1,
          PointDiff: false,
          Values: {
            'Magic Accuracy': {
              Value: 'Magic Accuracy',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Magic Critical Status': {
              Value: 'Magic Critical Status',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Magic Critical Damage': {
              Value: 'Magic Critical Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Backstab Magic Damage': {
              Value: 'Backstab Magic Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Magic Skill Damage': {
              Value: 'Magic Skill Damage',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'PvE Magic Skills': {
              Value: 'PvE Magic Skills',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
          },
        },
        Misc: {
          Value: 'Misc',

          Num: -1,
          Min: -1,
          Max: -1,
          PointLimit: -1,
          PointDiff: false,
          Values: {
            Focus: { Value: 'Focus', Num: 1, Min: 1, Max: 10, Unit: '' },
            'Shield Defense Penetration Rate': {
              Value: 'Shield Defense Penetration Rate',

              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Shield Defense Penetration': {
              Value: 'Shield Defense Penetration',

              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Defense Penetration': {
              Value: 'Defense Penetration',
              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
            'Magic Defense Penetration': {
              Value: 'Magic Defense Penetration',

              Num: 1,
              Min: 1,
              Max: 10,
              Unit: '',
            },
          },
        },
      }, // end of page two
    },
  // page three
  'Page Three: Defense Details': {
    Value: 'Page Three: Defense Details',
    Stats: {
      Defense: {
        Value: 'Defense',
        Num: -1,
        Min: -1,
        Max: -1,
        PointLimit: -1,
        PointDiff: false,
        Values: {
          'Parry Rate': {
            Value: 'Parry Rate',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Shield Block Rate': {
            Value: 'Shield Block Rate',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          Evasion: { Value: 'Evasion', Num: 1, Min: 1, Max: 10, Unit: '' },
          Resiliance: {
            Value: 'Resiliance',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          Toughness: {
            Value: 'Toughness',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Siege Damage Reduction': {
            Value: 'Siege Damage Reduction',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'PvE Damage Reduction': {
            Value: 'PvE Damage Reduction',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
        },
      },
      'Melee Defense': {
        Value: 'Melee Defense',

        Num: -1,
        Min: -1,
        Max: -1,
        PointLimit: -1,
        PointDiff: false,
        Values: {
          'Melee Damage Reduction': {
            Value: 'Melee Damage Reduction',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Fixed Melee Damage Reduction': {
            Value: 'Fixed Melee Damage Reduction',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'PvE Melee Damage Reduction': {
            Value: 'PvE Melee Damage Reduction',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
        },
      },
      'Ranged Defense': {
        Value: 'Ranged Defense',

        Num: -1,
        Min: -1,
        Max: -1,
        PointLimit: -1,
        PointDiff: false,
        Values: {
          'Ranged Damage Reduction': {
            Value: 'Ranged Damage Reduction',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Fixed Ranged Damage Reduction': {
            Value: 'Fixed Ranged Damage Reduction',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'PvE Ranged Damage Reduction': {
            Value: 'PvE Ranged Damage Reduction',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
        },
      },
      'Magic Defense': {
        Value: 'Magic Defense',

        Num: -1,
        Min: -1,
        Max: -1,
        PointLimit: -1,
        PointDiff: false,
        Values: {
          'Magic Damage Reduction': {
            Value: 'Magic Damage Reduction',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Fixed Magic Damage Reduction': {
            Value: 'Fixed Magic Damage Reduction',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'PvE Magic Damage Reduction': {
            Value: 'PvE Magic Damage Reduction',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
        },
      },
    }, // end of defense stats
  }, // end of defense page

  'Regen/Misc': {
    Value: 'Regen/Misc',
    Stats: {
      Heal: {
        Value: 'Heal',
        Num: -1,
        Min: -1,
        Max: -1,
        PointLimit: -1,
        PointDiff: false,
        Values: {
          'Critical Heal Rate': {
            Value: 'Critical Heal Rate',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Critical Heal Bonus': {
            Value: 'Critical Heal Bonus',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          Healing: { Value: 'Healing', Num: 1, Min: 1, Max: 10, Unit: '' },
          'Healing Skill Damage': {
            Value: 'Healing Skill Damage',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
        },
      },
      Regeneration: {
        Value: 'Regeneration',
        Num: -1,
        Min: -1,
        Max: -1,
        PointLimit: -1,
        PointDiff: false,
        Values: {
          'Heal Regen': {
            Value: 'Heal Regen',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Continuous Heal Regen': {
            Value: 'Continuous Heal Regen',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Mana Regen': {
            Value: 'Mana Regen',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Post-Cast Mana Regen': {
            Value: 'Post-Cast Mana Regen',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
        }, // end of Stat Values
      },
      Misc: {
        Value: 'Misc',

        Num: -1,
        Min: -1,
        Max: -1,
        PointLimit: -1,
        PointDiff: false,
        Values: {
          'Received Healing': {
            Value: 'Received Healing',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Increased experience gain': {
            Value: 'Increased experience gain',

            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Loot Drop Rate': {
            Value: 'Loot Drop Rate',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Gold earned from hunting': {
            Value: 'Gold earned from hunting',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
          'Stealth Detection': {
            Value: 'Stealth Detection',
            Num: 1,
            Min: 1,
            Max: 10,
            Unit: '',
          },
        },
      }, // end of Stat Values
    },
  },
};

// test data
const keys = 'Page One,Stats,Visible Player Stats,Values,Value'.split(',');
console.log(
  `defaultData['Page One']['Stats']['Visible Player Stats']['Values']['Value']:`,
  '\n',
  defaultData['Page One'],
  '\n',
  defaultData['Page One']['Stats'],
  '\n',
  defaultData['Page One']['Stats']['Visible Player Stats'],
  '\n',
  defaultData['Page One']['Stats']['Visible Player Stats']['Values'],
  '\n',
  defaultData['Page One']['Stats']['Visible Player Stats']['Values']['Mana'],
  '\n',
  defaultData['Page One']['Stats']['Visible Player Stats']['Values']['Mana'][
    'Value'
  ],
);

// render
const renderStats = (data) => {
  const result = [];

  // iterate
  for (let i = 0; i < data.length; i) {
    // check for Values
    let Values = null;
    if (data[i].Values) {
      if (data[i].Values.length) {
        Values = renderStats(data[i].Values);
      }
    }
    result.push(
      <div key={i}>
        {data[i].Value}
        {Values}
      </div>,
    );

    i += 1;
  }

  return result;
};

// Stat Card
// `defaultData['Page One']['Stats']['Visible Player Stats']['Values'][      ]['Max']:`
function Stats(props) {
  // member variables
  const [value, setValue] = useState(defaultData);
  const handleChange = (e) => {
    console.log('handleChange:', e);

    // iterate through key string
    const index = { value: undefined };
    const newValue = e.target.value;
    const keys = e.target.dataset.key.split('/');
    console.log('1. keys:', keys, 'newValue:', newValue);
    // depth check
    switch (keys.length) {
      case 1:
        console.log(`2. Key:[${keys[0]}]`, value[keys[0]]);
        index.value = value[keys[0]];
        break;
      case 2:
        console.log(`2. Key:[${keys[0]}]['Stats'][${keys[1]}]`);
        index.value = value[keys[0]]['Stats'][keys[1]];
        break;
      case 3:
        console.log(
          `2. Key:[${keys[0]}]['Stats'][${keys[1]}]['Values'][${keys[2]}]`,
          value[keys[0]]['Stats'][keys[1]]['Values'][keys[2]],
        );
        index.value = value[keys[0]]['Stats'][keys[1]]['Values'][keys[2]];
        break;
      default:
        break;
    }
    if (index.value === undefined) return;

    console.log(
      '3. keys:',
      keys,
      'newValue:',
      newValue,
      'oldValue:',
      index.value,
    );

    const buffer = { ...value };

    setValue(buffer);
  };

  // Render and Logic
  // return <div>{renderStats()}</div>;

  return (
    <ProfileCard value={value} onChange={handleChange}></ProfileCard>

    // Value.map((card) => {
    // console.log('card:', card);
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
