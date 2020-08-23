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
import ToggleButton from '../Forms/ToggleButton.js';
import MathInput from '../Forms/MathInput.js';

// Steps To Rendering A Card
// 1. Take Title
// 2. Parse Out Pages
// 3. Render Pages Out As Grids?

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

const statBlockStyle = {
  borderWidth: '1px',
  borderStyle: 'dashed',
  margin: '1px',
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
  const { data } = props;
  const { Stats } = props;
  const { parentKey } = props;

  // stat properties
  const { Value } = Stats;
  let { Type } = Stats;
  let { Total } = Stats;
  let { Min } = Stats;
  let { Max } = Stats;
  let { math } = Stats;
  const { Level } = Stats;
  const { PointCalc } = Stats;
  const Points =
    Type !== 'Calc' && PointCalc
      ? StatData.GetCellValue(PointCalc[0], PointCalc[1], data)
      : Stats.Points;

  // stat data
  const { Values } = Stats;
  const { onChange } = props;

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
    // Update Results(Num, Min, Max)
    // buffer.target.dataset = {
    //   key: `${key}~${cell}`,
    // };
    // buffer.target.value = StatData.GetCellValue(value[1][0], value[1][1], data);
    // if (onChange) onChange(buffer);
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
    const keys = rowData.key.split('~');
    const stats = rowData.value;

    value = StatData.HandleStatMinMax(stats, cell[1], value).result;

    // Create synthetic event object
    const E = {
      target: {
        value: [value, ['', {}]],
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
    return !Number.isNaN(val[0]) ? val[0] : 0;
    // return val[0];
  };

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

  function getCalc(row) {
    return row['Calc'];
  }

  function getCellKey(rowData) {
    return 'Values' + '~' + rowData['Value'] + '~' + 'Num';
  }

  const displayForms = [
    <input key="Value" type="text" value={''} style={cellStyle} />,
    <MathInput
      key="Num"
      Key={getCellKey}
      value={data} // comprises of [value,[expression, vars]]
      data={data}
      style={buttonStyle}
      onChange={handleMathStatChange}
    >
      Data
    </MathInput>,
    <MathInput
      key="Min"
      Key={getCellKey}
      value={data}
      data={data}
      style={buttonStyle}
      onChange={handleMathStatChange}
    >
      Data
    </MathInput>,
    <MathInput
      key="Max"
      Key={getCellKey}
      value={data}
      data={data}
      style={buttonStyle}
      onChange={handleMathStatChange}
    >
      Data
    </MathInput>,
    <input key="Unit" type="text" value={''} style={cellStyle} />,
  ];

  return (
    <div style={statBlockStyle}>
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
              key="PointCalc"
              Key="PointCalc"
              value={[Points, PointCalc]}
              data={data}
              style={buttonStyle}
              onChange={handleChange}
            >
              {Points ? Points : 'N/D'}
            </MathInput>
          )}
          {Type === 'Calc' ? null : (
            <div style={{ width: '100%' }}>
              Remainder: {Points ? Points - Total : 'N/D'}
            </div>
          )}
        </div>
      </div>
      <Grid
        value={Values}
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

const Card = (props) => {
  const { data } = props;
  const { parentKey } = props;
  const { Page } = props;
  const { name } = props;
  const { Value } = props;
  const { onChange } = props;
  const keys = Object.keys(Page);

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
    <div>
      <div style={cardStyle}>
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
        {keys.map((key) => {
          i += 1;
          return (
            <StatBlock
              key={`StatBlock_${i}`}
              data={data}
              parentKey={`${parentKey}~Values~${key}`}
              Stats={Page[key]}
              onChange={onChange}
            ></StatBlock>
          );
        })}
      </div>
    </div>
  );
};

const Stack = (props) => {
  const { data } = props;
  const { Pages } = props;
  const { parentKey } = props;

  let i = -1;
  return Object.keys(Pages).map((key) => {
    i += 1;
    const Page = Pages[key];
    return (
      <Card
        key={`Card_${i}`}
        data={data}
        parentKey={`${parentKey}~${key}`}
        name={key}
        Value={Page.Value}
        Page={Page.Values}
        onChange={props.onChange}
      ></Card>
    );
  });
};

// handles grid data
const ProfileCard = (props) => {
  // Parse out props
  // 1. Get Title
  const data = props.value;
  const { Title } = props.value;
  const { Game } = props.value;
  const { Values } = props.value;
  const { onChange } = props;
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
      <div
        style={{
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
        ></Stack>
      </div>
    </div>
  );
};

export default ProfileCard;
