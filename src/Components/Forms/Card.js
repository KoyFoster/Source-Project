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

// style={{
//   maxwidth: '512px',
//   overflow: 'scroll',
//   background: '#faf8e8',
//   color: '#6e5735',
//   fontFamily: 'NotoSansKR',
//   border: '4px solid #6e5735',
//   padding: '16px',
//   margin: '4px',
// }}
// cellStyle={cellStyle}
// // childrenAsRow
// // columnWidths={['128px', '64px', '64px', '64px', '32px', '64px']}
// headerRows
// hRow={[]}

// Steps To Rendering A Card
// 1. Take Title
// 2. Parse Out Pages
// 3. Render Pages Out As Grids?

const baseInputStyle = { width: '100%', border: 'none', padding: '0px' };

const cardStyle = {
  maxwidth: '512px',
  // overflow: 'scroll',
  background: '#faf8e8',
  color: '#6e5735',
  fontFamily: 'NotoSansKR',
  border: '4px solid #6e5735',
  padding: '16px',
  margin: '4px',
};

const cellStyle = {
  borderRadius: '8px',
  borderLeft: '2px solid black',
  borderTop: '2px solid black',
  borderBottom: '2px solid grey',
  borderRight: '2px solid grey',
};

const StatBlock = (props) => {
  const [bUpdateTotals, setUpdateTotals] = useState(true);
  const { Stats } = props;
  const { parentKey } = props;

  // stat properties
  const { Value } = Stats;
  let { Num } = Stats;
  let { Min } = Stats;
  let { Max } = Stats;
  const { Level } = Stats;
  const { Points } = Stats;

  // stat data
  const { Values } = Stats;
  const { onChange } = props;

  // handleChange
  const handleChange = (e, key, type) => {
    const buffer = {
      target: {
        value: e.target.value,
        checked: type === 'checkbox' ? e.target.checked : undefined,
        dataset: {
          key: `${parentKey}/${key}`,
        },
      },
    };

    if (onChange) onChange(buffer);
  };

  const handleMinMaxChange = (e) => {
    console.log('handleStatChange:', e);

    const value =
      e.target.value === '' ? 0 : Number.parseFloat(e.target.value, 10);
    const keys = e.target.dataset.key.split('/');
    console.log('handelStatChange:', keys);

    e.target.value = StatData.HandleStatMinMax(
      Values[keys[0]],
      keys[1],
      value,
    ).result;

    // check for change and return early if no change in value
    if (value === Values[keys[0]][keys[1]]) return;

    setUpdateTotals(true);
    if (onChange) onChange(e);
  };

  // Update Totals
  if (bUpdateTotals) {
    const Totals = StatData.TallyTotals(Values);
    Num = Totals.Num;
    Min = Totals.Min;
    Max = Totals.Max;

    if (onChange) {
      const e = {
        target: { value: Num, dataset: { key: `${parentKey}/Num` } },
      };
      onChange(e, true);
      e.target.value = Min;
      e.target.dataset.key = `${parentKey}/Min`;
      onChange(e, true);
      e.target.value = Max;
      e.target.dataset.key = `${parentKey}/Max`;
      onChange(e, true);
    }

    setUpdateTotals(false);
  }
  // Update Totals

  return (
    <div>
      <div style={{ display: 'flex' }}>
        Section:{' '}
        <input
          type="text"
          value={Value}
          style={cellStyle}
          onChange={(e) => handleChange(e, 'Value')}
        />
        {/* Limit:{' '}
        <input
          type="number"
          value={PointLimit}
          style={cellStyle}
          onChange={(e) => handleChange(e, 'PointLimit')}
        />
        Offset:
        <input
          type="checkbox"
          checked={PointDiff}
          style={cellStyle}
          onChange={(e) => handleChange(e, 'PointDiff', 'checkbox')}
        /> */}
        Level:{' '}
        <input
          type="number"
          value={Level}
          style={cellStyle}
          onChange={(e) => handleChange(e, 'Level')}
        />
        <div>
          {/* <div>
            Points:{' '}
            <input
              type="number"
              value={Points}
              style={cellStyle}
              onChange={(e) => handleChange(e, 'Points')}
            />
          </div> */}
          <div>Points: {Points}</div>
          <div>Remainder: {Points - Num}</div>
        </div>
      </div>
      <Grid
        parentKey={`${parentKey}/Values`}
        rowKeys={Object.keys(Values)}
        value={Values}
        header
        onChange={onChange}
        cellStyle={cellStyle}
        hRow={[
          <input key="Value" type="text" value={''} style={baseInputStyle} />,
          <input
            key="Num"
            type="number"
            value={0}
            style={baseInputStyle}
            onChange={handleMinMaxChange}
          />,
          <input
            key="Min"
            type="number"
            value={0}
            style={baseInputStyle}
            onChange={handleMinMaxChange}
          />,
          <input
            key="Max"
            type="number"
            value={0}
            style={baseInputStyle}
            onChange={handleMinMaxChange}
          />,
          <input key="Unit" type="text" value={''} style={baseInputStyle} />,
          <input key="Math" type="text" value={''} style={baseInputStyle} />,
          <input key="Vars" type="text" value={''} style={baseInputStyle} />,
        ]}
        hFooter={[
          <div key="0">Totals: </div>,
          <div key="1">{Num}</div>,
          <div key="2">{Min}</div>,
          <div key="3">{Max}</div>,
          <div key="4"></div>,
          <div key="5"></div>,
          <div key="6"></div>,
        ]}
      ></Grid>
    </div>
  );
};

const Card = (props) => {
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
          key: `${key}/Value`,
        },
      },
    };

    if (onChange) onChange(buffer);
  };

  return (
    <div style={cardStyle}>
      Card:{' '}
      <input
        type="text"
        value={Value}
        style={cellStyle}
        onChange={(e) => handleChange(e, name)}
      />
      {keys.map((key) => {
        return (
          <StatBlock
            key={`${parentKey}/${key}`}
            parentKey={`${parentKey}/${key}`}
            Stats={Page[key]}
            onChange={onChange}
          ></StatBlock>
        );
      })}
    </div>
  );
};

const Stack = (props) => {
  const { Pages } = props;
  const { parentKey } = props;

  return Object.keys(Pages).map((key) => {
    const Page = Pages[key];
    // console.log('Page:', Page);
    return (
      <Card
        key={key}
        parentKey={`${parentKey}/${key}/Stats`}
        name={key}
        Value={Page.Value}
        Page={Page.Stats}
        onChange={props.onChange}
      ></Card>
    );
  });
};

// handles grid data
const ProfileCard = (props) => {
  // Parse out props
  // 1. Get Title
  const { Title } = props.value;
  const { Game } = props.value;
  const { Values } = props.value;
  const { onChange } = props;
  // 2. Get Pages. Pages are anything that isn't the title
  const Pages = {};
  Object.keys(Values).forEach((key) => {
    Pages[key] = Values[key];
  });

  console.log('Pages:');

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
      <Stack parentKey={'Values'} Pages={Pages} onChange={onChange}></Stack>
    </div>
  );
};

export default ProfileCard;
