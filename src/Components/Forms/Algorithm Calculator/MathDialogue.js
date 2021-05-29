import React, { useState } from 'react';
import { TagList } from '../Tags';
import Popup from '../Popup';
import VariablePicker from '../VariablePicker';
import './Math.css';
import StatData from '../../../Stat Calculator Generator/StatData';

const MathDialogue = (props) => {
  const { style } = props;
  let { result } = props;
  const { expression } = props;
  const { vars } = props;
  const { data } = props;
  const { onCancel } = props;
  const { onAccept } = props;

  const [newExpression, setExpression] = useState(expression);
  const [newVars, setVars] = useState(vars ? JSON.parse(vars) : {});

  const [seen, setSeen] = useState(false);
  const togglePopup = () => {
    setSeen(!seen);
  };

  const component = (
    <VariablePicker
      data={data}
      varKey={String.fromCharCode(
        Object.keys(newVars).length + 65,
      ).toLowerCase()} // new var letter
      onClick={(e) => {
        setVars({ ...newVars, ...e.target.value });
        togglePopup();
      }}
    ></VariablePicker>
  );

  const getDefinedExpression = () => {
    let exp = newExpression;
    const variables = StatData.parseVariables(newVars, data, true, false);

    // replace variables with values
    Object.keys(variables).forEach((key) => {
      exp = exp ? exp.replace(key, variables[key]) : 'Invalid';
    });

    return exp;
  };

  const defineResult = () => {
    result = StatData.GetCellValue(newExpression, newVars, data, true);
    return result;
  };
  const getResult = () => {
    defineResult();

    if (result === undefined)
      return (
        <div
          style={{
            backgroundColor: 'red',
            color: 'darkRed',
            border: '2px solid black',
          }}
        >
          Invalid Expression
        </div>
      );
    else
      return (
        <div
          style={{
            backgroundColor: 'green',
            color: 'darkGreen',
            border: '2px solid black',
          }}
        >
          {result}
        </div>
      );
  };

  return (
    <table
      className="evaluation"
      style={{
        ...style,
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        border: '1px dashed red',
        display: 'inline-block',
        width: '100%',
      }}
    >
      <colgroup>
        <col />
        <col style={{ width: '100%' }} />
      </colgroup>
      <thead>
        <tr>
          <td colSpan="2">Calculation</td>
        </tr>
        <tr>
          <td>Expression</td>
          <td>Variables</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {
              <input
                type="text"
                value={newExpression}
                onChange={(e) => {
                  setExpression(e.target.value);
                }}
              />
            }
          </td>
          <td>
            <div style={{ display: 'flex' }}>
              <TagList
                type="text"
                tags={newVars}
                style={{ width: '100%' }}
                onClick={(e) => {
                  setVars(e.target.value);
                }}
              />
              <button
                type="push"
                style={{ width: '24px' }}
                onClick={(e) => {
                  togglePopup(e);
                }}
              >
                +
              </button>
              {seen ? (
                // eslint-disable-next-line react/prop-types
                <Popup bToggle={togglePopup} component={component} />
              ) : null}
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="2">Result</td>
        </tr>
        <tr>
          <td colSpan="2">{getDefinedExpression()}</td>
        </tr>
        <tr>
          <td colSpan="2">=</td>
        </tr>
        <tr>
          <td colSpan="2">{getResult()}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button
              type="push"
              onClick={(e) => {
                const result = {
                  target: {
                    value: {
                      result: defineResult(),
                      expression: newExpression,
                      vars: JSON.stringify(newVars),
                    },
                  },
                };
                onAccept(result);
              }}
            >
              {' '}
              Accept{' '}
            </button>
          </td>
          <td>
            <button type="push" onClick={(e) => onCancel()}>
              {' '}
              Cancel{' '}
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default MathDialogue;
