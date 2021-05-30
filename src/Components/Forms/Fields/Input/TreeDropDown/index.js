/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { DropDown } from '../../Helper';
import { Tree } from '../Tree';

// HardCode these two things to reproduce VS behavior
//    Note: Using '-' to denote skipped items
// 		-2. Single Expand (Single Click Expand; Instead of Double-Click Expand)
//      - Will do these some other time
// 		-3. Track Select (???)
// 		+4. Check Boxes (Essentially single select without the CBs visible)
//      - Example: (Lagophthalmos,Lid_lesion_Nodular/Upper Lid/Lid lesion - Nodular Hyperemic,Lid_lesion_Nodular/Upper Lid/Lid lesion - Nodular Ulcerative,Lid_lesion_Nodular/Upper Lid/Lid lesion - Nodular Yellow-White,Lid Scaling)
// 		+6. Expand Upon Population (Expands all branches upon load)
//     - Now Being pulled
// 		+8. Selection Separator(TDD)
//     - Being pulled

// 		7. Parent Child Separator (The character used to separate child from their parents)
// 		5. Save Expanded Item (Remembers the hiearchy in the following format: Parent/Child,/Parent/Child,Child.
// 		9. Save Parent Text (Prepend parent text onto every child, otherwise, treat the parent as a normal item)
// 		10. Save Children Text (if all children are selected, only show the parent)

// 		+11. Place Each Item on a separate line(TDD)]
//     - Not being pulled
// 		-12. Vertical Scroll(TDD)
// 		-13. Use RichEdit(TDD)
// Note: This is currently a shell
// This control uses control: {data}, style: {disabled}, value,

const Expand = (props) => {
  const { checked } = props;
  const { onChange } = props;

  return (
    <label
      style={{
        display: 'inline-block',
        width: '14px',
        textAlign: 'center',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        style={{ display: 'none' }}
        onChange={onChange}
      />
      {checked ? '-' : '+'}
    </label>
  );
};

const TreeDropDown = (props) => {
  const { id } = props;
  const { separator } = props;
  const { parentSeparator } = props;
  const { separateLine } = props;
  const { saveChildren } = props;
  const { saveParents } = props;
  const { saveExpanded } = props;
  const { nodes } = props;
  const { showCheckbox } = props;
  const { noCascade } = props;
  const { singleSelect } = props;
  const { setString } = props;
  const { string } = props;
  const { defaultValue } = props;
  const { Funcs } = props;

  const { checked } = props;
  const { setChecked } = props;
  const style = props.style ? props.style : {};
  const { fieldStyle } = props;
  const { ddStyle } = props;

  const { onChange } = props;
  const { onClick } = props;
  const { onBlur } = props;
  const { onFocus } = props;

  // const dataset = { 'data-x': props['data-x'], 'data-y': props['data-y'] };

  const handleSelection = (e) => {
    onChange(e);
  };

  const hList = () => (
    <Tree
      style={style}
      string={string}
      font={style.font}
      separator={separator}
      parentSeparator={parentSeparator}
      separateLine={separateLine}
      saveChildren={saveChildren}
      saveParents={saveParents}
      saveExpanded={saveExpanded}
      id={id}
      nodes={nodes}
      showCheckbox={showCheckbox}
      noCascade={noCascade}
      singleSelect={singleSelect}
      onChange={onChange}
      setString={setString}
      defaultValue={defaultValue}
      Funcs={Funcs}
      onChange={(e) => {
        handleSelection(e);
      }}
      onClick={(e) => {
        onClick(e);
      }}
      onBlur={(e) => {
        onBlur(e);
      }}
      onFocus={(e) => {
        onFocus(e);
      }}
    />
  );

  const input = (
    <textarea
      type="text"
      value={string}
      onChange={(e) => {
        onChange(e);
      }}
      // style={{ width: '100%', background: 'transparent', ...style, border: 'none', }}
      style={{
        whiteSpace: props.wordWrap ? 'wrap' : 'nowrap',
        resize: 'none',
        width: '100%',
        background: 'transparent',
        ...style,
        border: 'none',
      }}
    />
  );

  return (
    <div
      style={{
        border: '1px solid #888888',
        background: 'white',
        borderRadius: '3px',
        ...style,
        height: '100%',
      }}
    >
      <DropDown
        checked={checked}
        setChecked={setChecked}
        field={input}
        content={hList()}
        fieldStyle={fieldStyle}
        ddStyle={ddStyle}
        CBL="right"
        CB={Expand}
      />
    </div>
  );
};

export { TreeDropDown };
