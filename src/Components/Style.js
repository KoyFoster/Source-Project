const Style = (props) => ({
  fontSize: 'inherit',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  color: 'inherit',
  background: 'inherit',
  backgroundColor: 'inherit',
  justifyContent: 'inherit',
  textAlignLast: 'inherit',
  '& .Profile': {
    fontSize: 22,
    fontFamily: 'Adobe Garamond, serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    justifyContent: 'top',
    textAlignLast: 'center',
    '& button': {
      width: '64px',
      borderRadius: '8px',
      filter: 'brightness(88%)',
    },
    '& .Card': {
      '& button': {
        fontSize: 12,
        textAlignLast: 'center',
      },
      '& hr': {
        display: 'none',
      },
      color: '#bbbbbb',
      backgroundColor: '#232126',
      border: '2px solid #dbdbdb',
      borderRadius: '5px',
      padding: '22px',
      margin: '4px',
      minWidth: '328px',
      maxWidth: '512px',
      "& input[type='number']": {
        width: '64px',
      },
      "& input[type='text']": {
        width: '100%',
      },
      '& .CardHeader': {
        color: '#aca69e',
        textAlignLast: 'left',
        "& input[type='text']": {
          width: '100%',
          borderBottom: '3px solid',
          borderImage:
            'linear-gradient(to right, rgba(80.0,73.0,58.0, 0), rgba(80.0,73.0,58.0, 1), rgba(80.0,73.0,58.0, 0)) 1',
        },
        '& label': {
          width: '100%',
          borderBottom: '3px solid',
          borderImage:
            'linear-gradient(to right, rgba(80.0,73.0,58.0, 0), rgba(80.0,73.0,58.0, 1), rgba(80.0,73.0,58.0, 0)) 1',
        },
      },
      '& .StatHeader': {
        color: '#aca69e',
        textAlignLast: 'left',
        padding: '16px 0px 16px 0px',
        "& input[type='text']": {
          color: '#bbb3a6',
          width: '100%',
          borderBottom: '3px solid',
          borderImage:
            'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
        },
        '& label': {
          width: '100%',
          borderBottom: '3px solid',
          borderImage:
            'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
        },
      },
      '& .Level': {
        display: props.Mode !== 'Edit' ? 'none' : 'inline',
        '& div': {},
        '& button': {
          fontSize: 22,
          textAlignLast: 'center',
        },
      },
      '& .Stats': {
        border: props.Mode === 'Calculator' ? '2px solid' : 'none',
        borderImage:
          props.Mode === 'Calculator'
            ? 'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1'
            : 'none',
        // borderImage:
        //   'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
        // border: '2px solid',
        '& input': {
          border: 'none',
          borderWidth: '1px',
        },
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
                "& input[type='text']": {
                  width: '100%',
                },
              },
              '& td:nth-child(1):empty': {
                borderBottom: '3px solid red',
                borderImage:
                  'radial-gradient(rgba(80.0,73.0,58.0, 1) 40%, rgba(80.0,73.0,58.0, 0)) 1',
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
});

export default Style;
