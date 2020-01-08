import React from "react";
import { Button, TextField, makeStyles, InputLabel, Divider, createMuiTheme, ThemeProvider } from '@material-ui/core';
import {Row, Col} from './Grid.js'
import { purple, orange, green, red } from "@material-ui/core/colors";

//Styles
const useStyles = makeStyles(theme =>
({
    //Global style that effects all sub styles
    '@global': 
    {
        //If you nest themes, You should target [class*="MuiButton-root"].
        '.MuiButton-root': {
          fontSize: '1rem',
        },
        '.MuiInputLabel-root': {            
          fontSize: '1rem',

          padding: '6px 6px',
          borderRadius: 3
        },
        '.MuiTextField-root': {
            fontSize: '1px',
            width: '152px'
        },
    },
    root: {
        fontSize: '16px',
    },
    checked: {},
    
    Label: {  
        textAlign: 'center',        
        backgroundColor: 'black',
        color: 'white',
    },

    Field: {
        textAlign: 'center',
    },
    NumberField: {  
        width: '56px',
        textAlign: 'center'
    },

    Button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,

      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      padding: '0 30px',
    },
}));

//User Input Class
function StatInputForm(props)
{
    //Set Styles Class
    const classes = useStyles();

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
                    htmlBuffer.push(<InputLabel classes={{root: classes.Label}} > Stat </InputLabel>);
                    else
                    htmlBuffer.push(<TextField inputProps={{style: { textAlign: "center" }}} name={"Types"+iRow} value={props.Types[iRow]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
                htmlForm.push(  <Divider orientation="vertical" /> );
            }
            else if(iCol === 1)
            {
                for(iRow=-1; iRow < rows; iRow++)
                {
                    if(iRow < 0)//Run if else cases if iRow is not negative
                    htmlBuffer.push(<InputLabel classes={{root: classes.Label}} > Value </InputLabel>);
                    else
                    htmlBuffer.push(<TextField classes={{root: classes.NumberField}} type="number" name={"Value"+iRow} value={props.Values[iRow]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
                htmlForm.push(  <Divider orientation="vertical" /> );
            }
            else if(iCol === 2)
            {
                for(iRow=-1; iRow < rows; iRow++)
                {
                    if(iRow < 0)//Run if else cases if iRow is not negative
                    htmlBuffer.push(<InputLabel classes={{root: classes.Label}} > Min </InputLabel>);
                    else
                    htmlBuffer.push(<TextField classes={{root: classes.NumberField}} type="number" name={"RangesMin"+iRow} value={props.Ranges[iRow][0]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
            }
            else if(iCol === 3)
            {
                for(iRow=-1; iRow < rows; iRow++)
                {
                    if(iRow < 0)//Run if else cases if iRow is not negative
                    htmlBuffer.push(<InputLabel classes={{root: classes.Label}} > Max </InputLabel>);
                    else
                    htmlBuffer.push(<TextField classes={{root: classes.NumberField}} type="number" name={"RangesMax"+iRow} value={props.Ranges[iRow][1]} onChange={(event) => Update(event)} ></TextField>);
                }
                htmlForm.push(  <Col name={"Row"+iRow}> {htmlBuffer} </Col> );
            }
        }
        return <Col><Button classes={{root: classes.Button}} name="RNG" onClick={(event) => RandomizeStats(event)} > RNG </Button><Row>{htmlForm}</Row></Col>;
    }

        return(
        <ThemeProvider>
            <div name="GraphBody" style={{display: 'flex', justifyContent:'center'}}>
            <Row>
                <Col>
                    <InputLabel classes={{root: classes.Label}} > Stat Quantity </InputLabel>
                    <TextField classes={{root: classes.NumberField}} 
                        type="number" name="Quantity"
                        value={props.Quantity}
                        onChange={(event) => Update(event)}
                    >
                    </TextField>
                </Col>
                <Col>
                    <InputLabel classes={{root: classes.Label}} > Points Spent: {props.PointTotal} </InputLabel>                    
                    <Row justifyContent="left">
                        <InputLabel classes={{root: classes.Label}} > Limit: </InputLabel>
                        <TextField classes={{root: classes.NumberField}}
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
        </ThemeProvider >);
};

export default StatInputForm;