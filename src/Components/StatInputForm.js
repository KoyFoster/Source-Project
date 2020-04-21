import React, { useState } from 'react';
import { Box, Button, TextField, Checkbox } from '@material-ui/core';
import { Row, Col } from './DivGrid.js';
import '../App.css';
import Grid from './Forms/Grid';

//User Input Class
function StatInputForm(props) {
  const Table = props.data().vTable(props.iD);
  const editMode = props.editMode;
  const bCalc = props.bCalc;

  const Update = (dataObj) => {
    // console.log('dataObj:', dataObj);
    if (dataObj.name === 'Name') {
      return props.setData.setName(props.iD, dataObj.value);
    }
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
    const [value, setValue] = useState(PROPS.value);

    return (
      <input
        {...PROPS}
        value={value}
        onChange={(e) => {
          // console.log('e:', 'dataset:', e.target.dataset, 'Name:', e.target.name, 'value:', e.target.value, );
          /* Validation: Skip if no coordinate are returned */
          if (
            (e.target.dataset.x === undefined ||
              e.target.dataset.y === undefined) &&
            e.target.name !== 'Quantity'
          )
            return;
          const x = parseInt(e.target.dataset.x, 10);
          const y = parseInt(e.target.dataset.y, 10) - 1;

          setValue(
            props.Update(props.iD, {
              x: x,
              y: y,
              value: e.target.value,
              checked: e.target.checked,
              name: e.target.name,
            }),
          );
        }}
        onBlur={() => {
          props.setData.Update();
        }}
      />
    );
  };

  const PointDiff = (PROPS) => {
    const [checked, setChecked] = useState(
      Boolean(props.data().PointDiff(props.iD)),
    );

    return bCalc === true ||
      props.data().PointDiff(props.iD) === undefined ||
      props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <Checkbox
        name="PointDiff"
        checked={checked}
        style={{ width: 10, height: 0 }}
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
      <TextField
        label="Stat Cap:"
        type="number"
        name="Limit"
        value={props.data().PointLimit(props.iD)}
        onChange={(event) =>
          Update({
            name: 'Level Cap',
            value: parseFloat(event.target.value, 10),
          })
        }
      />
    );
  const hTotal =
    bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <label>:Min - Total Points: {props.data().PointTotal(props.iD)} </label>
    );

  const hRandom =
    bCalc !== true ? (
      <Button name="RNG" onClick={() => Update({ name: 'RNG' })}>
        {' '}
        Random{' '}
      </Button>
    ) : (
      ''
    );

  const hStatProps = () => {
    if (editMode) {
      return [
        <Row>
          Stats:{' '}
          <Field
            type="number"
            name="Quantity"
            value={Number(Table.length)}
          ></Field>
          {hLimit}
        </Row>,
        <Row alignItems="center">
          {PointDiff()}
          {hTotal}
        </Row>,
      ];
    } else {
      return '';
    }
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
    else
      return [
        <label style={{ display: 'none' }}></label>,
        <label></label>,
        <label style={{ display: 'none' }}></label>,
        <label style={{ display: 'none' }}></label>,
        <label></label>,
        <label
          style={{
            display: 'none',
          }}
        ></label>,
        <label
          style={{
            display: 'none',
          }}
        ></label>,
      ];
  };

  const hBody = () => {
    if (editMode) {
      return [
        <Field
          name={'Types'}
          style={{
            width: '136px',
            textAlign: 'center',
          }}
        />,
        <Field
          type="number"
          name={'Value'}
          disabled={bCalc}
          style={{ textAlign: 'right' }}
        />,
        <Field
          type="number"
          name={'Min'}
          disabled={bCalc}
          style={{
            width: '56px',
          }}
        />,
        <Field
          type="number"
          name={'Max'}
          disabled={bCalc}
          style={{ width: '56px' }}
        />,
        <Field name={'Unit'} style={{ width: '56px' }} />,
        <Field
          name={'References'}
          style={{
            display: bCalc ? 'initial' : 'none',
            width: '64px',
          }}
        />,
        <Field
          name={'Expression'}
          style={{
            display: bCalc ? 'initial' : 'none',
            width: '128px',
          }}
        />,
      ];
    } else {
      return [
        <div
          name={'Types'}
          style={{
            width: '256px',
            textAlign: 'left',
          }}
        >
          [value]
        </div>,
        <div
          name={'Value'}
          style={{
            width: '64px',
            overflow: 'hidden',
            textAlign: 'right',
          }}
        >
          [value]
        </div>,
        <div
          type="number"
          name={'Min'}
          style={{
            display: 'none',
          }}
        />,
        <div
          type="number"
          name={'Max'}
          style={{
            display: 'none',
          }}
        />,
        <div name={'Unit'} style={{ width: '56px', textAlign: 'left' }}>
          [value]
        </div>,
        <div
          name={'References'}
          style={{
            display: 'none',
          }}
        />,
        <div
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

  const hName = () => {
    if (editMode) {
      return [
        <TextField
          label="Name"
          name={`Name_${props.iD}`}
          value={props.data().Name(props.iD)}
          onChange={(e) => Update({ name: 'Name', value: e.target.value })}
        />,
      ];
    } else {
      return (
        <div label="Name" name={`Name_${props.iD}`}>
          {props.data().Name(props.iD)}
        </div>
      );
    }
  };

  if (editMode === true)
    return (
      <div class="inherit" style={{ color: 'black' }}>
        <Col name="GraphBody">{hStatProps()}</Col>
        <Row>
          <Box name="FormBody" align="center">
            <Col>
              {hName()}
              <Grid
                bAddRowHeader={true}
                colOrder={[0, 1, 4, 2, 3, 5, 6]}
                hHeader={hHeader()}
                hFooter={hFooter}
                iRows={Table.length}
                cellStyle={{ borderBottom: '2px solid white' }}
                Values={Table}
              >
                {hBody()}
              </Grid>
            </Col>
            {hRandom}
          </Box>
        </Row>
      </div>
    );
  else {
    return (
      <div class="inherit" style={{ color: props.style.color }}>
        <Col name="GraphBody">{hStatProps()}</Col>
        <Row>
          <Box name="FormBody" align="center">
            <Col>
              {hName()}
              <Grid
                bNoSel={true}
                colOrder={[0, 1, 4, 2, 3, 5, 6]}
                hFooter={hFooter}
                iRows={Table.length}
                Values={Table}
              >
                {hBody()}
              </Grid>
            </Col>
            {hRandom}
          </Box>
        </Row>
      </div>
    );
  }
}

export default StatInputForm;
