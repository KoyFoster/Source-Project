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
      props.RandomizeStats(event);
    }
  };

  const Update = (event) => {
    //Update Diagram
    console.log('StatData 3:', props.data());
    props.UpdateStates(event);
  };

  return (
    <div>
      <Col name="GraphBody">
        <Row>
          <TextField
            label="Stats"
            type="number"
            name="Quantity"
            value={Number(props.data().Size)}
            onChange={(event) => Update(event)}
          ></TextField>
          <InputLabel style={{ display: 'flexBox' }}> Limit: </InputLabel>
          <TextField
            type="number"
            name="Limit"
            value={props.data().PointLimit}
            onChange={(event) => RandomizeStats(event)}
          ></TextField>
        </Row>
        <Row>
          <Checkbox
            name="PointDiff"
            checked={props.data().PointDiff}
            onChange={(event) => Update(event)}
          />
          <InputLabel>
            Min - Total Points: {props.data().PointTotal}{' '}
          </InputLabel>
        </Row>
      </Col>
      <Row>
        <Box name="FormBody" align="center">
          <Col>
            <Button name="RNG" onClick={(event) => RandomizeStats(event)}>
              {' '}
              Random{' '}
            </Button>

            <Grid
              onChange={(event) => Update(event)}
              hHeader={[
                <div>Stats</div>,
                <div>Value</div>,
                <div>Min</div>,
                <div>Max</div>,
                <div>LVL</div>,
              ]}
              hFooter={[
                <div>Totals</div>,
                <TextField
                  value={props.data().PointTotal}
                  disabled
                ></TextField>,
                <TextField value={props.data().PointMin} disabled></TextField>,
                <TextField value={props.data().PointMax} disabled></TextField>,
                <div></div>,
              ]}
              iRows={props.data().Size}
              style={{ margins: 'none', padding: 'none' }}
              cellStyle={{ margins: 'none', padding: 'none' }}
              Values={props.data().Values}
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
