import React, { useState, useEffect } from 'react';

const Funcs = {
  initTable: (
    Value,
    iRows,
    iCols,
    iStart,
    hRows,
    children,
    bRowHeader,
    bAddRowHeader,
    hHeader,
  ) => {
    let hTable = hRows ? [[...hRows]] : [];
    if (hTable.length === 0) {
      hTable = children ? [[...children]] : [];
    }

    // Copy to hRow if single row passed
    const hRow = hTable.length === 1 ? [...hTable] : [];

    // Validate
    if (hTable.length === 0 && iRows) {
      for (let y = 0; y < iRows; y) {
        hTable.push([new Array(iCols)]);
        y += 1;
      }
    }
    // Multiply rows based on row size
    if (iRows) {
      if (hTable.length <= iRows) {
        // Clear first row as it will be replaced
        if (hTable.length === 1) hTable.splice(0, 1);
        const plus = bRowHeader === true ? 1 : 0;
        // Add Rows and Update Names
        for (let y = 0; y < iRows; y) {
          const iV = y + iStart;
          hTable.push([...hRow[0]]);
          for (let x = 0; x < hTable[0].length; x) {
            // name
            const name = `${hTable[iV][x].props.name}_(${iV},${x})`;
            // value
            const bDefined = Value !== undefined && x - plus > -1;
            // Validate Data/Value
            let hasValue = Value ? Value.length >= iV : false;
            if (hasValue) hasValue = Value[iV] ? Value[iV].length >= x : false;
            if (hasValue)
              hasValue =
                bDefined && Value[iV][x - plus] !== ''
                  ? Value[iV][x - plus] !== 'undefined'
                  : false;
            let value = hasValue
              ? Value[iV][x - plus]
              : hTable[y][x].props.value;

            // define new row
            const dataset = {
              'data-x': x + (bAddRowHeader ? 1 : 0),
              'data-y': y + (hHeader ? 1 : 0),
            };
            // const inputProps = hTable[y][x].props.bMUI
            //   ? { ...hTable[y][x].props.inputProps, ...dataset }
            //   : undefined;

            const bValueAsChild = hTable[y][x].props.children === '[value]';
            const children =
              x === 0 && bRowHeader === true
                ? `${y + 1}`
                : bValueAsChild
                ? value
                : hTable[y][x].props.children;

            if (bValueAsChild) value = undefined;

            const newRow = {
              ...hTable[y][x],
              props: {
                ...hTable[y][x].props,
                ...dataset,
                // inputProps: { ...hTable[y][x].props.inputProps, ...dataset },

                children: children,
                value,
                name,
              },
            };
            hTable[y][x] = newRow;

            x += 1;
          }
          y += 1;
        }
      }
    } // End of row cloning
    else {
      return [];
    }
    return hTable;
  },
  // props.bNoSel, props.colOrder, props.rowOrder, props.bAddRowHeader, selection,
  parseRows: (
    arr,
    gridObj,
    bNoSel,
    colOrder,
    rowOrder,
    bAddRowHeader,
    selection,
    style,
    noTab,
  ) => {
    // console.log('parseRows: rowOrder:', rowOrder);

    // Funcs
    const bSelect = (x, y) => {
      // console.log('4. selection:', selection);
      if (bNoSel) return false;
      return (selection[0] === x && y === 0) || (selection[1] === y && x === 0); // Select Highlight Header Tabs
      // return selection[0] === x && selection[1] === y; // Highlight only the selected cell
    };
    const coX = (x) => {
      return colOrder ? colOrder[x] : x;
    };
    const bSelectStyle = (selected) => {
      if (!selected) return undefined;
      return {
        filter: 'invert(0.9)',
        backdropFilter: 'invert(0.25)',
      };
    };

    // Parse
    let yPlus = gridObj.yStrt;
    let y = 0;
    for (yPlus; yPlus < arr.length + gridObj.yStrt; yPlus) {
      const iY = rowOrder ? rowOrder[y] : y;
      if (iY === undefined) break;

      // Add Row Header
      const row = [];
      if (bAddRowHeader) {
        row.push(
          yPlus === 0 ? (
            <th name="Origin" key="Origin" data-x={0} data-y={0}>
              [{`${selection}`}]
            </th>
          ) : (
            <th
              name={`hR_${y}`}
              key={`hR_${y}`}
              data-x={0}
              data-y={yPlus}
              style={{
                ...bSelectStyle(bSelect(0, yPlus)),
              }}
            >
              {`${noTab ? '' : yPlus}`}
            </th>
          ),
        );
      } // End Add Row Header

      // Compile Row
      let xPlus = !bAddRowHeader ? 1 : 0;

      let x = 0;
      const xEnd = arr[0].length + xPlus;
      for (xPlus; xPlus < xEnd; x) {
        const iX = coX(x);
        // console.log('arr:', arr, 'iY:', iY, 'iX:', iX);

        row.push(
          <th
            key={`th_${xPlus},${yPlus}`}
            style={{
              ...style,
              ...bSelectStyle(
                bSelect(
                  iX +
                    (bAddRowHeader === true
                      ? 1
                      : 0) /* An unfortunate exception */,
                  yPlus,
                ),
              ),
              padding: 'none',
            }}
          >
            {arr[iY][iX]}
          </th>,
        );
        xPlus += 1;
        x += 1;
      } // End of compile row
      // Add Row
      gridObj.rows.push(
        <tr key={`tr_${y}`} style={{ ...style }}>
          {row}
        </tr>,
      );
      y += 1;
      yPlus += 1;
    } // End of parse
    gridObj.yStrt = y;
  },
  initRowSize: (iRows, hRows, iStart = 0, iSize = -1) => {
    let size = iRows ? iRows - iStart : -1;
    if (size === -1) size = iSize;
    if (size === -1) size = hRows ? hRows.length - iStart : 0;
    return size;
  },
  initColSize: (iCols, hRows, children) => {
    let size = iCols ? iCols : -1;
    if (size === -1) size = hRows ? hRows[0].length : -1;
    if (size === -1) size = children ? 1 : 0;
    return size;
  },

  NormalizeRowOrder: (rowOrder) => {
    let index = 0;
    const sortedOrder = rowOrder
      .map((x) => {
        const elem = [x, index];
        index += 1;
        return elem;
      })
      .sort();
    const newOrder = [];

    for (let i = 0; i < rowOrder.length; i) {
      newOrder.push(sortedOrder[i][1]);

      i += 1;
    }
    return newOrder;
  },

  // Add Row Note: Currently the only function that modifies 'value'
  addRow: (iAdd, iIndex, rowOrder, selection, iRows, iCols, value) => {
    // console.log('3. selection:', selection);
    // Validate
    if (iAdd === 0) return; // adding no value is pointless
    if (iIndex <= 0 && iAdd < 0) return; // If Row 0, do not subtract
    if (iIndex <= 0 && iAdd > 0) iIndex = 1; // Adding at 0 is ok

    // Add
    if (iAdd > 0) {
      for (let i = 0; i < iAdd; i) {
        const start =
          (rowOrder.length === iRows && rowOrder.length > 0
            ? rowOrder[iIndex - 1]
            : 0) + 1;
        const end = 0;

        value.splice(start, end, new Array(iCols));
        // Add to the end
        rowOrder.splice(
          (rowOrder.length === iRows && rowOrder.length > 0
            ? rowOrder[iIndex - 1]
            : 0) + 1,
          0,
          iRows,
        );
        i += 1;
      }
    }
    // Subtract
    else if (iAdd < 0) {
      for (let i = 0; i < -1 * iAdd; i) {
        const start = rowOrder[iIndex - 1];
        const end = 1;
        value.splice(start, end);
        rowOrder.splice(iIndex - 1, 1);
        i += 1;
      }
    }

    // Update Row Number
    const rows = iRows + iAdd;
    const iSel = selection[1] + iAdd;
    // setNumRows(rows);

    const newSel = [selection[0], iSel === 0 && rows ? 1 : iSel];

    // Update Row Order
    // if (iAdd > 0) setRowOrder(rowOrder);
    // else setRowOrder(NormalizeRowOrder());

    // setValue(value);

    return {
      Value: value,
      rowOrder: iAdd > 0 ? rowOrder : this.NormalizeRowOrder(rowOrder),
      iRows: rows,
      iSel: newSel,
    };
  }, // end of addRow

  // Move Row
  moveRow: (iRow, iDir, rowOrder, iSel, iRows) => {
    // console.log(
    //   'iRow:',
    //   iRow,
    //   'iDir:',
    //   iDir,
    //   'rowOrder:',
    //   rowOrder,
    //   'iSel:',
    //   iSel,
    //   'iRows:',
    //   iRows,
    // );
    if ((iDir > 0 && iRow + iDir > iRows) || iRows === 0) {
      return {};
    }
    if ((iDir < 0 && iRow + iDir < 1) || iRows === 0) {
      return {};
    }

    const buffIndex = rowOrder.splice(iRow - 1, 1);

    rowOrder.splice(iRow + iDir - 1, 0, buffIndex[0]);

    const newSel = [iSel[0], iRow + iDir];
    // setRowOrder(rowOrder);

    return { rowOrder, iSel: newSel };
  },
};

const Grid = (props) => {
  // vars
  const { GridFuncs } = props;
  const getStart = () => (props.iStrt ? props.iStrt : 0);
  const hHeader = props.hHeader ? [props.hHeader] : undefined; // An Array of components
  const hFooter = props.hFooter ? [props.hFooter] : undefined; // An Array of components

  // States
  const [iSel, setSelection] = useState(
    props.selection ? props.selection : [1, 1],
  );
  function getSel() {
    return iSel;
  }
  const [Value, setValue] = useState(props.Value); // An Array of components
  const [iRows, setRowSize] = useState(
    Funcs.initRowSize(props.iRows, props.hRows, getStart()),
  );
  const [iCols, setColSize] = useState(
    Funcs.initColSize(props.iCols, props.hRows, props.children),
  );

  // New States  // 2s array: d1: row index, d2: true index, used for consistent names

  const InitRowOrder = (
    val,
    rows = -1,
    subRows = '' /* To be supplied with comma delimited non ordered row indexes that will be removed */,
  ) => {
    if (val === undefined && Array.isArray(val)) return val;
    rows = rows > -1 ? rows : iRows;
    const buffer = [];
    for (let y = 0; y < rows; y) {
      buffer.push(y);
      y += 1;
    }
    return buffer;
  };
  const InitColOrder = (val) => {
    // const isArray = val !== undefined && Array.isArray(val);
    // if (isArray) return val;
    const buffer = [];
    for (let x = 0; x < iCols; x) {
      buffer.push(x);
      x += 1;
    }
    return buffer;
  };
  const [colOrder, setColOrder] = useState(InitColOrder(props.colOrder));
  const [rowOrder, setRowOrder] = useState(InitRowOrder(props.rowOrder));
  // console.log('colOrder:', colOrder, iCols);

  const [headerHeight, setHeaderHeight] = useState(
    props.headerHeight ? props.headerHeight : 24,
  );
  const [rowHeight, setRowHeight] = useState(
    props.rowHeight !== 0 ? props.rowHeight : 24,
  );
  const [rowHeaderWidth, setRowHeaderWidth] = useState(78); // Note: Windows default size is 78px, but I would prefer 24px

  // Forced updating via prop changes. --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  // There needs to be a better way of doing this.
  // Auto State Update Statement
  // if (iRows !== props.iRows - getStart()) {
  //   setValue(props.Value);
  //   setRowSize(props.iRows - getStart());
  // }
  // if (props.Value !== Value && Value !== undefined) {
  //   setValue(props.Value);
  //   if (props.colOrder !== colOrder || props.Value[0].length > iCols)
  //     setColSize(props.Value.length > 0 ? props.Value[0].length : 0);
  //   setColOrder(InitColOrder(colOrder));
  // } // --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
  // Update Functions
  // Currently The only Update Functions that need to occur are listed below

  // handlers
  const MoveSelUp = () => {
    // console.log('1. iSel:', iSel);
    const result = Funcs.moveRow(
      getSel()[1],
      1,
      rowOrder,
      [...getSel()],
      iRows,
    );
    // console.log('result:', result);
    if (result.rowOrder) setRowOrder(result.rowOrder);
    if (result.iSel) setSelection(result.iSel);
  };
  const MoveSelDown = () => {
    const result = Funcs.moveRow(
      getSel()[1],
      -1,
      rowOrder,
      [...getSel()],
      iRows,
    );

    // console.log('result:', result);
    if (result.rowOrder) setRowOrder(result.rowOrder);
    if (result.iSel) setSelection(result.iSel);

    // if (result.iRows) setRowSize(result.iRows);
    // if (result.Value) setValue(result.Value);
  };

  // Rerender Vars: Currently Does This Every Rerender
  const hRows = Funcs.initTable(
    Value,
    iRows,
    iCols,
    getStart(),
    props.hRows,
    props.children,
    props.bRowHeader,
    props.bAddRowHeader,
    props.hHeader,
  ); // A 2d Array of components

  const style = props.style ? props.style : undefined;
  const cellStyle = props.cellStyle ? props.cellStyle : undefined;
  const rowStyle = props.rowStyle ? props.rowStyle : undefined; // This style doesn't work at the moment

  const gridObj = { rows: [], yStrt: 0 };
  const compileGrid = () => {
    // Must be in this order
    if (hHeader)
      Funcs.parseRows(
        hHeader,
        gridObj,
        props.bNoSel,
        colOrder,
        undefined,
        props.bAddRowHeader,
        iSel,
        undefined,
      );
    if (hRows)
      Funcs.parseRows(
        hRows,
        gridObj,
        props.bNoSel,
        colOrder,
        rowOrder,
        props.bAddRowHeader,
        iSel,
        rowStyle ? rowStyle : cellStyle,
      );

    if (hFooter)
      Funcs.parseRows(
        hFooter,
        gridObj,
        props.bNoSel,
        colOrder,
        undefined,
        props.bAddRowHeader,
        iSel,
        undefined,
        true,
      );
  };

  const getHeader = () => {
    if (!hHeader) return [];
    return gridObj.rows.slice(0, 1);
  };
  const getRows = () => {
    if (!hRows) return [];
    return gridObj.rows.slice(
      hHeader ? 1 : 0,
      gridObj.rows.length - (hFooter ? 1 : 0),
    );
  };
  const getFooter = () => {
    if (!hFooter) return [];
    return gridObj.rows.slice(gridObj.rows.length - 1, gridObj.rows.length);
  };
  const getGrid = () => {
    compileGrid();
    return (
      <div style={{ ...style }}>
        <table
          style={{ tableLayout: 'fixed' }}
          onChange={(e) => {
            /* Validation: Skip if no coordinate are returned */
            if (
              e.target.dataset.x === undefined ||
              e.target.dataset.y === undefined
            )
              return;
            const x = parseInt(e.target.dataset.x, 10);
            const y = parseInt(e.target.dataset.y, 10);

            if (props.onChange)
              props.onChange({
                x: x,
                y: y,
                value: e.target.value,
                checked: e.target.checked,
                name: e.target.name,
              });
          }}
          onClick={(e) => {
            /* Validation: Skip if no coordinate are returned */
            if (
              e.target.dataset.x === undefined ||
              e.target.dataset.y === undefined
            )
              return;
            const x = parseInt(e.target.dataset.x, 10);
            const y = parseInt(e.target.dataset.y, 10);
            setSelection([Number(x), Number(y)]);

            if (props.onClick && x && y)
              props.onClick({
                x: x,
                y: y,
              });
          }}
        >
          <thead style={{ ...props.headerStyle }}>{getHeader()}</thead>
          <tbody style={{ ...props.bodyStyle }}>{getRows()}</tbody>
          <tfoot style={{ ...props.footerStyle }}>{getFooter()}</tfoot>
        </table>
      </div>
    );
  };

  //Setup Listener Events
  useEffect(() => {
    // init
    if (GridFuncs) {
      GridFuncs({
        setValue: setValue,
        setRowSize: setRowSize,
        setColSize: setColSize,
        setColOrder: setColOrder,
        setRowOrder: setRowOrder,
        MoveSelUp: MoveSelUp,
        MoveSelDown: MoveSelDown,
        getSel: getSel,
      });
    }
    // eslint-disable-next-line
  }, []);

  // return render
  // console.log('', getSel(), `:${props.name} Selection`, 'Value:', Value);
  return getGrid();
};

export default Grid;
