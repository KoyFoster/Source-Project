import React from "react";
import { Box } from '@material-ui/core';
import {Row, Col} from './Grid.js'

var statForm = function(Comp, Quantity) 
{
    var htmlForm = [];
    var rows = Comp.props.Quantity;
    for(var iRow=-1; iRow < rows; iRow++)
    {
        var htmlBuffer = [];
        if(iRow === -1)//Run if else cases if iRow is not negative
        {    
            htmlBuffer.push(<button name="RNG" onClick={Comp.Update.bind(Comp)}> RNG </button>);
            htmlForm.push(  htmlBuffer )
        }
        else
        {
            htmlBuffer.push(<label> Stat: </label>);
            htmlBuffer.push(<input type="input" style={{width: "96px"}} name={"Types"+iRow} value={Comp.props.Types[iRow]} onChange={Comp.Update.bind(Comp)} ></input>);                
            htmlBuffer.push(<label> Value: </label>);
            htmlBuffer.push(<input type="number" name={"Value"+iRow} value={Comp.props.Values[iRow]} onChange ={Comp.Update.bind(Comp)} ></input>);               
            htmlBuffer.push(<label> Range: </label>);
            htmlBuffer.push(<input type="number" name={"RangesMin"+iRow} value={Comp.props.Ranges[iRow][0]} onChange ={Comp.Update.bind(Comp)} ></input>);                
            htmlBuffer.push(<input type="number" name={"RangesMax"+iRow} value={Comp.props.Ranges[iRow][1]} onChange ={Comp.Update.bind(Comp)} ></input>);
            htmlForm.push(  <Row name={"Row"+iRow}> {htmlBuffer} </Row>);
        }
    }
    return htmlForm;
}

//User Input Class
class StatInputForm extends React.Component
{
    //On Slices Change, update form
    Update(props)
    {
        if(props.target.name === "RNG")
        {
            this.props.RandomizeStats(props);
        }
        else
        {
            //Update Diagram
            this.props.UpdateQuantity(props);
        }
    };

    render() 
    {
        return(
        <div name="body">
            <div name="GraphBody" align="center">
                <label> Stat quantity: </label>
                <input
                    type="number"
                    name="Quantity"
                    style = {{width: "38px"}}

                    value={this.props.Quantity}
                    onChange={this.Update.bind(this)}
                >
                </input>
                <label> Points Spent: {this.props.TotalPoints} </label>
            </div>
            <div name="FormBody" align="center">
                {statForm(this)}
            </div>
        </div>);
    }
};

export default StatInputForm;