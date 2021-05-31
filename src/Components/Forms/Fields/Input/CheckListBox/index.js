import React, { useState } from 'react';
import { CheckBox } from '../CheckBox';
import { List, ListUtil } from '../List';

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
          pushlike={this.props.pushlike}
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
  const pushlike = control.controlType === 14;
  const { listProperties } = control.properties;
  const { sort } = listProperties;
  const { separator } = listProperties;
  const singleSelect =
    // not multi-selection and is ListBox
    listProperties.selection !== 1 && control.controlType === 14;
  const { events } = props;
  // convert control data into single dimension
  const dataFormat = (d) => {
    let i = 0;

    if (d.length === 1 && d[0][0].length === 0) return [];
    let buffer = d.map(function cull(val) {
      return val.slice(0, 1)[0]; // subtract unecessary rows
    });

    if (sort) buffer = buffer.sort();

    const result = buffer.map(function cull(val) {
      return { value: val, id: i++ }; // subtract unecessary rows
    });

    return result.length ? result : [];
  };
  const [style, setStyle] = useState(props.style);

  const [data, setData] = useState(() => {
    const d = dataFormat(control.data);
    // empty data check
    if (d.length === 0) control.data = [];
    return d;
  });
  const [dataValue, setDataValue] = useState([]);
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line react/prop-types
    const val = props.value ? props.value : '';
    control.value = String(val);
    return val;
  });

  // Function Links
  control.setStyle = setStyle;

  // When updating this, the value also needs to be updated
  control.setData = (newData) => {
    // Set New data
    control.data = newData;
    console.log('newData:', newData);
    setData(newData);

    // If control has value, then update it
    if (value !== '') {
      const buffer = ListUtil.getValueFromStr(newData, value, separator);
      console.log('NewDataValue:', buffer);
      setDataValue(buffer);
    }
  };
  // GET AND SET
  control.getValue = () => ({ type: 6, value: control.value });
  // When string value is set,
  // data value needs to be updated
  control.setValue = (val) => {
    setValue(val);
    control.value = val;
    // Update DataValue
    const dataVal = ListUtil.getValueFromStr(data, val, separator);
    console.warn('CLB SetValue:', val, dataVal);
    setDataValue(dataVal);
  };
  control.clear = () => {
    control.handleChange('');
    setDataValue([]);
  };
  const handleChange = (e) => {
    setDataValue(e.target.data);
    const val = ListUtil.getStrFromValue(e.target.data, separator);
    setValue(val);
    control.handleDirty(val);
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
        pushlike={pushlike}
        list={data}
        verticalAlignment={
          control.properties.propStyles.verticalAlignment === 1
        }
        value={dataValue}
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
