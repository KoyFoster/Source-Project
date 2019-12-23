import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import {Vector2, Vector3, Deg, Coll, Calc} from './KoyMath.js'

//Card Canvas
var canvas;
var svg;
//CTX is used for drawing
var ctx;

var chart = 
{ 
    iCentX: 0, iCentY: 0,
    iParts: 6,
    iScale: 150
}

//User inputted stats as semi-colin dilimited strings
var statTypes = "1;2;3;4;5;6"
var stats = "1;3;1;5;1;7"

var ChartSetup = function(props)
{
    //Window Dimensions Window Center
    var iDim = [560, 350];
    chart.iCentX = iDim[0]/2;
    chart.iCentY = iDim[1]/2;

    var iCore = [iDim[0]/2, iDim[1]/2];
    var iDegrees = 360/chart.iParts;
        //var pCenter = new Vector2(chart.iCentX,chart.iCentY);
        //var pLength = new Vector2(chart.iCentX+chart.iRadius,chart.iCentY);

        //var iRadians = (iDegrees*Math.PI)/180;
    //var iCircum = Math.PI*chart.iRadius*2;
    //var iArcLength = iCircum*(iDegrees)
        //var iChord = 2*chart.iRadius*Math.sin(iArcLength/chart.iRadius*2)

    /*Iterate For Each Triangle*/
    var v2Polygon = [new Vector2(0,0), new Vector2(0, 1*chart.iScale), new Vector2(0, 1*chart.iScale)];
    var mesh = [];
    for (var i = 1; i < chart.iParts+1; i++)
    {
        //Adjust Angles
        if(i === 1)
        {
            v2Polygon[2] = Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees)
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        else
        {
            v2Polygon[1] = Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees);
            v2Polygon[2] = Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees);
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
    }    
    //Offset Coordinates
    return mesh.map(function (arr) { return [iCore[0] + arr[0], iCore[1] + arr[1]]; });
}

var iDim = [560, 350];
var iCore = [iDim[0]/2, iDim[1]/2];
var meshTrans;

function update()
{
    meshTrans = ChartSetup();
}

function start()
{
    update();
}

//User Input Class
//Stat Card
class InputForm extends React.Component
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
    
    handleChange(event) {
        this.setState({value: chart.iParts = event.target.value});//chart.iParts = event.target.value
        start();
        this.forceUpdate();
    };    

    render() 
    {
        return (<form>
            <label>Stat quantity: </label>
            <input type="text" value={this.state.value} onChange={this.handleChange}></input>
        </form>);
    }
}

//Stat Card
function StatCard(props)
{

    //OnLoad
    window.update = function () {
        start();
    };

    //Render and Logic 
    return(<div>
        <Box display="flexbox" border="2px solid #3f0000" bgcolor="yellow" color="#a4a4a4" width={iDim[0]} height={iDim[1]}>
                        
            <svg width={iDim[0]} height={iDim[1]} >
                <circle cx={iCore[0]} cy={iCore[1]} r={1*chart.iScale} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 0.25}} />
                <polygon points={meshTrans} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 0.25, fillRule: "evenodd"}} />   
            </svg>
        </Box>
        <Box display="flexbox" border="2px solid #3f0000" bgcolor="yellow" color="#a4a4a4" width={iDim[0]} height={iDim[1]}>
            <InputForm></InputForm>
        </Box>
    </div>)
}

export default StatCard; 