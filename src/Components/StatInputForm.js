import React from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Checkbox
} from "@material-ui/core";
import { Row, Col } from "./DivGrid.js";
//import { purple, orange, green, red } from '@material-ui/core/colors';
import "../App.css";
import Grid from './Forms/Grid';

//User Input Class
function StatInputForm(props) {
  //On Slices Change, update form
  var RandomizeStats = event => {
    if (event.target.name === "Limit") {
      props.UpdatePointLimit(event);
    } else {
      props.RandomizeStats(event);
    }
  };

  var Update = event => {
    //Update Diagram
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
            value={props.Quantity}
            onChange={event => Update(event)}
          ></TextField>
          <InputLabel style={{ display: "flexBox" }}> Limit: </InputLabel>
          <TextField
            type="number"
            name="Limit"
            value={props.PointLimit}
            onChange={event => RandomizeStats(event)}
          ></TextField>
        </Row>
        <Row>
          <Checkbox
            name="PointDiff"
            checked={props.PointDiff}
            onChange={event => Update(event)}
          />
          <InputLabel>Min - Total Points: {props.PointTotal} </InputLabel>
        </Row>
      </Col>
      <Row>
        <Box name="FormBody" align="center">
          
          <Col>
            <Button name="RNG" onClick={event => RandomizeStats(event)}> {" "}Random{" "} </Button>
            <Grid hHeader={[<div>Stats</div>,<div>Value</div>,<div>Min</div>,<div>Max</div>,<div>LVL</div>]} 
            hFooter={[<div>Totals</div>,
              <TextField type="number" name={'T'/*+iCol*/} value={props.PointTotal} disabled></TextField>,
              <TextField type="number" name={'T'/*+iCol*/} value={props.PointMin} disabled></TextField>,
              <TextField type="number" name={'T'/*+iCol*/} value={props.PointMax} disabled></TextField>,
            <div></div>]} iRows = {props.Quantity} style={{border: '1px solid green'}} cellStyle={{border: '1px solid red'}} value={props.Values}>

              <TextField name={"Types"} onChange={event => Update(event)}/>{/*[iRow][0]*/}
              <TextField type="number" name={"Value"} onChange={event => Update(event)} style={{ width: "56px" }}/>{/*[iRow][1]*/}
              <TextField type="number" name={"Min"} onChange={event => Update(event)} style={{ width: "56px" }}/>{/*[iRow][2]*/}
              <TextField type="number" name={"Max"} onChange={event => Update(event)} style={{ width: "56px" }}/>{/*[iRow][3]*/}
              <TextField name={"Unit"} onChange={event => Update(event)} style={{ width: "32px" }}/>{/*[iRow][4]*/}
              
          </Grid>
          </Col>
        </Box>
      </Row>
    </div>
  );
}

export default StatInputForm;