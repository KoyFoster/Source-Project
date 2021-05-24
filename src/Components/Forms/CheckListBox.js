import React, { useState } from 'react';
import { CheckBox } from './CheckBox';
import { List } from './List';

class CheckListBox extends React.Component {
  constructor(props) {
    super(props);

    // Note: See below states can be moved over to SimpleGrid
    this.state = {
      mutable: this.props.value === undefined,
      // this is an array of booleans that reflect the list of checked items
      value:
        this.props.value !== undefined
          ? undefined
          : this.props.defaultValue.map((row) => [...row]),
    };
  } // end of constructor

  // get value
  getValue = () => {
    // Return either state or given value
    const result = this.state.mutable ? this.state.value : this.props.value;
    return result;
  };

  getClearedValue = () =>
    this.props.list ? new Array(this.props.list.length).fill(false) : [];
  // local var to buffer the value
  // value = this.getValue();
  getArrayAsString = (arr) => {
    // convert to string
    let i = -1;
    const newValue = this.props.list
      ? this.props.list.map((item) => {
          i += 1;
          if (arr[i]) return item;
          return null;
        })
      : [];

    return newValue
      .filter(function cull(el) {
        return el !== null;
      })
      .join(this.props.separator);
  };

  // This special behavior
  // 1. First this updates the list base wether it's single select or multi
  // 2. Then if the control is mutable or not,
  //  - it will will either return the values, or set the give setState
  handleChange = (e) => {
    const { checked } = e.target;
    const { data } = e.target;

    // 1. Update value
    let newValue;
    // check for single select
    if (this.props.singleSelect) {
      // Return single result after clear previous selection
      newValue = this.getClearedValue(); // clear
    } else {
      // Return all selections
      const buffer = this.getValue();
      newValue = [...buffer];
    }

    // Add or remove new checked off thing
    if (checked === true) {
      newValue.push(data);
    } // May or may not work
    else {
      let index = 0;

      // check if item is in the checked list
      newValue.every((val) => {
        if (data.id === val.id) {
          // break
          return false;
        }
        // continue
        index++;
        return true;
      });

      if (!(index > newValue.length)) newValue.splice(index, 1);
    }

    // set to data so that it can be passed
    e.target.data = newValue;

    if (!this.state.mutable) {
      // 2. if mutable save value to self
      this.setState({ value: newValue });
    }
    // 3. if not mutable then only return value to caller
    return e;
  };

  render() {
    return (
      <List
        // used for grids and needs to be percolated to the List element
        {...{ 'data-x': this.props['data-x'], 'data-y': this.props['data-y'] }}
        verticalAlignment={this.props.verticalAlignment}
        data={this.props.list}
        checked={this.getValue()}
        style={{
          ...this.props.style,
          position: 'relative',
          width: '100%',
        }}
        events={{
          onClick: this.props.onClick,
          onChange: this.props.onChange,
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur,
        }}
        onChange={(e) => {
          this.handleChange(e);
          if (this.props.onChange) {
            this.props.onChange(e);
          }
        }}
      >
        <CheckBox
          classNames={['listitem', 'li_pushed']}
          hasBorder={false}
          pushLike={this.props.pushLike}
          style={{
            justifyContent: 'left',
            border: 'none',
            paddingRight: '2px',
          }}
        />
      </List>
    );
  }
}

const CheckListBoxControl = (props) => {
  // only pushlike if ListBox
  const { control } = props;
  const pushLike = control.controlType === 14;
  const { listProperties } = control.properties;
  const { sort } = listProperties;
  const { separator } = listProperties;
  const singleSelect =
    // not multi-selection and is ListBox
    listProperties.selection !== 1 && control.controlType === 14;
  const { events } = props;
  // convert control data into single dimension
  const dataFormat = (d) => {
    if (d.length === 1 && d[0][0].length === 0) return [];
    const buffer = d.map(function cull(val) {
      return val.slice(0, 1)[0]; // subtract unecessary rows
    });
    return buffer.length ? buffer : [];
  };
  const [style, setStyle] = useState(props.style);
  const [data, setData] = useState(() => {
    const d = dataFormat(control.data);
    // empty data check
    if (d.length === 0) control.data = [];
    return sort ? d.sort() : d;
  });
  const [value, setValue] = useState('');

  // Function Links
  control.setStyle = setStyle;
  control.setData = (newData) => {
    control.data = newData;
    const d = dataFormat(control.data);
    if (d.length === 0) control.data = [];
    setData(sort ? d.sort() : d);
  };
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  control.setValue = (val) => {
    setValue(val);
    control.value = val;
  };
  control.clear = () => {
    control.handleChange('');
  };
  const handleChange = (e) => {
    control.handleChange(e.target.value);
  };

  // return render
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
      }}
    >
      <CheckListBox
        pushLike={pushLike}
        setChildren={data}
        verticalAlignment={
          control.properties.propStyles.verticalAlignment === 1
        }
        value={value}
        separator={separator}
        singleSelect={singleSelect}
        style={{
          width: '100%',
          height: '100%',
        }}
        {...events}
        onChange={(e) => {
          handleChange(e);
          if (events.onChange) {
            events.onChange(e);
          }
        }}
      />
    </div>
  );
};

export { CheckListBox, CheckListBoxControl, CheckListBoxControl as ListBox };
