/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Grid from './Grid';

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
  // console.log('props:', props);
  const { Stats } = props;
  const { parentKey } = props;

  // stat properties
  const { Value } = Stats;
  const { Num } = Stats;
  const { Min } = Stats;
  const { Max } = Stats;
  const { PointLimit } = Stats;
  const { PointDiff } = Stats;

  // stat data
  const { Values } = Stats;
  const { onChange } = props;

  // handleChange
  const handleChange = (e, key) => {
    const buffer = {
      target: {
        value: e.target.value,
        checked: e.target.checked,
        dataset: {
          key: `${parentKey}/${key}`,
        },
      },
    };

    if (onChange) onChange(buffer);
  };

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
        Limit:{' '}
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
          onChange={(e) => handleChange(e, 'PointDiff')}
        />
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
          <input key="Num" type="number" value={''} style={baseInputStyle} />,
          <input key="Min" type="number" value={''} style={baseInputStyle} />,
          <input key="Max" type="number" value={''} style={baseInputStyle} />,
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
  // console.log('parentKey:', parentKey);
  // console.log('--- --- --- --- --- --- --- --- --- ---');
  const { Page } = props;
  const { name } = props;
  const { onChange } = props;
  const keys = Object.keys(Page);

  // console.log('Card:', { parentKey, Page, name });
  return (
    <div style={cardStyle}>
      <div style={cellStyle}>{name}</div>
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

  return Object.keys(Pages).map((key) => {
    const Page = Pages[key];
    return (
      <Card
        key={key}
        parentKey={`${key}/Stats`}
        name={key}
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
  const { onChange } = props;
  // 2. Get Pages. Pages are anything that isn't the title
  const Pages = {};
  Object.keys(props.value).forEach((key) => {
    // console.log('key:', key);
    if (key !== 'Title' && key !== 'Game') Pages[key] = props.value[key];
  });

  return (
    <div>
      <div style={cellStyle}>Game: {Game}</div>
      <div style={cellStyle}>Title: {Title}</div>
      <Stack Pages={Pages} onChange={onChange}></Stack>
    </div>
  );
};

export default ProfileCard;
