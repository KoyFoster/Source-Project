import React from "react";
import { Box } from '@material-ui/core';
import {Row, Col} from './Grid.js'

var statForm = function(parent, Quantity) 
{
    var htmlForm = [];
    var rows = parent.props.Quantity;
    var cols = 7;
    for(var iCol=0; iCol < cols; iCol++)
    {
        var htmlBuffer = [];
        for(var iRow=-1; iRow < rows; iRow++)
        {
                if(iRow === -1)//Run if else cases if iRow is not negative
                {
                    if(iCol === 3)//Stat Value Number Form
                    {
                        htmlBuffer.push(<button> RNG </button>);
                    }
                    else
                    {
                        htmlBuffer.push(<span> </span>);
                    }
                }
                else if(iCol === 0)//Stat Labels
                {
                    htmlBuffer.push(<label> Stat: </label>);
                }
                else if(iCol === 1)//Stat Type Form
                {
                    htmlBuffer.push(<input type="input" name={"Types"+iRow}
                        value={parent.props.Types[iRow]}
                        onChange={parent.Update.bind(parent)}
                    ></input>);
                }
                else if(iCol === 2)//Stat Value Labels
                {
                    htmlBuffer.push(<label> Value: </label>);
                }
                else if(iCol === 3)//Stat Value Number Form
                {
                    htmlBuffer.push(
                    <input type="number" name={"Value"+iRow}
                        value={parent.props.Values[iRow]}
                        onChange ={parent.Update.bind(parent)}
                    ></input>);
                }
                else if(iCol === 4)//Range Label
                {
                    htmlBuffer.push(<label> Range: </label>);
                }
                else if(iCol === 5)//Range Min Numnber Form
                {
                    htmlBuffer.push(<input type="number" name={"RangesMin"+iRow}
                        value={parent.props.Ranges[iRow][0]}
                        onChange ={parent.Update.bind(parent)}
                    ></input>);
                }
                else if(iCol === 6)//Range Max Numnber Form
                {
                    htmlBuffer.push(<input type="number" name={"RangesMax"+iRow}
                        value={parent.props.Ranges[iRow][1]}
                        onChange ={parent.Update.bind(parent)}
                    ></input>);
                };
        };
        htmlForm.push(  <div> {htmlBuffer} </div>)
    }
    return <Row>{htmlForm}</Row>;
}

//User Input Class
class StatInputForm extends React.Component
{    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            htmlForm: statForm(this, this.props.Quantity)
        }
    };

    //On Slices Change, update form
    Update(props)
    {
        //Update Diagram
        this.props.UpdateQuantity(props);

        //Update Form
        //if(props.target.name === "Quantity")
        //{
            this.setState({htmlForm: statForm(this)})
        //}
    };

    render() 
    {
        return(
        <div>
            <div align="center">
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
            {this.state.htmlForm}
        </div>);
    }
};

export default StatInputForm;