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
import TextInputValidator from './TextInputValidator.js';
import { Profile } from './ProfileData';
import './Card.css';
import Diagram from '../Diagram.js';
import { Paper } from '@material-ui/core';

// Current Objectives
// 1. Add key validation
// 2. Add key updating
//   a. Check all properties containing variables with keys that are identical and update them

const replaceVar = (newKey, oldKey, varObj) => {
  console.warn(`replaceVar:`, { oldKey, newKey, varObj });
  if (varObj.vars) {
    const obj = JSON.parse(varObj.vars);
    Object.keys(obj).forEach((key2) => {
      // Cross compare against oldKey
      // Size check
      const pos = oldKey.length - 1;
      let bUpdate = false;
      if (oldKey.length > obj[key2].length) {
      } else {
        let i = 0;
        let bMatch = true;

        obj[key2].forEach((k) => {
          if (obj[key2][i] !== oldKey[i]) {
            bMatch = false;
          }
          if (bMatch && i === pos) {
            console.warn(`${obj[key2][i]} =/= ${newKey[i]}`);
            obj[key2][i] = newKey[i];
            bUpdate = true;
          }

          i += 1;
        });
      }
      // update vars
      if (bUpdate) {
        varObj.vars = JSON.stringify(obj);
        console.warn(`Match Found:`, varObj);
      }
    });
  }
  // An array of objects or arrays
  else if (Array.isArray(varObj)) {
    // Is Raw Array
    const obj = varObj;
    Object.keys(obj).forEach((key2) => {
      // Cross compare against oldKey
      // Size check
      const pos = oldKey.length - 1;
      if (oldKey.length > obj[key2].length) {
      } else {
        let i = 0;
        let bMatch = true;
        console.warn(`Match Found:`, obj[key2]);

        obj[key2].forEach((k) => {
          if (obj[key2][i] !== oldKey[i]) {
            bMatch = false;
          }
          if (bMatch && i === pos) {
            console.warn(`${obj[key2][i]} =/= ${newKey[i]}`);
            obj[key2][i] = newKey[i];
          }

          i += 1;
        });
      }
    });
  }
};

const UpdateAllKeys = (newKey, oldKey, data) => {
  console.warn(`UpdateAllKeys:`, { newKey, oldKey, data });
  // newKey should be the same length as the old Key
  if (newKey.length !== oldKey.length) return;

  // Iterate through entire dataobject
  data.Values.forEach((Value) => {
    // Card
    if (Value.Type === 'Card') {
      if (Value.Values)
        Object.keys(Value.Values).forEach((key) => {
          // 'Points' is the only variable carrying field at this depth
          if (Value.Values[key].Points) {
            console.warn('Points:', Value.Values[key].Points);
            replaceVar(newKey, oldKey, Value.Values[key].Points);
          }

          // ITERATE through Num/Min/Max vars
          Value.Values[key].Values.forEach((val) => {
            if (val.Num.vars) {
              replaceVar(newKey, oldKey, val.Num);
            }
            if (val.Min.vars) {
              replaceVar(newKey, oldKey, val.Min);
            }
            if (val.Max.vars) {
              replaceVar(newKey, oldKey, val.Max);
            }
          });
        });
    } else if (Value.Type === 'Graph') {
      // ITERATE through Values
      console.warn(`Graph: `, Value.Keys);
      // 'Points' is the only variable carrying field at this depth
      if (Value.Keys) {
        console.warn('Replace Values:', Value.Keys);
        replaceVar(newKey, oldKey, Value.Keys);
      }
    }
  });

  return data;
};

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
  let { keyPath } = props;
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

  // stat data
  const { Values } = Stats;

  // Generate key blacklist
  const blacklist = `~${Values.map((value) => {
    return value.Value;
  }).join('~')}~`;
  // console.warn(`Block blacklist: ${blacklist}`);

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
        const kp = [...keyPath, 'Values', Value, 'Values'];
        // console.warn('kp:', kp);

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
            <TextInputValidator
              defaultValue={value.Value}
              blacklist={blacklist.replace(`${value.Value}~`, '')}
              events={{
                onKeyUp: (e) => {
                  if (e.key === 'Enter') {
                    console.warn('keyPath={kp}:', kp);
                    const oldValue = value.Value;
                    value.Value = e.target.value;
                    console.warn(`${oldValue}, ${value.Value}, ${kp}`);
                    Update(
                      UpdateAllKeys(
                        [...kp, e.target.value],
                        [...kp, oldValue],
                        data,
                      ),
                    );
                  }
                },
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
            <TextInputValidator
              key="1"
              blacklist={blacklist.replace(`${value.Value}~`, '')}
              defaultValue={value.Value}
              events={{
                onKeyUp: (e) => {
                  if (e.key === 'Enter') {
                    value.Value = e.target.value;
                    // UpdateAllKeys(0,0, data)
                    Update(data);
                  }
                },
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
              <TextInputValidator
                defaultValue={Value}
                eventys={{
                  onKeyUp: (e) => {
                    if (e.key === 'Enter') {
                      Stats.Value = e.target.value;
                      Update(data);
                    }
                  },
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
  const { keyPath } = props;
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
      const kp = [...keyPath, cardData.Value];

      return [
        <hr key={i}></hr>,
        <Block
          key={`B${i}`}
          keyPath={kp}
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
            <TextInputValidator
              type="text"
              defaultValue={Value}
              events={{
                onKeyUp: (e) => {
                  if (e.key === 'Enter') {
                    const oldValue = cardData.Value;
                    cardData.Value = e.target.value;
                    console.warn(`${oldValue}, ${cardData.Value}, ${keyPath}`);
                    Update(
                      UpdateAllKeys(
                        [...keyPath, e.target.value],
                        [...keyPath, oldValue],
                        data,
                      ),
                    );
                  }
                },
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
          keyPath={['Values']}
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
        <div className="ProfileHeader" style={{ whiteSpace: 'pre' }}>
          <div>
            Series:{' '}
            {Mode === 'Edit' ? (
              <TextInputValidator
                type="text"
                defaultValue={Game}
                events={{
                  onKeyUp: (e) => {
                    if (e.key === 'Enter') {
                      const oldValue = data.Game;
                      data.Game = e.target.value;
                      console.warn(`${oldValue}, ${data.Game}, ${'Values'}`);
                      Update(
                        UpdateAllKeys(
                          ['Values', data.Game],
                          ['Values', oldValue],
                          data,
                        ),
                      );
                    }
                  },
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
