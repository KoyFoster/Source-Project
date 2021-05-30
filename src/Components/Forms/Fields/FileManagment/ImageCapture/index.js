/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { CaptionBar, Rectangle } from '../../Dividers';
import { FilePicker } from '../FilePicker';
import { ImageHandler } from '../../Imaging';
import TogglePopup from '../../Helper/TogglePopup';

// Note: This is currently a shell
const ImageCapture = (props) => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;

  // value format
  // {
  //   dataTN:,
  //   imgPath:,
  //   imgFormat:
  // }
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line react/prop-types
    const val = props.value ? props.value : undefined;
    control.value = String(val);
    return val;
  });
  // using this to hold image properties
  // makes saving exam data easy
  const getData = () => {
    const ip = control.properties.imageProperties;

    const buffer = {
      DeviceID: ip.deviceID,
      ImgCatID: ip.imgCatID,
      ImgPath: ip.imgPath,
      ImgTypeID: ip.imgTypeID,
    };
    // console.log('Image Capture:', buffer);

    return buffer;
  };
  const [data, setData] = useState(getData());

  // Function Links
  control.setStyle = setStyle;
  control.setData = (newData) => {
    control.data = newData;
    setData(newData);
  };
  control.getData = () => data;

  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = (val) => {
    if (!val) {
      setValue(undefined);
      control.value = undefined;
    }

    const buffer = new ImageHandler(val.dataTN, val.imgFormat, val.imgPath);

    setValue(buffer);
    control.value = buffer;
  };
  const handleChange = (val) => {
    const buffer = {
      dataTN: val.Icon,
      imgPath: val.FileName,
      imgFormat: undefined,
    };
    control.handleChange(buffer);
  };
  const clear = () => {
    control.value = undefined;
    setValue(undefined);
    control.handleDirty(undefined);
  };
  control.clear = clear;

  const buttons = () => [
    <button key="Acquire" type="button" disabled style={{ padding: 0 }}>
      Acquire
    </button>,
    <FilePicker
      key="Export"
      directory
      data={value ? value.getData() : ''}
      style={{ width: '24px' }}
    >
      Exp
    </FilePicker>,
    <FilePicker key="Import" style={{ width: '24px' }} getData={handleChange}>
      Imp
    </FilePicker>,

    <TogglePopup
      key="Preview"
      component={
        <Rectangle
          value={value ? value.getData() : ''}
          style={{ width: '100%', height: '100%', color: 'white' }}
        >
          No Image
        </Rectangle>
      }
    >
      Prev
    </TogglePopup>,
    <button
      key="Clear"
      type="button"
      style={{ padding: 0 }}
      onClick={(e) => {
        clear();
      }}
    >
      Clear
    </button>,
    <button key="SelectSource" type="button" disabled style={{ padding: 0 }}>
      Src
    </button>,
  ];

  // used for intialization
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        ...style,
        border: style.border,
        position: style.position ? style.position : 'absolute',
        ...disabled,
      }}
    >
      {CaptionBar(control.label, buttons(), false)}
      <Rectangle
        value={value ? value.getData() : ''}
        style={{ width: '100%', height: 'calc(100% - 20px)', color: 'white' }}
      >
        No Image
      </Rectangle>
    </div>
  );
};

export { ImageCapture };
