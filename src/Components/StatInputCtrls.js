import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Diagram from "./Diagram.js";

var stats = 3;

var statCtrls = function(props) 
{
    var controls = [];

    for(var i=0; i < 3; i++)
    {
        controls.push(<div>
            <label style = {{color: "black"}} >Stat: </label>
            <input type="input" name="Stat" style = {{width: "96px"}}></input>
            
            <label style = {{color: "black"}} > Value: </label>
            <input type="number" name="Value" style = {{width: "48px"}}></input>
            
            <label style = {{color: "black"}} > Range: </label>
            <input type="number" name="Min" value={0} style = {{width: "48px"}}></input>
            <input type="number" name="Max" value={100} style = {{width: "48px"}}></input>

        </div>)
    }
    return controls;
}

//User Input Class
class StatInputCtrls extends React.Component
{    
    render() 
    {
        return(        
        <div>
            <div>
                <label style = {{color: "black"}} >Stat quantity: </label>

                <input readOnly={false} defaultValue={8} 
                type="number" name="SQ"
                onChange={this.props.exampleFunctionLink}
                value={this.props.value1} 
                style = {{width: "38px"}} ></input>

            </div>
            <div>
                <label style = {{color: "black"}} >Max Points/Levels: </label>
                <input type="number" style = {{width: "38px"}} value={100}></input>
            </div>
            {statCtrls()}
        </div>);
    }
};

export default StatInputCtrls;