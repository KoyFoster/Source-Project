import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Diagram from "./Diagram.js";

//User Input Class
class StatInputCtrls extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            value: '3'
        };
        //OnHandle Updates
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) 
    {
        this.setState({value: event.target.value});//chart.iParts = event.target.value
    };  
    
    render() 
    {
        return(        
        <div>
            <label style = {{color: "black"}} >Stat quantity: </label>
            <input type="number" style = {{width: "38px"}} value={this.state.value} onChange={this.handleChange}></input>
        </div>);
    }
};

export default StatInputCtrls;