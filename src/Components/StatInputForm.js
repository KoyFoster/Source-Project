import React from 'react';
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Checkbox,
} from '@material-ui/core';
import { Row, Col } from './DivGrid.js';
//import { purple, orange, green, red } from '@material-ui/core/colors';
import '../App.css';
import Grid from './Forms/Grid';

//User Input Class
function StatInputForm(props) {
  const Table = props.data().vTable(props.iD);
  const Header = props.data().vTableHeader(props.iD);

  //On Slices Change, update form
  var RandomizeStats = (event) => {
    if (event.target.name === 'Limit') {
      props.UpdatePointLimit(event);
    } else {
      props.RandomizeStats(props.iD);
    }
  };

  const Update = (event) => {
    //Update Diagram
    if (props.UpdateStates) props.UpdateStates(props.iD, event);
  };

  const inputProps = {
    'aria-label': 'naked',
    disableUnderline: true,
    style: { textAlign: 'center' },
  };
  const FIELD = (PROPS) => {
    // if (props.bCalc) return <div style={{ ...PROPS.style }}>{PROPS.value}</div>;
    // else
    const events = props.bCalc
      ? {
          onFocus: (event) => {
            // event.stopPropagation();
            // event.preventDefault();
            event.target.value = 'butts';
          },
          onBlur: (e) => {
            // e.stopPropagation();
            // e.preventDefault();
            e.target.value = 234523;
            console.log('e:', e.target.value);
          },
        }
      : props.onChange; // onChange={(event) => Update(event)}

    return (
      <TextField
        inputProps={{ ...inputProps }}
        {...PROPS}
        onFocus={(e) => {
          if (events) if (events.onFocus) events.onFocus(e);
        }}
        onBlur={(e) => {
          if (events) if (events.onBlur) events.onBlur(e);
        }}
        onChange={(e) => {
          if (events) if (events.onChange) events.onChange(e);
        }}
      ></TextField>
    );
  };

  /* Validate Presence of stats */
  const hLimit =
    props.bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <div>
        <TextField
          label="Limit:"
          type="number"
          name="Limit"
          value={props.data().PointLimit(props.iD)}
          onChange={(event) => Update(event)}
        ></TextField>
      </div>
    );
  const hTotal =
    props.bCalc === true || props.data().PointLimit(props.iD) === -1 ? (
      ''
    ) : (
      <InputLabel>
        :Min - Total Points: {props.data().PointTotal(props.iD)}{' '}
      </InputLabel>
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
        onChange={(event) => {
          Update(event);
        }}
      />
    );
  const hRandom =
    props.bCalc !== true ? (
      <Button name="RNG" onClick={(event) => RandomizeStats(event)}>
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
          <div
            style={{
              background: '#00000033',
            }}
          >
            Totals
          </div>,
          props.data().PointTotal(props.iD) !== -1 ? (
            <TextField
              value={props.data().PointTotal(props.iD)}
              disabled
            ></TextField>
          ) : (
            <div></div>
          ),
          props.data().PointMin(props.iD) !== -1 ? (
            <TextField
              value={props.data().PointMin(props.iD)}
              style={{
                background: '#FFFFFF33',
              }}
              disabled
            ></TextField>
          ) : (
            <div></div>
          ),
          props.data().PointMax(props.iD) !== -1 ? (
            <TextField
              value={props.data().PointMax(props.iD)}
              disabled
            ></TextField>
          ) : (
            <div></div>
          ),
          ,
          <div></div>,
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
            onChange={(event) => Update(event)}
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
            />
            <Grid
              bRowHeader={false}
              colOrder={[0, 1, 4, 2, 3]}
              onChange={(event) => Update(event)}
              hHeader={[
                <div
                  style={{
                    background: '#00000033',
                  }}
                >
                  Stats
                </div>,
                <div>Value</div>,
                <div
                  style={{
                    background: '#FFFFFF33',
                  }}
                >
                  Min
                </div>,
                <div>Max</div>,
                <div>(unit)</div>,
              ]}
              hFooter={hFooter}
              iRows={Table.length}
              cellStyle={{ borderBottom: '2px solid white' }}
              Values={Table}
            >
              <TextField
                name={'Types'}
                bMUI={true}
                style={{
                  width: '136px',
                  background: '#00000033',
                }}
                onChange={(event) => Update(event)}
                inputProps={{ ...inputProps, style: { textAlign: 'center' } }}
              />
              {/*[iRow][0]*/}
              <FIELD
                type="number"
                name={'Value'}
                bMUI={true}
                style={{}}
                inputProps={{ ...inputProps, style: { textAlign: 'right' } }}
              />
              {/*[iRow][1]*/}
              <FIELD
                type="number"
                name={'Min'}
                bMUI={true}
                style={{
                  width: '56px',
                  borderBottom: 'none',
                  background: '#FFFFFF33',
                }}
              />
              {/*[iRow][2]*/}
              <FIELD
                type="number"
                name={'Max'}
                bMUI={true}
                style={{ width: '56px' }}
              />
              {/*[iRow][3]*/}
              <TextField
                name={'Unit'}
                bMUI={true}
                style={{}}
                inputProps={{ ...inputProps, style: { textAlign: 'left' } }}
              />
              {/*[iRow][4]*/}
            </Grid>
          </Col>
          {hRandom}
        </Box>
      </Row>
    </div>
  );
}

export default StatInputForm;
