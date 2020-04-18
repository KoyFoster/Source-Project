import React, { useState } from 'react';

function Grid(props) {
  // init functions
  const getStart = () => {
    return props.iStrt ? props.iStrt : 0;
  };
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
    let hRows = props.hRows ? [[...props.hRows]] : [];
    if (hRows.length === 0) {
      hRows = props.children ? [[...props.children]] : [];
    }

    // Copy to hRow if single row passed
    const hRow = hRows.length === 1 ? [...hRows] : [];

    // Validate
    if (hRows.length === 0 && iRows) {
      for (let y = 0; y < iRows; y) {
        hRows.push([new Array(iCols)]);
        y += 1;
      }
    }
    // Multiply rows based on row size
    if (iRows) {
      if (hRows.length < iRows) {
        // Clear first row as it will be replaced
        if (hRows.length === 1) hRows.splice(0, 1);
        const plus = props.bRowHeader ? 1 : 0;
        // Add Rows and Update Names
        for (let y = 0; y < iRows; y) {
          const iV = y + getStart();
          hRows.push([...hRow[0]]);
          for (let x = 0; x < hRows[0].length; x) {
            // name
            const name = `${hRows[y][x].props.name}_(${x},${y})`;
            // value
            const bDefined = Values !== undefined && x - plus > -1;
            const hasValue =
              bDefined && Values[iV][x - plus] !== ''
                ? Values[iV][x - plus] !== 'undefined'
                : false;
            const value = hasValue
              ? Values[iV][x - plus]
              : hRows[y][x].props.value;
            // Reserved tags
            tags.push(hRows[y][x].props.name);

            // define new row
            hRows[y][x] = {
              ...hRows[y][x],
              props: {
                ...hRows[y][x].props,
                children:
                  x === 0 && props.bRowHeader
                    ? `${y + 1}`
                    : hRows[y][x].props.children,
                value,
                name,
                // key: name,
              },
            };

            x += 1;
          }
          y += 1;
        }
      }
    } // End of row cloning
    else {
      return [];
    }
    return hRows;
  };

  // States Vars
  const [Values, setValues] = useState(props.Values ? props.Values : undefined); // An Array of components
  const [tags /* , setTags */] = useState([]); // An Array of components
  const [hHeader /* , setHeader */] = useState(
    props.hHeader ? [props.hHeader] : undefined,
  ); // An Array of components
  const [iRows, setRowSize] = useState(initRowSize());
  const [iCols, setColSize] = useState(initColSize());
  if (iRows !== props.iRows - getStart()) {
    // console.log(iRows, '!==', props.iRows, props.Values);
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

  const parseRows = (arr, noStyle = false) => {
    const tcs = noStyle === false ? cellStyle : undefined;
    const trs = noStyle === false ? rowStyle : undefined;
    const rows = [];
    for (let y = 0; y < arr.length; y) {
      const row = [];
      for (let x = 0; x < arr[0].length; x) {
        const iX = props.colOrder[x];
        row.push(
          <th key={`th_${iX},${y}`} style={{ ...tcs, padding: 'none' }}>
            {arr[y][iX]}
          </th>,
        );
        x += 1;
      }
      rows.push(
        <tr key={`tr_${y}`} style={{ ...trs }}>
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
          if (props.onChange) props.onChange(e);
        }}
        onClick={() => {
          if (props.onClick) props.onClick([3, 3]);
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
