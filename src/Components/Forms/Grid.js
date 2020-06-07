import React, { useState } from 'react';

function Grid(props) {
  // init functions

  const [selection, setSelection] = useState(
    props.selection ? props.selection : [0, 0],
  );
  const getStart = () => (props.iStrt ? props.iStrt : 0);
  const initRowSize = (iSize = -1) => {
    let size = props.iRows ? props.iRows - getStart() : -1;
    if (size === -1) size = iSize;
    if (size === -1) size = props.hRows ? props.hRows.length - getStart() : 0;
    return size;
  };
  const initColSize = (iSize = -1) => {
    let size = props.iCols ? props.iCols : -1;
    if (size === -1) size = iSize;
    if (size === -1) size = props.hRows ? props.hRows[0].length : -1;
    if (size === -1) size = props.children ? 1 : 0;
    return size;
  };
  const initRows = () => {
    let hTable = props.hRows ? [[...props.hRows]] : [];
    if (hTable.length === 0) {
      hTable = props.children ? [[...props.children]] : [];
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
        const plus = props.bRowHeader === true ? 1 : 0;
        // Add Rows and Update Names
        for (let y = 0; y < iRows; y) {
          const iV = y + getStart();
          hTable.push([...hRow[0]]);
          for (let x = 0; x < hTable[0].length; x) {
            // console.log(
            //   'hTable:',
            //   hTable,
            //   'bDefined:',
            //   bDefined,
            //   'Values:',
            //   Values,
            //   'iV:',
            //   iV,
            //   'x:',
            //   x,
            // );
            // name
            const name = `${hTable[iV][x].props.name}_(${iV},${x})`;
            // value
            const bDefined = Values !== undefined && x - plus > -1;
            // Validate Data/Values
            let hasValue = Values ? Values.length >= iV : false;
            if (hasValue)
              hasValue = Values[iV] ? Values[iV].length >= x : false;
            if (hasValue)
              hasValue =
                bDefined && Values[iV][x - plus] !== ''
                  ? Values[iV][x - plus] !== 'undefined'
                  : false;
            let value = hasValue
              ? Values[iV][x - plus]
              : hTable[y][x].props.value;
            // Reserved tags
            tags.push(hTable[y][x].props.name);

            // define new row
            const dataset = {
              'data-x': x + (props.bAddRowHeader ? 1 : 0),
              'data-y': y + (props.hHeader ? 1 : 0),
            };
            // const inputProps = hTable[y][x].props.bMUI
            //   ? { ...hTable[y][x].props.inputProps, ...dataset }
            //   : undefined;

            const bValueAsChild = hTable[y][x].props.children === '[value]';
            const children =
              x === 0 && props.bRowHeader === true
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
  };

  // States Vars
  const [Values, setValues] = useState(props.Values ? props.Values : undefined); // An Array of components
  const [tags /* , setTags */] = useState([]); // An Array of components
  const hHeader = props.hHeader ? [props.hHeader] : undefined; // An Array of components
  const hFooter = props.hFooter ? [props.hFooter] : undefined; // An Array of components
  const [iRows, setRowSize] = useState(initRowSize());
  const [iCols, setColSize] = useState(initColSize());
  if (iRows !== props.iRows - getStart()) {
    setValues(props.Values);
    setRowSize(props.iRows - getStart());
  } else if (props.Values !== Values && Values !== undefined) {
    setValues(props.Values);
    setColSize(props.Values.length > 0 ? props.Values[0].length : 0);
  }
  // Rerender Vars
  const hRows = initRows(); // A 2d Array of components
  const style = props.style ? props.style : undefined;
  const cellStyle = props.cellStyle ? props.cellStyle : undefined;
  const rowStyle = props.rowStyle ? props.rowStyle : undefined; // This style doesn't work at the moment

  // {
  //   filter: selection[1] === y && x === 0 ? 'invert(0.9)' : 'invert(0)',
  //   backdropFilter:
  //     selection[1] === y + 1 ? 'invert(0.25)' : 'invert(0)',
  // }

  const gridObj = { rows: [], yStrt: 0 };
  const parseRows = (arr, style, noTab) => {
    // Funcs
    const bSelect = (x, y) => {
      if (props.bNoSel) return false;
      return (selection[0] === x && y === 0) || (selection[1] === y && x === 0); // Select Highlight Header Tabs
      // return selection[0] === x && selection[1] === y; // Highlight only the selected cell
    };
    const coX = (x) => {
      return props.colOrder ? props.colOrder[x] : x;
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
      const iY = props.rowOrder ? props.rowOrder[y] : y;

      // Add Row Header
      const row = [];
      if (props.bAddRowHeader) {
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
      let xPlus = !props.bAddRowHeader ? 1 : 0;
      let x = 0;
      const xEnd = arr[0].length + xPlus;
      for (xPlus; xPlus < xEnd; x) {
        const iX = coX(x);
        row.push(
          <th
            key={`th_${xPlus},${yPlus}`}
            style={{
              ...style,
              ...bSelectStyle(
                bSelect(
                  iX +
                    (props.bAddRowHeader === true
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
  };
  const compileGrid = () => {
    // Must be in this order
    if (hHeader) parseRows(hHeader, undefined);
    if (hRows) parseRows(hRows, rowStyle ? rowStyle : cellStyle);
    if (hFooter) parseRows(hFooter, undefined, true);
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
            setSelection([x, y]);

            if (props.onClick && x && y)
              props.onClick({
                x: x,
                y: y,
              });
          }}
        >
          {/* <thead style={{ ...props.headerStyle }}>{getHeader()}</thead>
        <tbody style={{ ...props.bodyStyle }}>{getRows()}</tbody>
        <tfoot>{getFooter()}</tfoot> */}
          <thead style={{ ...props.headerStyle }}>{getHeader()}</thead>
          <tbody style={{ ...props.bodyStyle }}>{getRows()}</tbody>
          <tfoot style={{ ...props.footerStyle }}>{getFooter()}</tfoot>
        </table>
      </div>
    );
  };

  // return render
  return getGrid();
}

export default Grid;
