import React from 'react';

class ListUtil {
  static getValueFromStr(list, str, sep) {
    let result = [];
    let split = list.split(sep);

    split.every((val) => {
      list.every((l) => {
        if (val === l.value) {
          result.push(...l);
          return false;
        }

        return true;
      });
    });

    return result;
  }
  static getStrFromValue(list, sep) {
    let result = '';

    list.every((l) => {
      if (result) {
        result = sep + l.value;
      } else {
        result = l.value;
      }
      return true;
    });

    return result;
  }
}

// Note: I was crazy when writing this
// Done to know how many children needed to be created
const List = (props) => {
  const { style } = props;

  const sizerStyle = props.verticalAlignment
    ? {
        display: 'flex',
        maxWidth: '100%',
        overflow: 'auto',
      }
    : {
        maxHeight: '100%',
        overflow: 'auto',
      };
  const alignmentStyle = props.verticalAlignment
    ? {
        display: 'flex',
        flexFlow: 'column wrap',
        maxHeight: style.height,
      }
    : {
        display: 'flex',
        flexFlow: 'column wrap',
        maxWidth: '100%',
      };

  // extract children
  const subChildren = ({
    children,
    setChildren,
    pushLike,
    singleSelect,
    verticalAlignment,
    events,
    ...rest
  }) => rest;
  const listProps = subChildren(props);
  const { children } = props;
  // used for grids
  const dataset = { 'data-x': props['data-x'], 'data-y': props['data-y'] };

  // compile items
  const items = () => {
    let i = -1;
    const result = props.data.map((item) => {
      i += 1;

      // Check for checked state
      let checked = false;
      // if checked values passed as a list of objects, generate a list
      if (typeof item === 'object' && item !== null) {
        // check if item is in the checked list
        props.checked.every((chk) => {
          if (item.id === chk.id) {
            checked = true;
            // break
            return false;
          }
          // continue
          return true;
        });
      }

      return props.children
        ? {
            //  clone passed child element
            ...children,
            // apply unique properties
            props: {
              // inherit data sets used by proprietary grid
              ...{ ...dataset, 'data-i': i },
              // acquire base props of passed child
              ...children.props,
              // generic value handling
              ...(props.value !== undefined ? { value: props.value[i] } : {}),
              // Checked properties intended for checkboxes
              ...(checked !== undefined ? { checked: checked } : {}),
              // Basic elements like labels expect a string value as their children
              ...(item !== undefined ? { children: item.value } : {}),
              // intended for data object handling
              // list events that allow for data to be returned
              onChange: (e) => {
                e.target.data = item;
              },
            },
          }
        : props.data[i];
    });
    return result;
  };

  // return
  return (
    <div {...listProps} style={{ ...style, ...sizerStyle }}>
      <div style={alignmentStyle}>{items()}</div>
    </div>
  );
};

export { List, ListUtil };
