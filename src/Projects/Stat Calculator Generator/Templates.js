// import React from 'react';
// import { renderToStaticMarkup } from 'react-dom/server';
import DS3Frame from '../../Assets/SVG/ImageBorders/DS3Frame.svg';

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
// Note: Forwhatever reason, Graph Key Arrays are not being cloned, but being passed by reference
const Styles = {
  Default: (props) => ({
    '& .react-contextmenu': {
      zIndex: 1000,

      fontSize: '14',
      fontFamily: 'Arial Black',
      fontWeight: 'bold',
      color: 'white',
      justifyContent: 'left',
      textAlignLast: 'left',

      backgroundColor: '#333333',
      border: '2px solid black',
    },

    '& .react-contextmenu-item': {
      zIndex: 1000,

      fontSize: '14',
      fontFamily: 'Arial Black',
      fontWeight: 'bold',
      color: 'white',
      justifyContent: 'left',
      textAlignLast: 'left',

      backgroundColor: '#333333',
      border: '2px solid black',
    },

    '& .Profile': {
      fontSize: '14',
      fontFamily: 'Arial Black',
      fontWeight: 'bold',
      color: 'white',
      justifyContent: 'left',
      textAlignLast: 'left',

      // Profile Border
      ...(props.Mode === 'Edit'
        ? {
            // StatBlock Debug Border
            border: props.Mode === 'Edit' ? '2px dashed red' : 'none',
          }
        : {
            border: 'initial',
            borderImageRepeat: 'initial',
            borderImage: 'initial',
            borderImageSlice: 'initial',
          }),

      '& .ProfileHeader': {},
      '& button': {},
      '& .Card': {
        // Card Border
        ...(props.Mode === 'Edit'
          ? {
              border: props.Mode === 'Edit' ? '2px dashed orange' : 'none',
            }
          : {
              border: 'initial',
              borderImageRepeat: 'initial',
              borderImage: 'initial',
              borderImageSlice: 'initial',
            }),

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
          // Stat Block Border
          ...(props.Mode === 'Edit'
            ? {
                // StatBlock Debug Border
                border: props.Mode === 'Edit' ? '2px dashed gold' : 'none',
              }
            : {
                border: 'initial',
                borderImageRepeat: 'initial',
                borderImage: 'initial',
                borderImageSlice: 'initial',
              }),

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

  'Dark Souls III': (props) => ({
    '& .react-contextmenu': {
      zIndex: 1000,
      color: '#bbbbbb',
      backgroundColor: '#232126',
      border: '2px solid #dbdbdb',
      borderRadius: '5px',
    },

    '& .react-contextmenu-item': {
      zIndex: 1000,
      color: '#bbbbbb',
      backgroundColor: '#232126',
      border: '2px solid #dbdbdb',
      borderRadius: '5px',
    },

    '& .Profile': {
      fontSize: 22,
      fontFamily: 'Adobe Garamond, serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      justifyContent: 'top',
      textAlignLast: 'center',

      // Profile Border
      ...(props.Mode === 'Edit'
        ? {
            // StatBlock Debug Border
            border: props.Mode === 'Edit' ? '2px dashed red' : 'none',
          }
        : {
            border: 'initial',
            borderImageRepeat: 'initial',
            borderImage: 'initial',
            borderImageSlice: 'initial',
          }),

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

        // Card Border
        ...(props.Mode === 'Edit'
          ? {
              border: props.Mode === 'Edit' ? '2px dashed orange' : 'none',
            }
          : {
              border: 'initial',
              borderImageRepeat: 'initial',
              borderImage: 'initial',
              borderImageSlice: 'initial',
            }),

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

          ...(props.Mode === 'Calculator'
            ? {
                border: '39px solid transparent',
                borderImageRepeat: 'repeat',
                borderImage: `url("${DS3Frame}")`,
                borderImageSlice: '34%',
              }
            : // Stat Block Border
            props.Mode === 'Edit'
            ? {
                // StatBlock Debug Border
                border: props.Mode === 'Edit' ? '2px dashed gold' : 'none',
              }
            : {
                border: 'initial',
                borderImageRepeat: 'initial',
                borderImage: 'initial',
                borderImageSlice: 'initial',
              }),

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

  ArcheAge: (props) => ({
    '& .react-contextmenu': {
      zIndex: 1000,
      fontSize: 12,
      fontFamily: 'NotoSansKR, serif',
      fontWeight: 'normal',

      color: '#6e5735',
      backgroundColor: '#faf8e8',

      border: '4px solid #6e5735',
      borderRadius: '5px',

      justifyContent: 'top',
      textAlignLast: 'center',
    },

    '& .react-contextmenu-item': {
      zIndex: 1000,
      fontSize: 12,
      fontFamily: 'NotoSansKR, serif',
      fontWeight: 'normal',

      color: '#6e5735',
      background: 'inherit',
      backgroundColor: 'inherit',

      justifyContent: 'top',
      textAlignLast: 'center',
    },

    '& .Profile': {
      fontSize: 12,
      fontFamily: 'NotoSansKR, serif',
      fontWeight: 'normal',

      color: '#6e5735',
      background: 'inherit',
      backgroundColor: 'inherit',

      justifyContent: 'top',
      textAlignLast: 'center',

      // Profile Border
      ...(props.Mode === 'Edit'
        ? {
            // StatBlock Debug Border
            border: props.Mode === 'Edit' ? '2px dashed red' : 'none',
          }
        : {
            border: 'initial',
            borderImageRepeat: 'initial',
            borderImage: 'initial',
            borderImageSlice: 'initial',
          }),

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

        justifyContent: 'inherit',
        textAlignLast: 'inherit',

        backgroundColor: '#faf8e8',
        border: '4px solid #6e5735',
        borderRadius: '5px',

        padding: '16px',
        margin: '4px',

        minWidth: '328px',

        // Card Border
        ...(props.Mode === 'Edit'
          ? {
              border: props.Mode === 'Edit' ? '2px dashed orange' : 'none',
            }
          : {
              border: 'initial',
              borderImageRepeat: 'initial',
              borderImage: 'initial',
              borderImageSlice: 'initial',
            }),

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
          textAlignLast: 'left',
          padding: '16px 0px 16px 0px',

          '& div[target="Attributes"]': {},

          // Stat Block Border
          ...(props.Mode === 'Edit'
            ? {
                // StatBlock Debug Border
                border: props.Mode === 'Edit' ? '2px dashed gold' : 'none',
              }
            : {
                border: 'initial',
                borderImageRepeat: 'initial',
                borderImage: 'initial',
                borderImageSlice: 'initial',
              }),

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
        fontSize: 14,
        '& div': {
          '& button': {
            width: 'auto',
          },
        },
      },
    },
  }),
};

const Templates = {
  Blank: {
    Type: 'UserDefined',
    DateCreated: undefined,
    DateEdited: undefined,
    Game: 'Blank',
    Title: 'Blank',
    Style: 'Default',
    Values: [],
  },
  //
  "Jojo's Bizarre Adventure": {
    Game: "Jojo's Bizarre Adventure",
    Title: 'Stand Calculator',
    Style: 'Default',
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
            Values: [
              {
                Value: 'POWER',
                Type: 'Static',
                Num: { Value: 'Num', result: 3, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'SPEED',
                Type: 'Static',
                Num: { Value: 'Num', result: 4, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'RANGE',
                Type: 'Static',
                Num: { Value: 'Num', result: 4, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'DURABILITY',
                Type: 'Static',
                Num: { Value: 'Num', result: 8, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'PRECISION',
                Type: 'Static',
                Num: { Value: 'Num', result: 4, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'POTENTIAL',
                Type: 'Static',
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
  //
  'Dark Souls III': {
    Game: 'Dark Souls III',
    Title: 'Dark Souls III',
    Style: 'Dark Souls III',
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
            Values: [
              {
                Type: 'Calc',
                Value: 'Level',
                Num: {
                  Value: 'Num',
                  result: 21,
                  expression: '(a+b+c+d+e+f+g+h+i)-90+1',
                  vars: '{"a":["Values","Koy","Values","Attributes","Values","Vigor","Num"],"b":["Values","Koy","Values","Attributes","Values","Attunement","Num"],"c":["Values","Koy","Values","Attributes","Values","Endurance","Num"],"d":["Values","Koy","Values","Attributes","Values","Vitality","Num"],"e":["Values","Koy","Values","Attributes","Values","Strength","Num"],"f":["Values","Koy","Values","Attributes","Values","Dexterity","Num"],"g":["Values","Koy","Values","Attributes","Values","Intelligence","Num"],"h":["Values","Koy","Values","Attributes","Values","Faith","Num"],"i":["Values","Koy","Values","Attributes","Values","Luck","Num"]}',
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
                Type: 'Static',
                Value: 'Hollowing',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 99, expression: '99', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'Souls',
                Num: {
                  Value: 'Num',
                  result: 20583,
                  expression: 'a == 1 ? 0 : b * (a-1) + (17 * (a-2))',
                  vars: '{"a":["Values","Koy","Values","Misc","Values","Level","Num"],"b":["Values","Koy","Values","Misc","Values","Required souls","Num"]}',
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
                Type: 'Calc',
                Value: 'Required souls',
                Num: {
                  Value: 'Num',
                  result: 1013,
                  expression: '673 + 17 * (a-1)',
                  vars: '{"a":["Values","Koy","Values","Misc","Values","Level","Num"]}',
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
            Values: [
              {
                Type: 'Static',
                Value: 'Vigor',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
                Value: 'Attunement',
                Num: { Value: 'Num', result: 30 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
                Value: 'Endurance',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
                Value: 'Vitality',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
                Value: 'Strength',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
                Value: 'Dexterity',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
                Value: 'Intelligence',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
                Value: 'Faith',
                Num: { Value: 'Num', result: 10 },
                Min: { Value: 'Min', result: 1 },
                Max: { Value: 'Max', result: 99 },
                Unit: '',
              },
              {
                Type: 'Static',
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
            Values: [
              {
                Type: 'Calc',
                Value: 'HP',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'FP',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
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
            Values: [
              {
                Type: 'Calc',
                Value: 'Equip load',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'Poise',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
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
            Values: [
              {
                Type: 'Calc',
                Value: 'R Weapon 1',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'R Weapon 2',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'R Weapon 3',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'L Weapon 1',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'L Weapon 2',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
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
            Values: [
              {
                Type: 'Calc',
                Value: 'Physical',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'VS strike',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'VS slash',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'VS thrust',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'Magic',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'Fire',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'Lightning',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
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
            Values: [
              {
                Type: 'Calc',
                Value: 'Bleed',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'Poison',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
                Value: 'Frost',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Type: 'Calc',
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
            Values: [
              {
                Type: 'Calc',
                Value: 'Attunement Slots',
                Num: {
                  Value: 'Num',
                  result: 2,
                  expression:
                    'a < 10 ? 0 :  a <= 18 ? floor( (a-10)/4 )+1 :  a <= 30 ? floor( (a-18)/6 )+3 :  a <= 60 ? floor( (a-30)/10 )+5 :  a <= 80 ? floor( (a-60)/20 )+8 :  a >= 99  ? 10 : 9',
                  vars: '{"a":["Values","Koy","Values","Attributes","Values","Attunement","Num"]}',
                },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            ],
          },
        ],
        Type: 'Card',
      },
    ],
  },
  //
  'ArcheAge (V2020.10.13)': {
    Game: 'ArcheAge (V2020.10.13)',
    Title: "Koy's Stats",
    Style: 'ArcheAge',
    Values: [
      {
        Value: 'Page One',
        Values: [
          {
            Value: 'Visible Player Stats',
            Values: [
              {
                Value: 'Health',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 2172,
                  expression: '12 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 36,
                  expression: '12 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 30720,
                  expression: '12 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Mana',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 696,
                  expression: '12 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 696,
                  expression: '12 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 30720,
                  expression: '12 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Primary Stats',
            Values: [
              {
                Value: 'Strength',
                Type: 'Static',
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
                Type: 'Static',
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
                Type: 'Static',
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
                Type: 'Static',
                Num: { Value: 'Num', result: 3, expression: '216', vars: '{}' },
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
                Type: 'Static',
                Num: {
                  Value: 'Num',
                  result: 58,
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
            Values: [
              {
                Value: 'Melee Attack',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 20.6,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 0.6,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Strength","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Range Attack',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 23.8,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 0.6,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Agility","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Magic Attack',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 11.6,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 11.6,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Healing Power',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 0.6,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 0.6,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 512,
                  expression: '0.2 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Physical Defense',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 181,
                  expression: '1 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 3,
                  expression: '1 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '1 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },
                Unit: '',
              },
              {
                Value: 'Magic Defense',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 181,
                  expression: '1 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 3,
                  expression: '1 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 2560,
                  expression: '1 * a',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Stamina","Max"]}',
                },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Misc Stats',
            Values: [
              {
                Value: 'Move Speed',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 6.1,
                  expression: '6.1',
                  vars: '{}',
                },
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
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 99.16,
                  expression:
                    '(z = (100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013))) ) ) < 40 ? 40 : z',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Num"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Num"]}',
                },
                Min: {
                  Value: 'Min',
                  result: 99.16,
                  expression:
                    '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Min"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Min"]}',
                },
                Max: {
                  Value: 'Max',
                  result: 68.54,
                  expression:
                    '100 - ((a <= 1000 ? a * 0.0137 : (1000 * 0.0137) + ((a - 1000) * 0.0013)) + (b <= 1000 ? b * 0.0137 : (1000 * 0.0137) + ((b - 1000) * 0.0013)))',
                  vars: '{"a":["Values","Page One","Values","Primary Stats","Values","Spirit","Max"],"b":["Values","Page One","Values","Primary Stats","Values","Intelligence","Max"]}',
                },
                Unit: '%',
              },
              {
                Value: 'Attack Speed',
                Type: 'Calc',
                Num: { Value: 'Num', result: 63, expression: '63', vars: '{}' },
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
        Type: 'Card',
      },
      {
        Value: 'Attack',
        Values: [
          {
            Value: 'Melee Attack',
            Values: [
              {
                Value: 'Melee Attack Speed',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 1.2,
                  expression: '1.2',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: 'sec',
              },
              {
                Value: 'Melee Accuracy',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 87.9,
                  expression: '87.9',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Melee Critical Status',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 2.3,
                  expression: '2.3',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Melee Critical Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 50, expression: '50', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Backstab Melee Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Melee Skill Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 6, expression: '6', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'PvE Melee Skills',
                Type: 'Calc',
                Num: { Value: 'Num', result: 8, expression: '8', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Ranged Attack',
            Values: [
              {
                Value: 'Ranged Accuracy',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 87.9,
                  expression: '87.9',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Ranged Critical Status',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 2.3,
                  expression: '2.3',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Ranged Critical Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 50, expression: '50', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Backstab Ranged Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Ranged Skill Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 8, expression: '8', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'PvE Ranged Skills',
                Type: 'Calc',
                Num: { Value: 'Num', result: 8, expression: '8', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Magic Attack',
            Values: [
              {
                Value: 'Magic Accuracy',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 100,
                  expression: '100',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Magic Critical Status',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 72.1,
                  expression: '72.1',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Magic Critical Damage',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 122.2,
                  expression: '122.2',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Backstab Magic Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Magic Skill Damage',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 12.7,
                  expression: '12.7',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'PvE Magic Skills',
                Type: 'Calc',
                Num: { Value: 'Num', result: 8, expression: '8', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Misc',
            Values: [
              {
                Value: 'Focus',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Shield Defense Penetration Rate',
                Type: 'Calc',
                Num: { Value: 'Num', result: 50, expression: '50', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Shield Defense Penetration',
                Type: 'Calc',
                Num: { Value: 'Num', result: 50, expression: '50', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%(0)',
              },
              {
                Value: 'Defense Penetration',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Magic Defense Penetration',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 490,
                  expression: '490',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            ],
          },
        ],
        Type: 'Card',
      },
      {
        Value: 'Defense',
        Values: [
          {
            Value: 'Defense',
            Values: [
              {
                Value: 'Parry Rate',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 9.7,
                  expression: '9.7',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Shield Block Rate',
                Type: 'Calc',
                Num: { Value: 'Num', result: 1, expression: '1', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Evasion',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 23.7,
                  expression: '23.7',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Resiliance',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 7465,
                  expression: '7465',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Toughness',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 2507,
                  expression: '2507',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Siege Damage Reduction',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 6.6,
                  expression: '6.6',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'PvE Damage Reduction',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 6.8,
                  expression: '6.8',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Melee Defense',
            Values: [
              {
                Value: 'Melee Damage Reduction',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 13.7,
                  expression: '13.7',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: {
                  Value: 'Max',
                  result: 100,
                  expression: '100',
                  vars: '{}',
                },
                Unit: '%',
              },
              {
                Value: 'Fixed Melee Damage Reduction',
                Type: 'Calc',
                Num: { Value: 'Num', result: 61, expression: '61', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'PvE Melee Damage Reduction',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Ranged Defense',
            Values: [
              {
                Value: 'Ranged Damage Reduction',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 12.6,
                  expression: '12.6',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Fixed Ranged Damage Reduction',
                Type: 'Calc',
                Num: { Value: 'Num', result: 61, expression: '61', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'PvE Ranged Damage Reduction',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 0, expression: '0', vars: '{}' },
                Max: { Value: 'Max', result: 0, expression: '0', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Magic Defense',
            Values: [
              {
                Value: 'Magic Damage Reduction',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 21.1,
                  expression: '21.1',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Fixed Magic Damage Reduction',
                Type: 'Calc',
                Num: { Value: 'Num', result: 49, expression: '49', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'PvE Magic Damage Reduction',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            ],
          },
        ],
        Type: 'Card',
      },
      {
        Value: 'Regen/Misc',
        Type: 'Card',
        Values: [
          {
            Value: 'Heal',
            Values: [
              {
                Value: 'Critical Heal Rate',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 10.7,
                  expression: '10.7',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Critical Heal Bonus',
                Type: 'Calc',
                Num: { Value: 'Num', result: 50, expression: '50', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Healing',
                Type: 'Calc',
                Num: { Value: 'Num', result: 6, expression: '6.0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Healing Skill Damage',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
            ],
          },
          {
            Value: 'Regeneration',
            Values: [
              {
                Value: 'Heal Regen',
                Type: 'Calc',
                Num: { Value: 'Num', result: 79, expression: '79', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Continuous Heal Regen',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Mana Regen',
                Type: 'Calc',
                Num: {
                  Value: 'Num',
                  result: 132,
                  expression: '132',
                  vars: '{}',
                },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
              {
                Value: 'Post-Cast Mana Regen',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '',
              },
            ],
          },
          {
            Value: 'Misc',
            Values: [
              {
                Value: 'Received Healing',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Increased experience gain',
                Type: 'Calc',
                Num: { Value: 'Num', result: 11, expression: '11', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Loot Drop Rate',
                Type: 'Calc',
                Num: { Value: 'Num', result: 11, expression: '11', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Gold earned from hunting',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
              {
                Value: 'Stealth Detection',
                Type: 'Calc',
                Num: { Value: 'Num', result: 0, expression: '0', vars: '{}' },
                Min: { Value: 'Min', result: 1, expression: '1', vars: '{}' },
                Max: { Value: 'Max', result: 10, expression: '10', vars: '{}' },
                Unit: '%',
              },
            ],
          },
        ],
      },
    ],
  },
};

const TemplateList = Object.keys(Templates).map((key) => {
  return key;
});

export { Templates, TemplateList, Styles };
