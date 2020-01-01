import React from "react";
//import { makeStyles } from '@material-ui/core/styles';
//import { Box } from '@material-ui/core';
//import Diagram from "./Diagram.js";

var statCtrls = function(parent, Quantity) 
{
    var htmlForm = [];
    var rows = parent.props.Quantity;
    var col = 7;
    for(var iCol=-1; iCol < col; iCol++)
    {
        for(var iRow=0; iRow < row; iRow++)
        {   
                if(iCol < 0)
                {

                }
                else if(iCol === 0)//Stat Labels
                {
                    <label style = {{align: "right", color: "black"}} >Stat: </label>
                }
                else if(iCol === 1)//Stat Number Form
                {
                    <input type="input" name={"Types"+iRow} style = {{width: "96px"}}
                        value={parent.props.Types[iRow]}
                        onChange={parent.Update.bind(parent)}
                    ></input>
                }
                else if(iCol === 2)
                {
                    <label style = {{color: "black"}} > Value: </label>
                }
                else if(iCol === 3)
                {
                    <input type="number" name={"Value"+iRow} style = {{width: "48px"}}
                        value={parent.props.Values[iRow]}
                        onChange ={parent.Update.bind(parent)}
                    ></input>
                }
                else if(iCol === 4)
                {
                    <label style = {{color: "black"}} > Range: </label>
                }
                else if(iCol === 5)
                {
                    <input type="number" name={"RangesMin"+iRow} style = {{width: "48px"}}
                        value={parent.props.Ranges[iRow][0]}
                        onChange ={parent.Update.bind(parent)}
                    ></input>
                }
                else if(iCol === 6)
                {
                    <input type="number" name={"RangesMax"+iRow} style = {{width: "48px"}}
                        value={parent.props.Ranges[iRow][1]}
                        onChange ={parent.Update.bind(parent)}
                    ></input>
                };
                
                htmlForm.push(<div>
                    
                </div>)
        };
    }
    return htmlForm;
}

//User Input Class
class StatInputCtrls extends React.Component
{    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            htmlForm: statCtrls(this, this.props.Quantity)
        }
    };

    //On Slices Change, update form
    Update(props)
    {
        //Update Diagram
        this.props.UpdateQuantity(props);

        //Update Form
        //if(props.target.name === "Quantity")
        {
            this.setState({htmlForm: statCtrls(this)})
        }
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
            {this.state.htmlForm}
        </div>);
    }
};

export default StatInputCtrls;