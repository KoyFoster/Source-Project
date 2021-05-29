import '../App.css';
import React, { useState } from 'react';
import { Row, Col } from './DivGrid.js';
import Grid from './Forms/Grid';
import TogglePopup from './TogglePopup';

//User Input Class
function StatInputForm(props) {
  const Table = props.data().vTable(props.iD);
  const FullTable = props.data().vTable(props.iD, true);
  const editMode = props.editMode;
  const bCalc = props.bCalc;

  // grid states
  const [rowOrder, setRowOrder] = useState();
  // const [toggle, setToggle] = useState(false);
  // const Flip = (val = !toggle) => {
  //   setToggle(val);
  // };

  const GridFuncs = {
    MoveSelDown: undefined,
    MoveSelUp: undefined,
    setRowOrder: setRowOrder,
    setValue: (val) => {
      props.setData.setTable(props.iD, val);
      props.setData.Update();
    },
  };

  const Update = (dataObj) => {
    // console.log('dataObj:', dataObj);
    if (dataObj.name === 'Level Cap') {
      return props.UpdatePointLimit(props.iD, dataObj.value);
    }
    if (dataObj.name === 'RNG') {
      return props.RandomizeStats(props.iD);
    }
    if (dataObj.name === 'PointDiff') {
      return props.Update(props.iD, dataObj);
    }
    //Update Diagram
    return props.Update(props.iD, { ...dataObj, y: dataObj.y - 1 });
  };

  /* Update Calculations on rerender */
  if (props.UpdateCalcs) props.UpdateCalcs();

  const Field = (PROPS) => {
    const [value, setValue] = useState(
      PROPS.type === 'checkbox' ? PROPS.checked : PROPS.value,
    );

    return (
      <input
        {...PROPS}
        value={PROPS.type !== 'checkbox' ? value : PROPS.value}
        checked={PROPS.type === 'checkbox' ? value : undefined}
        onChange={(e) => {
          // console.log('e:', 'dataset:', e.target.dataset, 'Name:', e.target.name, 'value:', e.target.value, );
          /* Validation: Skip if no coordinate are returned */
          if (
            (e.target.dataset.x === undefined ||
              e.target.dataset.y === undefined) &&
            e.target.name !== 'Quantity' &&
            e.target.name !== 'Name' &&
            e.target.name !== 'ShowName' &&
            e.target.name !== 'ShowGraph'
          )
            return;
          const x = parseInt(e.target.dataset.x, 10);
          const y = parseInt(e.target.dataset.y, 10) - 1;

          const val = props.Update(props.iD, {
            x: x,
            y: y,
            value: e.target.value,
            checked: e.target.checked,
            name: e.target.name,
          });
          setValue(val);
        }}
        onBlur={() => {
          // a forced rerender because the information is array based
          // currently needed for updating rows
          // Force Update
          // props.setData.Update();
        }}
      />
    );
  };

  const PointDiff = () => {
    const [checked, setChecked] = useState(
      Boolean(props.data().PointDiff(props.iD)),
    );

    return bCalc === true ||
      props.data().PointDiff(props.iD) === undefined ||
      props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <input
        type="checkbox"
        name="PointDiff"
        checked={checked}
        style={{ width: '16px' }}
        onChange={(e) => {
          setChecked(
            Update({
              name: 'PointDiff',
              checked: e.target.checked,
            }),
          );
        }}
      />
    );
  };

  /* Validate Presence of stats */
  const hLimit =
    bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <div>
        Stat Cap:
        <Field
          type="number"
          name="Limit"
          value={props.data().PointLimit(props.iD)}
        />
      </div>
    );

  const hTotal =
    bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <label>:Min - Total Points: {props.data().PointTotal(props.iD)} </label>
    );

  const hRandom =
    bCalc === false && editMode ? (
      <button
        name="RNG"
        style={{ borderRadius: '8px' }}
        onClick={() => Update({ name: 'RNG' })}
      >
        {' '}
        Random{' '}
      </button>
    ) : (
      ''
    );

  const hStatProps = () => {
    return (
      <Col
        name="GraphBody"
        style={{ visibility: editMode ? 'visible' : 'hidden' }}
      >
        <Row name="QRow">
          Stats:{' '}
          <Field
            type="number"
            name="Quantity"
            value={Number(Table.length)}
          ></Field>
          {hLimit}
        </Row>
        <Row name="PDRow" alignItems="center">
          {PointDiff()}
          {hTotal}
        </Row>
      </Col>
    );
  };

  const hHeader = () => {
    if (editMode)
      return [
        <label style={{}}>Stats</label>,
        <label>Value</label>,
        <label style={{}}>Min</label>,
        <label style={{}}>Max</label>,
        <label>(unit)</label>,
        <label
          style={{
            display: bCalc ? 'initial' : 'none',
          }}
        >
          [ref]
        </label>,
        <label
          style={{
            display: bCalc ? 'initial' : 'none',
          }}
        >
          (expression)
        </label>,
      ];
    else return undefined;

    // return [
    //   <label style={{ display: 'none' }}></label>,
    //   <label></label>,
    //   <label style={{ display: 'none' }}></label>,
    //   <label style={{ display: 'none' }}></label>,
    //   <label></label>,
    //   <label
    //     style={{
    //       display: 'none',
    //     }}
    //   ></label>,
    //   <label
    //     style={{
    //       display: 'none',
    //     }}
    //   ></label>,
    // ];
  };

  const hBody = () => {
    if (editMode) {
      return [
        <Field
          name={'Types'}
          key={'Types'}
          style={{
            width: '136px',
            textAlign: 'center',
            ...props.tStyle,
          }}
        />,
        bCalc === false ? (
          <Field
            type="number"
            name={'Value'}
            key={'Value'}
            style={{ textAlign: 'right', ...props.vStyle }}
          />
        ) : (
          <div name={'Value'} key={'Value'} style={{ ...props.vStyle }}>
            [value]
          </div>
        ),
        bCalc === false ? (
          <Field
            type="number"
            name={'Min'}
            key={'Min'}
            style={{
              width: '56px',
            }}
          />
        ) : (
          <div name={'Min'} key={'Min'}>
            [value]
          </div>
        ),
        bCalc === false ? (
          <Field
            type="number"
            name={'Max'}
            key={'Max'}
            style={{ width: '56px' }}
          />
        ) : (
          <div name={'Min'} key={'Min'}>
            [value]
          </div>
        ),
        <Field
          name={'Unit'}
          key={'Unit'}
          style={{ width: '56px', ...props.vStyle }}
        />,
        <Field
          name={'References'}
          key={'References'}
          style={{
            display: bCalc ? 'initial' : 'none',
            width: '64px',
          }}
        />,
        <Field
          name={'Expression'}
          key={'Expression'}
          style={{
            display: bCalc ? 'initial' : 'none',
            width: '128px',
          }}
        />,
      ];
    } else {
      return [
        <div
          key={'Types'}
          name={'Types'}
          style={{
            width: '256px',
            textAlign: 'left',
            ...props.tStyle,
          }}
        >
          [value]
        </div>,
        <div
          key={'Value'}
          name={'Value'}
          style={{
            width: '64px',
            overflow: 'hidden',
            textAlign: 'right',
            ...props.vStyle,
          }}
        >
          [value]
        </div>,
        <div
          type="number"
          key={'Min'}
          name={'Min'}
          style={{
            display: 'none',
          }}
        />,
        <div
          type="number"
          key={'Max'}
          name={'Max'}
          style={{
            display: 'none',
          }}
        />,
        <div
          key={'Unit'}
          name={'Unit'}
          style={{ width: '56px', textAlign: 'left', ...props.vStyle }}
        >
          [value]
        </div>,
        <div
          key={'References'}
          name={'References'}
          style={{
            display: 'none',
          }}
        />,
        <div
          key={'Expression'}
          name={'Expression'}
          style={{
            display: 'none',
          }}
        />,
      ];
    }
  };

  const hFooter =
    bCalc === true ||
    !editMode ||
    (props.data().PointTotal(props.iD) === -1 &&
      props.data().PointMin(props.iD) === -1 &&
      props.data().PointMax(props.iD) === -1)
      ? undefined
      : [
          <label style={{}}>Totals</label>,
          props.data().PointTotal(props.iD) !== -1 ? (
            <label>{props.data().PointTotal(props.iD)}</label>
          ) : (
            <label>-</label>
          ),
          props.data().PointMin(props.iD) !== -1 ? (
            <label style={{}}>{props.data().PointMin(props.iD)}</label>
          ) : (
            <label>-</label>
          ),
          props.data().PointMax(props.iD) !== -1 ? (
            <label>{props.data().PointMax(props.iD)}</label>
          ) : (
            <label>-</label>
          ),
          <label>-</label>,
          <label
            style={{
              display: bCalc ? 'initial' : 'none',
            }}
          >
            -
          </label>,
          <label
            style={{
              display: bCalc ? 'initial' : 'none',
            }}
          >
            -
          </label>,
        ];

  const Name = () => {
    const SN = props.data().ShowName(props.iD);
    const SD = props.data().ShowGraph(props.iD);
    const bShow = SN === '+';
    const bShowGraph = SD === '+';
    const val = props
      .data()
      .Name(props.iD)
      .slice(1, props.data().Name(props.iD).length - 1);
    return editMode ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textJustify: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          Show
          <Field
            name="ShowName"
            type="checkbox"
            checked={bShow}
            style={{ width: '16px' }}
            value="Show"
          />
        </div>
        <Field
          name="Name"
          value={val}
          style={{
            width: '100%',
            ...props.lStyle,
          }}
        />
        <div style={{ display: 'flex' }}>
          <Field
            name="ShowGraph"
            type="checkbox"
            checked={bShowGraph}
            style={{ width: '16px' }}
            value="Show"
          />
          Graph
        </div>
      </div>
    ) : (
      <div
        name="Name"
        style={{
          display: bShow ? 'initial' : 'none',
          ...props.lStyle,
        }}
      >
        {val}
      </div>
    );
  };

  const iRows = Table.length;

  // if (props.iD === 1) console.log('SIF:', rowOrder, Table);
  // console.log('toggle:', toggle);
  return (
    <div /* className="inherit" */>
      {editMode ? (
        <TogglePopup component={<div>Big BUTTS</div>}>CSS</TogglePopup>
      ) : null}

      {Name()}
      {hStatProps()}
      <div name="FormBody" align="center">
        <Col>
          <div>
            <button
              onClick={() => {
                if (GridFuncs.MoveSelUp) {
                  GridFuncs.MoveSelUp();
                  // props.setData.Update();
                }
              }}
            >
              UP
            </button>
            <button
              onClick={() => {
                const buffer = FullTable;
                buffer.push([...FullTable[1]]);
                props.setData.setTable(props.iD, buffer);
                props.setData.Update();
              }}
            >
              TEST
            </button>
            <button
              onClick={() => {
                if (GridFuncs.MoveSelDown) {
                  GridFuncs.MoveSelDown();
                  // props.setData.Update();
                }
              }}
            >
              DOWN
            </button>
          </div>
          <Grid
            bAddRowHeader={editMode}
            colOrder={[0, 1, 4, 2, 3, 5, 6]}
            hHeader={hHeader()}
            hFooter={hFooter}
            iRows={iRows}
            cellStyle={{
              borderBottom: editMode ? '2px solid white' : undefined,
            }}
            ValuesOffset={1}
            Data={FullTable}
            bNoSel={!editMode}
            GridFuncs={GridFuncs}
            UpdateValue
            rowOrder={rowOrder}
          >
            {hBody()}
          </Grid>
        </Col>
        {hRandom}
      </div>
    </div>
  );
}

export default StatInputForm;
