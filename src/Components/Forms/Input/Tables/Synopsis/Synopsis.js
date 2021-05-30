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
import React, { useState, useEffect } from 'react';
import { GET } from 'api/request';
import { CheckBox } from '../../Input/CheckBox';
import { Button } from '../../Input/Button';
import { Edit } from './Edit';
import { ComboBox } from '../../Input/ComboBox';
import { DateTime } from '../../Input/DateTime';
import { Image } from './Image';
import { CheckListBoxDropDown } from '../../Input/CheckListBoxDropDown';
import TreeDropDown from './TreeDropDown';
import Tree from './Tree';
import SimpleGrid from '../Grid/SimpleGrid';
import CaptionBar from '../Dividers/CaptionBar/CaptionBar';
// Note: On the windows side, 'TreeDropDown' controlType is dysfunctional, so ignore it
// import TreeDropDown from './TreeDropDown';

// TODO: Implement: Consider not bothering with border properties until grid styling is made modular
// TODO: Deleting all rows now causes an error.
// The remaining features:
// + Dragging and dropping rows into a desired order.
// + Allowing the user to adjust cell widths and heights.
// + Currently the user can now sort rows by column
//   - This feature is still a bit jank.

// 0.     1.          2.                  3.          4.        5.            6.          7.        9.                    10
// ID,    dataField,  datafieldID,        [caption],  [width],  FieldTypeID,  FieldType,  Com Type, [Precision],  Not Used, Show Graph,
// "3370, IC_Data,    ImageCapture,       Data,     100,    2,            Binary,         Common,   [N/A],           0,        0"

const RowHeaderCols = [
  {
    caption: 'ID',
    width: '148px',
    alignment: '',
    controlType: 'Label',
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
    caption: 'Provider',
    width: '148px',
    alignment: '',
    controlType: 'Label',
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
    caption: 'Date Created',
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
    caption: 'Template',
    width: '148px',
    alignment: '',
    controlType: 'Label',
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
];

const Synopsis = props => {
  // props
  const { control } = props;

  // get control type from data type
  const getControlType = dataType => {
    switch (dataType) {
      case 'Binary':
        return 'Image';
      case 'Date Time':
        return 'Date/Time';
      default:
        return 'Label';
    }
  };

  // defined DF columns
  const GetDFs = () => {
    if (control.properties.init === '') return [];

    // parse init into grid of data
    const dataBuffer = control.properties.init
      .split('\n')
      .map(element => {
        if (element === '') return null;
        const buffer = element.split(',');
        return buffer;
      })
      .filter(elem => elem !== null);

    const result = dataBuffer.map(element => ({
      dataFieldTypeID: element[4],
      dataFieldID: element[0],
    }));
    return result;
  };
  // DataTypeID, DataID, # Images, Data
  const GetColumns = () => {
    const result = [...RowHeaderCols];

    if (control.properties.init === '') return result;

    // parse init into grid of data
    const dataBuffer = control.properties.init
      .split('\n')
      .map(element => {
        if (element === '') return null;
        const buffer = element.split(',');
        return buffer;
      })
      .filter(elem => elem !== null);

    const buffer = [
      {
        caption: 'ID',
        width: '148px',
        alignment: '',
        controlType: 'Label',
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
    ];

    // add columns
    dataBuffer.forEach(element => {
      result.push({
        ...buffer,
        caption: 'DataFieldTypeID',
        width: '0px',
        controlType: 'Label',
      });
      result.push({
        ...buffer,
        caption: 'DataFieldID',
        width: '0px',
        controlType: 'Label',
      });
      result.push({
        ...buffer,
        caption: '# Images',
        width: '0px',
        controlType: 'Label',
      });
      result.push({
        ...buffer,
        caption: element[2],
        width: element[3],
        controlType: getControlType(element[5]),
      });
    });

    return result;
  };

  // grid funcs
  const [funcs] = useState({});
  const [columns, setColumns] = useState(GetColumns());
  const [synopsProps, setSynopsProps] = useState({
    borderBottom: false,
    borderLeft: false,
    borderRight: false,
    borderTop: false,
    columns,
    fitToPage: false,
    fontID: 678,
    headerHeight: 32,
    hideCaption: false,
    hideColHdr: false,
    hideReserved: false,
    hideRowHdr: false,
    rowHeight: 30,
    wrap: false,
  });
  const gProps = synopsProps;

  // Generate Object Based On Column Names/Captions
  // TODO: Make generic function out of this and use that function here and in another setValue function
  const parseSynopsis = array => {
    if (!array) return [];

    const result = array.map(row => {
      let i = 0;
      const buffer = [];
      row.forEach(obj => {
        if (i === 0) {
          buffer.push(obj.cnEntryID);
          buffer.push(obj.provider);
          buffer.push(obj.dateCreated);
          buffer.push(obj.template);
        } else {
          buffer.push(obj.dfType);
          buffer.push(obj.dfid);
          buffer.push(obj.image);
          buffer.push(obj.value);
        }
        i += 1;
      }); // end of forEach

      return buffer;
    });

    return result;
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
  const [DFs, setDFs] = useState(GetDFs());
  const [value, setValue] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [providerID, setProviderID] = useState(-1);
  const [providerIDs, setProviderIDs] = useState([]);
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
  };
  control.clear = () => {
    setValue('');
    control.value = '';
  };
  control.getSelectedRow = funcs.getSelRow;
  control.getRowCount = funcs.getRows;
  control.getColumnCount = funcs.getCols;
  control.setStyle = setStyle;
  const handleChange = e => {
    control.setValue(e.target.value);
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

  // Qualities: 24px hight, grid name to the left, 5 buttons: [add, add here, sub, move up/down]
  const captionButton = [
    <button // this is apply, but calling it Refresh for our clients
      key="Refresh"
      type="button"
      style={{ ...captStyle }}
      onClick={() => {
        // validation
        if (!DFs.length) return;
        refreshSynopsis();
      }}
    >
      Refresh
    </button>,
    <input
      type="date"
      key="Start Date"
      value={startDate}
      style={{ ...captStyle }}
      onChange={e => {
        setStartDate(e.target.value);
      }}
    />,
    <input
      type="date"
      key="End Date"
      value={endDate}
      style={{ ...captStyle }}
      onChange={e => {
        setEndDate(e.target.value);
      }}
    />,

    <select
      key="providers"
      id="providers"
      value={providerID}
      style={{ ...captStyle }}
      onChange={e => {
        setProviderID(e.target.value);
      }}
    >
      <option value={-1}>All</option>
      {providerIDs.map(item => (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      ))}
    </select>,

    <button
      disabled
      key="Select"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Select
    </button>,
    <button
      disabled
      key="Email"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Email
    </button>,
    <button
      disabled
      key="Fax"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Fax
    </button>,
    <button
      disabled
      key="Details"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Details
    </button>,
    <button
      disabled
      key="Excel"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Excel
    </button>,
    <button
      disabled
      key="Print Preview"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Print
    </button>,
    <button
      disabled
      key="Print"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Print
    </button>,
    <button
      disabled
      key="Graph"
      type="button"
      style={{ ...captStyle }}
      onClick={() => { }}
    >
      Graph
    </button>,
  ];

  const columnWidths = [];
  const hHeader = () => {
    const html = [];

    for (let x = 0; x < columns.length; x) {
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

    for (let y = 0; y < columns.length; y) {
      const column = y >= columns.length ? undefined : columns[y];

      cols.push(getElement(y, column));
      y += 1;
    }

    return cols;
  };

  // Get Data
  useEffect(() => {
    // Populate Provider
    const controller = new AbortController();
    getProviders(controller.signal);
    return () => controller.abort();
  }, []);

  // [DFTIDs, DFIDS], Date Range, ProviderID,
  const getProviders = signal =>
    // get the data from the API and format it to display properly
    GET(`records/providers`, signal).then(result => {
      if (!signal.aborted) {
        setProviderIDs(result.data);
      }
    });

  // refresh
  const refreshSynopsis = () => {
    const controller = new AbortController();
    getSynopsis(
      startDate,
      endDate,
      providerID,
      DFs.map(item => `${item.dataFieldTypeID},${item.dataFieldID}`).join(':'),
      controller.signal,
    );

    return () => controller.abort();
  };

  // [DFTIDs, DFIDS], Date Range, ProviderID,
  const getSynopsis = (StartDate, EndDate, Provider, DataFields, signal) => {
    // get the data from the API and format it to display properly
    const apiCall = `records/synopsis/${!StartDate ? '' : StartDate}:${!EndDate ? '' : EndDate
      }:${Provider}:${!DataFields ? '' : DataFields}`;

    return GET(apiCall, signal).then(result => {
      if (!signal.aborted) setValue(parseSynopsis(result.data.synopsis));
    });
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
          value={value}
          onChange={handleChange}
          header
          hHeader={hHeader()}
          rowHeader
          hRow={hRow()}
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

export default Synopsis;
