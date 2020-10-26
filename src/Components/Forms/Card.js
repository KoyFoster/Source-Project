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
import Popup from './Popup';
import Controls from './Controls.js';
import TextInputValidator from './TextInputValidator.js';
import { Profile } from './ProfileData';
import './Card.css';
import Diagram from '../Diagram.js';
import { Paper } from '@material-ui/core';

// Current Objectives
// 1.

// Possible objectived
// Current Objectives
// 1. Create special case for when you want to update a field and have it also calculated
//   a. No real example at this time

const replaceVar = (newKey, oldKey, varObj) => {
  // console.warn(`replaceVar:`, { oldKey, newKey, varObj });
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
            // console.warn(`${obj[key2][i]} =/= ${newKey[i]}`);
            obj[key2][i] = newKey[i];
            bUpdate = true;
          }

          i += 1;
        });
      }
      // update vars
      if (bUpdate) {
        varObj.vars = JSON.stringify(obj);
        // console.warn(`Match Found:`, varObj);
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
        // console.warn(`Match Found:`, obj[key2]);

        obj[key2].forEach((k) => {
          if (obj[key2][i] !== oldKey[i]) {
            bMatch = false;
          }
          if (bMatch && i === pos) {
            // console.warn(`${obj[key2][i]} =/= ${newKey[i]}`);
            obj[key2][i] = newKey[i];
          }

          i += 1;
        });
      }
    });
  }
};

const bVarInUse = (newKey, oldKey, varObj) => {
  // const vars = [];
  let bFound = false;

  // console.warn(`bVarInUse:`, { oldKey, newKey, varObj });
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
            // console.warn(`${obj[key2][i]} =/= ${newKey[i]}`);
            bFound = true;
          }

          i += 1;
        });
      }
      // update vars
      if (bUpdate) {
        varObj.vars = JSON.stringify(obj);
        // console.warn(`Match Found:`, varObj);
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
        // console.warn(`Match Found:`, obj[key2]);

        obj[key2].forEach((k) => {
          if (obj[key2][i] !== oldKey[i]) {
            bMatch = false;
          }
          if (bMatch && i === pos) {
            // console.warn(`${obj[key2][i]} =/= ${newKey[i]}`);
            // vars.push(obj);
            bFound = true;
          }

          i += 1;
        });
      }
    });
  }

  return bFound;
};

const UpdateAllKeys = (newKey, oldKey, data) => {
  // console.warn(`UpdateAllKeys:`, { newKey, oldKey, data });
  // newKey should be the same length as the old Key
  if (newKey.length !== oldKey.length) return;

  // Iterate through entire dataobject
  data.Values.forEach((Value) => {
    // Card
    if (Value.Type === 'Card') {
      if (Value.Values)
        Object.keys(Value.Values).forEach((key) => {
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
      // console.warn(`Graph: `, Value.Keys);
      if (Value.Keys) {
        // console.warn('Replace Values:', Value.Keys);
        replaceVar(newKey, oldKey, Value.Keys);
      }
    }
  });

  return data;
};

const updateVal = (key, varObj, data) => {
  // console.warn(`replaceVar:`, { key, varObj });
  if (varObj.vars) {
    const obj = JSON.parse(varObj.vars);
    Object.keys(obj).forEach((key2) => {
      // Cross compare against key
      // Size check
      const pos = key.length - 1;
      let bUpdate = false;
      if (key.length > obj[key2].length) {
      } else {
        let i = 0;
        let bMatch = true;

        obj[key2].forEach((k) => {
          if (obj[key2][i] !== key[i]) {
            bMatch = false;
          }
          if (bMatch && i === pos) {
            // console.warn(`${obj[key2][i]} =/= ${key[i]}`);
            obj[key2][i] = key[i];
            bUpdate = true;
          }

          i += 1;
        });
      }
      // update val
      if (bUpdate) {
        // varObj.vars = JSON.stringify(obj);
        // console.warn(`Match Found:`, varObj, obj, { buffer });

        const buffer = StatData.GetCellValue(
          varObj.expression,
          obj,
          data,
          true,
        );

        varObj.result = buffer;

        // This is where recursion happens
        // TODO: Big dangerous
        UpdateAllVals(varObj.getPath(), data);
      }
    });
  }
};

const UpdateAllVals = (varKey, data) => {
  // console.warn(`UpdateAllKeys:`, { key, data });

  // Iterate through entire dataobject
  data.Values.forEach((Value) => {
    // Card
    if (Value.Type === 'Card') {
      if (Value.Values)
        Object.keys(Value.Values).forEach((key) => {
          // ITERATE through Num/Min/Max vars
          Value.Values[key].Values.forEach((val) => {
            if (val.Num.vars) {
              updateVal(varKey, val.Num, data);
            }
            if (val.Min.vars) {
              updateVal(varKey, val.Min, data);
            }
            if (val.Max.vars) {
              updateVal(varKey, val.Max, data);
            }
          });
        });
    }
  });

  return data;
};

const ValidateAllKeys = (newKey, oldKey, data) => {
  // console.warn(`ValidateAllKeys:`, { newKey, oldKey, data });
  // newKey should be the same length as the old Key
  if (newKey.length !== oldKey.length) return false;

  let vars = [];

  // Iterate through entire dataobject
  data.Values.forEach((Value) => {
    // Card
    if (Value.Type === 'Card') {
      if (Value.Values)
        Object.keys(Value.Values).forEach((key) => {
          // ITERATE through Num/Min/Max vars
          Value.Values[key].Values.forEach((val) => {
            if (val.Num.vars) {
              if (bVarInUse(newKey, oldKey, val.Num))
                vars.push(`${Value.Value}/${val.Value}/Num`);
            }
            if (val.Min.vars) {
              if (bVarInUse(newKey, oldKey, val.Min))
                vars.push(`${Value.Value}/${val.Value}/Min`);
            }
            if (val.Max.vars) {
              if (bVarInUse(newKey, oldKey, val.Max))
                vars.push(`${Value.Value}/${val.Value}/Max`);
            }
          });
        });
    } else if (Value.Type === 'Graph') {
      // ITERATE through Values
      // console.warn(`Graph: `, Value.Keys);
      if (Value.Keys) {
        // console.warn('Replace Values:', Value.Keys);
        if (bVarInUse(newKey, oldKey, Value.Keys)) vars.push(Value.Value);
      }
    }
  });

  console.log('Existing Vars:', vars);
  return vars;
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
  const [seen, setSeen] = useState(false);
  const [warnMSG, setWarn] = useState('[No Message]');
  const togglePopup = () => {
    setSeen(!seen);
  };

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

  // stat data
  const { Values } = Stats;

  // Generate key blacklist
  const blacklist = `~${Values.map((value) => {
    return value.Value;
  }).join('~')}~`;
  // console.warn(`Block blacklist: ${blacklist}`);

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

                  Update(UpdateAllVals(value.getPath(), data));
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
              key={value.Value}
              defaultValue={value.Value}
              blacklist={blacklist.replace(`${value.Value}~`, '')}
              events={{
                onKeyUp: (e) => {
                  if (e.key === 'Enter') {
                    const oldValue = value.Value;
                    value.Value = e.target.value;
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
                Update(UpdateAllVals(value.getPath(), data));
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
                Update(UpdateAllVals(value.getPath(), data));
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
                Update(UpdateAllVals(value.getPath(), data));
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
              key={value.Value}
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
              type="text"
              key="5"
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
      {seen ? (
        <Popup
          key="Stat Removal Warning"
          bToggle={togglePopup}
          component={
            <div style={{ color: 'red', fontSize: '14', fontWeight: 'bold' }}>
              Warning:
              <div
                style={{ color: 'black', fontSize: '12', fontWeight: 'normal' }}
              >
                <div>[{statSelection}] is being referenced.</div>
                <div>Remove all references before removing this field.</div>
                <div>Refs: {warnMSG.join(' - ')}</div>
              </div>
            </div>
          }
        />
      ) : null}
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
                key={Value}
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
                // If subtraction, check for existing references to said item
                if (i < 0) {
                  const kp = [...keyPath, 'Values', Value, 'Values', selection];
                  const vars = ValidateAllKeys(kp, kp, data);
                  if (vars.length > 0) {
                    setWarn(vars);
                    togglePopup();
                    return;
                  }
                }

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
  const [seen, setSeen] = useState(false);
  const [warnMSG, setWarn] = useState('[No Message]');
  const togglePopup = () => {
    setSeen(!seen);
  };
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
      {seen ? (
        <Popup
          key="Stat Removal Warning"
          bToggle={togglePopup}
          component={
            <div style={{ color: 'red', fontSize: '14', fontWeight: 'bold' }}>
              Warning:
              <div
                style={{ color: 'black', fontSize: '12', fontWeight: 'normal' }}
              >
                <div>[{blockSelection}] is being referenced.</div>
                <div>Remove all references before removing this field.</div>
                <div>Refs: {warnMSG.join(' - ')}</div>
              </div>
            </div>
          }
        />
      ) : null}
      <div style={{ display: 'flex' }}>
        <CardHeader style={{ width: '100%' }}>
          {Mode === 'Edit' ||
          (Mode === 'Calculator' && cardData.bEdit && cardData.bShow) ? (
            <TextInputValidator
              key={Value}
              type="text"
              defaultValue={Value}
              events={{
                onKeyUp: (e) => {
                  if (e.key === 'Enter') {
                    const oldValue = cardData.Value;
                    cardData.Value = e.target.value;
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
            // If subtraction, check for existing references to said item
            if (i < 0) {
              const vars = ValidateAllKeys(
                [...keyPath, cardData.Value, 'Values', selection],
                [...keyPath, cardData.Value, 'Values', selection],
                data,
              );
              if (vars.length > 0) {
                setWarn(vars);
                togglePopup();
                return;
              }
            }

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
  const [seen, setSeen] = useState(false);
  const [warnMSG, setWarn] = useState('[No Message]');
  const togglePopup = () => {
    setSeen(!seen);
  };
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
      {seen ? (
        <Popup
          key="Stat Removal Warning"
          bToggle={togglePopup}
          component={
            <div style={{ color: 'red', fontSize: '14', fontWeight: 'bold' }}>
              Warning:
              <div
                style={{ color: 'black', fontSize: '12', fontWeight: 'normal' }}
              >
                <div>[{cardSelection}] is being referenced.</div>
                <div>Remove all references before removing this field.</div>
                <div>Refs: {warnMSG.join(' - ')}</div>
              </div>
            </div>
          }
        />
      ) : null}
      <div>
        <div className="ProfileHeader" style={{ whiteSpace: 'pre' }}>
          <div>
            {Mode === 'Edit' ? 'Series: ' : null}
            {Mode === 'Edit' ? (
              <TextInputValidator
                key={Game}
                type="text"
                defaultValue={Game}
                events={{
                  onKeyUp: (e) => {
                    if (e.key === 'Enter') {
                      const oldValue = data.Game;
                      data.Game = e.target.value;
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
            {Mode === 'Edit' ? 'Title: ' : null}
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
                  // If subtraction, check for existing references to said item
                  if (i < 0) {
                    const vars = ValidateAllKeys(
                      ['Values', selection],
                      ['Values', selection],
                      data,
                    );
                    if (vars.length > 0) {
                      setWarn(vars);
                      togglePopup();
                      return;
                    }
                  }

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
