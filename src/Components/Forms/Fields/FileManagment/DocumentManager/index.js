/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { FilePicker } from '../FilePicker';
import { CaptionBar, Rectangle } from '../../Dividers';
import { Thumbnail } from '../../Imaging';
import TogglePopup from '../../Helper/TogglePopup';
// Note: This is currently a shell
const DocumentManager = (props) => {
  // Vars
  const { control } = props;
  // console.log('props:', props);
  // States ------------------------------------------------------------------------------------
  const [style, setStyle] = useState(props.style);
  const { disabled } = style;
  // This is the array representation of the grid
  // Note: The value in this case may be an array of objects
  // Object Ex: 'FileName, Icon, etc.'
  // Note: Currently the OCR butto does not work in VS. It displays a message that says, 'Failed while initializing OCR Engine.'
  // Note: Both double clicking an item and clicking the Document Manager button launches the Document Manager dialogue. -
  // Cont. The DM dialogue appears to try and let you edit your images with an array of options.
  const [value, setValue] = useState([]);
  const [selection, setSelection] = useState(0);

  // provide macro access to state functions
  control.setStyle = setStyle;

  const getImgType = (id) => {
    switch (id) {
      case 85:
        return 'png';

      case 156:
        return 'tiff';

      case 31:
      default:
        return 'jpeg';
    }
  };

  // NOTE DO NOT USE OBJECT SHORTHAND IN THE NEXT LINE
  // eslint-disable-next-line object-shorthand
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = (val) => {
    if (Array.isArray(val)) {
      const buffer = [];
      val.map((item) => {
        buffer.push({
          FileName: item.imgName ? item.imgName : 'Text.TIFF',
          Icon: item.imgFormat
            ? `data:image/${getImgType(item.imgFormat)};base64,${item.dataTN}`
            : `data:image/jpeg;base64,${item.dataTN}`,
          ImageKey: item.imgKey,
        });
        return undefined;
      });

      control.handleChange(buffer);
    }
  };
  const handleChange = (e) => {
    control.handleChange(e.target.value);
  };
  control.clear = () => {
    control.handleChange([]);
  };

  const getSelIcon = () => {
    if (selection === -1 || value.length === 0) return undefined;

    return value[selection].ImageKey
      ? value[selection].ImageKey
      : value[selection].Icon;
  };

  const Remove = () => {
    if (selection === -1) return;
    const val = [...value];
    let sel = selection;

    val.splice(sel, 1);
    if (val.length - 1 < sel) {
      sel = val.length - 1;
    }

    setSelection(sel);
    setValue(val);
  };

  const Add = (data) => {
    const val = [...value];

    val.push(data);
    setValue(val);

    // update selection to last entry
    setSelection(val.length - 1);
  };

  const buttons = () => [
    <button
      key="Remove"
      type="button"
      style={{ padding: 0 }}
      onClick={() => Remove()}
    >
      X
    </button>,
    <FilePicker
      key="Import"
      style={{ width: '24px' }}
      // setValue={handleChangeByVal}
      getData={Add}
    >
      Imp
    </FilePicker>,

    <TogglePopup
      key="Preview"
      component={
        <Rectangle
          value={getSelIcon()}
          style={{ width: '100%', height: '100%', color: 'white' }}
        >
          No Image
        </Rectangle>
      }
    >
      Prev
    </TogglePopup>,
    // popup Document Manager Dialogue
    <button key="DocumentManager" type="button" disabled style={{ padding: 0 }}>
      DocMng
    </button>,
    // popup email Dialogue
    <button key="Email" type="button" disabled style={{ padding: 0 }}>
      Email
    </button>,
    // popup error message for now
    <TogglePopup
      key="OCR"
      disabled={selection < 0}
      component={<div>Failed while initializing OCR Engine.</div>}
    >
      OCR
    </TogglePopup>,
  ];

  const onClick = (e) => {
    if (Object.keys(e.target.dataset).length > 0) {
      setSelection(parseInt(e.target.dataset.index, 10));
    }
  };
  const getItems = () => {
    const result = [];

    for (let i = 0; i < value.length; i) {
      result.push(
        <Thumbnail
          key={`thumbnail_${i}`}
          selected={i === selection}
          dataset={{ 'data-index': i }}
          icon={value[i].Icon}
          label={value[i].FileName}
          width={100}
          height={100}
          style={{}}
          events={{ onClick }}
        >
          No Image
        </Thumbnail>,
      );
      i += 1;
    }
    return result;
  };

  // console.log('DM value:', value);
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
      <div
        style={{
          display: 'flex',
          height: style.height - 20, // the overflow doesn't work vertically unless the height is specified. 20 si the height of the CaptionBar
          flexWrap: 'wrap',
          overflow: 'overlay',
        }}
      >
        {getItems()}
      </div>
    </div>
  );
};

export { DocumentManager };
