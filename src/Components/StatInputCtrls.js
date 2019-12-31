import React from "react";
//import { makeStyles } from '@material-ui/core/styles';
//import { Box } from '@material-ui/core';
//import Diagram from "./Diagram.js";

var statCtrls = function(parent) 
{
    var controls = [];

    for(var i=0; i < parent.props.Quantity; i++)
    {
        controls.push(<div>
            <label style = {{color: "black"}} >Stat: </label>
            <input type="input" name={"Types"+i} style = {{width: "96px"}}
                value={parent.props.Types[i]}
                onChange={parent.Update.bind(parent)}
            ></input>
            
            <label style = {{color: "black"}} > Value: </label>
            <input type="number" name={"Value"+i} style = {{width: "48px"}}
                value={parent.props.Values[i]}
                onChange ={parent.Update.bind(parent)}
            ></input>
            
            <label style = {{color: "black"}} > Range: </label>
            <input type="number" name={"RangesMin"+i} style = {{width: "48px"}}
                value={parent.props.Ranges[i][0]}
                onChange ={parent.Update.bind(parent)}
            ></input>            
            <input type="number" name={"RangesMax"+i} style = {{width: "48px"}}
                value={parent.props.Ranges[i][1]}
                onChange ={parent.Update.bind(parent)}
            ></input>
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
            controls: statCtrls(this)
        }
    };

    //On Slices Change, update form
    Update(props)
    {
        //Update Diagram
        this.props.UpdateQuantity(props);

        //Update Form
        this.setState({controls: statCtrls(this)})
    };

    render() 
    {
        return(
        <div>
            <div align="center">
                <label style = {{color: "black"}} > Stat quantity: </label>
                <input
                    type="number"
                    name="Quantity"
                    style = {{width: "38px"}}

                    value={this.props.Quantity}
                    onChange={this.Update.bind(this)}
                >
                </input>
                <label type="number" style = {{width: "38px", color: "black"}}> Points Spent: {this.props.TotalPoints} </label>
            </div>
            {this.state.controls}
        </div>);
    }
};

export default StatInputCtrls;