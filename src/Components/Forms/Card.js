/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import StatData from '../StatData.js';
import ToggleButton from './ToggleButton.js';
import MathInput from './MathInput.js';
// import Controls from './Controls.js';
import { Profile } from './ProfileData';
import './Card.css';

// handles grid data
const ProfileCard = (props) => {
  const { EditMode } = props;
  const { Update } = props;
  // Parse out props
  const data = new Profile(props.value);
  const { Title } = data;
  const { Game } = data;

  // styles
  const { cardStyle } = props;
  const { blockStyle } = props;
  const { profileStyle } = props;
  const backgroundColor = cardStyle ? cardStyle.backgroundColor : {};
  const cellStyle = {
    borderRadius: '8px',
    borderLeft: '2px solid black',
    borderTop: '2px solid black',
    borderBottom: '2px solid grey',
    borderRight: '2px solid grey',
    boxSizing: 'border-box', // inner border
  };
  const formStyle = {
    display: 'inline-block',
    borderRadius: '8px',
    borderLeft: '2px solid black',
    borderTop: '2px solid black',
    borderBottom: '2px solid grey',
    borderRight: '2px solid grey',
    boxSizing: 'border-box', // inner border
  };
  const buttonStyle = {
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

  // get input width based on value
  const getTextWidth = (text) => {
    return (text.length + 1) * 8;
  };

  // Page Data
  const Cards = data.Values;

  const Card = (props) => {
    const { cardData } = props;
    const Page = cardData.Values;
    const Value = cardData.Value;
    const keys = Object.keys(Page);

    let i = -1;

    const Block = (props) => {
      const { Stats } = props;

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

      // Update Totals
      {
        const Totals = StatData.TallyTotals(Values);
        Total = Totals.Total;
        Min = Totals.Min;
        Max = Totals.Max;

        Stats.Total = Total;
        Stats.Min = Min;
        Stats.Max = Max;
      }

      // stat table
      const StatTable = () => {
        // calculate largest column widths
        let i = 0;
        const w = new Array(5).fill(48);
        {
          let buffer = getTextWidth(Total.toString());
          if (buffer > 48) w[1] = buffer;

          buffer = getTextWidth(Max.toString());
          if (buffer > 48) w[2] = buffer;

          buffer = getTextWidth(Max.toString());
          if (buffer > 48) w[3] = buffer;
        }
        const ks = ['Value', 'Num', 'Min', 'Max', 'Unit'];
        Values.forEach((value) => {
          ks.forEach((k) => {
            let buffer = 0;

            switch (k) {
              case 'Value':
              case 'Unit':
                buffer = getTextWidth(value[k]);
                break;

              case 'Num':
              case 'Min':
              case 'Max':
                buffer = getTextWidth(value[k].result.toString());
                break;
              default:
                break;
            }
            if (buffer > w[i]) w[i] = buffer;

            i += 1;
          });
          i = 0;
        });

        // set row
        const setRow = (i, key, value, num, min, max, unit) => {
          // console.log(`tr_${key}(${i})`);
          return (
            <tr key={`tr_${key}(${i})`}>
              <td key={`td_${key}(${i}) 0`}>{value}</td>
              <td key={`td_${key}(${i}) 1`}>{num}</td>
              <td key={`td_${key}(${i}) 2`}>{min}</td>
              <td key={`td_${key}(${i}) 3`}>{max}</td>
              <td key={`td_${key}(${i}) 4`}>{unit}</td>
            </tr>
          );
        };

        i = -1;
        const contents = () => {
          return Values.map((value) => {
            i += 1;
            if (EditMode) {
              return setRow(
                i,
                Stats.Value,
                value.Value,
                value.Num.result,
                value.Min.result,
                value.Max.result,
                value.Unit,
              );
            } else if (Type === 'Static') {
              return setRow(
                i,
                Stats.Value,
                <input
                  type="text"
                  style={{
                    width: w[0],
                  }}
                  value={value.Value}
                  onChange={(e) => {
                    value.Value = e.target.value;
                    Update(data);
                  }}
                />,
                <input
                  type="number"
                  style={{
                    width: w[1],
                  }}
                  value={value.Num.result}
                  onChange={(e) => {
                    value.Num.result = parseInt(e.target.value, 10);
                    Update(data);
                  }}
                />,
                <input
                  type="number"
                  style={{
                    width: w[2],
                  }}
                  value={value.Min.result}
                  onChange={(e) => {
                    value.Min.result = e.target.value;
                  }}
                />,
                <input
                  type="number"
                  style={{
                    width: w[3],
                  }}
                  value={value.Max.result}
                  onChange={(e) => {}}
                />,
                <input
                  type="text"
                  style={{
                    width: w[4],
                  }}
                  value={value.Unit}
                  onChange={(e) => {}}
                />,
              );
            } else {
              return setRow(
                i,
                Stats.Value,
                <input
                  type="text"
                  style={{
                    width: w[0],
                  }}
                  value={value.Value}
                  onChange={(e) => {
                    value.Value = e.target.value;
                    Update(data);
                  }}
                />,
                <MathInput
                  value={value.Num}
                  style={{
                    width: w[1],
                  }}
                  data={data}
                />,
                <MathInput
                  value={value.Min}
                  style={{
                    width: w[2],
                  }}
                  data={data}
                />,
                <MathInput
                  value={value.Max}
                  style={{
                    width: w[3],
                  }}
                  data={data}
                />,

                <input
                  type="text"
                  style={{
                    width: w[4],
                  }}
                  value={value.Unit}
                  onChange={(e) => {}}
                />,
              );
            }
          });
        };

        return (
          <table>
            <thead>
              <tr>
                <td>Value</td>
                <td>Num</td>
                <td>Min</td>
                <td>Max</td>
                <td>Unit</td>
              </tr>
            </thead>

            <tbody>{contents()}</tbody>

            <tfoot>
              <tr>
                <td>Totals:</td>
                <td>{Total}</td>
                <td>{Min}</td>
                <td>{Max}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        );
      };

      return (
        <div style={blockStyle} onClick={() => {}}>
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
                  Stats.Type = e.target.checked ? 'Calc' : 'Static';
                  Update(data);
                }}
              >
                {['Calc', 'Static']}
              </ToggleButton>
              <input
                type="text"
                value={Value}
                style={cellStyle}
                onChange={(e) => {}}
              />
            </div>
            <div style={{ display: 'flex' }}>
              {Type === 'Calc' ? null : 'Level: '}
              {Type === 'Calc' ? null : (
                <input
                  type="number"
                  value={Level ? Level : 0}
                  style={formStyle}
                  onChange={(e) => {}}
                />
              )}
              {Type === 'Calc' ? null : 'Points: '}
              {true ? null : (
                <MathInput
                  Key="Points"
                  value={Points}
                  data={data}
                  style={buttonStyle}
                  onChange={(e) => {}}
                >
                  {Points ? Points : 'N/D'}
                </MathInput>
              )}
              {Type === 'Calc' ? null : (
                <div style={{ width: '100%' }}>
                  Remainder:{' '}
                  {Points
                    ? Points.result
                      ? Points.result - Total
                      : 'N/D'
                    : 'N/D'}
                </div>
              )}
            </div>
          </div>
          <StatTable key={Stats.Value} />
        </div>
      );
    };

    // NOTE: This is preventing fields from updating properly
    const Blocks = () => {
      return keys.map((key) => {
        i += 1;
        return <Block key={i} data={data} Stats={Page[key]} />;
      });
    };

    return (
      <div style={cardStyle} onMouseDown={(e) => {}} onClick={() => {}}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '100%' }}>
            <input
              type="text"
              value={Value}
              style={cellStyle}
              onChange={(e) => {
                cardData.Value = e.target.value;
                Update(data);
              }}
            />
          </div>
        </div>
        {Blocks()}
      </div>
    );
  };

  // render Pages
  const Book = (props) => {
    const result = Object.keys(Cards).map((i) => {
      const card = Cards[i];
      return <Card key={i} name={i} cardData={card}></Card>;
    });

    return result;
  };

  return (
    <div>
      Game:{' '}
      <input
        type="text"
        value={Game}
        style={cellStyle}
        onChange={(e) => {
          data.Game = e.target.value;
          Update(data);
        }}
      />
      Title:{' '}
      <input
        type="text"
        value={Title}
        style={cellStyle}
        onChange={(e) => {
          data.Title = e.target.value;
          Update(data);
        }}
      />
      <div
        style={{
          ...profileStyle,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
      >
        <Book key="Book" />
      </div>
    </div>
  );
};

export default ProfileCard;
