import React from "react";
import { Button, TextField, makeStyles, InputLabel, Divider } from '@material-ui/core';
import {Row, Col} from './Grid.js'
import { purple, orange, green, red } from "@material-ui/core/colors";
import "../App.css";

//User Input Class
function StatInputForm(props)
{
    //On Slices Change, update form
    var RandomizeStats = (event) =>
    {
        if(event.target.name === "Limit")
        {
            props.UpdatePointLimit(event);
        }
        else
        {
            props.RandomizeStats(event);
        }
    };
    var Update = (event) =>
    {
        //Update Diagram
        props.UpdateQuantity(event);
    };

    var statForm = function(props)
    {
        var htmlForm = [];
        var rows = props.Quantity;
        for(var iCol=0; iCol < 4; iCol++)
        {
            var htmlBuffer = [];
            var iRow = -1;
            if(iCol === 0)
            {
                for(iRow=-1; iRow < rows; iRow++)
                {
                    if(iRow < 0)//Run if else cases if iRow is not negative
                    htmlBuffer.push(<InputLabel > Stat </InputLabel>);
                    else
                    htmlBuffer.push(<TextField name={"Types"+iRow} value={props.Types[iRow]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
                htmlForm.push(  <Divider orientation="vertical" /> );
            }
            else if(iCol === 1)
            {
                for(iRow=-1; iRow < rows; iRow++)
                {
                    if(iRow < 0)//Run if else cases if iRow is not negative
                    htmlBuffer.push(<InputLabel > Value </InputLabel>);
                    else
                    htmlBuffer.push(<TextField type="number" name={"Value"+iRow} value={props.Values[iRow]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
                htmlForm.push(  <Divider orientation="vertical" /> );
            }
            else if(iCol === 2)
            {
                for(iRow=-1; iRow < rows; iRow++)
                {
                    if(iRow < 0)//Run if else cases if iRow is not negative
                    htmlBuffer.push(<InputLabel  > Min </InputLabel>);
                    else
                    htmlBuffer.push(<TextField  type="number" name={"RangesMin"+iRow} value={props.Ranges[iRow][0]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
            }
            else if(iCol === 3)
            {
                for(iRow=-1; iRow < rows; iRow++)
                {
                    if(iRow < 0)//Run if else cases if iRow is not negative
                    htmlBuffer.push(<InputLabel  > Max </InputLabel>);
                    else
                    htmlBuffer.push(<TextField  type="number" name={"RangesMax"+iRow} value={props.Ranges[iRow][1]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
            }
        }
        return <Col><Button variant="contained" name="RNG" onClick={(event) => RandomizeStats(event)} > RNG </Button><Row>{htmlForm}</Row></Col>;
    }

        return(
        <div>
            <div name="GraphBody" style={{display: 'flex', justifyContent:'center'}}>
            <Row>
                <Col>
                    <InputLabel  > Stat Quantity </InputLabel>
                    <TextField 
                        type="number" name="Quantity"
                        value={props.Quantity}
                        onChange={(event) => Update(event)}
                    >
                    </TextField>
                </Col>
                <Col>
                    <InputLabel  > Points Spent: {props.PointTotal} </InputLabel>                    
                    <Row justifyContent="left">
                        <InputLabel > Limit: </InputLabel>
                        <TextField 
                            type="number" name="Limit"
                            value={props.PointLimit}
                            onChange={(event) => RandomizeStats(event)}
                            ></TextField>
                    </Row>
                </Col>
            </Row>
            </div>
            <div name="FormBody" align="center">
                {statForm(props)}
            </div>
        </div >);
};

export default StatInputForm;