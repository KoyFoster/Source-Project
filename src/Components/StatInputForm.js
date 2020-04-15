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
    props.UpdateStates(props.iD, event);
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
          value={props.PointLimit}
          onChange={(event) => RandomizeStats(event)}
        ></TextField>
      </div>
    );
  const hTotal =
    props.bCalc === true ? (
      ''
    ) : (
      <InputLabel>Min - Total Points: {Header[3]} </InputLabel>
    );
  const hPointDiff =
    props.bCalc === true || props.PointDiff === undefined ? (
      ''
    ) : (
      <Checkbox
        name="PointDiff"
        checked={Boolean(props.PointDiff)}
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
          <TextField value={Header[3]} disabled></TextField>,
          <TextField value={Header[4]} disabled></TextField>,
          <TextField value={Header[5]} disabled></TextField>,
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
            value={Number(Table.length)}
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
              onChange={(event) => Update(event)}
              hHeader={[
                <div>Stats</div>,
                <div>Value</div>,
                <div>Min</div>,
                <div>Max</div>,
                <div>LVL</div>,
              ]}
              hFooter={hFooter}
              iRows={Table.length}
              style={{ margin: 'none', padding: 'none' }}
              cellStyle={{ margin: 'none', padding: 'none' }}
              Values={Table}
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
