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

  const processValue = (propVal, val) => {
    if (propVal instanceof Function === true) {
      return propVal(val);
    }
    return val;
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
  const { iColumns } = props;
  const gridOnChange = props.events.onChange;
  const { onClick } = props.events;
  const { onFocus } = props.events;
  const { onBlur } = props.events;
  const value = arrCheck(props.value);
  const { rowKeys } = props;
  const hRow = arrCheck(props.hRow);
  const { selection } = props;
  const { setSelection } = props;
  const { onChangeOverride } = props;
  const tableData = {};

  const getColumnGroup = (row) => {
    let x = -1;
    // const isObj = Object.keys(row).length ? true : false;
    // const ROW = !isObj ? row : Object.keys(row);

    if (!columnStyle) return null;

    return (
      <colgroup>
        {columnStyle.map((cStyle) => {
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
      if (iColumns <= x) return undefined;
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
          {hFooter
            .map((cell) => {
              if (iColumns <= i) return undefined;
              i += 1;
              return <td key={`td${i}`}>{cell}</td>;
            })
            .filter((cell) => cell !== undefined)}
        </tr>
      </tfoot>
    ) : null;
  };

  function handleEvent(e, tableData) {
    const ds = e.target.dataset;
    const { x, y, key } = ds ? ds : {};
    const k = key ? key : y;
    let result;

    if (hRow[y].props.checked !== undefined) {
      result = e.target.checked;
    } else if (hRow[y].props.value !== undefined) {
      result = e.target.value;
    }

    if (hRow[y].props.checked !== undefined) {
      result = e.target.checked;
    } else if (hRow[y].props.value !== undefined) {
      result = e.target.value;
    }

    // set cell
    value[x][k] = result;
    return { x, y, key, value };
  }

  // join funcs
  const joinFuncs = (e, elemFunc, gridFunc, override) => {
    const data = handleEvent(e, tableData);
    const rowdata = data.x
      ? {
          cell: data.key ? data.key : data.y,
          key: tableData.parentKey,
          value: tableData[data.x].values,
        }
      : {};

    // onChange event of the component passed into the cell passed
    if (elemFunc) {
      elemFunc(e, rowdata);
    }
    // onChange event passed to the table
    if (gridFunc && (!elemFunc || (!override && elemFunc))) {
      gridFunc(e, rowdata);
    }
    // return value and key
    return { e, x: data.x, y: data.y };
  };

  const parseValueIntoGrid = () => {
    if (!Array.isArray(value)) return null;
    if (value.length <= 0) return null;
    if (value[0] <= 0) return null;
    let children;

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

            // add and define new row data
            tableData[iX] = {};

            // define row data
            //  console.log('1. ', { tableData, iX, rowKeys, iY });
            // define row data
            tableData['parentKey'] = parentKey;
            tableData[iX]['key'] = `${rowKeys ? `${rowKeys[iX]}` : `${iX}`}`;
            tableData[iX]['values'] = {};
            tableData[iX]['keys'] = ROW;

            const rowBuffer = [
              headerRows && iX > 0 ? getHeader(value, rHS, true) : null,
              <tr key={`tr${iX}`} name={`tr${iX}`} style={rowStyle}>
                {rowHeader ? ( // row header
                  <th key={`rhd${iX}`} name={`rhd${iX}`} style={rHS}>
                    {iX}
                  </th>
                ) : null}
                {
                  ROW.map((cell) => {
                    if (iColumns <= iY) return undefined;
                    iY += 1;
                    const CELL = isObj ? row[cell] : cell;

                    // add cell values
                    tableData[iX]['values'][ROW[iY]] = CELL;
                    // console.log(
                    //   'tableData[iX][values]:',
                    //   tableData[iX]['values'],
                    //   CELL,
                    // );

                    const ds = {
                      // dataset
                      'data-x': iX,
                      'data-y': iY,
                      'data-key': `${rowKeys ? `${rowKeys[iX]}~` : ''}${cell}`,
                    };
                    let hasElem = hRow.length > iY;
                    const hCell = hRow[iY];
                    if (hasElem) hasElem = hCell !== undefined;
                    let elemOnChange = hasElem
                      ? hCell.props.onChange
                      : undefined;
                    const buffer = (
                      <td
                        key={`td${iY}`}
                        {...dataset}
                        {...((hCell ? hCell.props.break : false)
                          ? { colspan: ROW.length - 1 }
                          : {})}
                        style={{
                          ...cellStyle,
                        }}
                      >
                        {(hasElem
                          ? (row) => {
                              let newProps = {};
                              const cp = hCell.props;
                              // console.log('cp:', cp);

                              // iterate through and reapply each individual props
                              Object.keys(cp).forEach((k) => {
                                // console.log(
                                //   `key: "${k}"`,
                                //   '\nprop:',
                                //   cp[k],
                                //   '\n isFunc:',
                                //   cp[k] instanceof Function,
                                // );
                                if (
                                  k !== 'value' &&
                                  k !== 'checked' &&
                                  k !== 'children'
                                )
                                  if (
                                    k !== 'onChange' &&
                                    k !== 'onClick' &&
                                    k !== 'onBlur' &&
                                    k !== 'onFocus' &&
                                    cp[k] instanceof Function === true
                                  ) {
                                    newProps[k] = cp[k](row);
                                  } else {
                                    newProps[k] = cp[k];
                                  }
                              });

                              // console.log({ value: hCell.props.value, CELL });
                              newProps = {
                                ...newProps,
                                ...ds,
                                ...(hCell.props.checked !== undefined
                                  ? {
                                      checked: CELL,
                                    }
                                  : {}),
                                ...(hCell.props.value !== undefined
                                  ? {
                                      value: processValue(
                                        hCell.props.value,
                                        CELL,
                                      ),
                                    }
                                  : {}),
                                ...(hCell.props.children !== undefined
                                  ? {
                                      children: CELL,
                                    }
                                  : {}),

                                ...(elemOnChange || gridOnChange
                                  ? {
                                      onChange: (e) => {
                                        return joinFuncs(
                                          e,
                                          elemOnChange,
                                          gridOnChange,
                                          onChangeOverride,
                                        ).e;
                                      },
                                    }
                                  : {}),
                                ...(onClick
                                  ? {
                                      onClick: (e) => {
                                        return joinFuncs(
                                          e,
                                          undefined,
                                          onClick,
                                          false,
                                        ).e;
                                      },
                                    }
                                  : {}),
                                ...(onFocus
                                  ? {
                                      onFocus: (e) => {
                                        const buffer = joinFuncs(
                                          e,
                                          undefined,
                                          onFocus,
                                          false,
                                        );
                                        const { x, y } = buffer;
                                        setSelection(x, y);
                                        return buffer.e;
                                      },
                                    }
                                  : {}),
                                ...(onBlur
                                  ? {
                                      onBlur: (e) => {
                                        return joinFuncs(
                                          e,
                                          undefined,
                                          onBlur,
                                          false,
                                        ).e;
                                      },
                                    }
                                  : {}),
                              }; // end of props

                              return {
                                ...hCell,
                                props: newProps,
                              };
                            }
                          : isObj
                          ? () => CELL.toString()
                          : () => CELL)(row)}
                      </td>
                    ); // end of buffer

                    if (hCell ? hCell.props.break : false) {
                      children = buffer;
                      return undefined;
                    }
                    return buffer;
                  }).filter((cell) => cell !== undefined) // end of row map
                }
              </tr>,
              children ? <tr style={rowStyle}>{children}</tr> : undefined,
            ];

            return rowBuffer;
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
      this.props.funcs.getCell = this.getCell;
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

  getRow = (index) => {
    const value = this.getValue();
    if (value === undefined) return '';

    if (index < 0 || index > value.length || index === undefined)
      return undefined;
    return value[index];
  };
  getCell = (row, col) => {
    const value = this.getValue();
    if (value === undefined) return '';

    if (
      value.length === 0 ||
      row === undefined ||
      row < 0 ||
      row > value.length
    )
      return undefined;
    if (
      value.length[row] === 0 ||
      col === undefined ||
      col < 0 ||
      col > value[row].length
    )
      return undefined;

    return value[row][col];
  };

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
