import React from 'react';
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Checkbox
} from '@material-ui/core';
import { Row, Col } from './Grid.js';
//import { purple, orange, green, red } from '@material-ui/core/colors';
import '../App.css';

//User Input Class
function StatInputForm(props) {
  
  //On Slices Change, update form
  var RandomizeStats = event => {
    if (event.target.name === 'Limit') {
      props.UpdatePointLimit(event);
    } else {
      props.RandomizeStats(event);
    }
  };
  
  var Update = event => {
    //Update Diagram
    props.UpdateStates(event);
  };

  var statForm = function(props) {
    var htmlForm = [];
    var rows = props.Quantity;
    for (var iCol = 0; iCol < 5; iCol++) {
      var htmlBuffer = [];
      var iRow = 0;
      if (iCol === 0) {
        for (iRow = 0; iRow < rows; iRow++) {
          if (iRow < 1)
            //Run if else cases if iRow is not negative
            htmlBuffer.push(
              <TextField
                label='Stat'
                name={'Types' + iRow}
                value={props.Values[iRow][0]}
                onChange={event => Update(event)}
              ></TextField>
            );
          else
            htmlBuffer.push(
              <TextField
                name={'Types' + iRow}
                value={props.Values[iRow][0]}
                onChange={event => Update(event)}
              ></TextField>
            );
        }
        htmlForm.push(<Col name={'Row' + iRow}> {htmlBuffer} </Col>);
      } else if (iCol === 1) {
        for (iRow = 0; iRow < rows; iRow++) {
          if (iRow < 1)
            //Run if else cases if iRow is not negative
            htmlBuffer.push(
              <TextField
                label='Value'
                type='number'
                name={'Value' + iRow}
                value={props.Values[iRow][1]}
                onChange={event => Update(event)}
                style={{width: '56px'}}
              ></TextField>
            );
          else
            htmlBuffer.push(
              <TextField
                type='number'
                name={'Value' + iRow}
                value={props.Values[iRow][1]}
                onChange={event => Update(event)}
                style={{width: '56px'}}
              ></TextField>
            );
        }
        htmlForm.push(<Col name={'Row' + iRow}> {htmlBuffer} </Col>);
      } else if (iCol === 2) {
        for (iRow = 0; iRow < rows; iRow++) {
          if (iRow < 1)
            //Run if else cases if iRow is not negative
            htmlBuffer.push(
              <TextField
                label='Min'
                type='number'
                name={'RangesMin' + iRow}
                value={props.Values[iRow][2]}
                onChange={event => Update(event)}
                style={{width: '56px'}}
              ></TextField>
            );
          else
            htmlBuffer.push(
              <TextField
                type='number'
                name={'RangesMin' + iRow}
                value={props.Values[iRow][2]}
                onChange={event => Update(event)}
                style={{width: '56px',}}
              ></TextField>
            );
        }
        htmlForm.push(<Col name={'Row' + iRow}> {htmlBuffer} </Col>);
      } else if (iCol === 3) {
        for (iRow = 0; iRow < rows; iRow++) {
          if (iRow < 1)
            //Run if else cases if iRow is not negative
            htmlBuffer.push(
              <TextField
                label='Max'
                type='number'
                name={'RangesMax' + iRow}
                value={props.Values[iRow][3]}
                onChange={event => Update(event)}
                style={{width: '56px'}}
              ></TextField>
            );
          else
            htmlBuffer.push(
              <TextField
                type='number'
                name={'RangesMax' + iRow}
                value={props.Values[iRow][3]}
                onChange={event => Update(event)}
                style={{width: '56px'}}
              ></TextField>
            );
        }
        htmlForm.push(<Col name={'Row' + iRow}> {htmlBuffer} </Col>);
      }//End of column 3 
      else if (iCol === 4) {
        for (iRow = 0; iRow < rows; iRow++) {
          if (iRow < 1)
            //Run if else cases if iRow is not negative
            htmlBuffer.push(
              <TextField
                label='Unit'
                name={'Unit' + iRow}
                value={props.Values[iRow][4]}
                onChange={event => Update(event)}
                style={{width: '32px'}}
              ></TextField>
            );
          else
            htmlBuffer.push(
              <TextField
                name={'Unit' + iRow}
                value={props.Values[iRow][4]}
                onChange={event => Update(event)}
                style={{width: '32px'}}
              ></TextField>
            );
        }
        htmlForm.push(<Col name={'Row' + iRow}> {htmlBuffer} </Col>);
      }//End of column 4
    }
    return (
      <Col>
        <Button name='RNG' onClick={event => RandomizeStats(event)}>
          {' '}
          Random{' '}
        </Button>
        <Row>{htmlForm}</Row>
      </Col>
    );
  };

  return (
    <div>
      <Col name='GraphBody'>
      <Row>
        <TextField
          label='Stats'
          type='number'
          name='Quantity'
          value={props.Quantity}
          onChange={event => Update(event)}
        ></TextField>
            <InputLabel style={{ display: 'flexBox' }}>
              {' '}
              Limit:{' '}
            </InputLabel>
            <TextField
              type='number'
              name='Limit'
              value={props.PointLimit}
              onChange={event => RandomizeStats(event)}
            ></TextField>
      </Row>
      <Row>
            <Checkbox name='PointDiff' checked={props.PointDiff} onChange={event => Update(event)}/>
            <InputLabel>Min - Points Spent: {props.PointTotal} </InputLabel>
      </Row>
      </Col>
      <Row>
        <Box name='FormBody' align='center'>
          {statForm(props)}
        </Box>
      </Row>
    </div>
  );
}

export default StatInputForm;
