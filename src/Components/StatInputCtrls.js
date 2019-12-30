import React from "react";
//import { makeStyles } from '@material-ui/core/styles';
//import { Box } from '@material-ui/core';
//import Diagram from "./Diagram.js";

var statCtrls = function(slices = 3, props) 
{
    var controls = [];

    for(var i=0; i < slices; i++)
    {
        controls.push(<div>
            <label style = {{color: "black"}} >Stat: </label>
            <input type="input" name={"Stat"+i} value={props.Types[i]} style = {{width: "96px"}}></input>
            
            <label style = {{color: "black"}} > Value: </label>
            <input type="number" name={"Value"+i} value={props.Values[i]} style = {{width: "48px"}}></input>
            
            <label style = {{color: "black"}} > Range: </label>
            <input type="number" name={"Min"+i} value={props.Ranges[i][0]} style = {{width: "48px"}}></input>
            <input type="number" name={"Max"+i} value={props.Ranges[i][1]} style = {{width: "48px"}}></input>
        </div>)
    }
    return controls;
}

//User Input Class
class StatInputCtrls extends React.Component
{    
    constructor(props)
    {
        super(props);
        this.state =
        {
            controls: statCtrls(this.props.Quantity, this.props)
        }
    };

    //On Slices Change, update form
    newSlices(props)
    {
        //Update Form
        this.setState({
            controls: statCtrls(props.target.value, this.props)
        });

        //Update Diagram
        //props.Quantity = props.target.value;
        this.props.UpdateQuantity(props);
    };

    render() 
    {
        return(
        <div>
            <div align="center">
                <label style = {{color: "black"}} > Stat quantity: </label>
                <input //readOnly={false}                 
                    type="number" name="SQ" 
                    style = {{width: "38px"}}

                    value={this.props.Quantity}
                    onChange={this.newSlices.bind(this)}
                >
                </input>
                <label type="number" style = {{width: "38px", color: "black"}}> Points Spent: {this.props.TotalPoints} </label>
            </div>
            {this.state.controls}
        </div>);
    }
};

export default StatInputCtrls;