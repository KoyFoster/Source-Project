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
import Controls from './Controls.js';
import { Profile } from './ProfileData';
import './Card.css';

const Block = (props) => {
  const { Update } = props;
  const { Mode } = props;
  const { data } = props;
  const { setBlockSelection } = props;
  const [statSelection, setStatSelection] = useState(undefined);
  // stat properties
  const { Stats } = props;
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
    // set row
    function setRow(i, key, value, num, min, max, unit, row) {
      // console.log(`tr_${key}(${i})`);
      return (
        <tr
          key={`tr_${key}(${i})`}
          onClick={() => {
            setStatSelection(row);
          }}
        >
          <td key={`td_${key}(${i}) 0`}>{value}</td>
          <td key={`td_${key}(${i}) 1`}>{num}</td>
          <td key={`td_${key}(${i}) 2`}>{min}</td>
          <td key={`td_${key}(${i}) 3`}>{max}</td>
          <td key={`td_${key}(${i}) 4`}>{unit}</td>
        </tr>
      );
    }

    let i = -1;
    function contents() {
      return Values.map((value) => {
        i += 1;
        if (Mode === 'View') {
          return setRow(
            i,
            Stats.Value,
            value.Value,
            `${value.Num.result}${value.Unit}`,
            '',
          );
        } else if (Mode === 'Calculator') {
          if (Type === 'Static') {
            return setRow(
              i,
              Stats.Value,
              value.Value,
              <input
                type="number"
                value={value.Num.result}
                onChange={(e) => {
                  value.Num.result = parseInt(e.target.value, 10);
                  Update(data);
                }}
              />,
              value.Unit,
            );
          } else {
            return setRow(
              i,
              Stats.Value,
              value.Value,
              `${value.Num.result}${value.Unit}`,
              '',
            );
          }
        } else if (Type === 'Static') {
          return setRow(
            i,
            Stats.Value,
            <input
              type="text"
              value={value.Value}
              onChange={(e) => {
                value.Value = e.target.value;
                Update(data);
              }}
            />,
            <input
              type="number"
              value={value.Num.result}
              onChange={(e) => {
                value.Num.result = parseInt(e.target.value, 10);
                Update(data);
              }}
            />,
            <input
              type="number"
              value={value.Min.result}
              onChange={(e) => {
                value.Min.result = e.target.value;
                Update(data);
              }}
            />,
            <input
              type="number"
              value={value.Max.result}
              onChange={(e) => {
                value.Max.result = e.target.value;
                Update(data);
              }}
            />,
            <input
              type="text"
              value={value.Unit}
              onChange={(e) => {
                value.Unit = e.target.value;
                Update(data);
              }}
            />,
          );
        } else {
          return setRow(
            i,
            Stats.Value,
            <input
              key="1"
              type="text"
              value={value.Value}
              onChange={(e) => {
                value.Value = e.target.value;
                Update(data);
              }}
            />,
            <MathInput
              key="2"
              value={value.Num}
              data={data}
              onChange={(e) => {
                value.Num = e.target.value;
                Update(data);
              }}
            />,
            <MathInput
              key="3"
              value={value.Min}
              style={{
                filter: 'brightness(88%)',
              }}
              data={data}
              onChange={(e) => {
                value.Min = e.target.value;
                Update(data);
              }}
            />,
            <MathInput
              key="4"
              value={value.Max}
              style={{
                filter: 'brightness(88%)',
              }}
              data={data}
              onChange={(e) => {
                value.Max = e.target.value;
                Update(data);
              }}
            />,
            <input
              key="5"
              type="text"
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
          <col key={0} />
          <col key={1} />
          <col key={2} />
          <col key={3} />
          <col key={4} />
        </colgroup>
        <thead>
          <tr>
            <td>{Mode === 'Edit' ? 'Value' : null}</td>
            <td>{Mode === 'Edit' ? 'Num' : null}</td>
            {Mode === 'Edit' ? <td>Min</td> : null}
            {Mode === 'Edit' ? <td>Max</td> : null}
            <td>{Mode === 'Edit' ? 'Unit' : null}</td>
          </tr>
        </thead>

        <tbody>{contents()}</tbody>

        {Mode === 'Edit' ? (
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
    <div
      key={Type}
      onClick={() => {
        setBlockSelection(Value);
      }}
    >
      <h5>
        <div style={{ display: 'flex' }}>
          {Mode === 'Edit' ? (
            <ToggleButton
              style={{ width: '56px', padding: '2px' }}
              toggledStyle={{
                // width: '56px',
                padding: '2px',
                filter: 'brightness(88%)',
              }}
              checked={Type === 'Calc'}
              onClick={(e) => {
                Stats.Type = e.target.value;
                Update(data);
              }}
            >
              {['Calc', 'Static']}
            </ToggleButton>
          ) : null}

          {Mode === 'Edit' ? (
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
        {Mode === 'Edit' ? (
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
      </h5>
      {Mode === 'Edit' ? (
        <h6>
          <Controls
            selection={statSelection}
            Tag="Stat"
            Add={(selection, i) => {
              setStatSelection(Stats.addStat(selection, i));
              Update(data);
            }}
          ></Controls>
        </h6>
      ) : null}
      {StatTable()}
    </div>
  );
};

const Card = (props) => {
  const [blockSelection, setBlockSelection] = useState(undefined);
  const { cardData } = props;
  const { Update } = props;
  const { Mode } = props;
  const { data } = props;
  const { setCardSelection } = props;
  const Page = cardData.Values;
  const Value = cardData.Value;
  const keys = Object.keys(Page);

  let i = -1;

  function Blocks() {
    return keys.map((key) => {
      i += 1;
      return [
        <hr key={i}></hr>,
        <Block
          Stats={Page[key]}
          Update={Update}
          Mode={Mode}
          data={data}
          setBlockSelection={setBlockSelection}
        ></Block>,
      ];
    });
  }

  return (
    <h3
      key={Page.Value}
      style={{ display: 'inline' }}
      onClick={() => {
        setCardSelection(Value);
      }}
    >
      <div style={{ display: 'flex' }}>
        <h4 style={{ width: '100%' }}>
          {Mode === 'Edit' ? (
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
        </h4>
      </div>

      {Mode === 'Edit' ? (
        <h6>
          <Controls
            selection={blockSelection}
            Tag="Stats"
            Add={(selection, i) => {
              setBlockSelection(cardData.addBlock(selection, i));
              Update(data);
            }}
          ></Controls>
        </h6>
      ) : null}
      {Blocks()}
    </h3>
  );
};

// handles grid data
const ProfileCard = (props) => {
  const [cardSelection, setCardSelection] = useState(undefined);
  const { Mode } = props;
  const { Update } = props;
  // Parse out props
  const data =
    props.value.contructor !== Profile ? new Profile(props.value) : props.value;
  const { Title } = data;
  const { Game } = data;
  const Cards = data.Values;

  // Pull data object without circular keys
  // var cache = [];
  // console.log(
  //   'data:',
  //   JSON.stringify(data, function (key, value) {
  //     if (typeof value === 'object' && value !== null) {
  //       if (cache.indexOf(value) !== -1) {
  //         // Circular reference found, discard key
  //         return;
  //       }
  //       // Store value in our collection
  //       cache.push(value);
  //     }
  //     return value;
  //   }),
  // );
  // cache = null;

  // get input width based on value
  const getTextWidth = (text) => {
    return (text.length + 1) * 8;
  };

  // render Pages
  function Book() {
    const result = Object.keys(Cards).map((i) => {
      const card = Cards[i];
      return (
        <Card
          key={i}
          cardData={card}
          Update={Update}
          Mode={Mode}
          data={data}
          setCardSelection={setCardSelection}
        ></Card>
      );
    });

    return result;
  }

  return (
    <h2>
      <div>
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
        {Mode === 'Edit' ? (
          <h6>
            <Controls
              Tag="Card"
              selection={cardSelection}
              Add={(selection, i) => {
                setCardSelection(data.addCard(selection, i));
                Update(data);
              }}
            ></Controls>
          </h6>
        ) : null}
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
    </h2>
  );
};

export default ProfileCard;
