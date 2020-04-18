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
            const value = hasValue
              ? Values[iV][x - plus]
              : hTable[y][x].props.value;
            // Reserved tags
            tags.push(hTable[y][x].props.name);

            // define new row
            // console.log('bMUI:', hTable[y][x].props);
            const dataset = { 'data-x': x, 'data-y': y + 1 };
            const inputProps = hTable[y][x].props.bMUI
              ? { ...hTable[y][x].props.inputProps, ...dataset }
              : undefined;
            const newRow = {
              ...hTable[y][x],
              props: {
                ...hTable[y][x].props,
                dataset: { ...dataset },
                inputProps,
                children:
                  x === 0 && props.bRowHeader === true
                    ? `${y + 1}`
                    : hTable[y][x].props.children,
                value,
                name,
                // key: name,
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
  const hFooter = props.hFooter ? [props.hFooter] : undefined; // An Array of components
  const hRows = initRows(); // A 2d Array of components
  const style = props.style ? props.style : undefined;
  const cellStyle = props.cellStyle ? props.cellStyle : undefined;
  const rowStyle = props.rowStyle ? props.rowStyle : undefined; // This style doesn't work at the moment

  // {
  //   filter: selection[1] === y && x === 0 ? 'invert(0.9)' : 'invert(0)',
  //   backdropFilter:
  //     selection[1] === y + 1 ? 'invert(0.25)' : 'invert(0)',
  // }

  const parseRows = (arr, noStyle = false) => {
    const tcs = noStyle === false ? cellStyle : undefined;
    const trs = noStyle === false ? rowStyle : undefined;
    const rows = [];
    for (let y = 0; y < arr.length; y) {
      const iY = props.rowOrder
        ? props.rowOrder[y] + (props.hHeader ? 1 : 0)
        : y + (props.hHeader ? 1 : 0);
      const row = [];
      for (let x = 0; x < arr[0].length; x) {
        const plus = props.bRowHeader === true ? 1 : 0;
        const iX = props.colOrder
          ? props.colOrder[x] + (plus ? 1 : 0)
          : x + (plus ? 1 : 0);
        const bSelect = // Note: this is ignoring ordering on purpose
          (selection[1] === y + (props.hHeader ? 1 : 0) && x === 0) ||
          (selection[0] === iX && noStyle);
        row.push(
          <th
            key={`th_${iX},${iY}`}
            style={{
              ...(iX === 0 && props.rowStyle ? props.rowStyle : tcs),
              filter: bSelect ? 'invert(0.9)' : 'invert(0)',
              backdropFilter: bSelect ? 'invert(0.25)' : 'invert(0)',
              padding: 'none',
            }}
          >
            {arr[y][iX]}
          </th>,
        );
        x += 1;
      }
      rows.push(
        <tr key={`tr_${iY}`} style={{ ...trs }}>
          {row}
        </tr>,
      );
      y += 1;
    }
    return rows;
  };
  const getHeader = () => {
    if (!hHeader) return '';
    return parseRows(hHeader, true);
  };
  const getFooter = () => {
    if (!hFooter) return undefined;
    return parseRows(hFooter);
  };
  const getRows = () => {
    if (!hRows) return '';
    return parseRows(hRows);
  };
  const getGrid = () => (
    <div style={{ ...style }}>
      <table
        style={{ tableLayout: 'fixed' }}
        onChange={(e) => {
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
        <thead style={{ ...props.headerStyle }}>{getHeader()}</thead>
        <tbody style={{ ...props.bodyStyle }}>{getRows()}</tbody>
        <tfoot>{getFooter()}</tfoot>
      </table>
    </div>
  );

  // return render
  return getGrid();
}

export default Grid;
