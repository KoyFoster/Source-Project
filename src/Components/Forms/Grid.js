/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';

// render grid data
const RenderGrid = (props) => {
  const arrCheck = (arr) => (arr ? (Array.isArray(arr) ? arr : []) : []);

  const { header } = props;
  const hHeader = arrCheck(props.hHeader);
  const { rowHeader } = props;
  const { style } = props;
  const { headerStyle } = props;
  const { bodyStyle } = props;
  const rowHeaderStyle = props.rowHeaderStyle
    ? props.rowHeaderStyle
    : props.headerStyle;
  const { rowStyle } = props;
  const { cellStyle } = props;
  const { onClick } = props.events;
  const { onChange } = props.events;
  const { onFocus } = props.events;
  const { onBlur } = props.events;
  const { value } = props;
  const hRow = arrCheck(props.hRow);

  const headerFromValue = (row) => {
    let x = -1;
    return row.map(() => {
      x += 1;
      const hasElem = hHeader.length > x;
      return (
        <th key={`rhd${x}`} name={`rhd${x}`} style={headerStyle}>
          {
            hasElem
              ? hHeader[x]
              : String.fromCharCode(
                  x + 65,
                ) /* Offset by one as x will start at 0 */
          }
        </th>
      );
    });
  };

  const parseValueIntoGrid = () => {
    if (!Array.isArray(value)) return;
    if (value.length <= 0) return;
    if (value[0] <= 0) return;

    function handleEvent(e) {
      const { x } = e.target.dataset;
      const { y } = e.target.dataset;
      const { usechecked } = e.target.dataset;

      // set cell
      value[x][y] = usechecked
        ? e.target.checked
          ? e.target.value
          : ''
        : e.target.value;
      return value;
    }

    // map
    // table
    let iX = -1;
    let iY = -1;
    return (
      <table style={{ ...style /* , tableLayout: 'fixed' */ }}>
        <tbody style={bodyStyle}>
          {header ? ( // header
            // iterate the length of the first data row
            value.length ? (
              <tr key="hd" name="hd" style={rowStyle}>
                {rowHeader && header ? (
                  <th key="hd" name="hd" style={headerStyle}>
                    (0,0)
                  </th>
                ) : null}
                {headerFromValue(value[0])}
              </tr>
            ) : // end of header map
            null
          ) : null}
          {value.map((row) => {
            iX += 1;
            iY = -1;
            return (
              <tr key={`tr${iX}`} name={`tr${iX}`} style={rowStyle}>
                {rowHeader ? ( // row header
                  <th
                    key={`rhd${iX}`}
                    name={`rhd${iX}`}
                    style={{ ...cellStyle, ...rowHeaderStyle }}
                  >
                    {iX}
                  </th>
                ) : null}
                {
                  row.map((col) => {
                    iY += 1;

                    const dataset = {
                      'data-x': iX,
                      'data-y': iY,
                    };

                    const hasElem = hRow.length > iY;
                    return (
                      <th key={`th${iY}`} name={`th${iY}`} style={cellStyle}>
                        {hasElem
                          ? {
                              ...hRow[iY],
                              props: {
                                ...hRow[iY].props,
                                ...dataset,
                                defaultValue: col,

                                onClick: (e) => {
                                  const { y } = e.target.dataset;
                                  // cell event
                                  if (hasElem)
                                    if (hRow[y].props.onClick)
                                      hRow[y].props.onClick(e);
                                  // tree event
                                  if (onClick) onClick(handleEvent(e));
                                },
                                onChange: (e) => {
                                  // console.log('onChange:', e.target);
                                  const { y } = e.target.dataset;
                                  // cell event
                                  if (hasElem)
                                    if (hRow[y].props.onChange)
                                      hRow[y].props.onChange(e);
                                  // tree event
                                  if (onChange) onChange(handleEvent(e));
                                },
                                onFocus: (e) => {
                                  const { y } = e.target.dataset;
                                  // console.log('onFocus:', { y, hRow });
                                  // cell event
                                  if (hasElem)
                                    if (hRow[y].props.onFocus)
                                      hRow[y].props.onFocus(e);
                                  // tree event
                                  if (onFocus) onFocus(handleEvent(e));
                                },
                                onBlur: (e) => {
                                  const { y } = e.target.dataset;
                                  // console.log('onBlur:', { y, hRow });
                                  // cell event
                                  if (hasElem)
                                    if (hRow[y].props.onBlur)
                                      hRow[y].props.onBlur(e);
                                  // tree event
                                  if (onBlur) onBlur(handleEvent(e));
                                },
                              },
                            }
                          : col}
                      </th>
                    );
                  }) // end of row map
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const rendered = parseValueIntoGrid();
  // console.log(`parseValueIntoGrid(${value}):`, rendered);
  return <div>{rendered}</div>;
};

// handles grid data
class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mutable: !this.props.value,
      value: this.props.value
        ? undefined
        : Array.isArray(this.props.defaultValue)
        ? this.props.defaultValue.map((row) => [...row])
        : [],
    };
  }

  // this expects an array of data
  handleChange = (value) => {
    if (this.state.mutable) this.setState({ value });
    if (this.props.onChange) this.props.onChange(value);
  };

  render() {
    return (
      <RenderGrid
        {...this.props}
        value={
          this.state.mutable
            ? this.state.value
            : this.props.value.map((row) => [...row])
        }
        events={{
          onClick: this.props.onClick,
          onChange: this.handleChange,
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur,
        }}
      />
    );
  }
}
export default Grid;
