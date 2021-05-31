/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import MathInput from '../../../Components/Forms/Algorithm Calculator/MathInput.js';
import Controls from '../InputControls.js';
import { Profile } from '../ProfileData';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import Diagram from '../Diagram.js';
import StatData from '../StatData.js';
import { Popup } from '../../../Components/Forms/Fields/Helper/index.js';
import { ToggleButton } from '../../../Components/Forms/Fields/Input/Button/index.js';
import { TextInputValidator } from '../../../Components/Forms/Fields/Input/index.js';

// Current Objectives
// 1. For watchever reason, newly added entries are not given unique names like they use to
// 2. Consider making a widget system
//  a. Cards, Diagrams, Inventories, Skills, Equipment, ect
// 3. Add ability to import a massiv elist of stats
// 4. Math input needs to be made easier to use.
// 5. Make a unique default style for users to use
// 6. Add the option to apply text resulting scripts
// 7. Validation needs to be added to key Values
// 8. Have presetable data text
//  a. This is the point where it might be work developing standard card formats for such data
//  b. e.g. Graphs and data
// 9. Make sure labels reflect with contents of table rows

// Possible objective
// Current Objectives
// 1. Create special case for when you want to update a field and have it also calculated
//   a. No real example at this time
// 2. May need to create a predefined index of all cells that have variabled,
//  - so that one can search through that list, as appose to the entire data object

// styling contrainers
const ProfileContainer = (props) => {
  return (
    <div
      className="Profile"
      onClick={props.onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
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

// Stat Data display

// Flavor data display

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

  // stat data
  const { Values } = Stats;

  // get element by key
  const getStatByKey = (key) => {
    let stat = undefined;
    let i = 0;
    const keys = Object.keys(Values);

    for (i; i < keys.length; i++) {
      if (stat === undefined) {
        if (Values[i]['Value'] === key) {
          stat = Values[i];
          break;
        }
      }
    }

    return stat ? stat : {};
  };

  // Generate key blacklist
  const blacklist = `~${Values.map((value) => {
    return value.Value;
  }).join('~')}~`;

  // stat table
  function StatTable() {
    // set row
    function setRow(i, key, value, num, min, max, unit, row) {
      return [
        <tr
          key={`tr_${key}(${i})`}
          onMouseDown={(e) => {
            // Right click and left click
            if (e.button === 2 || e.button === 0) {
              setStatSelection(row);
            }
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
    function setFlavor(i, key, value, flavor, row) {
      return [
        <tr
          key={`tr_${key}(${i})`}
          onMouseDown={(e) => {
            // Right click and left click
            if (e.button === 2 || e.button === 0) {
              setStatSelection(row);
            }
          }}
        >
          <td key={`td_${key}(${i}) 0`}>{value}</td>
          <td key={`td_${key}(${i}) 1`} colSpan="4">
            {flavor}
          </td>
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

        const { Type } = value;

        i += 1;
        if (Mode === 'View') {
          switch (Type) {
            case 'Static':
            case 'Calc':
              return setRow(
                i,
                Stats.Value,
                value.Value,
                `${value.Num.result}${value.Unit}`,
                '',
              );
            case 'Flavor':
              return setRow(i, Stats.Value, value.Value, value.Flavor, '');
            default:
              break;
          }
        } else if (Mode === 'Calculator') {
          switch (Type) {
            case 'Static':
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

                    Update(StatData.UpdateAllVals(value.getPath(), data));
                  }}
                />,
                value.Unit,
              );
            case 'Calc':
              return setRow(
                i,
                Stats.Value,
                value.Value,
                `${value.Num.result}${value.Unit}`,
                '',
              );
            case 'Flavor':
              return setFlavor(
                i,
                Stats.Value,
                value.Value,

                <TextInputValidator
                  key={`${value.Value}-Flavor`}
                  defaultValue={value.Flavor}
                  events={{
                    onKeyUp: (e) => {
                      if (e.key === 'Enter') {
                        value.Flavor = e.target.value;
                        Update(data);
                      }
                    },
                  }}
                />,

                value.Value,
              );
            default:
              break;
          } // end of switch
        } else {
          switch (Type) {
            case 'Static':
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
                        // Update selection value
                        setStatSelection(e.target.value);
                        Update(
                          StatData.UpdateAllKeys(
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
                    Update(StatData.UpdateAllVals(value.getPath(), data));
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
                    Update(StatData.UpdateAllVals(value.getPath(), data));
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
                    Update(StatData.UpdateAllVals(value.getPath(), data));
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
            case 'Calc':
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
                        const oldValue = value.Value;
                        value.Value = e.target.value;
                        // Update selection value
                        setStatSelection(e.target.value);
                        Update(
                          StatData.UpdateAllKeys(
                            [...kp, e.target.value],
                            [...kp, oldValue],
                            data,
                          ),
                        );
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
            case 'Flavor':
              return setFlavor(
                i,
                Stats.Value,
                <TextInputValidator
                  className="Flavor"
                  key={value.Value}
                  defaultValue={value.Value}
                  blacklist={blacklist.replace(`${value.Value}~`, '')}
                  events={{
                    onKeyUp: (e) => {
                      if (e.key === 'Enter') {
                        const oldValue = value.Value;
                        value.Value = e.target.value;
                        // Update selection value
                        setStatSelection(e.target.value);
                        Update(
                          StatData.UpdateAllKeys(
                            [...kp, e.target.value],
                            [...kp, oldValue],
                            data,
                          ),
                        );
                      }
                    },
                  }}
                />,

                <TextInputValidator
                  key={`${value.Value}-Flavor`}
                  defaultValue={value.Flavor}
                  events={{
                    onKeyUp: (e) => {
                      if (e.key === 'Enter') {
                        value.Flavor = e.target.value;
                        Update(data);
                      }
                    },
                  }}
                />,

                value.Value,
              );
            default:
              break;
          }
        }
        return <div>[End Of StatTable]</div>;
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

  // menu
  const statMenu = (stat) => [
    // <MenuItem key="div_1" divider />,
    <MenuItem
      key="To Calc"
      onClick={() => {
        stat.Type = 'Calc';
        Update(data);
      }}
    >
      Change [<span style={{ color: 'red' }}>{stat.Value}</span>] to{' '}
      <span style={{ color: 'gold' }}>Calc</span>
    </MenuItem>,
    <MenuItem
      key="To Static"
      onClick={() => {
        stat.Type = 'Static';
        Update(data);
      }}
    >
      Change [<span style={{ color: 'red' }}>{stat.Value}</span>] to{' '}
      <span style={{ color: 'gold' }}>Static</span>
    </MenuItem>,
    <MenuItem
      key="To Flavor"
      onClick={() => {
        stat.Type = 'Flavor';
        Update(data);
      }}
    >
      Change [<span style={{ color: 'red' }}>{stat.Value}</span>] to{' '}
      <span style={{ color: 'gold' }}>Flavor</span>
    </MenuItem>,
    <MenuItem
      key="To Script Flavor"
      onClick={() => {
        stat.Type = 'ScriptFlavor';
        Update(data);
      }}
    >
      Change [<span style={{ color: 'red' }}>{stat.Value}</span>] to{' '}
      <span style={{ color: 'gold' }}>Scripted Flavor</span>
    </MenuItem>,
    // <MenuItem key="div_2" divider />,
  ];

  const getTextCM = (stat, tag) => {
    return <ContextMenu id={`Stat_CM_${tag}`}>{statMenu(stat)}</ContextMenu>;
  };

  return (
    <div
      key={Value}
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
          {/* Stat Label */}
          {Stats.bShow || Mode === 'Edit' ? (
            Mode === 'Edit' || (Mode === 'Calculator' && Stats.bEdit) ? (
              <TextInputValidator
                key={Value}
                defaultValue={Value}
                events={{
                  onKeyUp: (e) => {
                    if (e.key === 'Enter') {
                      const oldValue = Stats.Value;
                      Stats.Value = e.target.value;
                      // Update selection value
                      setBlockSelection(e.target.value);

                      // Update(
                      StatData.UpdateAllKeys(
                        [...keyPath, 'Values', e.target.value],
                        [...keyPath, 'Values', oldValue],
                        data,
                      );
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
          <ContextMenuTrigger id={`Stat_CM_${Value}`} holdToDisplay={-1}>
            {Mode === 'Edit'
              ? statSelection !== undefined
                ? getTextCM(getStatByKey(statSelection), Value)
                : null
              : null}
            {Mode === 'Edit' ? (
              <Controls
                selection={statSelection}
                Tag="Stat"
                Add={(selection, i) => {
                  // If subtraction, check for existing references to said item
                  if (i < 0) {
                    const kp = [
                      ...keyPath,
                      'Values',
                      Value,
                      'Values',
                      selection,
                    ];
                    const vars = StatData.ValidateAllKeys(kp, kp, data);
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
          </ContextMenuTrigger>
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
              defaultValue={Value}
              events={{
                onKeyUp: (e) => {
                  if (e.key === 'Enter') {
                    const oldValue = cardData.Value;
                    cardData.Value = e.target.value;
                    // Update selection value
                    setBlockSelection(e.target.value);
                    Update(
                      StatData.UpdateAllKeys(
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
              const vars = StatData.ValidateAllKeys(
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
                defaultValue={Game}
                events={{
                  onKeyUp: (e) => {
                    if (e.key === 'Enter') {
                      const oldValue = data.Game;
                      data.Game = e.target.value;
                      // Update selection value
                      setCardSelection(e.target.value);
                      Update(
                        StatData.UpdateAllKeys(
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
            <Controls
              Tag="Card"
              selection={cardSelection}
              Add={(selection, i) => {
                // If subtraction, check for existing references to said item
                if (i < 0) {
                  const vars = StatData.ValidateAllKeys(
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
