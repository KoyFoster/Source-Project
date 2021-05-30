/* eslint-disable no-constant-condition */
/* eslint-disable no-self-compare */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ImageHandler as Image } from '../../Imaging/Image';
import { FilePicker } from '../../FileManagment';
import { CaptionBar } from '../../Dividers';
import { Button, CheckBox, ComboBox, CheckListBoxDropDown, DT, DateTime, Edit, TreeDropDown, Tree } from '../../Input';
import SimpleGrid from '../../Tables/Grid/SimpleGrid';
// Note: On the windows side, 'TreeDropDown' controlType is dysfunctional, so ignore it
// import TreeDropDown from './TreeDropDown';

// TODO: Implement: Consider not bothering with border properties until grid styling is made modular
// TODO: Deleting all rows now causes an error.
// The remaining features:
// + Dragging and dropping rows into a desired order.
// + Allowing the user to adjust cell widths and heights.
// + Currently the user can now sort rows by column
//   - This feature is still a bit jank.

// grid properties defined:
const attchProps = {
  borderBottom: false,
  borderLeft: false,
  borderRight: false,
  borderTop: false,
  columns: [
    {
      caption: 'Date',
      width: '104px',
      alignment: '',
      controlType: 'Date/Time',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'Category',
      width: '148px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'File Name',
      width: '199px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'Device',
      width: '99px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'Description',
      width: '399px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'CatID',
      width: '0px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'DeviceID',
      width: '0px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'Int. File Name',
      width: '0px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'File Types',
      width: '0px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'Device Path',
      width: '0px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'Status',
      width: '0px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
    {
      caption: 'ID',
      width: '0px',
      alignment: '',
      controlType: 'Edit',
      cx: 0,
      cy: 0,
      data: '<No Data>',
      dataFieldId: '',
      dataFieldName: '',
      dataVal: '',
      editControl: '',
      fieldType: '',
      fieldTypeId: '',
      show: true,
      x: 0,
      y: 0,
    },
  ],
  fitToPage: false,
  fontID: 678,
  headerHeight: 32,
  hideCaption: false,
  hideColHdr: false,
  hideReserved: false,
  hideRowHdr: false,
  rowHeight: 30,
  wrap: false,
};

const Attachment = props => {
  // grid funcs
  const [funcs] = useState({});
  const { control } = props;
  const gProps = attchProps;
  const { columns } = gProps;
  const GetNumCols = val => {
    if (val) {
      if (val.length > 0) {
        return val[0].length < columns.length ? columns.length : val[0].length;
      }
    }
    return columns.length;
  };

  // Data String Delimeters
  const rowDELIM = '\n';
  const colDELIM = '®';

  // Takes whatever priority data received from props and converts it into a data array for use by the grid
  const InitDataArray = dataValue => {
    let dataType = 'isString';

    // Generate Object Based On Column Names/Captions
    // TODO: Make generic function out of this and use that function here and in another setValue function
    const convertArrayToObject = (array, key) => {
      const initialValue = {};
      return array.reduce(
        (obj, item) => ({
          ...obj,
          [item[key]]: null /* item = the contents of the array */,
        }),
        initialValue,
      );
    };

    const DataParse = () => {
      if (!dataValue) return [];
      // test data
      // dataValue = 'onetwothreefourfivesixseveneight';

      // Format Check
      if (dataValue === undefined) {
        return [new Array(columns.length).fill('')];
      }
      if (Array.isArray(dataValue)) {
        if (Array.isArray(dataValue[0])) {
          return dataValue;
        }
        dataType = 'isObject';
      }

      // Proceed to format into an array if isString
      if (dataType === 'isString') {
        const result = [];

        // Breakdown grid string into a 2 dimensional array
        const DataRows = dataValue.split(colDELIM + rowDELIM);
        // check last row for value
        // cull empty last row
        if (DataRows.length)
          if (!DataRows[DataRows.length - 1]) {
            DataRows.pop();
          }

        let iRow = 0;

        for (iRow; iRow < DataRows.length; iRow) {
          result.push(DataRows[iRow].split(colDELIM));
          iRow += 1;
        }
        return result;
      }

      // Create Object Based on Defined column keys
      const colObj = Array.isArray(columns)
        ? convertArrayToObject(columns, 'key')
        : {};

      if (dataType === 'isObject') {
        // Breakdown object rows into an dimensional array
        const result = dataValue.map(object =>
          Object.keys(object)
            .map(function element(key) {
              if (
                // eslint-disable-next-line no-prototype-builtins
                colObj.hasOwnProperty(key) === false &&
                Object.keys(colObj).length > 0
              )
                return null;
              return [key, object[key]];
            })
            .filter(x => x),
        );

        return result;
      }
      return [new Array(columns.length).fill('')];
    };
    return DataParse();
  };

  const dataFormat = d => {
    if (d.length === 1 && d[0][0].length === 0) return [];
    const buffer = d.map(function cull(val) {
      return val.slice(0, 1)[0]; // subtract unecessary rows
    });
    return buffer.length ? buffer : undefined;
  };

  // States ------------------------------------------------------------------------------------
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;
  // This is the array representation of the grid
  const [trueValue, setTrueValue] = useState(InitDataArray()); // this can stay
  const [value, setValue] = useState(''); // this can stay


  const [numCols, setNumCols] = useState(GetNumCols(value));
  const [headerHeight, setHeaderHeight] = useState(
    gProps.headerHeight ? gProps.headerHeight : 24,
  );
  const [rowHeight, setRowHeight] = useState(
    gProps.rowHeight !== 0 ? gProps.rowHeight : 24,
  );
  const [rowHeaderWidth, setRowHeaderWidth] = useState(78); // Note: Windows default size is 78px, but I would prefer 24px

  // Linked Funcs ------------------------------------------------------------------------------------
  if (funcs.getRow) control.GetGridRow = funcs.getRow;
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = val => {
    setValue(val);
    control.value = val;
    const buffer = Array.isArray(val) ? val : InitDataArray(val);
    setTrueValue(buffer);

    // setSelection([1, 1]);
    setNumCols(GetNumCols(trueValue));
  };

  control.clear = () => {
    setTrueValue([]);
    control.handleChange('');
  };
  control.getSelectedRow = funcs.getSelRow;
  control.getRowCount = funcs.getRows;
  control.getColumnCount = funcs.getCols;
  control.setStyle = setStyle;

  const arrToString = (val) => {
    let buffer = '';
    val.forEach(row => {
      let rowBuff = '';
      row.forEach(cell => {
        rowBuff += `${cell}${colDELIM}`;
      });

      // append row
      buffer += rowBuff ? `${rowBuff}${rowDELIM}` : '';
    });

    return buffer;
  }


  const handleChange = e => {
    const buffer = arrToString(e.target.value);

    control.handleChange(buffer);
    setTrueValue(e.target.value);
  };

  let iRIndex = 0;

  // Get control
  const getElement = (i, col) => {
    const controlType = col
      ? col.controlType
        ? col.controlType
        : 'Edit'
      : 'Edit';

    // this is the data defined in the grid properties tab
    let ctrlData;
    if (col)
      if (col.dataVal) {
        ctrlData = col.dataVal
          ? col.dataVal.slice(0, col.dataVal.length - 6).split('*') // parse grid row data
          : '';
      }

    let result;

    switch (controlType) {
      case 'Check Box':
        {
          result = (
            <CheckBox
              checked=""
              style={{
                background: style.background,
                height: 'inherit',
                width: 'inherit',
              }}
              pushLike={false}
            />
          );
        }
        break;
      case 'Push Button':
        {
          result = (
            <Button
              value=""
              style={{
                height: 'inherit',
                width: 'inherit',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {col.caption}
            </Button>
          );
        }
        break;
      case 'Combo Box':
        {
          /* Format Data */
          const ctrlDataArr = [];
          for (let iData = 0; iData < ctrlData.length; iData) {
            ctrlDataArr.push([ctrlData[iData]]);
            iData += 1;
          }

          result = (
            <ComboBox
              value=""
              style={{
                position: 'relative',
                height: 'inherit',
                width: 'inherit',
                overflow: 'hidden',
              }}
              data={ctrlDataArr}
              sort
            />
          );
        }
        break;
      case 'Combo Box No Sort':
        {
          /* Format Data */
          const ctrlDataArr = [];
          for (let iData = 0; iData < ctrlData.length; iData) {
            ctrlDataArr.push([ctrlData[iData]]);
            iData += 1;
          }

          result = (
            <ComboBox
              value=""
              style={{
                position: 'relative',
                height: 'inherit',
                width: 'inherit',
                overflow: 'hidden',
              }}
              data={ctrlDataArr}
            />
          );
        }
        break;
      case 'Date/Time':
        {
          result = (
            <DateTime
              value=""
              style={{
                position: 'relative',
                height: 'inherit',
                width: 'inherit',
                overflow: 'hidden',
              }}
            />
          );
        }
        break;
      case 'Check List Box/Drop Down':
        {
          /* Format Data */
          const ctrlDataArr = [];
          for (let iData = 0; iData < ctrlData.length; iData) {
            ctrlDataArr.push([ctrlData[iData]]);
            iData += 1;
          }
          result = (
            <CheckListBoxDropDown
              value=""
              separator=","
              style={{
                position: 'relative',
                height: 'inherit',
                width: 'inherit',
                overflow: 'hidden',
              }}
              setChildren={dataFormat(ctrlDataArr)}
            />
          );
        }
        break;
      case 'Label':
        {
          result = undefined;
        }
        break;
      case 'Image':
        {
          result = (
            <Image
              value=""
              style={{
                position: 'relative',
                height: 'inherit',
                width: 'inherit',
                overflow: 'hidden',
              }}
            />
          );
        }
        break;
      case 'Header':
        {
          result;
        }
        break;
      case 'Tree/Drop Down':
        {
          result = (
            <TreeDropDown
              value=""
              nodes={Tree.arrayToNodes(ctrlData).data}
              style={{
                position: 'relative',
                height: 'inherit',
                width: 'inherit',
                overflow: 'hidden',
              }}
            />
          );
        }
        break;
      case 'Edit':
      default:
        {
          result = (
            <Edit
              value=""
              style={{
                overflow: 'hidden',
                resize: 'none',
                textAlign: 'left',
                height: 'inherit',
                width: 'inherit',
                border: 'none',
              }}
            />
          );
        }
        break;
    }

    return result;
  };

  // control.deleteGridRow = addRow;

  const captStyle = {
    padding: 0,
    margin: 0,
    border: '1px solid #DDDDDD',
    borderRight: '2px solid #444444',
    borderLeft: '2px solid #FFFFFF',
    borderRadius: '5px',
    background: 'transparent',
    marginRight: '2px',
    paddingRight: '2px',
    paddingLeft: '2px',
  };

  // handle image add
  let imageData;
  const getData = data => {
    imageData = data;

    // place image name into a row value and then pass it into addRow
    const row = new Array(numCols).fill('');
    const today = new Date();
    row[0] = `${DT.FormatDate(today)} ${DT.FormatTime(today)}`;
    row[2] = imageData.FileName;
    row[8] = imageData.FileName;

    if (imageData) {
      if (funcs.addRow) funcs.addRow(row);
    }
  };

  // Qualities: 24px hight, grid name to the left, 5 buttons: [add, add here, sub, move up/down]
  // Qualities: 24px hight, grid name to the left, 5 buttons: [add, add here, sub, move up/down]
  const captionButton = [
    <input
      type="date"
      key="Start Date"
      style={{ ...captStyle }}
      onClick={() => { }}
    />,
    <input
      type="date"
      key="End Date"
      style={{ ...captStyle }}
      onClick={() => { }}
    />,

    <button
      key="Select"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Select
    </button>,
    <button
      key="Excel"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Excel
    </button>,
    <button
      key="Email"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Email
    </button>,
    <button key="Fax" type="button" style={{ ...captStyle }} onClick={() => { }}>
      Fax
    </button>,
    <button
      key="Print"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Print
    </button>,

    <FilePicker key="Import" style={{ width: '24px' }} getData={getData}>
      +Row
    </FilePicker>,
    <button
      key="-Row"
      type="button"
      style={{
        ...captStyle,
        background:
          trueValue.length === 0 ||
            (funcs.getSelection ? funcs.getSelection().y : 0) <= 0
            ? '#444444'
            : captStyle.background,
      }}
      onClick={() => {
        if (funcs.subRow) funcs.subRow();
      }}
    >
      - Row
    </button>,
    <button
      key="MoveRowUp"
      type="button"
      style={{
        ...captStyle,
        background:
          (funcs.getSelection ? funcs.getSelection().y : 0) <= 1
            ? '#444444'
            : captStyle.background,
        marginLeft: '2px',
      }}
      onClick={() => funcs.moveRowUp()}
    >
      Up
    </button>,
    <button
      key="MoveRowDown"
      type="button"
      style={{
        ...captStyle,
        background:
          trueValue.length === (funcs.getSelection ? funcs.getSelection().y : 0) ||
            (funcs.getSelection ? funcs.getSelection().y : 0) === 0
            ? '#444444'
            : captStyle.background,
      }}
      onClick={() => funcs.moveRowDown()}
    >
      Down
    </button>,
  ];

  const columnWidths = [];
  const hHeader = () => {
    const html = [];

    for (let x = 0; x < numCols; x) {
      const curObj = x >= columns.length ? value[0][x] : columns[x];

      iRIndex += 1;
      let headerLabel = String.fromCharCode(iRIndex + 64);

      // data check
      if (Array.isArray(curObj)) {
        if (curObj.length > 1) {
          // eslint-disable-next-line prefer-destructuring
          headerLabel = curObj[0];
        }
      } // if object
      else if (curObj) {
        if (curObj.caption) {
          headerLabel = curObj.caption;
        }
      }

      columnWidths.push(curObj.width ? curObj.width : '24px');
      html.push(
        <div
          name={`ColHeader_${x}`}
          key={`ColHeader_${x}`}
          visibility={
            curObj.width === '0px' || curObj.show === false
              ? 'hidden'
              : 'visible'
          }
          style={{
            borderRight: '1px solid black',
            padding: '0px',
            margin: '0px',
            width: curObj.width ? curObj.width : '24px',
            height: headerHeight,
          }}
        >
          {headerLabel}
        </div>,
      );

      x += 1;
    }
    return html;
  };

  const hRow = () => {
    // Should return a single of components for use by the simpleGrid
    const cols = [];

    for (let y = 0; y < numCols; y) {
      const column = y >= columns.length ? undefined : columns[y];

      cols.push(getElement(y, column));
      y += 1;
    }

    return cols;
  };

  return (
    <div
      style={{
        ...style,
        border: style.border,
        position: style.position ? style.position : 'absolute',
        ...disabled,
      }}
    >
      {CaptionBar(control.label, captionButton, gProps.hideCaption)}
      <div
        style={{
          width: '100%',
          height: gProps.hideCaption ? '100%' : 'calc(100% - 24px)',
          position: 'relative',
          display: 'flex',
          overflow: 'auto',
        }}
      >
        <SimpleGrid
          value={trueValue}
          onChange={handleChange}
          header
          hHeader={hHeader()}
          rowHeader
          hRow={hRow()}
          columns={numCols}
          cellStyle={{
            border: '1px dotted gray',
            background: style.background,
            height: 'inherit',
          }}
          headerStyle={{ ...style.gridStyle, border: style.border }}
          rowHeaderStyle={{ width: rowHeaderWidth }}
          funcs={funcs}
          rowStyle={{ height: rowHeight }}
          bodyStyle={{
            borderBottom: '1px solid black',
            verticalAlign: 'top',
            textAlign: 'center',

            overflow: 'visible',
          }}
          columnWidths={columnWidths}
        />
      </div>
    </div>
  );
};

export {Attachment};
