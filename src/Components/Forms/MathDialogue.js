import React, { useState } from 'react';
import '../../App.css';
import { TagList } from './Tags';

const MathDialogue = (props) => {
  const { Key } = props;
  const { style } = props;
  const { vars } = props;
  const { expression } = props;
  const { onCancel } = props;
  const { onAccept } = props;

  const [newExpression, setExpression] = useState(expression);
  const [newVars, setVars] = useState(vars ? JSON.parse(vars) : {});

  const parseKeysIntoLabel = (keys) => {
    if (!keys) return '';

    let buffer = '';

    keys.forEach((key) => {
      if (key !== 'Values') buffer += `${buffer ? '~' : ''}${key}`;
    });

    return buffer;
  };

  const getVarsAsTags = () => {
    const arr = [];
    let scope;

    try {
      scope = JSON.parse(vars);
    } catch {
      console.error(`ERROR: Invalid Variables(${vars})`);
      return {};
    }

    for (let [key, value] of Object.entries(scope)) {
      arr.push({ key, label: `{${key}: ${parseKeysIntoLabel(value)}}` }); // make primary key accessible
    }

    return arr;
  };

  const tags = vars ? getVarsAsTags() : undefined;
  // console.log('vars:', vars);

  return (
    <table
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
          <td>Math Expression</td>
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
              <TagList type="text" tags={newVars} style={{ width: '100%' }} />
              <button type="push" style={{ width: '24px' }}>
                +
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="2">Result</td>
        </tr>
        <tr>
          <td colSpan="2">{<input type="text" defaultValue={undefined} />}</td>
        </tr>
        <tr>
          <td colSpan="2">=</td>
        </tr>
        <tr>
          <td colSpan="2">{<input type="text" defaultValue={undefined} />}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button type="push" onClick={(e) => onCancel()}>
              {' '}
              Cancel{' '}
            </button>
          </td>
          <td>
            <button
              type="push"
              onClick={() => {
                console.log('newVars:', newVars);
                const result = {
                  target: {
                    value: [newExpression, JSON.stringify(newVars)],
                  },
                };
                onAccept(result);
              }}
            >
              {' '}
              Accept{' '}
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default MathDialogue;
