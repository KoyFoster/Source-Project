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
import Diagram from '../Diagram.js';
import { Paper } from '@material-ui/core';

// styling contrainers
const ProfileContainer = (props) => {
  return (
    <div className="Profile" onClick={props.onClick}>
      {props.children}
    </div>
  );
};
const CardContainer = (props) => {
  return (
    <div className="Card" onClick={props.onClick}>
      {props.children}
    </div>
  );
};
const CardHeader = (props) => {
  return (
    <div className="CardHeader" onClick={props.onClick}>
      {props.children}
    </div>
  );
};
// const LevelHeader = (props) => {
//   return (
//     <div className="Level" onClick={props.onClick}>
//       {props.children}
//     </div>
//   );
// };
const StatBlock = (props) => {
  return (
    <div
      className="StatBlock"
      dir={props.value}
      target={props.value}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
const StatsContainer = (props) => {
  return (
    <div className="Stats" onClick={props.onClick}>
      {props.children}
    </div>
  );
};

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
  // const { Level } = Stats;
  // const { Points } = Stats;

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
      return [
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
        </tr>,
        <tr key={`trp_${key}(${i})`}>
          <td key={`td_${key}(${i}) 6`} colSpan="5"></td>
        </tr>,
      ];
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
                  value.Num.result = StatData.HandleStatMinMax(
                    value,
                    'Num',
                    parseInt(e.target.value, 10),
                  ).result;
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
                value.Num.result = StatData.HandleStatMinMax(
                  value,
                  'Num',
                  parseInt(e.target.value, 10),
                ).result;
                Update(data);
              }}
            />,
            <input
              type="number"
              value={value.Min.result}
              onChange={(e) => {
                value.Min.result = StatData.HandleStatMinMax(
                  value,
                  'Min',
                  parseInt(e.target.value, 10),
                ).result;
                Update(data);
              }}
            />,
            <input
              type="number"
              value={value.Max.result}
              onChange={(e) => {
                value.Max.result = StatData.HandleStatMinMax(
                  value,
                  'Max',
                  parseInt(e.target.value, 10),
                ).result;
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
            value.Value,
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
                value.Num.result = e.target.value.result;
                value.Num.expression = e.target.value.expression;
                value.Num.vars = e.target.value.vars;

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
                value.Min.result = e.target.value.result;
                value.Min.expression = e.target.value.expression;
                value.Min.vars = e.target.value.vars;
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
                value.Max.result = e.target.value.result;
                value.Max.expression = e.target.value.expression;
                value.Max.vars = e.target.value.vars;
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
            value.Value,
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
            <th>{Mode === 'Edit' ? 'Value' : null}</th>
            <th>{Mode === 'Edit' ? 'Num' : null}</th>
            {Mode === 'Edit' ? <th>Min</th> : null}
            {Mode === 'Edit' ? <th>Max</th> : null}
            <th>{Mode === 'Edit' ? 'Unit' : null}</th>
          </tr>
        </thead>

        <tbody>{contents()}</tbody>

        {/* {Mode === 'Edit' ? (
          <tfoot>
            <tr>
              <td>Totals:</td>
              <td>{Total}</td>
              <td>{Min}</td>
              <td>{Max}</td>
              <td></td>
            </tr>
          </tfoot>
        ) : null} */}
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
      {/* <LevelHeader>
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
              {Points ? (Points.result ? Points.result - Total : 'N/D') : 'N/D'}
            </div>
          )}
        </div>
      </LevelHeader> */}
      <StatBlock value={Stats.Value}>
        <div style={{ display: 'flex' }}>
          {/* Stat Type */}
          {Mode === 'Edit' ? (
            <ToggleButton
              toggledStyle={{
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

          {/* Stat Label */}
          {Stats.bShow || Mode === 'Edit' ? (
            Mode === 'Edit' || (Mode === 'Calculator' && Stats.bEdit) ? (
              <input
                type="text"
                value={Value}
                onChange={(e) => {
                  Stats.Value = e.target.value;
                  Update(data);
                }}
              />
            ) : (
              <label>{Value}</label>
            )
          ) : null}
          {/* Edittability */}
          {Mode === 'Edit'
            ? [
                <ToggleButton
                  key="Edit"
                  toggledStyle={{
                    filter: 'brightness(88%)',
                  }}
                  checked={Stats.bEdit}
                  onClick={(e) => {
                    Stats.bEdit = e.target.value === 'Do Edit' ? true : false;
                    Update(data);
                  }}
                >
                  {['Do Edit', 'No Edit']}
                </ToggleButton>,
                <ToggleButton
                  key="Show"
                  toggledStyle={{
                    filter: 'brightness(88%)',
                  }}
                  checked={Stats.bShow}
                  onClick={(e) => {
                    Stats.bShow = e.target.value === 'Show' ? true : false;
                    Update(data);
                  }}
                >
                  {['Show', 'Hide']}
                </ToggleButton>,
              ]
            : null}
        </div>
        <StatsContainer>
          {Mode === 'Edit' ? (
            <Controls
              selection={statSelection}
              Tag="Stat"
              Add={(selection, i) => {
                setStatSelection(Stats.addStat(selection, i));
                Update(data);
              }}
              Move={(selection, i) => {
                setStatSelection(Stats.moveStat(selection, i));
                Update(data);
              }}
            ></Controls>
          ) : null}
          {StatTable()}
        </StatsContainer>
      </StatBlock>
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
          key={`B${i}`}
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
    <CardContainer
      key={Page.Value}
      style={{ display: 'inline' }}
      onClick={() => {
        setCardSelection(Value);
      }}
    >
      <div style={{ display: 'flex' }}>
        <CardHeader style={{ width: '100%' }}>
          {Mode === 'Edit' ||
          (Mode === 'Calculator' && cardData.bEdit && cardData.bShow) ? (
            <input
              type="text"
              value={Value}
              onChange={(e) => {
                cardData.Value = e.target.value;
                Update(data);
              }}
            />
          ) : cardData.bShow ? (
            <div style={{ display: 'flex' }}>
              <label>{Value}</label>
            </div>
          ) : null}
          {Mode === 'Edit'
            ? [
                <ToggleButton
                  key="Edit"
                  toggledStyle={{
                    filter: 'brightness(88%)',
                  }}
                  checked={cardData.bEdit}
                  onClick={(e) => {
                    cardData.bEdit =
                      e.target.value === 'Do Edit' ? true : false;
                    Update(data);
                  }}
                >
                  {['Do Edit', 'No Edit']}
                </ToggleButton>,
                <ToggleButton
                  key="Show"
                  toggledStyle={{
                    filter: 'brightness(88%)',
                  }}
                  checked={cardData.bShow}
                  onClick={(e) => {
                    cardData.bShow = e.target.value === 'Show' ? true : false;
                    Update(data);
                  }}
                >
                  {['Show', 'Hide']}
                </ToggleButton>,
              ]
            : null}
        </CardHeader>
      </div>

      {Mode === 'Edit' ? (
        <Controls
          selection={blockSelection}
          Tag="Stats"
          Add={(selection, i) => {
            setBlockSelection(cardData.addBlock(selection, i));
            Update(data);
          }}
          Move={(selection, i) => {
            setBlockSelection(cardData.moveBlock(selection, i));
            Update(data);
          }}
        ></Controls>
      ) : null}
      {Blocks()}
    </CardContainer>
  );
};

const Graph = (props) => {
  return <Diagram Values={props.data.getValues()}></Diagram>;
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

  // cache = null;

  // get input width based on value
  // const getTextWidth = (text) => {
  //   return (text.length + 1) * 8;
  // };

  // render Pages
  function Book() {
    const result = Object.keys(Cards).map((i) => {
      const card = Cards[i];
      return card.Type === 'Card' ? (
        <Card
          key={i}
          cardData={card}
          Update={Update}
          Mode={Mode}
          data={data}
          setCardSelection={setCardSelection}
        ></Card>
      ) : (
        <Graph key={i} data={card}></Graph>
      );
    });

    return result;
  }

  return (
    <ProfileContainer>
      <div>
        <div style={{ whiteSpace: 'pre' }}>
          <div>
            Game:{' '}
            {Mode === 'Edit' ? (
              <input
                type="text"
                value={Game}
                onChange={(e) => {
                  data.Game = e.target.value;
                  Update(data);
                }}
              />
            ) : (
              Game
            )}
          </div>
          <div>
            Title:{' '}
            {Mode === 'Edit' ? (
              <input
                type="text"
                value={Title}
                onChange={(e) => {
                  data.Title = e.target.value;
                  Update(data);
                }}
              />
            ) : (
              Title
            )}
          </div>
          {Mode === 'Edit' ? (
            <Paper>
              <Controls
                Tag="Card"
                selection={cardSelection}
                Add={(selection, i) => {
                  setCardSelection(data.addCard(selection, i));
                  Update(data);
                }}
                Move={(selection, i) => {
                  setCardSelection(data.moveCard(selection, i));
                  Update(data);
                }}
              ></Controls>
            </Paper>
          ) : null}
        </div>
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
    </ProfileContainer>
  );
};

export default ProfileCard;
