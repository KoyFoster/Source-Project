import React, { useState, useEffect } from 'react';

// class Node {
//   constructor(props, nodes = {}) {
//     this.props = props;
//     this.flatNodes = nodes;
//   }

//   setProps(props) {
//     this.props = props;
//   }

//   clone() {
//     const clonedNodes = {};

//     // Re-construct nodes one level deep to avoid shallow copy of mutable characteristics
//     Object.keys(this.flatNodes).forEach((value) => {
//       const node = this.flatNodes[value];
//       clonedNodes[value] = { ...node };
//     });

//     return new Node(this.props, clonedNodes);
//   }

//   getNode(value) {
//     return this.flatNodes[value];
//   }

//   flattenNodes(nodes, parent = {}, depth = 0) {
//     if (!Array.isArray(nodes) || nodes.length === 0) {
//       return;
//     }

//     const { disabled, noCascade } = this.props;

//     // Flatten the `node` property for internal lookups
//     nodes.forEach((node, index) => {
//       const isParent = this.nodeHasChildren(node);

//       this.flatNodes[node.value] = {
//         label: node.label,
//         value: node.value,
//         children: node.children,
//         parent,
//         isChild: parent.value !== undefined,
//         isParent,
//         isLeaf: !isParent,
//         showCheckbox:
//           node.showCheckbox !== undefined ? node.showCheckbox : true,
//         disabled: this.getDisabledState(node, parent, disabled, noCascade),
//         treeDepth: depth,
//         index,
//       };
//       this.flattenNodes(node.children, node, depth + 1);
//     });
//   }

//   nodeHasChildren(node) {
//     return Array.isArray(node.children);
//   }

//   getDisabledState(node, parent, disabledProp, noCascade) {
//     if (disabledProp) {
//       return true;
//     }

//     if (!noCascade && parent.disabled) {
//       return true;
//     }

//     return Boolean(node.disabled);
//   }

//   deserializeLists(lists) {
//     const listKeys = ['checked', 'expanded'];

//     // Reset values to false
//     Object.keys(this.flatNodes).forEach((value) => {
//       listKeys.forEach((listKey) => {
//         this.flatNodes[value][listKey] = false;
//       });
//     });

//     // Deserialize values and set their nodes to true
//     listKeys.forEach((listKey) => {
//       lists[listKey].forEach((value) => {
//         if (this.flatNodes[value] !== undefined) {
//           this.flatNodes[value][listKey] = true;
//         }
//       });
//     });
//   }

//   // percolate parent path into string
//   getParentPath(node, path) {
//     if (!node) return path;

//     if (node.parent.children)
//       path =
//         this.getParentPath(this.getNode(node.parent.value), node.parent.label) +
//         this.props.parentSeparator +
//         path;

//     return path;
//   }

//   serializeList(key) {
//     const list = [];
//     let string = '';

//     Object.keys(this.flatNodes).forEach((value) => {
//       console.log(
//         `this.flatNodes[${value}]:`,
//         this.flatNodes[value],
//         `this.flatNodes[${value}][${key}]:`,
//         this.flatNodes[value][key],
//       );
//       if (this.flatNodes[value][key]) {
//         list.push(value);
//         // compile string result
//         if (key === 'checked') {
//           let buffer = '';

//           // get parent
//           const parent = this.getNode(this.flatNodes[value].parent.value);

//           // check if all siblings are checked off
//           const bAllSibs = parent
//             ? !parent.children.find((child) => {
//                 const trueChild = this.getNode(child.value);
//                 return !trueChild.checked;
//               })
//             : true;
//           const bShowParent =
//             (bAllSibs && this.props.saveParents) || this.props.saveExpanded;
//           const bShowChild = !bAllSibs || this.props.saveChildren;
//           // console.log(
//           //   `${bShowChild} = ${!bAllSibs} || ${this.props.saveChildren}`,
//           // );

//           // Append parent to child
//           // Appends parent to list
//           // check for parent
//           if (parent)
//             if (bShowParent && parent.children) {
//               if (parent) {
//                 buffer += this.getParentPath(
//                   this.getNode(parent.value),
//                   this.getNode(parent.value).label,
//                 );
//               }

//               // append parent child separator if child will be present
//               if (buffer && bShowChild) buffer += this.props.parentSeparator;
//             }

//           // child
//           if (bShowChild || !buffer) buffer += this.flatNodes[value].label;

//           // append buffer to string
//           string +=
//             (string
//               ? (this.props.separateLine ? this.props.separateLine : '') +
//                 this.props.separator
//               : '') + buffer;
//         }
//       } // end of checked
//     });

//     // console.log(`Serial String${key}:`, { list, string });
//     return { list, string };
//   } // end of serializeList

//   expandAllNodes(expand) {
//     Object.keys(this.flatNodes).forEach((value) => {
//       if (this.flatNodes[value].isParent) {
//         this.flatNodes[value].expanded = expand;
//       }
//     });

//     return this;
//   }

//   toggleChecked(
//     node,
//     isChecked,
//     checkModel,
//     noCascade,
//     percolateUpward = true,
//   ) {
//     const flatNode = this.flatNodes[node.value];
//     const modelHasParents =
//       [CheckModel.PARENT, CheckModel.ALL].indexOf(checkModel) > -1;
//     const modelHasLeaves =
//       [CheckModel.LEAF, CheckModel.ALL].indexOf(checkModel) > -1;

//     if (flatNode.isLeaf || noCascade) {
//       if (node.disabled) {
//         return this;
//       }

//       this.toggleNode(node.value, 'checked', isChecked);
//     } else {
//       if (modelHasParents) {
//         this.toggleNode(node.value, 'checked', isChecked);
//       }

//       if (modelHasLeaves) {
//         // Percolate check status down to all children
//         flatNode.children.forEach((child) => {
//           this.toggleChecked(child, isChecked, checkModel, noCascade, false);
//         });
//       }
//     }

//     // Percolate check status up to parent
//     // The check model must include parent nodes and we must not have already covered the
//     // parent (relevant only when percolating through children)
//     if (percolateUpward && !noCascade && flatNode.isChild && modelHasParents) {
//       this.toggleParentStatus(flatNode.parent, checkModel);
//     }

//     return this;
//   }

//   toggleParentStatus(node, checkModel) {
//     const flatNode = this.flatNodes[node.value];

//     if (flatNode.isChild) {
//       if (checkModel === CheckModel.ALL) {
//         this.toggleNode(
//           node.value,
//           'checked',
//           this.isEveryChildChecked(flatNode),
//         );
//       }

//       this.toggleParentStatus(flatNode.parent, checkModel);
//     } else {
//       this.toggleNode(
//         node.value,
//         'checked',
//         this.isEveryChildChecked(flatNode),
//       );
//     }
//   }

//   isEveryChildChecked(node) {
//     return node.children.every((child) => this.getNode(child.value).checked);
//   }

//   toggleNode(nodeValue, key, toggleValue) {
//     this.flatNodes[nodeValue][key] = toggleValue;

//     return this;
//   }
// } // end of node

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

  const InitRowOrder = (
    val,
    rows = -1,
    subRows = '' /* To be supplied with comma delimited non ordered row indexes that will be removed */,
  ) => {
    if (val === undefined) return [];
    if (rows < 0) rows = iRows;
    const buffer = [];
    for (let y = 0; y < iRows; y) {
      buffer.push(y);
      y += 1;
    }
    return buffer;
  };
  const NormalizeRowOrder = () => {
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
  };
  const UpdateValueRowOrder = () => {
    const NewOrder = [];

    // reorder the Value
    for (let i = 0; i < Values.length; i) {
      NewOrder.push(Values[rowOrder[i]]);
      i += 1;
    }
    if (GridFuncs) if (GridFuncs.setValue) GridFuncs.setValue(NewOrder);

    // reset the row order
    if (GridFuncs)
      if (GridFuncs.setRowOrder) GridFuncs.setRowOrder(InitRowOrder(Values));
  };

  const InitColOrder = (val) => {
    if (val === undefined) return [];
    const buffer = [];
    for (let x = 0; x < iCols; x) {
      buffer.push(x);
      x += 1;
    }
    return buffer;
  };

  // Row Offset
  const iRowOS = props.hHeader ? 1 : 0;

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

            // define new row
            const dataset = {
              'data-x': x + (props.bAddRowHeader ? 1 : 0),
              'data-y': y + iRowOS,
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
  const { Data } = props; // An Array of components
  const ValuesOffset = props.ValuesOffset ? props.ValuesOffset : 0; // An Array of components
  const Values = Data.slice(ValuesOffset, Data.length); // An Array of components
  const { GridFuncs } = props; // An Array of components
  const hHeader = props.hHeader ? [props.hHeader] : undefined; // An Array of components
  const hFooter = props.hFooter ? [props.hFooter] : undefined; // An Array of components
  const iRows = initRowSize();
  const iCols = initColSize();
  let { rowOrder } = props;
  if (!rowOrder) {
    rowOrder = InitRowOrder(Values, iRows);
  }
  const { colOrder } = props;

  //

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
  const parseRows = (arr, style, rOrder, noTab = false) => {
    // Funcs
    const bSelect = (x, y) => {
      if (props.bNoSel) return false;
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
      const iY = rOrder ? rOrder[y] : y;
      if (iY === undefined) break;

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
    if (hRows) parseRows(hRows, rowStyle ? rowStyle : cellStyle, rowOrder);
    if (hFooter) parseRows(hFooter, undefined, undefined, true);
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
            setSelection([
              x,
              y, // rowOrder && x !== 0 ? rowOrder[y - iRowOS] + iRowOS : y,
            ]);

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

  function moveRow(iRow, iDir) {
    // if not direction, just end
    if (!iDir) return {};
    const newPos = iRow + iDir;

    // if new position is out of range
    if (newPos <= -1 || newPos > iRows - iRowOS) {
      console.error('Out Of Range');
      return {};
    }
    if (!rowOrder) {
      console.error('moveRow: rowOrder not defined');
      return {};
    }

    // reposition selected row
    const buffIndex = rowOrder.splice(iRow, 1);
    rowOrder.splice(newPos, 0, buffIndex[0]);

    // check currently selection for change in position
    let newSel;
    if (iRow + iRowOS === selection[1]) {
      newSel = [selection[0], selection[1] + iDir];
    }
    // validate
    if (newSel[1] >= hRows.length) {
      newSel[1] = hRows.length;
    }
    if (newSel[1] <= iRowOS) {
      newSel[1] = iRowOS;
    }

    // setSelection(newSel);
    selection[0] = newSel[0];
    selection[1] = newSel[1];

    return { rowOrder, selection: newSel };
  }

  const UpdateRowOrder = (rowOrder) => {
    // Here we can either update the value order or just update the order
    if (rowOrder)
      if (GridFuncs)
        if (GridFuncs.setRowOrder) {
          GridFuncs.setRowOrder(rowOrder);
          // GridFuncs.ForceUpdate();
        }
  };

  // handlers
  const MoveSelUp = () => {
    const iRow = selection[1] - iRowOS;
    const result = moveRow(iRow, 1);

    // Here we can either update the value order or just update the order
    if (result.selection) setSelection(result.selection);
    // UpdateRowOrder(result.rowOrder);
    UpdateValueRowOrder();
  };
  const MoveSelDown = () => {
    const iRow = selection[1] - iRowOS;
    const result = moveRow(iRow, -1);

    // Here we can either update the value order or just update the order
    if (result.selection) setSelection(result.selection);
    // UpdateRowOrder(result.rowOrder);
    UpdateValueRowOrder();
  };

  // init
  if (GridFuncs) {
    GridFuncs.MoveSelDown = MoveSelDown;
    GridFuncs.MoveSelUp = MoveSelUp;
  }

  //Setup Listener Events
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  // return render
  return getGrid();
}

export default Grid;
