/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import StatData from '../StatData.js';
import ToggleButton from './ToggleButton.js';
import MathInput from './MathInput.js';
// import Controls from './Controls.js';
import { Profile } from './ProfileData';
import './Card.css';

// handles grid data
const ProfileCard = (props) => {
  const [EditMode, setMode] = useState(false);
  const { Update } = props;
  // Parse out props
  const data =
    props.value.contructor !== Profile ? new Profile(props.value) : props.value;
  const { Title } = data;
  const { Game } = data;
  const Cards = data.Values;

  // Pull data object without circular keys
  var cache = [];
  console.log(
    'data:',
    JSON.stringify(data, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    }),
  );
  cache = null;

  // get input width based on value
  const getTextWidth = (text) => {
    return (text.length + 1) * 8;
  };

  function Card(argument) {
    const { cardData } = argument;
    const Page = cardData.Values;
    const Value = cardData.Value;
    const keys = Object.keys(Page);

    let i = -1;

    function Block(Stats) {
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
      function StatTable() {
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
        function setRow(i, key, value, num, min, max, unit) {
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
        }

        i = -1;
        function contents() {
          return Values.map((value) => {
            i += 1;
            if (!EditMode) {
              return setRow(
                i,
                Stats.Value,
                value.Value,
                `${value.Num.result}${value.Unit}`,
                '',
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
                    Update(data);
                  }}
                />,
                <input
                  type="number"
                  style={{
                    width: w[3],
                  }}
                  value={value.Max.result}
                  onChange={(e) => {
                    value.Max.result = e.target.value;
                    Update(data);
                  }}
                />,
                <input
                  type="text"
                  style={{
                    width: w[4],
                  }}
                  value={value.Unit}
                  onChange={(e) => {
                    value.Unit.result = e.target.value;
                    Update(data);
                  }}
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
                    filter: 'brightness(88%)',
                    width: w[1],
                  }}
                  data={data}
                  onChange={(e) => {
                    value.Num = e.target.value;
                    Update(data);
                  }}
                />,
                <MathInput
                  value={value.Min}
                  style={{
                    filter: 'brightness(88%)',
                    width: w[2],
                  }}
                  data={data}
                  onChange={(e) => {
                    value.Min = e.target.value;
                    Update(data);
                  }}
                />,
                <MathInput
                  value={value.Max}
                  style={{
                    filter: 'brightness(88%)',
                    width: w[3],
                  }}
                  data={data}
                  onChange={(e) => {
                    value.Max = e.target.value;
                    Update(data);
                  }}
                />,

                <input
                  type="text"
                  style={{
                    width: w[4],
                  }}
                  value={value.Unit}
                  onChange={(e) => {
                    value.Unit = e.target.value;
                    Update(data);
                  }}
                />,
              );
            }
          });
        }

        return (
          <table>
            <colgroup>
              <col key={0} id="0" />
              <col key={1} />
              <col key={2} />
              <col key={3} />
              <col key={4} />
            </colgroup>
            <thead>
              <tr>
                <td>{EditMode ? 'Value' : null}</td>
                <td>{EditMode ? 'Num' : null}</td>
                {EditMode ? <td>Min</td> : null}
                {EditMode ? <td>Max</td> : null}
                <td>{EditMode ? 'Unit' : null}</td>
              </tr>
            </thead>

            <tbody>{contents()}</tbody>

            {EditMode ? (
              <tfoot>
                <tr>
                  <td>Totals:</td>
                  <td>{Total}</td>
                  <td>{Min}</td>
                  <td>{Max}</td>
                  <td></td>
                </tr>
              </tfoot>
            ) : null}
          </table>
        );
      }

      return (
        <div key={Type}>
          <h2>
            <div style={{ display: 'flex' }}>
              {EditMode ? (
                <ToggleButton
                  style={{ width: '56px', padding: '2px' }}
                  toggledStyle={{
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
              ) : null}

              {EditMode ? (
                <input
                  type="text"
                  value={Value}
                  onChange={(e) => {
                    Stats.Value = e.target.value;
                    Update(data);
                  }}
                />
              ) : (
                Value
              )}
            </div>
            {EditMode ? (
              <div style={{ display: 'flex' }}>
                {Type === 'Calc' ? null : 'Level: '}
                {Type === 'Calc' ? null : (
                  <input
                    type="number"
                    value={Level ? Level : 0}
                    onChange={(e) => {}}
                  />
                )}
                {Type === 'Calc' ? null : 'Points: '}
                {Type === 'Calc' ? null : (
                  <MathInput
                    Key="Points"
                    value={Points}
                    data={data}
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
            ) : null}
          </h2>
          {StatTable()}
        </div>
      );
    }

    function Blocks() {
      return keys.map((key) => {
        i += 1;
        return [<hr key={i}></hr>, Block(Page[key])];
      });
    }

    return (
      <h3 style={{ display: 'inline' }}>
        <div style={{ display: 'flex' }}>
          <h1 className="h1" style={{ width: '100%' }}>
            {EditMode ? (
              <input
                type="text"
                value={Value}
                onChange={(e) => {
                  cardData.Value = e.target.value;
                  Update(data);
                }}
              />
            ) : (
              Value
            )}
          </h1>
        </div>
        {Blocks()}
      </h3>
    );
  }

  // render Pages
  function Book() {
    const result = Object.keys(Cards).map((i) => {
      const card = Cards[i];
      return Card({ cardData: card });
    });

    return result;
  }

  return (
    <div>
      <button type="push" onClick={() => setMode(!EditMode)}>
        {EditMode ? 'Edit Mode' : 'View Mode'}
      </button>
      Game:{' '}
      <input
        type="text"
        value={Game}
        onChange={(e) => {
          data.Game = e.target.value;
          Update(data);
        }}
      />
      Title:{' '}
      <input
        type="text"
        value={Title}
        onChange={(e) => {
          data.Title = e.target.value;
          Update(data);
        }}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
      >
        {Book()}
      </div>
    </div>
  );
};

export default ProfileCard;
