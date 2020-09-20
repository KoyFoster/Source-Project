import React from 'react';
import { Profile, Card, Block, Stat, Cell } from './ProfileData';

const depthColor = [
  ['black', 'red'],
  ['white', 'blue'],
  ['black', 'green'],
  ['white', 'purple'],
  ['black', 'yellow'],
  ['black', 'magenta'],
];

// render
const renderStats = (
  data,
  parentKey = '',
  objKey = 'Values',
  excludeKeyValues = 'Num,math,Level,Points,PointCalc,Unit,Type,Total',
  excludeKeys = 'math,Value,Values,PointCalc,Unit,Type,Total',
  selectKeys = 'Num,Level,Points',
  SelectElem = undefined,
  depth = 0,
  colors = depthColor,
) => {
  const result = [];

  // get keys
  const keys = Object.keys(data);

  keys.forEach((key) => {
    let children = [];
    if (key === objKey) {
      const vKeys = Object.keys(data[key]);
      vKeys.forEach((vKey) => {
        children.push(
          <div key={children.length}>
            {renderStats(
              data[key][vKey],
              `${parentKey}~${key}~${vKey}`,
              objKey,
              excludeKeyValues,
              excludeKeys,
              selectKeys,
              SelectElem,
              depth + 1,
              colors,
            )}
          </div>,
        );
      });
    }

    const bKey = excludeKeys ? excludeKeys.indexOf(key) === -1 : true;
    const bVal = excludeKeyValues ? excludeKeyValues.indexOf(key) === -1 : true;
    const bSel = selectKeys ? selectKeys.indexOf(key) > -1 : false;

    //  console.log('key:', key);
    result.push(
      <div
        key={key}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          color: colors[depth][0],
          border: !bVal && !bKey ? undefined : '1px dashed cyan',
          backgroundColor: colors[depth][1],
          // filter: 'brightness(66%)',
        }}
      >
        {bKey && (key ? key.constructor !== Function : true) ? (
          bSel ? (
            <SelectElem value={data[key]} style={{ width: '100%' }}>
              {key}
            </SelectElem>
          ) : (
            key
          )
        ) : null}
        {children.length === 0 && bVal && bKey ? '' : null}
        {bVal && bKey ? ': ' : null}
        {children.length === 0
          ? bVal && (data[key] ? data[key].constructor !== Function : true)
            ? data[key]
            : null
          : children}
      </div>,
    );
  });

  return result;
};

const VariablePicker = (props) => {
  // Note: The idea is to have a node and polygon system
  // the user chooses points in which to draw lines
  // and that information is saved
  const { onClick } = props;
  const { data } = props;
  const { varKey } = props;

  const Picker = (props) => {
    const { value } = props;

    return (
      <button
        type="push"
        key={props.fullKey}
        data-key={props.fullKey}
        style={props.style}
        onClick={(e) => {
          const keys = value.getPath();
          const newVar = {};
          newVar[varKey] = keys;
          onClick({ target: { value: newVar } });
        }}
      >
        {props.children}
      </button>
    );
  };

  return (
    <div>
      {renderStats(
        data,
        '',
        'Values',
        'Num,Min,Max,math,Level,Points,PointCalc,Unit,Type,Total',
        'math,Value,Values,PointCalc,Unit,Type,Total',
        'Num,Min,Max,Level,Points',
        Picker,
      )}
    </div>
  );
};

export default VariablePicker;
