// import React from 'react';
// import { renderToStaticMarkup } from 'react-dom/server';
import DS3Frame from '../assets/SVG/ImageBorders/DS3Frame.svg';

// const html = `${(
//   <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
//     <circle
//       cx="15"
//       cy="15"
//       r="10"
//       stroke="green"
//       stroke-width="4"
//       fill="yellow"
//     />
//   </svg>
// )}`;
const defaultTemplates = {
  Blank: {
    Game: 'Blank',
    Title: 'Blank',
    Style: (props) => {},
    Values: [],
  },
  "Jojo's Bizarre Adventure": {
    Game: "Jojo's Bizarre Adventure",
    Title: 'Stand Calculator',
    Style: (props) => ({
      '& .Profile': {
        fontSize: '14',
        fontFamily: 'Arial Black',
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'left',
        textAlignLast: 'left',

        '& .ProfileHeader': {},
        '& button': {},
        '& .Card': {
          // Level
          "& input[type='number']": { borderRadius: '4px', width: '32px' },
          // Level
          "& input[type='text']": { borderRadius: '4px' },
          '& .CardHeader': {
            "& input[type='text']": {},
            '& label': {},
          },
          '& .Level': {
            '& div': {},
            '& button': {},
          },
          '& .StatBlock': {
            '& div[target="Attributes"]': {},
            "& input[type='text']": {},
            '& label': {},
          },

          '& .Stats': {
            '& input': {},
            '& table': {
              '& thead': {
                '& th': {},
              },
              '& tbody': {
                '& tr': {
                  '& td': {
                    '& button': {},
                    "& input[type='number']": {},
                    "& input[type='text']": {},
                  },

                  '& td:nth-child(1):empty': {},
                  '& td:nth-child(1)': {},
                  '& td:nth-child(2)': {
                    '& input': {},
                  },
                  '& td:nth-child(3)': {},
                  '& td:nth-child(4)': {},
                  '& td:nth-child(5)': {},
                },
                // hover row
                '& tr:nth-child(odd):hover': props.Mode !== 'View' ? {} : {},

                '& tfoot': {},
                '& colgroup': {
                  '& col:nth-child(1)': {},
                  '& col:nth-child(2)': {},
                  '& col:nth-child(3)': {},
                  '& col:nth-child(4)': {},
                  '& col:nth-child(5)': {},
                },
              },
            },
          },
        },

        '& .Controls': {
          '& div': {
            '& button': {
              width: 'auto',
            },
          },
        },
      },
    }),

    Values: [
      {
        bEdit: true,
        bShow: true,
        Value: "Joseph's Stand",
        Values: [
          {
            bEdit: true,
            bShow: true,
            Value: 'Hermit Purple',
            Type: 'Static',
            Level: '',
            Total: 25,
            Min: 6,
            Max: 60,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'POWER',
                Num: { Value: 'Num', result: 3, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'SPEED',
                Num: { Value: 'Num', result: 4, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'RANGE',
                Num: { Value: 'Num', result: 4, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'DURABILITY',
                Num: { Value: 'Num', result: 8, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'PRECISION',
                Num: { Value: 'Num', result: 4, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'POTENTIAL',
                Num: { Value: 'Num', result: 2, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
        ],
        Type: 'Card',
      },
      {
        bShow: true,
        Type: 'Graph',
        Value: 'Profficiencies',
        Keys: [
          [
            'Values',
            "Joseph's Stand",
            'Values',
            'Hermit Purple',
            'Values',
            'POWER',
          ],
          [
            'Values',
            "Joseph's Stand",
            'Values',
            'Hermit Purple',
            'Values',
            'SPEED',
          ],
          [
            'Values',
            "Joseph's Stand",
            'Values',
            'Hermit Purple',
            'Values',
            'RANGE',
          ],
          [
            'Values',
            "Joseph's Stand",
            'Values',
            'Hermit Purple',
            'Values',
            'DURABILITY',
          ],
          [
            'Values',
            "Joseph's Stand",
            'Values',
            'Hermit Purple',
            'Values',
            'PRECISION',
          ],
          [
            'Values',
            "Joseph's Stand",
            'Values',
            'Hermit Purple',
            'Values',
            'POTENTIAL',
          ],
        ],
      },
    ],
  },

  'Dark Souls III': {
    Game: 'Dark Souls III',
    Title: 'Dark Souls III',
    Style: (props) => ({
      '& .Profile': {
        fontSize: 22,
        fontFamily: 'Adobe Garamond, serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        justifyContent: 'top',
        textAlignLast: 'center',

        // Title Card
        '& .ProfileHeader': {
          color: '#bbbbbb',
          backgroundColor: '#232126',
          border: '2px solid #dbdbdb',
          borderRadius: '5px',
        },

        '& button': {
          width: '64px',
          borderRadius: '8px',
          filter: 'brightness(88%)',
        },
        '& .Card': {
          color: '#bbbbbb',
          backgroundColor: '#232126',
          border: '2px solid #dbdbdb',
          borderRadius: '5px',

          padding: '22px',
          margin: '4px',

          minWidth: '328px',
          maxWidth: '512px',

          '& button': { fontSize: 12, textAlignLast: 'center' },
          '& hr': { display: 'none' },
          "& input[type='number']": { width: '64px' },
          "& input[type='text']": { width: '100%' },
          '& .CardHeader': {
            color: '#aca69e',
            textAlignLast: 'left',

            "& input[type='text']": {
              width: '100%',
              border: 'none',
              borderBottom: '3px solid',
              borderImage:
                'linear-gradient(to right, rgba(80.0,73.0,58.0, 0), rgba(80.0,73.0,58.0, 1), rgba(80.0,73.0,58.0, 0)) 1',
            },
            '& label': {
              width: '100%',
              border: 'none',
              borderBottom: '3px solid',
              borderImage:
                'linear-gradient(to right, rgba(80.0,73.0,58.0, 0), rgba(80.0,73.0,58.0, 1), rgba(80.0,73.0,58.0, 0)) 1',
            },
          },

          '& .Level': {
            display: props.Mode !== 'Edit' ? 'none' : 'inline',
            '& div': {},
            '& button': { fontSize: 22, textAlignLast: 'center' },
          },

          '& .StatBlock': {
            '& div[target="Attributes"]': {
              color: 'red',
            },

            border: props.Mode !== 'View' ? '39px solid transparent' : 'none',
            borderImageRepeat: 'repeat',
            borderImage: props.Mode !== 'View' ? `url("${DS3Frame}")` : 'none',
            borderImageSlice: '34%',

            color: '#aca69e',
            textAlignLast: 'left',
            padding: '16px 0px 16px 0px',
            "& input[type='text']": {
              color: '#bbb3a6',
              width: '100%',
              border: 'none',
              borderBottom: '3px solid',
              borderImage:
                'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
            },
            '& label': {
              width: '100%',
              border: 'none',
              borderBottom: '3px solid',
              borderImage:
                'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
            },
          },

          '& .Stats': {
            // borderImage:
            //   'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
            // border: '2px solid',

            '& input': { border: 'none', borderWidth: '1px' },
            '& table': {
              borderCollapse: 'separate',
              emptyCells: 'show',
              '& thead': {
                emptyCells: 'hide',
                '& th': {
                  color: '#aca69e',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  fontStyle: 'inherit',
                  fontWeight: 'inherit',
                  border: 'none',
                  borderBottom: '3px solid',
                  borderImage:
                    'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
                },
              },
              '& tbody': {
                '& tr': {
                  '& td': {
                    '& button': {},
                    "& input[type='number']": {
                      width: '48px',
                      textAlignLast: 'center',
                    },
                    "& input[type='text']": { width: '100%' },
                  },

                  '& td:nth-child(1):empty': {
                    border: 'none',
                    borderBottom: '2px solid',
                    borderImage:
                      'linear-gradient(to right, rgba(78,78,78, 0), rgba(78,78,78, 1), rgba(78,78,78, 0)) 1',
                  },
                  '& td:nth-child(1)': {
                    textAlignLast: 'left',
                    width: '100%',
                  },
                  '& td:nth-child(2)': {
                    textAlignLast: 'center',
                    width: '140px',
                    '& input': {},
                  },
                  '& td:nth-child(3)': { textAlignLast: 'left' },
                  '& td:nth-child(4)': { textAlignLast: 'left' },
                  '& td:nth-child(5)': { textAlignLast: 'left' },
                },
                // hover row
                '& tr:nth-child(odd):hover':
                  props.Mode !== 'View'
                    ? {
                        backgroundImage:
                          'radial-gradient(ellipse at bottom, #723a19, #723a1900 66%, #00000000 50%)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'calc(100%) 5px',
                      }
                    : {
                        backgroundImage: 'none',
                      },

                '& tfoot': {},
                '& colgroup': {
                  '& col:nth-child(1)': {},
                  '& col:nth-child(2)': {},
                  '& col:nth-child(3)': {},
                  '& col:nth-child(4)': {},
                  '& col:nth-child(5)': {},
                },
              },
            },
          },
        },

        '& .Controls': {
          fontSize: 18,
          '& div': {
            '& button': {
              width: 'auto',
            },
          },
        },
      },
    }),
    // end of style

    Values: [
      {
        bEdit: true,
        bShow: false,
        Value: 'Koy',
        Values: [
          {
            bEdit: false,
            bShow: false,
            Value: 'Misc',
            Type: 'Calc',
            Level: '',
            Total: 42534,
            Min: 1347,
            Max: 3719457,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Level',
                Num: {
                  Value: 'Num',
                  result: 34,
                  expression: '(a+b+c+d+e+f+g+h+i)-90+1',
                  vars:
                    '{"a":["Values","Koy","Values","Attributes","Values","Vigor","Num"],"b":["Values","Koy","Values","Attributes","Values","Attunement","Num"],"c":["Values","Koy","Values","Attributes","Values","Endurance","Num"],"d":["Values","Koy","Values","Attributes","Values","Vitality","Num"],"e":["Values","Koy","Values","Attributes","Values","Strength","Num"],"f":["Values","Koy","Values","Attributes","Values","Dexterity","Num"],"g":["Values","Koy","Values","Attributes","Values","Intelligence","Num"],"h":["Values","Koy","Values","Attributes","Values","Faith","Num"],"i":["Values","Koy","Values","Attributes","Values","Luck","Num"]}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 802,
                  expression: '802',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Hollowing',
                Num: { Value: 'Num', result: 0 },
                Min: { Value: 'Min', result: 0 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Souls',
                Num: {
                  Value: 'Num',
                  result: 41266,
                  expression: 'b * (a-1) + (17 * (a-2))',
                  vars:
                    '{"a":["Values","Koy","Values","Misc","Values","Level","Num"],"b":["Values","Koy","Values","Misc","Values","Required souls","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 673,
                  expression: '673',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 3624556,
                  expression: '3624556',
                  vars: '{}',
                },
                Unit: '',
              },
              {
                Value: 'Required souls',
                Num: {
                  Value: 'Num',
                  result: 1234,
                  expression: '673 + 17 * (a-1)',
                  vars:
                    '{"a":["Values","Koy","Values","Misc","Values","Level","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 673,
                  expression: '673',
                  vars: '{}',
                },
                Max: {
                  Value: 'Max',
                  result: 94000,
                  expression: '94000',
                  vars: '{}',
                },
                Unit: '',
              },
            ],
          },
          {
            bEdit: false,
            bShow: true,
            Value: 'Attributes',
            Type: 'Static',
            Level: '',
            Total: 123,
            Min: 9,
            Max: 891,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Vigor',
                Num: { Value: 'Num', result: 15 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Attunement',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Endurance',
                Num: { Value: 'Num', result: 15 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Vitality',
                Num: { Value: 'Num', result: 15 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Strength',
                Num: { Value: 'Num', result: 20 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Dexterity',
                Num: { Value: 'Num', result: 18 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Intelligence',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Faith',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Value: 'Luck',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
            ],
          },
        ],
        Type: 'Card',
      },

      {
        bEdit: false,
        bShow: false,
        Value: 'Misc 1',
        Values: [
          {
            bEdit: false,
            bShow: true,
            Value: 'Base power',
            Type: 'Static',
            Level: '',
            Total: 0,
            Min: 0,
            Max: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'HP',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'FP',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Stamina',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            bEdit: false,
            bShow: false,
            Value: 'Base power 2',
            Type: 'Static',
            Level: '',
            Total: 0,
            Min: 0,
            Max: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Equip load',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Poise',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Item Discovery',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            bEdit: false,
            bShow: true,
            Value: 'Attack Power',
            Type: 'Static',
            Level: '',
            Total: 0,
            Min: 0,
            Max: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'R Weapon 1',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'R Weapon 2',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'R Weapon 3',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'L Weapon 1',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'L Weapon 2',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'L Weapon 3',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
        ],
        Type: 'Card',
      },
      {
        bEdit: false,
        bShow: false,
        Value: 'Misc 2',
        Values: [
          {
            bEdit: false,
            bShow: true,
            Value: 'Defense',
            Type: 'Static',
            Level: '',
            Total: 0,
            Min: 0,
            Max: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Physical',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'VS strike',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'VS slash',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'VS thrust',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Magic',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Fire',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Lightning',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Dark',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            bEdit: false,
            bShow: true,
            Value: 'Resistances',
            Type: 'Static',
            Level: '',
            Total: 0,
            Min: 0,
            Max: 0,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Bleed',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Poison',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Frost',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Curse',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            bEdit: false,
            bShow: false,
            Value: 'Misc 3',
            Type: 'Static',
            Level: '',
            Total: 0,
            Min: 0,
            Max: 10,
            Points: { result: 0, expression: '0', vars: '{}' },
            Values: [
              {
                Value: 'Attunement Slots',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
        ],
        Type: 'Card',
      },
    ],
  },

  'ArcheAge (V2020.10.13)': {
    Game: 'ArcheAge',
    Title: "Koy's Stats",

    Style: (props) => ({
      '& .Profile': {
        fontSize: 12,
        fontFamily: 'NotoSansKR, serif',
        fontWeight: 'normal',

        color: '#6e5735',
        background: 'inherit',
        backgroundColor: 'inherit',

        justifyContent: 'top',
        textAlignLast: 'center',

        '& button': {
          width: '64px',
          borderRadius: '8px',

          filter: 'brightness(88%)',

          background: 'inherit',
          backgroundColor: 'inherit',
        },

        '& .ProfileHeader': {
          fontSize: 'inherit',
          fontFamily: 'inherit',
          fontWeight: 'inherit',
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
        },

        '& .Card': {
          fontSize: 'inherit',
          fontFamily: 'inherit',
          fontWeight: 'inherit',
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
          // Level
          "& input[type='text']": {
            width: '100%',
          },

          '& .CardHeader': {
            textAlignLast: 'left',

            "& input[type='text']": {
              width: '100%',
            },
            '& label': {
              border: 'none',
            },
          },

          '& .Level': {
            display: props.Mode !== 'Edit' ? 'none' : 'inline',
            '& div': {},
            '& button': { fontSize: 22, textAlignLast: 'center' },
          },

          '& .StatBlock': {
            '& div[target="Attributes"]': {},

            textAlignLast: 'left',
            padding: '16px 0px 16px 0px',
            "& input[type='text']": {
              width: '100%',
            },
            '& label': {
              width: '100%',
            },
          },

          '& .Stats': {
            '& input': { border: 'none', borderWidth: '1px' },
            '& table': {
              borderCollapse: 'separate',
              emptyCells: 'show',
              '& thead': {
                emptyCells: 'hide',
                '& th': {
                  color: 'inherit',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  fontStyle: 'inherit',
                  fontWeight: 'inherit',
                  border: 'inherit',
                  borderBottom: 'inherit',
                },
              },
              '& tbody': {
                '& tr': {
                  '& td': {
                    '& button': {},
                    "& input[type='number']": {
                      width: '48px',
                      textAlignLast: 'center',
                    },
                    "& input[type='text']": { width: '100%' },
                  },

                  '& td:nth-child(1):empty': {},
                  '& td:nth-child(1)': {
                    textAlignLast: 'left',
                    width: '100%',
                  },
                  '& td:nth-child(2)': {
                    textAlignLast: 'left',
                    width: '140px',
                    '& input': {},
                  },
                  '& td:nth-child(3)': { textAlignLast: 'left' },
                  '& td:nth-child(4)': { textAlignLast: 'left' },
                  '& td:nth-child(5)': { textAlignLast: 'left' },
                },
                // hover row
                '& tr:nth-child(odd):hover': props.Mode !== 'View' ? {} : {},

                '& tfoot': {},
                '& colgroup': {
                  '& col:nth-child(1)': {},
                  '& col:nth-child(2)': {},
                  '& col:nth-child(3)': {},
                  '& col:nth-child(4)': {},
                  '& col:nth-child(5)': {},
                },
              },
            },
          },
        },

        '& .Controls': {
          fontSize: 18,
          '& div': {
            '& button': {
              width: 'auto',
            },
          },
        },
      },
    }),
    // end of style
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

export { defaultTemplates };
