import React from 'react';
import { Box, Button, TextField, Checkbox } from '@material-ui/core';
import { Row, Col } from './DivGrid.js';
import '../App.css';
import Grid from './Forms/Grid';

//User Input Class
function StatInputForm(props) {
  const Table = props.data().vTable(props.iD);

  const Update = (dataObj) => {
    // console.log('dataObj:', dataObj);
    if (dataObj.name === 'Name') {
      props.setData.setName(props.iD, dataObj.value);
      props.setData.setUpdate(!props.data().update);
      return;
    }
    if (dataObj.name === 'Level Cap') {
      props.UpdatePointLimit(props.iD, dataObj.value);
      return;
    }
    if (dataObj.name === 'RNG') {
      props.RandomizeStats(props.iD);
      return;
    }
    if (dataObj.name === 'PointDiff') {
      props.Update(props.iD, dataObj);
      return;
    }
    //Update Diagram
    props.Update(props.iD, { ...dataObj, y: dataObj.y - 1 });
  };

  const FIELD = (PROPS) => {
    return (
      <input
        {...PROPS}
        onChange={(e) => {
          // console.log('e:', 'dataset:', e.target.dataset, 'Name:', e.target.name, 'value:', e.target.value, );
          /* Validation: Skip if no coordinate are returned */
          if (
            e.target.dataset.x === undefined ||
            e.target.dataset.y === undefined
          )
            return;
          const x = parseInt(e.target.dataset.x, 10);
          const y = parseInt(e.target.dataset.y, 10) - 1;

          props.Update(props.iD, {
            x: x,
            y: y,
            value: e.target.value,
            checked: e.target.checked,
            name: e.target.name,
          });
        }}
      />
    );
  };

  /* Validate Presence of stats */
  const hLimit =
    props.bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <TextField
        label="Limit:"
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
    props.bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <label>:Min - Total Points: {props.data().PointTotal(props.iD)} </label>
    );
  const hPointDiff =
    props.bCalc === true ||
    props.data().PointDiff(props.iD) === undefined ||
    props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <Checkbox
        name="PointDiff"
        checked={Boolean(props.data().PointDiff(props.iD))}
        style={{ width: 10, height: 0 }}
        onChange={(e) => {
          Update({
            name: 'PointDiff',
            checked: e.target.checked,
          });
        }}
      />
    );
  const hRandom =
    props.bCalc !== true ? (
      <Button name="RNG" onClick={() => Update({ name: 'RNG' })}>
        {' '}
        Random{' '}
      </Button>
    ) : (
      ''
    );

  const hFooter =
    props.bCalc === true ||
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
              display: props.bCalc ? 'initial' : 'none',
            }}
          >
            -
          </label>,
          <label
            style={{
              display: props.bCalc ? 'initial' : 'none',
            }}
          >
            -
          </label>,
        ];

  return (
    <div>
      <Col name="GraphBody">
        <Row>
          <TextField
            label="Stats"
            type="number"
            name="Quantity"
            value={Number(Table.length)}
            onChange={(e) =>
              Update({ name: 'Quantity', value: e.target.value })
            }
          ></TextField>
          {hLimit}
        </Row>
        <Row alignItems="center">
          {hPointDiff}
          {hTotal}
        </Row>
      </Col>
      <Row>
        <Box name="FormBody" align="center">
          <Col>
            <TextField
              label="Name"
              name={`Name_${props.iD}`}
              value={props.data().Name(props.iD)}
              onChange={(e) => Update({ name: 'Name', value: e.target.value })}
            />
            <Grid
              bAddRowHeader={true}
              colOrder={[0, 1, 4, 2, 3, 5, 6]}
              hHeader={[
                <label style={{}}>Stats</label>,
                <label>Value</label>,
                <label style={{}}>Min</label>,
                <label>Max</label>,
                <label>(unit)</label>,
                <label
                  style={{
                    display: props.bCalc ? 'initial' : 'none',
                  }}
                >
                  [ref]
                </label>,
                <label
                  style={{
                    display: props.bCalc ? 'initial' : 'none',
                  }}
                >
                  (expression)
                </label>,
              ]}
              hFooter={hFooter}
              iRows={Table.length}
              cellStyle={{ borderBottom: '2px solid white' }}
              Values={Table}
            >
              <FIELD
                name={'Types'}
                style={{
                  width: '136px',
                  textAlign: 'center',
                }}
              />
              {/*[iRow][0]*/}
              <FIELD
                type="number"
                name={'Value'}
                disabled={props.bCalc}
                style={{ textAlign: 'right' }}
              />
              {/*[iRow][1]*/}
              <FIELD
                type="number"
                name={'Min'}
                style={{
                  width: '56px',
                }}
              />
              {/*[iRow][2]*/}
              <FIELD type="number" name={'Max'} style={{ width: '56px' }} />
              {/*[iRow][3]*/}
              <FIELD name={'Unit'} style={{ width: '56px' }} />
              {/*[iRow][4]*/}
              <FIELD
                name={'References'}
                style={{
                  display: props.bCalc ? 'initial' : 'none',
                  width: '64px',
                }}
              />
              {/*[iRow][5]*/}
              <FIELD
                name={'Expression'}
                style={{
                  display: props.bCalc ? 'initial' : 'none',
                  width: '128px',
                }}
              />
              {/*[iRow][6]*/}
            </Grid>
          </Col>
          {hRandom}
        </Box>
      </Row>
    </div>
  );
}

export default StatInputForm;
