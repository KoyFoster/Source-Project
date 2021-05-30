/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */

import React, { useContext, useState, useEffect } from 'react';
import { GET } from 'api/request';
// import { CNDataContext } from '../../contexts/CNDataContext';
import SVGCanvas from '../SVGCanvas';
import { CaptionBar } from '../..';
import { FilePicker } from '../../FileManagment';
import { ImageHandler } from '../Image';
import { Rectangle } from '../../Dividers';
import TogglePopup from '../../Helper/TogglePopup';

// Note: This is currently a shell
const ImageDraw = ({ cnid, ...props }) => {
  const { control } = props;
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;

  /* ***** LSH 9/15/2020 *****
   * Forms contexts moved from component level to module level.  This should be
   * a prop.
  const { cnState } = useContext(CNDataContext);
   */

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
    control.data = data;

    return buffer;
  };

  const [data, setData] = useState(getData());
  const [imageConfig, setImageConfig] = useState();
  const getFindings = () =>
    imageConfig
      ? imageConfig
          .map((item) => {
            if (item.type === 'Find')
              return {
                id: item.imgArchID,
                name: item.name,
                type: 'jpeg',
                data: `data:image/jpeg;base64,${item.findImg1}`,
              };
            return null;
          })
          .filter((item) => item !== null)
      : undefined;

  const getBGFinding = () => {
    let buffer;
    if (imageConfig)
      imageConfig.forEach((item) => {
        if (item.type === 'BG') {
          buffer = item;
        }
      });

    return buffer;
  };

  // Function Links
  control.setStyle = setStyle;
  control.setData = (newData) => {
    control.data = newData;
    setData(newData);
  };
  control.getData = () => data;
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });

  //
  control.setValue = (val) => {
    if (!val) {
      setValue(undefined);
      control.value = undefined;
    }

    const buffer = new ImageHandler(val.dataTN, val.imgFormat, val.imgPath);

    setValue(buffer);
    control.value = buffer;
  };

  control.clear = () => {
    control.handleChange(undefined);
  };

  const handleChange = (val) => {
    if (!val) {
      setValue(undefined);
      control.value = undefined;
    }

    let buffer;
    // Check for raw image data
    if (val.Icon) {
      buffer = new Image(val.Icon, undefined, val.FileName);
    } else {
      buffer = new Image(val.dataTN, val.imgFormat, val.imgPath);
    }

    control.handleChange(buffer);
  };

  const clear = () => {
    control.value = undefined;
    setValue(undefined);
    control.handleDirty(undefined);
  };
  control.clear = clear;

  const buttons = () => [
    <button
      key="ImageDraw"
      type="button"
      disabled={imageConfig}
      style={{ padding: 0 }}
      onClick={(e) => {
        setImageConfig([]);
        runGetImageConfig();
      }}
    >
      ImgDraw
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
          style={{ width: '100%', height: 'calc(100% - 20px)', color: 'white' }}
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
    <button key="ImageEditor" type="button" disabled style={{ padding: 0 }}>
      ImgEdit
    </button>,
  ];

  // Get Data
  const runGetImageConfig = () => {
    // Populate Provider
    const controller = new AbortController();
    getImageConfig(controller.signal);
    return () => controller.abort();
  };

  // [DFTIDs, DFIDS], Date Range, ProviderID,
  const getImageConfig = (signal) => {
    // const { cnid } = cnState;

    // get the data from the API and format it to display properly
    if (false) {
      GET(`records/imageexamdata/${cnid}`, signal).then((result) => {
        if (!signal.aborted) {
          setImageConfig(result.data.imageConfig);
        }
      });
    } else {
      GET(`records/imageconfig/${'2'}`, signal).then((result) => {
        if (!signal.aborted) {
          setImageConfig(result.data.imageConfig);
        }
      });
    }
  };

  // used for intialization
  useEffect(() => {
    // eslint-disable-next-line

    // update value to new BG
    const buffer = getBGFinding();
    if (buffer) {
      handleChange({
        dataTN: buffer.findImg2,
        imgPath: buffer.name,
        imgFormat: 31,
      });
    }
  }, [imageConfig]);

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
      <SVGCanvas
        imgAsCanvas
        itemLabel={
          <text
            textAnchor="middle"
            style={{
              outline: '1px solid blue',
              fill: 'rgb(0,0,255)',
              fontSize: '11px',
            }}
          >
            [label]
          </text>
        }
        items={getFindings()}
        bgImage={value ? value.getData() : ''}
        selStyle={{
          outline: '1px dashed gold',
          outlineColor: 'invert difference gold' /* fitler: 'invert(50%)' */,
        }}
        style={{
          overflow: 'scroll',
          width: '100%',
          height: `calc(100% - 20px)`, // caption header offset. Propbably a bette rway of doing this
        }}
      />
    </div>
  );
};

export { ImageDraw };
