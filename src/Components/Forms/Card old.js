/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Grid from './Grid';
import StatData from '../StatData.js';
import ToggleButton from './ToggleButton.js';
import MathInput from './MathInput.js';
import Controls from './Controls.js';
import './Card.css';

// TODO
// 0. Be able to update all calculations after update object names
// 1. Adding/subtracting/moving pages
//  a. Move parts by draging and dropping
//  b. Be able to update all calculations after move
// 2. Adding/subtracting/moving stat blocks
// 3. Adding/subtracting/moving stats

// Cell
class Cell {
  constructor(obj) {
    // defaults
    this.result = 0;
    this.expression = '0';
    this.vars = '{}';

    // defined
    if (obj) {
      this.result = obj.result;
      this.expression = obj.expression;
      this.vars = obj.vars;
    }
  }
}

// Stat
class Stat {
  constructor(obj) {
    // defaults
    this.Value = '';
    this.Num = {};
    this.Min = {};
    this.Max = {};
    this.Unit = '';

    // defined
    if (obj) {
      this.Value = obj.Value ? obj.Value : '';
      this.Num = new Cell(obj.Num);
      this.Min = new Cell(obj.Min);
      this.Max = new Cell(obj.Max);
      this.Unit = obj.Unit ? obj.Unit : '';
    }
  }

  getPath = () => {};
}

// Block
class Block {
  constructor(obj) {
    // defaults
    this.Value = '';

    this.Type = '';
    this.Level = '';
    this.Total = '';
    this.Min = '';
    this.Max = '';
    this.Points = {};

    this.Values = [];

    // defined
    if (obj) {
      this.Value = obj.Value;

      this.Type = obj.Type ? obj.Type : '';
      this.Total = obj.Total ? obj.Total : '';
      this.Level = obj.Level ? obj.Level : '';
      this.Min = obj.Min ? obj.Min : '';
      this.Max = obj.Max ? obj.Max : '';
      this.Points = new Cell(obj.Points);

      const keys = Object.keys(obj.Values);
      this.Values = keys.map((key) => {
        return new Stat(obj.Values[key]);
      });
    }
  }

  getPath = () => {};
}

// Card
class Card {
  constructor(obj) {
    // defaults
    this.Value = '';
    this.Values = [];

    // defined
    if (obj) {
      this.Value = obj.Value ? obj.Value : '';

      const keys = Object.keys(obj.Values);
      this.Values = keys.map((key) => {
        return new Block(obj.Values[key]);
      });
    }
  }
}

// Profile
class Profile {
  constructor(obj) {
    // console.log('Profile:', obj);
    this.Game = obj.Game;
    this.Title = obj.Title;

    const keys = Object.keys(obj.Values);
    this.Values = keys.map((key) => {
      return new Card(obj.Values[key]);
    });
  }
}

const baseInputStyle = {
  width: '100%',
  border: 'none',
  padding: '0px',
  // height: 'fit-content',
};

const cardStyle = {
  display: 'inline-block',
  maxwidth: '512px',
  // overflow: 'scroll',
  backgroundColor: '#faf8e8',
  color: '#6e5735',
  fontFamily: 'NotoSansKR',
  border: '4px solid #6e5735',
  padding: '16px',
  margin: '4px',
  justifyContent: 'top',
  textAlignLast: 'center',
};

const statStyle = {
  borderColor: '#ff0001',
  borderWidth: '2px',
  borderStyle: 'dashed',
  margin: '2px',
};
const statBlockStyle = {
  borderColor: '#1d4a33',
  borderWidth: '2px',
  borderStyle: 'dashed',
  margin: '2px',
};
const statCardStyle = {
  borderColor: '#912d53',
  borderWidth: '2px',
  borderStyle: 'dashed',
  margin: '2px',
};

const { backgroundColor } = cardStyle;

const cellStyle = {
  ...baseInputStyle,
  borderRadius: '8px',
  borderLeft: '2px solid black',
  borderTop: '2px solid black',
  borderBottom: '2px solid grey',
  borderRight: '2px solid grey',
  boxSizing: 'border-box', // inner border
};
const formStyle = {
  ...baseInputStyle,
  display: 'inline-block',
  borderRadius: '8px',
  borderLeft: '2px solid black',
  borderTop: '2px solid black',
  borderBottom: '2px solid grey',
  borderRight: '2px solid grey',
  boxSizing: 'border-box', // inner border
};
const buttonStyle = {
  ...baseInputStyle,
  backgroundColor,
  display: 'block',
  width: '100%',
  borderRadius: '8px',
  borderLeft: '2px solid white',
  borderTop: '2px solid white',
  borderBottom: '2px solid grey',
  borderRight: '2px solid grey',
  boxSizing: 'border-box', // inner border
};

const StatBlock = (props) => {
  const [bUpdateTotals, setUpdateTotals] = useState(true);
  const [selection, setStatSelection] = useState('');
  const { data } = props;
  const { Stats } = props;
  const { parentKey } = props;

  // stat properties
  const { Value } = Stats;
  let { Type } = Stats;
  let { Total } = Stats;
  let { Min } = Stats;
  let { Max } = Stats;
  const { Level } = Stats;
  const { Points } = Stats;

  // stat data
  const { Values } = Stats;
  const { onChange } = props;
  const { Update } = props;
  const { setSelection } = props;
  const keys = Object.keys(Values);
  const size = keys.length;

  const AddStat = (key, amt, pos) => {
    if (!amt) return;
    if (amt > 0) {
      let i = 1;
      // generate card name
      let name = `New Card ${i}`;
      // iterate until card name does not exist
      while (Values[name] !== undefined) {
        i += 1;
        name = `New Card ${i}`;
      }
      const objBuffer = {
        Value: name,
        Num: [0, []],
        Min: [0, []],
        Max: [0, []],
        Unit: '',
      };

      // Position new entry to current location
      let added = false;
      const currKeys = Object.keys(Values);
      if (currKeys.length && selection) {
        currKeys.forEach((k) => {
          // Reposition value to the end of the list
          if (added) {
            const buffer = Values[k];
            delete Values[k];
            Values[k] = buffer;
          }

          // Add new value
          if (k === selection) {
            Values[name] = objBuffer;
            added = true;
          }
        });
      } else {
        Values[name] = objBuffer;
      }

      setStatSelection(name);
    } // sub
    else {
      let prevKey = '';
      let keyFnd = false;
      const keys = Object.keys(Values);
      keys.forEach((k) => {
        if (k === key) keyFnd = true;
        if (!keyFnd) prevKey = k;
      });
      if (Values[key]) {
        delete Values[key];
      } else {
        console.error('Invalid Key:', key);
      }
      setStatSelection(prevKey);
    }
    // Update Renderer
    Update();
  };

  // handleChange
  const handleStatChange = (e, rowData, type) => {
    let { value } = e.target;

    const cell = rowData.cell.split('~');
    const { key } = rowData;

    const buffer = {
      target: {
        value: value,
        checked: type === 'checkbox' ? e.target.checked : undefined,
        dataset: {
          key: `${key}~${cell[0]}~${cell[1]}`,
        },
      },
    };

    // This is the onChange event of the StatCard
    // Update Calculation
    if (onChange) onChange(buffer);
  };

  const handleMathStatChange = (e, rowData, type) => {
    let { value } = e.target;

    const { cell } = rowData;
    const { key } = rowData;

    const buffer = {
      target: {
        value: value,
        checked: type === 'checkbox' ? e.target.checked : undefined,
        dataset: {
          key: `${key}~${cell}`,
        },
      },
    };

    // This is the onChange event of the StatCard
    // Update Calculation
    if (onChange) onChange(buffer);
  };

  // handleChange
  function handleChange(e, key, type) {
    const buffer = {
      target: {
        value: e.target.value,
        checked: type === 'checkbox' ? e.target.checked : undefined,
        dataset: {
          key: `${parentKey}~${key}`,
        },
      },
    };

    if (onChange) onChange(buffer);
  }

  const handleMinMaxChange = (e, rowData) => {
    let value =
      e.target.value === '' ? 0 : Number.parseFloat(e.target.value, 10);

    const cell = rowData.cell.split('~');
    const stats = rowData.value;

    value = StatData.HandleStatMinMax(stats, cell[1], value).result;

    // Create synthetic event object
    const E = {
      target: {
        value: [value, [`${value}`, '{}']],
        dataset: { key: `${rowData.key}~${rowData.cell}` },
      },
    };

    setUpdateTotals(true);
    if (onChange) onChange(E);
  };

  // Update Totals
  if (bUpdateTotals) {
    const Totals = StatData.TallyTotals(Values);
    Total = Totals.Total;
    Min = Totals.Min;
    Max = Totals.Max;

    if (onChange) {
      const e = {
        target: { value: Total, dataset: { key: `${parentKey}~Total` } },
      };
      onChange(e, true);
      e.target.value = Min;
      e.target.dataset.key = `${parentKey}~Min`;
      onChange(e, true);
      e.target.value = Max;
      e.target.dataset.key = `${parentKey}~Max`;
      onChange(e, true);
    }

    setUpdateTotals(false);
  }

  const getStatValue = (val) => {
    return !Number.isNaN(val.result) ? val.result : 0;
    // return val[0];
  };

  function getCellKey(rowData) {
    // return 'Values' + '~' + rowData['Value'] + '~' + 'Num';
    return `${Values}~${rowData['Value']}~Num`;
  }

  const displayForms = [
    <input key="Value" type="text" value={''} style={cellStyle} />,
    <MathInput
      key="Num"
      Key={getCellKey}
      value={''} // comprises of [value,[expression, vars]]
      data={data}
      style={buttonStyle}
      onChange={handleMathStatChange}
    >
      Data
    </MathInput>,
    <MathInput
      key="Min"
      Key={getCellKey}
      value={''}
      data={data}
      style={buttonStyle}
      onChange={handleMathStatChange}
    >
      Data
    </MathInput>,
    <MathInput
      key="Max"
      Key={getCellKey}
      value={''}
      data={data}
      style={buttonStyle}
      onChange={handleMathStatChange}
    >
      Data
    </MathInput>,
    <input key="Unit" type="text" value={''} style={cellStyle} />,
  ];

  // input forms
  const inputForms = [
    <input
      key="Value"
      type="text"
      value={''}
      style={cellStyle}
      onChange={handleStatChange}
    />,
    <input
      key="Num"
      type="number"
      value={getStatValue}
      style={cellStyle}
      onChange={handleMinMaxChange}
    />,
    <input
      key="Min"
      type="number"
      value={getStatValue}
      style={cellStyle}
      onChange={handleMinMaxChange}
    />,
    <input
      key="Max"
      type="number"
      value={getStatValue}
      style={cellStyle}
      onChange={handleMinMaxChange}
    />,
    <input
      key="Unit"
      type="text"
      value={''}
      style={cellStyle}
      onChange={handleStatChange}
    />,
    <div key="Math" style={{ display: 'none' }}>
      Data
    </div>,
    <div key="Vars" style={{ display: 'none' }}>
      Data
    </div>,
  ];

  return (
    <div
      style={statBlockStyle}
      onClick={() => {
        setSelection(Value);
      }}
    >
      <div>
        <div style={{ display: 'flex' }}>
          <ToggleButton
            style={{ ...buttonStyle, width: '56px', padding: '2px' }}
            toggledStyle={{
              ...buttonStyle,
              width: '56px',
              padding: '2px',
              filter: 'brightness(88%)',
            }}
            checked={Type === 'Calc'}
            onChange={(e) => {
              handleChange(e, 'Type');
            }}
          >
            {['Calc', 'Static']}
          </ToggleButton>
          <input
            type="text"
            value={Value}
            style={cellStyle}
            onChange={(e) => handleChange(e, 'Value')}
          />
        </div>
        <div style={{ display: 'flex' }}>
          {Type === 'Calc' ? null : 'Level: '}
          {Type === 'Calc' ? null : (
            <input
              type="number"
              value={Level ? Level : 0}
              style={formStyle}
              onChange={(e) => handleChange(e, 'Level')}
            />
          )}
          {Type === 'Calc' ? null : 'Points: '}
          {Type === 'Calc' ? null : (
            <MathInput
              key="Points"
              Key="Points"
              value={Points}
              data={data}
              style={buttonStyle}
              onChange={(e) => {
                handleChange(e, 'Points');
              }}
            >
              {Points ? Points : 'N/D'}
            </MathInput>
          )}
          {Type === 'Calc' ? null : (
            <div style={{ width: '100%' }}>
              Remainder:{' '}
              {Points ? (Points.result ? Points.result - Total : 'N/D') : 'N/D'}
            </div>
          )}
        </div>
      </div>

      <Controls size={size} Add={AddStat} selection={selection}></Controls>
      <Grid
        value={Values}
        style={statStyle}
        columnStyle={[
          { width: '128px' },
          { width: '64px' },
          { width: '64px' },
          { width: '64px' },
          { width: '32px' },
          { width: '64px' },
        ]}
        iColumns={4}
        parentKey={`${parentKey}~Values`}
        rowKeys={Object.keys(Values)}
        header
        onClick={(e, rowData) => {
          setStatSelection(rowData.value.Value);
        }}
        onChange={onChange}
        onChangeOverride
        // cellStyle={cellStyle}
        hRow={Type === 'Calc' ? displayForms : inputForms}
        hFooter={
          Type === 'Calc'
            ? undefined
            : [
                <div key="0">Totals: </div>,
                <div key="1">{Total}</div>,
                <div key="2">{Min}</div>,
                <div key="3">{Max}</div>,
                <div key="4"></div>,
                <div key="5"></div>,
                <div key="6"></div>,
              ]
        }
      ></Grid>
    </div>
  );
};

const CARD = (props) => {
  const [selection, setBlockSelection] = useState('');
  const { data } = props;
  const { parentKey } = props;
  const { Page } = props;
  const { name } = props;
  const { Value } = props;
  const { onChange } = props;
  const { Update } = props;
  const { onDrag } = props;
  const { setSelection } = props;
  const keys = Object.keys(Page);
  const size = keys.length;

  const AddBlock = (key, amt, pos) => {
    if (!amt) return;
    if (amt > 0) {
      let i = 1;
      // generate card name
      let name = `New Card ${i}`;
      // iterate until card name does not exist
      while (Page[name] !== undefined) {
        i += 1;
        name = `New Card ${i}`;
      }
      const objBuffer = {
        Value: name,
        Values: {},
      };

      // Position new entry to current location
      let added = false;
      const currKeys = Object.keys(Page);
      if (currKeys.length && selection) {
        currKeys.forEach((k) => {
          // Reposition value to the end of the list
          if (added) {
            const buffer = Page[k];
            delete Page[k];
            Page[k] = buffer;
          }

          // Add new value
          if (k === selection) {
            Page[name] = objBuffer;
            added = true;
          }
        });
      } else {
        Page[name] = objBuffer;
      }

      setBlockSelection(name);
    } // sub
    else {
      let prevKey = '';
      let keyFnd = false;
      const keys = Object.keys(Page);
      keys.forEach((k) => {
        if (k === key) keyFnd = true;
        if (!keyFnd) prevKey = k;
      });
      console.log('Page Keys:', keys, prevKey);
      if (Page[key]) {
        delete Page[key];
      } else {
        console.error('Invalid Key:', key);
      }
      setBlockSelection(prevKey);
    }
    // Update Renderer
    Update();
  };

  // handleChange
  const handleChange = (e, key, type) => {
    const buffer = {
      target: {
        value: e.target.value,
        checked: type === 'checkbox' ? e.target.checked : undefined,
        dataset: {
          key: `${parentKey}~Value`,
        },
      },
    };

    if (onChange) onChange(buffer);
  };
  let i = -1;
  return (
    <div
      style={cardStyle}
      onMouseDown={(e) => {
        // e = e || window.event;
        // e.preventDefault();
        // // get the mouse cursor position at startup:
        // pos3 = e.clientX;
        // pos4 = e.clientY;
        // document.onmouseup = closeDragElement;
        // // call a function whenever the cursor moves:
        // document.onmousemove = elementDrag;
        //nonDrag(e);
      }}
      onClick={() => {
        setSelection(name);
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <input
            type="text"
            value={Value}
            style={cellStyle}
            onChange={(e) => handleChange(e, name)}
          />
        </div>
      </div>
      <Controls size={size} Add={AddBlock} selection={selection}></Controls>
      {keys.map((key) => {
        i += 1;
        return (
          <StatBlock
            key={`StatBlock_${i}`}
            data={data}
            parentKey={`${parentKey}~Values~${key}`}
            Stats={Page[key]}
            onChange={onChange}
            Update={Update}
            setSelection={setBlockSelection}
          ></StatBlock>
        );
      })}
    </div>
  );
};

const Stack = (props) => {
  const { data } = props;
  const { Pages } = props;
  const { parentKey } = props;
  const { onChange } = props;
  const { setSelection } = props;
  const { Update } = props;

  let i = -1;
  return Object.keys(Pages).map((key) => {
    i += 1;
    const Page = Pages[key];
    return (
      <CARD
        key={`Card_${i}`}
        data={data}
        parentKey={`${parentKey}~${key}`}
        name={key}
        Value={Page.Value}
        Page={Page.Values}
        onChange={onChange}
        Update={Update}
        setSelection={setSelection}
        onDrag={(e) => {
          // console.log('onDrag:', e.target);
        }}
      ></CARD>
    );
  });
};

// handles grid data
const ProfileCard = (props) => {
  const prof = new Profile(props.value);
  console.log('Card:', prof);
  const jsonProf = JSON.stringify(prof);
  console.log('stringify:', jsonProf);

  const prof2 = JSON.parse(jsonProf);
  console.log('parse:', prof2);

  // Parse out props
  // 1. Get Title
  const data = props.value;
  const { Title } = props.value;
  const { Game } = props.value;
  const { Values } = props.value;
  const { onChange } = props;
  const { Update } = props;
  // 2. Get Pages. Pages are anything that isn't the title
  const Pages = {};
  Object.keys(Values).forEach((key) => {
    Pages[key] = Values[key];
  });

  // handleChange
  const handleChange = (e, key, type) => {
    const buffer = {
      target: {
        value: e.target.value,
        checked: type === 'checkbox' ? e.target.checked : undefined,
        dataset: {
          key: key,
        },
      },
    };

    if (onChange) onChange(buffer);
  };

  // card handling
  const size = Object.keys(Values).length;
  const [selection, setSelection] = useState('');
  const handleSelection = (newSel) => {
    setSelection(newSel);
  };
  const AddCard = (key, amt, pos) => {
    if (!amt) return;

    if (amt > 0) {
      let i = 1;
      // generate card name
      let name = `New Card ${i}`;

      // iterate until card name does not exist
      while (Values[name] !== undefined) {
        i += 1;
        name = `New Card ${i}`;
      }

      const objBuffer = {
        Value: name,
        Values: {},
      };

      // Position new entry to current location
      let added = false;
      const currKeys = Object.keys(Values);
      if (currKeys.length && selection) {
        currKeys.forEach((k) => {
          // Reposition value to the end of the list
          if (added) {
            const buffer = Values[k];
            delete Values[k];
            Values[k] = buffer;
          }

          // Add new value
          if (k === selection) {
            Values[name] = objBuffer;
            added = true;
          }
        });
      } else {
        Values[name] = objBuffer;
      }

      // add new card with valid name
      setSelection(name);
    } // sub
    else {
      let prevKey = '';
      let keyFnd = false;
      const keys = Object.keys(Values);
      keys.forEach((k) => {
        if (k === key) keyFnd = true;
        if (!keyFnd) prevKey = k;
      });
      if (Values[key]) {
        delete Values[key];
      } else {
        console.error('Invalid Key:', key);
      }
      setSelection(prevKey);
    }

    // Update Renderer
    Update();
  };
  const MoveCard = (key, pos) => {};

  return (
    <div>
      Game:{' '}
      <input
        type="text"
        value={Game}
        style={cellStyle}
        onChange={(e) => handleChange(e, 'Game')}
      />
      Title:{' '}
      <input
        type="text"
        value={Title}
        style={cellStyle}
        onChange={(e) => handleChange(e, 'Title')}
      />
      <Controls size={size} Add={AddCard} selection={selection}></Controls>
      <div
        style={{
          ...statCardStyle,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
      >
        <Stack
          data={data}
          parentKey={'Values'}
          Pages={Pages}
          onChange={onChange}
          Update={Update}
          setSelection={handleSelection}
        ></Stack>
      </div>
    </div>
  );
};

export default ProfileCard;
