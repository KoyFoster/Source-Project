/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

// TODO: Add single click date and time set and try to replace the x with a checkbox
// TODO: Make sure you can get values from all involved controls
import React, { useState } from 'react';

class DT {
  static FormatDate(today) {
    return `${today.getFullYear()}-${
      today.getMonth() < 9 ? '0' : ''
      }${today.getMonth() + 1}-${
      today.getDate() < 10 ? '0' : ''
      }${today.getDate()}`;
  }

  static FormatTime(today) {
    return `${today.getHours() < 10 ? '0' : ''}${today.getHours()}:${
      today.getMinutes() < 10 ? '0' : ''
      }${today.getMinutes()}`;
  }
}

const DateTime = props => {
  // local vars
  let checked = false;
  let dateValue;
  let timeValue;
  // set value states
  switch (props.type) {
    case 'date':
      dateValue = '';
      break;
    case 'time':
      timeValue = '';
      break;
    case 'datetime':
    default:
      dateValue = '';
      timeValue = '';
      break;
  }

  const { value } = props;
  const { style } = props;

  // parse value
  const parseValue = dtVal => {
    let dt;
    // Note: Use to parse DateTime values manually.
    // This is not necessary as Date.parse will handle this seemingly perfectly.
    // if (dtVal) {
    //   if (dtVal.search(' ') > -1) dt = dtVal.split(' ');
    //   // sometimes datetimes are T seperated in the database
    //   else if (dtVal.search('T') > -1) dt = dtVal.split('T');
    //   // if single value, respect the previously defined states
    //   else {
    //     dt = [dateValue ? dtVal : undefined, timeValue ? dtVal : undefined];
    //   }
    // }
    // const bDate = !dtVal
    //   ? false
    //   : dtVal.indexOf('-') > -1 || dtVal.indexOf('/') > -1;
    // const bTime = !dtVal ? false : dtVal.indexOf(':') > -1;
    // let date;
    // let time;
    // if (dateValue !== undefined) {
    //   // eslint-disable-next-line prefer-destructuring
    //   if (bDate) date = dt[0];
    //   else if (bDate || bTime) date = '2020-01-01';
    //   else date = '';
    // }
    // if (timeValue !== undefined) {
    //   // eslint-disable-next-line prefer-destructuring
    //   if (bTime) time = dt[1];
    //   else if (bDate || bTime) time = '00:00';
    //   else time = '';
    // }

    // // convert slashes to dashes
    // if (date) {
    //   const parsedDate = new Date(Date.parse(dtVal));

    //   date = DT.FormatDate(parsedDate);
    // }
    const parsedDate = new Date(Date.parse(dtVal));

    const date = DT.FormatDate(parsedDate);
    const time = DT.FormatTime(parsedDate);

    dateValue = date;
    timeValue = time;
    checked = !!date || !!time;
  };

  const getDTValue = () => `${dateValue || ''} ${timeValue || ''}`.trim();

  // width time check used for switching between relative and absolute position
  const bWidthNaN =
    style.width.toString().search('px') > -1 ||
    style.width.toString().search('%') > -1;

  // Timestamp Logic
  // This should update the date and time components
  // Postponed until the other GET and SETs are done.
  // Currently date accepts a string of either YYYY-MM-DD/MM-DD-YYYY and
  // the delimiters can be either a '-' or '/' or 'z'
  // Time can accept military time if AM/PM is not provided
  // Format H:MM:SS(optional space)(AM/PM)
  function handleChange(element = 'cb', e) {
    let bChecked = element === 'cb' ? e.target.checked : checked;
    let sDate = element === 'dt' ? e.target.value : dateValue;
    let sTime = element === 't' ? e.target.value : timeValue;

    // check if date is already set
    if (element === 'dt')
      if (sDate === '') {
        if (sTime !== undefined) sTime = '';
        bChecked = false;
      } else {
        bChecked = true;
      }

    // check if time is already set
    if (element === 't' && sTime !== undefined)
      if (sTime === '') {
        if (sDate !== undefined) sDate = '';

        bChecked = false;
      } else {
        bChecked = true;
      }

    // Run logic as normal
    if (bChecked) {
      const today = new Date();
      if (sTime === '') sTime = DT.FormatTime(today);
      if (sDate === '') if (sDate === '') sDate = DT.FormatDate(today);
    } else {
      if (sTime !== undefined) sTime = '';
      if (sDate !== undefined) sDate = '';
    }

    const sValue = `${sDate || ''} ${sTime || ''}`.trim(' ');

    // if checkbox set it's value
    if (element === 'cb') {
      // e.target.value = sValue;
    }

    // on change
    if (props.onChange) {
      const newE = {
        target: {
          value: sValue,
          checked: e.target.checked,
          dataset: e.target.dataset,
        },
      };
      props.onChange(newE);
    }

    return sValue;
  }

  // used for grids and needs to be percolated to the List element
  const dataset = { 'data-x': props['data-x'], 'data-y': props['data-y'] };
  // used for grids and needs to be percolated to the List element
  const events = {
    onClick: props.onClick,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  };

  // return ControlTypes: 7: DateTIme - 24: Time
  parseValue(value);
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        ...style,
      }}
    >
      <input // CheckBox
        {...dataset}
        type="checkbox"
        checked={checked}
        {...events}
        onChange={e => {
          handleChange('cb', e);
        }}
      />
      <input
        {...dataset}
        // Time
        type="Date"
        style={{ border: 'none' }}
        value={dateValue}
        {...events}
        onChange={e => {
          handleChange('dt', e);
        }}
      />
      <input
        {...dataset}
        // Time
        type="time"
        style={{ border: 'none' }}
        value={timeValue}
        {...events}
        onChange={e => {
          handleChange('t', e);
        }}
      />
    </div>
  );
};

// State of completion
// 1. All properties handled
// 2. Exam data handled
const DateTimeControl = props => {
  const initTimeValue = () => {
    // if not time, then is Date or DateTime
    let val = control.controlType !== 7 ? '' : undefined;
    if (val === undefined)
      val =
        control.properties.miscProperties.showTime === true &&
          control.controlType === 7
          ? ''
          : undefined;
    return val;
  };

  const { control } = props;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;
  const [checked, setChecked] = useState(false);
  const [dateValue, setDateValue] = useState(() => {
    const val = props.value ? props.value : '';
    return control.controlType === 7 ? val : '';
  });
  const [timeValue, setTimeValue] = useState(initTimeValue());
  const getValue = () => {
    const val = (dateValue || '') + (timeValue || '');
    return val;
  };

  // MACRO DEFINITIONS
  // provide macro access to state functions
  control.setStyle = setStyle;
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = dateTime => {
    // Valuation: Minimal at the moment
    if(!Number.isNaN(dateTime)) return;

    let dt;
    if (dateTime)
      if (dateTime.search(' ') > -1) dt = dateTime.split(' ');
      // sometimes datetimes are T seperated in the database
      else if (dateTime.search('T') > -1) dt = dateTime.split('T');

    const bDate = !dateTime
      ? false
      : dateTime.indexOf('-') > -1 || dateTime.indexOf('/') > -1;
    const bTime = !dateTime ? false : dateTime.indexOf(':') > -1;
    let date;
    let time;
    if (dateValue !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      if (bDate) date = dt[0];
      else if (bDate || bTime) date = '2020-01-01';
      else date = '';
    }
    if (timeValue !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      if (bTime) time = dt[1];
      else if (bDate || bTime) time = '00:00';
      else time = '';
    }

    setDateValue(date);
    setTimeValue(time);
    const bChecked = bDate || bTime;
    setChecked(bChecked);

    control.value = `${date || ''} ${time || ''}`.trim();
  };
  control.clear = () => {
    setChecked(false);
    control.handleChange('');
  };

  // width time check used for switching between relative and absolute position
  const bWidthNaN =
    style.width.toString().search('px') > -1 ||
    style.width.toString().search('%') > -1;

  const cbName = `cb_${control.label}_[${control.component.id}:${
    control.controlId
    }]_cb`;
  const timeName = `time_${control.label}_[${control.component.id}:${
    control.controlId
    }]_time`;
  const dateName = `date_${control.label}_[${control.component.id}:${
    control.controlId
    }]_date`;

  // Timestamp Logic
  // This should update the date and time components
  // Postponed until the other GET and SETs are done.
  // Currently date accepts a string of either YYYY-MM-DD/MM-DD-YYYY and
  // the delimiters can be either a '-' or '/'
  // Time can accept military time if AM/PM is not provided
  // Format H:MM:SS(optional space)(AM/PM)
  function handleChange(element = 'cb', e) {
    let bChecked = element === 'cb' ? e : checked;
    let sDate = element === 'dt' ? e.target.value : dateValue;
    let sTime = element === 't' ? e.target.value : timeValue;

    // check if date is already set
    if (element === 'dt')
      if (sDate === '') {
        if (sTime !== undefined) sTime = '';
        bChecked = false;
      } else {
        bChecked = true;
      }

    // check if time is already set
    if (element === 't' && sTime !== undefined)
      if (sTime === '') {
        if (sDate !== undefined) sDate = '';

        bChecked = false;
      } else {
        bChecked = true;
      }

    // Run logic as normal
    if (bChecked) {
      const today = new Date();
      if (sTime === '') sTime = DT.FormatTime(today);
      if (sDate === '') if (sDate === '') sDate = DT.FormatDate(today);
    } else {
      if (sTime !== undefined) sTime = '';
      if (sDate !== undefined) sDate = '';
    }

    const sValue = `${sDate || ''} ${sTime || ''}`;

    control.handleChange(sValue);
  }

  // return ControlTypes: 7: DateTIme - 24: Time
  return (
    <div
      style={{
        ...style,
        position: style.position ? style.position : 'absolute',

        display: 'flex',
        alignItems: 'center', // Vertical alignment
        justifyContent: 'left',
        ...disabled,
      }}
      onFocus={props.events.onFocus}
      onBlur={props.events.onBlur}
    >
      <input // CheckBox
        type="checkbox"
        checked={checked}
        style={{ height: style.height }}
        onChange={e => {
          handleChange('cb', !checked);
          if (props.events.onChange) props.events.onChange(e);
        }}
      />
      {dateValue !== undefined ? (
        <input // Date
          {...(props.dataset ? props.dataset : undefined)} // used for grid indexing
          type="date"
          value={dateValue}
          style={{
            width: bWidthNaN
              ? `calc(${style.width} * ${
              timeValue !== undefined ? 0.65 : 1
              }) - 20`
              : style.width * (timeValue !== undefined ? 0.65 : 1) - 20,
            height: style.height,

            ...disabled,
            border: 'none',
            overflow: 'hidden',
            background: 'transparent',
          }}
          onChange={e => {
            handleChange('dt', e);
            if (props.events.onChange) props.events.onChange(e);
          }}
        />
      ) : (
          ''
        )}
      {timeValue !== undefined ? (
        <input // Time
          {...(props.dataset ? props.dataset : undefined)} // used for grid indexing
          type="time"
          value={timeValue}
          style={{
            width: bWidthNaN
              ? `calc(${style.width} * ${timeValue !== undefined ? 0.35 : 0})`
              : style.width * (timeValue !== undefined ? 0.35 : 0),
            height: style.height,

            ...disabled,
            border: 'none',
            overflow: 'hidden',
            background: 'transparent',
          }}
          onChange={e => {
            handleChange('t', e);
            if (props.events.onChange) props.events.onChange(e);
          }}
        />
      ) : (
          ''
        )}
    </div>
  );
};

export { DT, DateTime, DateTimeControl, DateTimeControl as TimeControl };
