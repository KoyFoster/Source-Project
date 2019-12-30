import React from "react";
//import { makeStyles } from '@material-ui/core/styles';
//import { Box } from '@material-ui/core';
//import Diagram from "./Diagram.js";

var statCtrls = function(slices = 3) 
{
    var controls = [];

    for(var i=0; i < slices; i++)
    {
        controls.push(<div>
            <label style = {{color: "black"}} >Stat: </label>
            <input type="input" name={"Stat"+i} style = {{width: "96px"}}></input>
            
            <label style = {{color: "black"}} > Value: </label>
            <input type="number" name={"Value"+i} style = {{width: "48px"}}></input>
            
            <label style = {{color: "black"}} > Range: </label>
            <input type="number" name={"Min"+i} value={0} style = {{width: "48px"}}></input>
            <input type="number" name={"Max"+i} value={100} style = {{width: "48px"}}></input>
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
            controls: statCtrls(this.props.Quantity)
        }
    }

    //On Slices Change, update form
    newSlices(props)
    {
        //Update Form
        this.setState({
            controls: statCtrls(props.target.value)
        });

        //Update Diagram
        props.Quantity = props.target.value;
        this.props.UpdateQuantity(props);
    }

    render() 
    {
        return(
        <div>
            <div>
                <label style = {{color: "black"}} >Stat quantity: </label>

                <input readOnly={false} 
                    value={this.props.Quantity} 
                    
                    type="number" name="SQ"

                    onChange={this.newSlices.bind(this)}

                    style = {{width: "38px"}} >
                </input>

            </div>
            <div>
                <label style = {{color: "black"}} >Max Points/Levels: </label>
                <input type="number" style = {{width: "38px"}} value={100}></input>
            </div>
            {this.state.controls}
        </div>);
    }
};

export default StatInputCtrls;