import React, { useState } from 'react';
import Tree from './Forms/Tree';

const ArcheAge = {
  Game: 'ArcheAge',
  Title: "Koy's Stats",
  Values: {
    'Page One':
      // page one
      {
        Value: 'Page One',
        Values: {
          // Start of stat table
          'Visible Player Stats': {
            Value: 'Visible Player Stats',
            Type: 'Calc',
            Total: 0,
            Min: 0,
            Max: 0,
            //Level: 0,
            // Points: 1000,
            PointCalc: ['{"a": "Level"}', 'a * 12'],

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
            Type: 'Static',
            Total: 0,
            Min: 0,
            Max: 0,
            Level: 2560,
            Points: 1000,
            PointCalc: [
              'a * 1',
              '{"a": ["Values","Page One","Values","Primary Stats","Level"]}',
            ],
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
              Spirit: {
                Value: 'Spirit',
                Num: 216,
                Min: 3,
                Max: 2560,
                Unit: '',
              },
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
            Type: 'Calc',
            Num: 0,
            Min: 0,
            Max: 0,
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
            Type: 'Calc',
            Num: 0,
            Min: 0,
            Max: 0,
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
        Values: {
          'Melee Attack': {
            Value: 'Melee Attack',
            Type: 'Calc',
            Total: 0,
            Min: 0,
            Max: 0,
            // Level: 0,
            // Points: 1000,
            // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
            Type: 'Calc',
            Total: 0,
            Min: 0,
            Max: 0,
            // Level: -1,
            // Points: 1000,
            // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
            Type: 'Calc',
            Total: 0,
            Min: 0,
            Max: 0,
            // Level: -1,
            // Points: 1000,
            // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
            Type: 'Calc',
            Total: 0,
            Min: 0,
            Max: 0,
            // Level: -1,
            // Points: 1000,
            // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
      Values: {
        Defense: {
          Value: 'Defense',
          Type: 'Calc',
          Total: 0,
          Min: 0,
          Max: 0,
          // Level: -1,
          // Points: 1000,
          // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
          Type: 'Calc',
          Total: 0,
          Min: 0,
          Max: 0,
          // Level: -1,
          // Points: 1000,
          // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
          Type: 'Calc',
          Total: 0,
          Min: 0,
          Max: 0,
          // Level: -1,
          // Points: 1000,
          // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
          Type: 'Calc',
          Total: 0,
          Min: 0,
          Max: 0,
          // Level: -1,
          // Points: 1000,
          // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
      Values: {
        Heal: {
          Value: 'Heal',
          Type: 'Calc',
          Total: 0,
          Min: 0,
          Max: 0,
          // Level: -1,
          // Points: 1000,
          // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
          Type: 'Calc',
          Total: 0,
          Min: 0,
          Max: 0,
          // Level: -1,
          // Points: 1000,
          // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
          Type: 'Calc',
          Total: 0,
          Min: 0,
          Max: 0,
          // Level: -1,
          // Points: 1000,
          // PointCalc: ['{"a": "Level"}', 'a * 12'],
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
  },
};

const depthColor = [
  ['black', 'red'],
  ['white', 'blue'],
  ['black', 'green'],
  ['white', 'purple'],
  ['black', 'yellow'],
  ['black', 'magenta'],
];

const GetKey = (props) => {
  return (
    <button
      type="push"
      key={props.fullKey}
      data-key={props.fullKey}
      style={props.style}
      onClick={(e) => {
        // console.log('Keys:', e.target.dataset.key);
      }}
    >
      {props.children}
    </button>
  );
};

// render
const renderStats = (
  data,
  parentKey = '',
  objKey = 'Values',
  excludeKeyValues = 'Num,Min,Max,math,Level,Points,PointCalc,Unit,Type,Total',
  excludeKeys = 'math,Value,Values,PointCalc,Min,Max,Max,Unit,Type,Total',
  selectKeys = 'Num,Level,Points',
  SelectElem = GetKey,
  depth = 0,
  colors = depthColor,
) => {
  // console.log('renderStats', data);
  const result = [];

  // get keys
  const keys = Object.keys(data);

  keys.forEach((key) => {
    let children = [];
    if (key === objKey) {
      // console.log('Children?:', data[key]);
      const vKeys = Object.keys(data[key]);
      vKeys.forEach((vKey) => {
        children.push(
          <div>
            {renderStats(
              data[key][vKey],
              `${parentKey}/${key}/${vKey}`,
              objKey,
              excludeKeyValues,
              excludeKeys,
              selectKeys,
              SelectElem,
              depth + 1,
              colors,
            )}
          </div>,
        );
      });
    }

    const bKey = excludeKeys ? excludeKeys.indexOf(key) === -1 : true;
    const bVal = excludeKeyValues ? excludeKeyValues.indexOf(key) === -1 : true;
    const bSel = selectKeys ? selectKeys.indexOf(key) > -1 : false;

    result.push(
      <div
        key={key}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          color: colors[depth][0],
          border: !bVal && !bKey ? undefined : '1px dashed cyan',
          backgroundColor: colors[depth][1],
          // filter: 'brightness(66%)',
        }}
      >
        {bKey ? (
          bSel ? (
            <SelectElem
              fullKey={`${parentKey}/${key}`}
              style={{ width: '100%' }}
            >
              {key}
            </SelectElem>
          ) : (
            key
          )
        ) : null}
        {children.length === 0 && bVal && bKey ? '' : null}
        {bVal && bKey ? ': ' : null}
        {children.length === 0 ? (bVal ? data[key] : null) : children}
      </div>,
    );
  });

  // console.log('result:', result);
  return result;
};

const renderStatsOld = (data) => {
  // console.log('renderStats', data);
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
    // console.log('Children?:', data[i].children);
    result.push(
      <div key={i}>
        {data[i].value}
        {children}
      </div>,
    );

    i += 1;
  }

  // console.log({ data, result });
  return result;
};

const Test = (props) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved

  return <div>{renderStats(ArcheAge, 'ArcheAge')}</div>;

  // return (
  //   // <Tree
  //   //   primaryKey="value"
  //   //   secondaryKey="label"
  //   //   nodes={[
  //   //     { value: 'one', label: 'one' },
  //   //     {
  //   //       value: 'two',
  //   //       label: 'two',
  //   //       children: [
  //   //         {
  //   //           value: 'three',
  //   //           label: 'three',
  //   //           children: [
  //   //             {
  //   //               value: 'four',
  //   //               label: 'four',
  //   //             },
  //   //           ],
  //   //         },
  //   //         {
  //   //           value: 'five',
  //   //           label: 'five',
  //   //         },
  //   //       ],
  //   //     },
  //   //     { value: 'six', label: 'six' },
  //   //   ]}
  //   //   checked={checked}
  //   //   expanded={expanded}
  //   //   onCheck={(checked) => setChecked(checked)}
  //   //   onExpand={(expanded) => setExpanded(expanded)}

  //   //   // value={[]}
  //   //   // setValue={undefined}

  //   //   // style={{
  //   //   //   display: 'flexBox',
  //   //   //   border: '2px solid red',
  //   //   //   width: '256px',
  //   //   //   height: '256px',
  //   //   // }}
  //   // ></Tree>
  // );
};

export default Test;
