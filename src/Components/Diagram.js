import React from "react";
import { Box } from '@material-ui/core';
import {Vector2,  Coll} from './KoyMath.js';
import StatInputCtrls from "./StatInputCtrls.js"

var chart = 
{ 
    iCentX: 0, iCentY: 0,
    iParts: 7,
    iScale: 150
};

var iDim = [560, 350];
var iCore = [iDim[0]/2, iDim[1]/2];
var meshTrans;

//User inputted stats as semi-colin dilimited strings
var statTypes = "1;2;3;4;5;6";
var stats = "1;3;1;5;1;7";

/*Update Diagram*/
var setupDiagram = function(props)
{
    //Window Dimensions Window Center
    var iDim = [560, 350];
    chart.iCentX = iDim[0]/2;
    chart.iCentY = iDim[1]/2;

    var iCore = [iDim[0]/2, iDim[1]/2];
    var iDegrees = 360/chart.iParts;

    /*Iterate For Each Triangle*/
    var v2Polygon = [new Vector2(0,0), new Vector2(0, 1*chart.iScale), new Vector2(0, 1*chart.iScale)];
    var mesh = [];
    for (var i = 1; i < chart.iParts+1; i++)
    {
        //Adjust Angles
        if(i === 1)
        {
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees)
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        else
        {
            Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees);
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees);
            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
    }    
    //Offset Coordinates
    meshTrans = mesh.map(function (arr) { return [iCore[0] + arr[0], iCore[1] + arr[1]]; });
    return <polygon points={meshTrans} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 0.25, fillRule: "evenodd"}} />;
};

var setupStats = function(props)
{
    //Window Dimensions Window Center
    var iDim = [560, 350];
    chart.iCentX = iDim[0]/2;
    chart.iCentY = iDim[1]/2;

    var iCore = [iDim[0]/2, iDim[1]/2];
    var iDegrees = (360/chart.iParts);

    /*Iterate For Each Triangle*/
    var lastCorner = new Vector2();
    var firstCorner = new Vector2();
    var mesh = [];
    for (var i = 1; i < chart.iParts+1; i++)
    {
        var rand = (Math.random() * (10 - 1) + 1)/10;
        var v2Polygon = [new Vector2(0,0), new Vector2(0, (1*chart.iScale)/2), new Vector2(0, (rand*chart.iScale)/2)];
        //Adjust Angles
        if(i === 1)
        {
            Coll.v2Rotate2D(v2Polygon[1],v2Polygon[0],iDegrees*i);
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));

            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);

            firstCorner = v2Polygon[1];
        }
        else //if(i < 4)
        {
            v2Polygon[1] = lastCorner;
            Coll.v2Rotate2D(v2Polygon[2],v2Polygon[0],iDegrees*(i+1));

            mesh.push([v2Polygon[0].x, v2Polygon[0].y]); mesh.push([v2Polygon[1].x, v2Polygon[1].y]); mesh.push([v2Polygon[2].x, v2Polygon[2].y]);
        }
        lastCorner = v2Polygon[2];
        if(i === chart.iParts)
        {
            v2Polygon[2] = firstCorner;
        }
    }    
    //Offset Coordinates
    meshTrans = mesh.map(function (arr) { return [iCore[0] + arr[0], iCore[1] + arr[1]]; });



    var htmlStats = <polygon points={meshTrans} fill = "url(#grad)" style={{fillOpacity: 0.66, stroke: "red", strokeWidth: 0.25, fillRule: "evenodd"}} />;

    return htmlStats;
};

class Diagram extends React.Component
{
    constructor(props){
        super(props);
    };    

    render(){
        return(
            <div>
                <div>
                    <svg width={iDim[0]} height={iDim[1]} >
                        <circle cx={iCore[0]} cy={iCore[1]} r={1*chart.iScale} style={{fill: "white", fillOpacity: 0.5, stroke: "black", strokeWidth: 0.5}} />
                        <defs>
                            <linearGradient id = "grad">
                                <stop offset="0" stop-color="red"/>
                                <stop offset="1" stop-color="blue"/>
                            </linearGradient>
                        </defs>
                        {setupDiagram()}
                        {setupStats()}
                    </svg>
                </div>
                <Box display="flexbox" border="2px solid #3f0000" bgcolor="darkGrey" color="#a4a4a4" width={iDim[0]} height={iDim[1]}>
                    <StatInputCtrls></StatInputCtrls>
                </Box>
            </div>
        );
    }
}

export default Diagram;
