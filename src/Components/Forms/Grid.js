/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';

// render grid data
const RenderGrid = (props) => {
  const arrCheck = (arr, getKeys = false) => {
    const keys = arr ? Object.keys(arr) : [];
    return arr
      ? Array.isArray(arr)
        ? arr
        : getKeys && keys.length
        ? keys
        : keys.length
        ? keys.map((key) => {
            return arr[key];
          })
        : []
      : [];
  };

  const getDataSet = (obj) => {
    const object = {};
    Object.keys(obj)
      .map((k) => {
        if (k.slice(0, 5) === 'data-') {
          object[k] = obj[k];
          return k;
        }
        return undefined;
      })
      .filter((k) => k !== undefined);
    return object;
  };
  const { parentKey } = props;
  const dataset = getDataSet(props);
  const { header } = props;
  const { headerRows } = props;
  const hHeader = arrCheck(props.hHeader, true);
  const hFooter = arrCheck(props.hFooter, true);
  const { rowHeader } = props;
  const { style } = props;
  const { headerStyle } = props;
  const { bodyStyle } = props;
  const rowHeaderStyle = props.rowHeaderStyle
    ? props.rowHeaderStyle
    : props.headerStyle;
  const { rowStyle } = props;
  const { cellStyle } = props;
  const { columnStyle } = props;
  const { onClick } = props.events;
  const { onChange } = props.events;
  const { onFocus } = props.events;
  const { onBlur } = props.events;
  const value = arrCheck(props.value);
  const { rowKeys } = props;
  const hRow = arrCheck(props.hRow);
  const { selection } = props;
  const { setSelection } = props;

  const getColumnGroup = (row) => {
    let x = -1;
    // const isObj = Object.keys(row).length ? true : false;
    // const ROW = !isObj ? row : Object.keys(row);

    if (!columnStyle) return null;

    return (
      <colgroup>
        {columnStyle.map((cStyle) => {
          console.log('cStyle:');
          x += 1;
          return <col key={x} style={cStyle}></col>;
        })}
      </colgroup>
    );
  };

  const headerFromValue = (row) => {
    let x = -1;
    const isObj = Array.isArray(row) ? false : true;
    const ROW = !isObj ? row : Object.keys(row);

    return ROW.map((key) => {
      x += 1;
      const hasElem = hHeader.length > x;
      const hasRowElem = hRow.length > x;
      const label = hasElem
        ? hHeader[x]
        : isObj
        ? ROW[x]
        : String.fromCharCode(x + 65); /* Offset by one as x will start at 0 */

      return (hasRowElem ? hRow[x].props.break : false) ? undefined : (
        <th
          key={`rhd${x}`}
          name={`rhd${x}`}
          style={{
            ...headerStyle,
          }}
        >
          {label}
        </th>
      );
    }).filter((cell) => cell !== undefined);
  };

  const getHeader = (val, newStyle, asRow) => {
    const buffer =
      header || headerRows ? ( // header
        // iterate the length of the first data row
        val.length ? (
          <tr key="hd" name="hd" style={rowStyle}>
            {rowHeader && !asRow && (header || headerRows) ? ( // origin
              <th key="hd" name="hd" style={newStyle}>
                {selection ? `(${selection.y},${selection.x})` : null}
              </th>
            ) : null}
            {headerFromValue(val[0])}
          </tr>
        ) : // end of header map
        null
      ) : null;
    if (asRow) return buffer;
    return <thead>{buffer}</thead>;
  };

  const getFooter = () => {
    let i = -1;
    return hFooter ? (
      <tfoot>
        <tr>
          {hFooter.map((cell) => {
            i += 1;
            return <td key={`td${i}`}>{cell}</td>;
          })}
        </tr>
      </tfoot>
    ) : null;
  };

  const parseValueIntoGrid = () => {
    if (!Array.isArray(value)) return null;
    if (value.length <= 0) return null;
    if (value[0] <= 0) return null;
    let children;

    function handleEvent(e) {
      const ds = e.target.dataset;
      const { x, y, key } = ds;

      const k = key ? key : y;

      let result;

      if (hRow[y].props.checked !== undefined) {
        result = e.target.checked;
      } else if (hRow[y].props.value !== undefined) {
        result = e.target.value;
      }

      // set cell
      value[x][k] = result;
      return {
        target: {
          value,
          dataset: e.target.parentNode ? e.target.parentNode.dataset : {},
        },
      };
      // return { target: { value: value, dataset: e.target.ds } };
    }

    // map
    // table
    let iX = -1;
    let iY = -1;
    const rHS = { ...cellStyle, ...headerStyle, ...rowHeaderStyle };
    return (
      <table
        style={{ ...style, tableLayout: 'fixed', borderCollapse: 'collapse' }}
      >
        {getColumnGroup()}
        {getHeader(value, rHS)}
        <tbody style={bodyStyle}>
          {value.map((row) => {
            iX += 1;
            iY = -1;
            const isObj = Object.keys(row).length ? true : false;
            const ROW = isObj ? Object.keys(row) : row;
            return [
              headerRows && iX > 0 ? getHeader(value, rHS, true) : null,
              <tr key={`tr${iX}`} name={`tr${iX}`} style={rowStyle}>
                {rowHeader ? ( // row header
                  <th key={`rhd${iX}`} name={`rhd${iX}`} style={rHS}>
                    {iX}
                  </th>
                ) : null}
                {
                  ROW.map((cell) => {
                    iY += 1;
                    const CELL = isObj ? row[cell] : cell;
                    const ds = {
                      // dataset
                      'data-x': iX,
                      'data-y': iY,
                      'data-key': `${rowKeys ? `${rowKeys[iX]}/` : ''}${cell}`,
                    };
                    let hasElem = hRow.length > iY;
                    if (hasElem) hasElem = hRow[iY] !== undefined;
                    let elmOnChange = hasElem
                      ? hRow[iY].props.onChange
                      : undefined;
                    const buffer = (
                      <td
                        key={`td${iY}`}
                        {...dataset}
                        {...((hRow[iY] ? hRow[iY].props.break : false)
                          ? { colspan: ROW.length - 1 }
                          : {})}
                        style={{
                          ...cellStyle,
                        }}
                      >
                        {hasElem
                          ? {
                              ...hRow[iY],
                              props: {
                                ...hRow[iY].props,
                                ...ds,
                                ...(hRow[iY].props.checked !== undefined
                                  ? {
                                      checked: CELL,
                                    }
                                  : {}),
                                ...(hRow[iY].props.value !== undefined
                                  ? {
                                      value: CELL,
                                    }
                                  : {}),
                                ...(hRow[iY].props.children !== undefined
                                  ? {
                                      children: CELL,
                                    }
                                  : {}),

                                ...(elmOnChange || onChange
                                  ? {
                                      onChange: (e) => {
                                        const buffer = {
                                          target: {
                                            value: e.target.value,
                                            dataset: {
                                              key: `${e.target.dataset.key}`,
                                            },
                                          },
                                        };

                                        if (elmOnChange) {
                                          elmOnChange(buffer);
                                        }

                                        if (onChange) {
                                          buffer.target.dataset.key = `${
                                            parentKey ? parentKey + '/' : ''
                                          }${e.target.dataset.key}`;

                                          onChange(buffer);
                                        }

                                        // return value and key
                                        return buffer;
                                      },
                                    }
                                  : {}),

                                ...(hRow[iY].props.onClick || onClick
                                  ? {
                                      onClick: (e) => {
                                        const { y } = e.target.dataset;
                                        if (!y) {
                                          console.error(
                                            'ERROR: Element is not compatible with the Grid element',
                                          );
                                          return;
                                        }
                                        // cell event
                                        if (hasElem)
                                          if (hRow[y].props.onClick)
                                            hRow[y].props.onClick(e);
                                        // tree event
                                        if (onClick) onClick(handleEvent(e));
                                      },
                                    }
                                  : {}),

                                ...(hRow[iY].props.onFocus ||
                                onFocus ||
                                setSelection
                                  ? {
                                      onFocus: (e) => {
                                        const { y } = e.target.dataset;
                                        const { x } = e.target.dataset;
                                        if (!y || !x) {
                                          console.error(
                                            'ERROR: Element is not compatible with the Grid element',
                                          );
                                          return;
                                        }
                                        // set selection
                                        if (setSelection)
                                          setSelection(
                                            parseInt(x, 10),
                                            parseInt(y, 10),
                                          );

                                        // cell event
                                        if (hasElem)
                                          if (hRow[y].props.onFocus)
                                            hRow[y].props.onFocus(e);
                                        // tree event
                                        if (onFocus) onFocus(handleEvent(e));
                                      },
                                    }
                                  : {}),

                                ...(hRow[iY].props.onBlur || onBlur
                                  ? {
                                      onBlur: (e) => {
                                        const { y } = e.target.dataset;
                                        if (!y) {
                                          console.error(
                                            'ERROR: Element is not compatible with the Grid element',
                                          );
                                          return;
                                        }
                                        // cell event
                                        if (hasElem)
                                          if (hRow[y].props.onBlur)
                                            hRow[y].props.onBlur(e);
                                        // tree event
                                        if (onBlur) onBlur(handleEvent(e));
                                      },
                                    }
                                  : {}),
                              },
                            }
                          : isObj
                          ? CELL.toString()
                          : CELL}
                      </td>
                    ); // end of buffer
                    if (hRow[iY] ? hRow[iY].props.break : false) {
                      children = buffer;
                      return undefined;
                    }
                    return buffer;
                  }).filter((cell) => cell !== undefined) // end of row map
                }
              </tr>,
              children ? <tr style={rowStyle}>{children}</tr> : undefined,
            ];
          })}
        </tbody>
        {getFooter()}
      </table>
    );
  };

  const rendered = parseValueIntoGrid();
  return <div>{rendered}</div>;
};

// handles grid data
class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mutable: this.props.value === undefined,
      value: this.props.value
        ? undefined
        : Array.isArray(this.props.defaultValue)
        ? this.props.defaultValue.map((row) => [...row])
        : [],
      selection: this.props.selection ? this.props.selection : { x: 0, y: 0 },
      columns: this.props.columns,
    };

    // get funcs
    if (this.props.funcs) {
      this.props.funcs.addRow = this.addRow;
      this.props.funcs.subRow = this.subRow;
      this.props.funcs.modRow = this.modRows;

      this.props.funcs.getRow = this.getRow;
      this.props.funcs.getSelRow = this.getSelRow;
      this.props.funcs.getSelection = this.getSelection;
      this.props.funcs.getRows = this.getRows;
      this.props.funcs.getCols = this.getCols;

      this.props.funcs.moveRow = this.moveRow;
      this.props.funcs.moveRowUp = this.moveRowUp;
      this.props.funcs.moveRowDown = this.moveRowDown;
    }
  }

  // this expects an array of data
  handleChange = (e) => {
    if (this.state.mutable) this.setState({ value: e.target.value });
    if (this.props.onChange) this.props.onChange(e);
  };

  getValue = () => (this.state.mutable ? this.state.value : this.props.value);

  getColumns = () => {
    const stateColumns = this.state.columns ? this.state.columns : 0;
    if (this.getValue().length)
      return this.getValue()[0].length > stateColumns
        ? this.getValue()[0].length
        : stateColumns;
    return stateColumns;
  };

  setSelection = (x, y) => {
    this.setState({ selection: { x, y } });
  };

  // Move Row
  moveRow = (iRow, iDir) => {
    if (
      (iDir > 0 && iRow + iDir > this.getValue().length) ||
      this.getValue().length === 0
    ) {
      return;
    }
    if ((iDir < 0 && iRow + iDir < 1) || this.getValue().length === 0) {
      return;
    }

    // splice row into new position
    const newValue = this.getValue().map((row) => [...row]);

    // move
    const row = newValue.splice(iRow, 1);
    newValue.splice(iRow + iDir, 0, ...row);
    this.setSelection(iRow + iDir, this.state.selection.x);
    this.handleChange({ target: { value: newValue } });
  };

  moveRowUp = () => {
    this.moveRow(this.state.selection.x, -1);
  };

  moveRowDown = () => {
    this.moveRow(this.state.selection.x, 1);
  };

  // Add Row Note: Currently the only function that modifies 'value'
  modRows = (iAdd = 1, iIndex = this.getValue().length, val) => {
    // Validate
    if (iAdd === 0) return; // adding no value is pointless
    // if (iIndex <= 0 && iAdd < 0) return; // If Row 0, do not subtract
    // if (iIndex <= 0 && iAdd > 0) iIndex = 1; // Adding at 0 is ok

    const newValue = this.getValue().map((row) => [...row]);

    // Add
    if (iAdd > 0) {
      for (let i = 0; i < iAdd; i) {
        const start = iIndex;
        const end = 0;

        // Add to the end
        newValue.splice(
          start,
          end,
          val ? val : new Array(this.getColumns()).fill(''),
        );
        i += 1;
      }
    }
    // Subtract
    else if (iAdd < 0) {
      const start = iIndex; // position to remove at
      const end = -1 * iAdd; // number of rows to remove
      newValue.splice(start, end);
    }

    // update
    let iSel = this.state.selection.x + iAdd;
    if (iSel >= newValue.length - 1) iSel = newValue.length - 1;
    else if (iSel < 0) iSel = 0;
    this.setSelection(iSel, this.state.selection.y);
    this.handleChange({ target: { value: newValue } });
  }; // end of addRow

  addRow = (val) => {
    this.modRows(1, this.state.selection.x, val);
  };

  subRow = () => {
    this.modRows(-1, this.state.selection.x);
  };

  getRow(index) {
    if (index < 0 || index > this.getValue().length || index === undefined)
      return undefined;
    return this.getValue()[index];
  }

  getSelection = () => this.state.selection;

  getSelRow = () => this.state.selection.x;

  getRows = () => this.getValue().length;

  getCols = () => (this.getValue().length ? this.getValue()[0].length : 0);

  render() {
    return (
      <RenderGrid
        {...this.props}
        value={
          this.state.mutable
            ? this.state.value
            : Array.isArray(this.props.value)
            ? this.props.value.map((row) =>
                Array.isArray(row) ? [...row] : { ...row },
              )
            : { ...this.props.value }
        }
        selection={this.state.selection}
        setSelection={this.setSelection}
        events={{
          onClick: this.props.onClick,
          onChange: this.handleChange,
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur,
        }}
      />
    );
  }
}

export default Grid;
