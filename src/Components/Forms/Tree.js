/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';

const Tree = props => {
  // Vars
  const { data } = props;
  const { style } = props;
  const { value } = props;
  const { setValue } = props;
  const { getItem } = props;
  const listProps = props.listProps ? props.listProps : {};
  const treeProps = props.treeProps ? props.treeProps : { checkboxes: true };
  const parentSep = listProps ? listProps.parentSeparator : ',';
  const childSep = listProps ? listProps.separator : ',';
  const lineSep = listProps ? listProps.separateLine : ',';

  // get value as data string
  // Note: To be completed later
  // Note: parentSeps are handled in iterateItems
  const getValueAsDataStr = dataVal => {
    let buffer = '';
    let i = 0;
    if (Array.isArray(dataVal)) {
      dataVal.map(function get(val) {
        i += 1;
        buffer += val
          ? val +
            (buffer ? childSep : '') +
            (lineSep !== ',' && i < dataVal.length ? lineSep : '')
          : '';
        return null;
      });
    }
    return buffer;
  };

  // eslint-disable-next-line arrow-body-style
  const returnVal = (iParent, i, depth, val = undefined, bParent = false) => {
    // if root parent
    if (iParent === undefined && bParent) {
      // eslint-disable-next-line no-nested-ternary
      return val !== undefined
        ? treeProps.saveParentText
          ? data[i]
          : ''
        : undefined;
    }
    // eslint-disable-next-line no-nested-ternary
    return treeProps.saveChildrenText === true || iParent === i
      ? !treeProps.saveParentText
        ? (treeProps.saveExpandedTree ? data[iParent] + parentSep : '') +
          data[i].slice(depth, data[i].length)
        : ''
      : '';
  };

  const iterateItems = (
    val = [],
    index = undefined,
    depth = 0,
    iSel = undefined,
    iParent = undefined,
  ) => {
    let i = index !== undefined ? index : 0;

    // iterate
    let bAllUnchecked = true;
    for (i; i < data.length; i) {
      const I = i; // used primarily for remembering the parent items
      // Data
      const isArray = Array.isArray(data[i]);
      const curData = isArray ? data[i].toString() : data[i];
      const nextData = data.length > i + 1 ? data[i + 1].toString() : -1;
      // Item check
      let dataLen = data.length > depth ? data.length : -1;
      const bChild = curData[depth] === ':';
      /* Depth Check: Check if no longer in depth */
      if (depth > 0) {
        // Note: "I don't understand what I'm doing on these two lines but it's important"
        let inDepth = curData.length > depth - 1;
        inDepth = dataLen ? curData[depth - 1] === ':' : false;

        // Return if at end of depth
        if (!inDepth) {
          return {
            val,
            index: i,
            depth: depth - 1,
            iSel,
            iParent,
            allUnchecked: bAllUnchecked,
          };
        }
        // Check Next Item
        if (inDepth && nextData !== -1) {
          dataLen = nextData.length > depth - 1 ? nextData.length : -1;
        }
      } // end depth check

      if (dataLen === -1) break; // End of item check

      // Parent Check
      let validate = nextData !== -1;
      validate = validate ? nextData.length > depth : false;
      const bParent = validate ? nextData[depth] === ':' : false;

      // /////////////////////////////////////////////////////////////////////
      // Add Item
      if (!bChild) {
        // check if parent is checked off and currently selected item
        let bChecked;
        if (iParent !== undefined)
          if (iParent === iSel) bChecked = val[iParent] !== undefined;

        // define children if parent was changed
        if (bChecked !== undefined) {
          val[i] = bChecked ? returnVal(iParent, i, depth) : undefined;
        }
        // define current if currently selected
        else if (i === iSel) {
          if (depth === 0) {
            val[i] = val[i] === undefined ? data[i] : undefined;
            val[i] = returnVal(undefined, i, depth, val[i], bParent);
          } else {
            // predefined selected value
            val[i] = val[i] === undefined ? data[i] : undefined;
            // defined selected value
            if (val[i]) val[i] = returnVal(iParent, i, depth, val[i]);
          } // end of item set
        }

        // /////////////////////////////////////////////////////////////////////
        // set parent if child is defined
        // if (val[i] !== undefined && val[iParent] === undefined) {
        //   val[iParent] = returnVal(
        //     undefined,
        //     iParent,
        //     depth,
        //     data[iParent],
        //     bParent,
        //   );
        //   bAllUnchecked = false;
        // }

        // All items checked check
        if (bAllUnchecked && val[i] !== undefined) {
          bAllUnchecked = false;
        }

        // /////////////////////////////////////////////////////////////////////
        // if is a parent
        let buffer = {};
        if (bParent) {
          buffer = iterateItems(
            val,
            i + 1,
            depth + 1,
            bChecked !== undefined
              ? i
              : iSel /* Set Current Item as currently selected parent */,
            i,
          );
          i = buffer.index - 1;
          bAllUnchecked = buffer.allUnchecked;
        }
      } // End of colon check
      // /////////////////////////////////////////////////////////////////////
      // Add children
      else {
        const buffer = iterateItems(val, i, depth + 1, iSel, iParent);
        i += buffer.depth;
        bAllUnchecked = buffer.allUnchecked;
      } // End of item case

      // /////////////////////////////////////////////////////////////////////
      // Uncheck parent
      if (bParent) {
        if (bAllUnchecked) {
          val[I] = undefined;
        } else if (bParent) {
          val[I] = returnVal(undefined, I, depth, data[I], bParent);
        }
      }

      i += 1;
    } // end of for loop

    return {
      val,
      index: i,
      depth: depth - 1,
      iSel,
      iParent,
      allUnchecked: bAllUnchecked,
    };
  }; // End of iterateItems

  // This is the array representation of the grid
  // Hurdle: Handle value selection recursively instead of hardcoding children
  const handleChange = val => {
    const buffer = treeProps.checkboxes
      ? [...value]
      : [new Array(value.length)].fill(undefined);

    // eslint-disable-next-line no-nested-ternary
    iterateItems(buffer, 0, 0, val.i);
    setValue(buffer);
    return getValueAsDataStr(buffer);
  };

  // Generate Items
  const Branch = (index, isParent, bBranchEnd, bDepthEnd, bChecked, key) => {
    const [checked, setChecked] = useState(bChecked.getBChecked());
    const handleCheck = val => {
      setChecked(val);
      bChecked.setBChecked(val);
    };

    const segment = isParent ? (
      <label
        key={key}
        style={{
          display: 'inline-block',
          lineHeight: '7px',

          margin: '2px',
          width: '9px',
          height: '9px',

          border: '1px solid #988e8e',
          background: '#fafbfb',
          color: '#4b63a7',

          overflow: 'hidden',

          alignSelf: 'center',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        <input
          type="checkbox"
          style={{ display: 'none', width: 0, height: 0 }}
          onChange={e => {
            handleCheck(e.target.checked);
          }}
        />
        {checked ? '-' : '+'}
      </label>
    ) : (
      undefined
    );

    if (segment) return segment;

    // Types: first item, not first item, last item, list node
    // eslint-disable-next-line no-nested-ternary
    const branchType = index === 0 ? 1 : bBranchEnd ? 2 : -1;

    return (
      <div key={key}>
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignSelf: 'center',
          }}
        >
          <div>
            <div
              style={{
                width: '6px',
                height: '50%',
              }}
            />
            <div
              style={{
                width: '6px',
                height: '50%',
              }}
            />
          </div>
          <div>
            <div
              style={{
                width: '6px',
                height: '50%',
                borderLeft: !(branchType === 0 || branchType === 1)
                  ? '1px dotted #a0a0a0'
                  : 'none',
                borderBottom: !bDepthEnd ? 'none' : '1px dotted #a0a0a0',
              }}
            />
            <div
              style={{
                width: '6px',
                height: '50%',
                borderLeft: !bBranchEnd ? '1px dotted #a0a0a0' : 'none',
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const Item = (index, itemValue, isChecked, children, iChildren, branches) => {
    const [bChecked, setBChecked] = useState(
      props.treeProps ? props.treeProps.expandOnPopulation : false,
    );
    const getBChecked = () => bChecked;

    return (
      <div
        key={`itemDiv${index}`}
        style={{ display: 'flex', alignContent: 'center' }}
      >
        <div>
          <div style={{ display: 'flex' }}>
            {branches({ setBChecked, getBChecked })}

            {getItem({
              index,
              value: itemValue,
              isChecked,
              children,
              iChildren,
              checkboxes: treeProps.checkboxes,
              checkbox: (
                <input
                  key={`itemcb${index}`}
                  name={value}
                  data-index={index}
                  data-children={iChildren}
                  type="checkbox"
                  checked={isChecked}
                  style={{
                    width: treeProps.checkboxes === true ? '12px' : '0px',
                    height: '12px',
                    alignSelf: 'center',
                  }}
                  onChange={e => {}} // To clear warning
                />
              ),
            })}
          </div>
          <div style={{ display: getBChecked() ? 'inline' : 'none' }}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  const hItems = (index = undefined, depth = 0) => {
    const list = [];
    const iList = [];
    let i = index !== undefined ? index : 0;
    //
    for (i; i < data.length; i) {
      // Data
      const isArray = Array.isArray(data[i]);
      const curData = isArray ? data[i].toString() : data[i];
      const nextData = data.length > i + 1 ? data[i + 1].toString() : -1;

      // Item check
      let dataLen = data.length > depth ? data.length : -1;
      const bColon = curData[depth] === ':';

      /* Depth Check: Check if no longer in depth */
      let bBranchEnd = false;
      if (depth > 0) {
        // Note: "I don't understand what I'm doing on these two lines but it's important"
        let inDepth = curData.length > depth - 1;
        inDepth = dataLen ? curData[depth - 1] === ':' : false;

        // Return if at end of depth
        if (!inDepth) {
          return {
            depth: depth - 1,
            index: i,
            list,
            iList,
          };
        }
        // Check Next Item
        if (inDepth && nextData !== -1) {
          dataLen = nextData.length > depth - 1 ? nextData.length : -1;
          bBranchEnd = !(dataLen === -1 ? false : nextData[depth - 1] === ':');
        }
      }
      if (dataLen === -1) break; // End of item check

      // Parent Check
      let validate = nextData !== -1;
      validate = validate ? nextData.length > depth : false;
      const bParent = validate ? nextData[depth] === ':' : false;

      // Add Item
      if (!bColon) {
        // eslint-disable-next-line no-loop-func
        const Branches = (bChecked = {}) => {
          const branches = [
            Branch(
              i,
              depth === 0 ? bParent : false, // isParent
              i === data.length - 1, // bBranchEnd
              depth ? false : !bParent, // bDepthEnd
              bChecked,
              `B_${i},${0}`,
            ),
          ];
          let b;
          for (b = 1; b <= depth; b) {
            branches.push(
              Branch(
                i,
                depth === b ? bParent : false,
                bBranchEnd,
                depth === b,
                bChecked,
                `B_${i},${b}`,
              ),
            );
            b += 1;
          }
          return branches;
        };

        let buffer;
        let children;
        let iChildren;
        if (bParent) {
          buffer = hItems(i + 1, depth + 1);
          children = buffer.list;
          iChildren = buffer.iList;
        }

        const bItemChecked = value ? value[i] !== undefined : false;
        iList.push(i);
        const dataPass = isArray
          ? data[i]
          : data[i].slice(depth, data[i].length);
        list.push(
          Item(i, dataPass, bItemChecked, children, iChildren, Branches),
        );

        if (bParent) {
          i = buffer.index - 1;
        }
      }
      // Add Sub Items
      else {
        const buffer = hItems(i, depth + 1);
        list.push(<div style={{}}>{buffer.list}</div>);
        i += buffer.depth;
      } // End of item case
      i += 1;
    }
    return { depth: depth - 1, index: i, list, iList };
  }; // End of hItems

  // used for intialization
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        ...style,
        maxHeight: style.maxHeight,
        overflow: 'auto',
      }}
      {...props.events}
      onChange={e => {
        if (Object.keys(e.target.dataset).length > 0) {
          if (props.onChange) {
            props.onChange(
              handleChange({
                checked: e.target.checked,
                children: e.target.dataset.children,
                i: parseInt(e.target.dataset.index, 10),
              }),
            );
          } else
            handleChange({
              checked: e.target.checked,
              children: e.target.dataset.children,
              i: parseInt(e.target.dataset.index, 10),
            });
        }
      }}
    >
      <div style={{ display: 'flex' }}>
        <div
          style={{
            minWidth: '24px',
          }}
        />
        {props.children}
      </div>

      {data.length > 0 ? hItems().list : null}
    </div>
  );
};

export default Tree;
