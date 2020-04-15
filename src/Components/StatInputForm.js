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
    props.UpdateStates(event);
  };

  /* Validate Presence of stats */
  const hLimit =
    props.bCalc === true ? (
      ''
    ) : (
      <div>
        <InputLabel style={{ display: 'flexBox' }}> Limit: </InputLabel>
        <TextField
          type="number"
          name="Limit"
          value={props.data().PointLimit}
          onChange={(event) => RandomizeStats(event)}
        ></TextField>
      </div>
    );
  const hTotal =
    props.bCalc === true ? (
      ''
    ) : (
      <InputLabel>Min - Total Points: {props.data().PointTotal} </InputLabel>
    );
  const hPointDiff =
    props.bCalc === true || props.data().PointDiff === undefined ? (
      ''
    ) : (
      <Checkbox
        name="PointDiff"
        checked={Boolean(props.data().PointDiff)}
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
    props.bCalc !== true
      ? [
          <div>Totals</div>,
          <TextField value={props.data().PointTotal} disabled></TextField>,
          <TextField value={props.data().PointMin} disabled></TextField>,
          <TextField value={props.data().PointMax} disabled></TextField>,
          <div></div>,
        ]
      : undefined;

  return (
    <div>
      <Col name="GraphBody">
        <Row>
          <TextField
            label="Stats"
            type="number"
            name="Quantity"
            value={Number(props.Values.length)}
            onChange={(event) => Update(event)}
          ></TextField>
          {hLimit}
        </Row>
        <Row>
          {hPointDiff}
          {hTotal}
        </Row>
      </Col>
      <Row>
        <Box name="FormBody" align="center">
          <Col>
            {hRandom}
            <Grid
              iStrt={1}
              onChange={(event) => Update(event)}
              hHeader={[
                <div>Stats</div>,
                <div>Value</div>,
                <div>Min</div>,
                <div>Max</div>,
                <div>LVL</div>,
              ]}
              hFooter={hFooter}
              iRows={props.Values.length}
              style={{ margin: 'none', padding: 'none' }}
              cellStyle={{ margin: 'none', padding: 'none' }}
              Values={props.Values}
            >
              <TextField
                name={'Types'}
                style={{ width: '100px' }}
                onChange={(event) => Update(event)}
              />
              {/*[iRow][0]*/}
              <TextField
                type="number"
                name={'Value'}
                style={{ width: '56px' }}
              />
              {/*[iRow][1]*/}
              <TextField type="number" name={'Min'} style={{ width: '56px' }} />
              {/*[iRow][2]*/}
              <TextField type="number" name={'Max'} style={{ width: '56px' }} />
              {/*[iRow][3]*/}
              <TextField name={'Unit'} style={{ width: '32px' }} />
              {/*[iRow][4]*/}
            </Grid>
          </Col>
        </Box>
      </Row>
    </div>
  );
}

export default StatInputForm;
