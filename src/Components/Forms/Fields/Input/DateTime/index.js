/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

// TODO: Add single click date and time set and try to replace the x with a checkbox
// TODO: Make sure you can get values from all involved controls
import React, { useState } from 'react';

class DT {
  static FormatDate(today) {
    return `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${
      today.getMonth() + 1
    }-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;
  }

  static FormatTime(today) {
    return `${today.getHours() < 10 ? '0' : ''}${today.getHours()}:${
      today.getMinutes() < 10 ? '0' : ''
    }${today.getMinutes()}`;
  }
}

const DateTime = (props) => {
  const { type } = props;
  // local vars
  let checked = false;
  let dateValue;
  let timeValue;
  // set value states
  switch (type) {
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
  const parseValue = (dtVal) => {
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
        onChange={(e) => {
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
        onChange={(e) => {
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
        onChange={(e) => {
          handleChange('t', e);
        }}
      />
    </div>
  );
};

export { DT, DateTime };
