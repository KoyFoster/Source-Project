/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { DDCB, DropDown } from './DropDown';
import Tree from './Tree';

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
const TreeDropDown = (props) => {
  // props
  const { id } = props;
  const style = props.style ? props.style : {};
  const { font } = props;
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
  const { setValue } = props;
  const { setString } = props;
  const { string } = props;
  const { defaultValue } = props;
  const { Funcs } = props;
  const [checked, setChecked] = useState(false);

  // references
  const parentRef = useRef(null);

  // remaining things to restore
  // 1. aqcuiring and setting value data
  // 2. formatting value data according to tree properties
  // 3. getting setting value data from exam data
  const maxHeight = `${300 + (style.border ? 2 : 0)}px`;
  return (
    <div
      style={{
        ...style,
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        border: style.border ? style.border : '1px solid black',
      }}
    >
      <div
        ref={parentRef}
        style={{
          display: 'flex',
          height: 'inherit',
          flexGrow: 1,
          flexDirection: 'row',
        }}
      >
        {/* TextAreas must be hard coded */}
        <textarea
          value={string}
          style={{
            // hard code
            display: 'block',
            position: 'relative',
            width: '100%',
            resize: 'none',
            fontFamily: style.fontFamily,
            fontStyle: style.fontStyle,
            background: style.background,
            color: style.color,
            border: 'none',
            whiteSpace: props.wordWrap ? 'wrap' : 'nowrap',
            overflow: 'hidden',

            // height must be hardcode for textarea as it has a soft minimum height of around 32px
            height: `calc(100% - 2px)`,
          }}
          onChange={(e) => {
            if (setString) setString(e.target.value);
          }}
        />
        <DDCB
          style={{ position: 'relative' }}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
      </div>
      <DropDown
        parentRef={parentRef}
        bVisible={checked}
        style={{
          maxHeight,
          zIndex: props.tabOrder,
        }}
      >
        <Tree
          font={font}
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
          setValue={setValue}
          setString={setString}
          defaultValue="Normal,no tears,with tears,no tears,with tears,no tears,with tears,no tears,with tears,1+,2+,3+,4+"
          Funcs={Funcs}
        />
      </DropDown>
    </div>
  );
};

export default TreeDropDown;
